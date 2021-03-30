import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createPatch } from 'rfc6902/dist/rfc6902';

import { AppState, Plugins, DeviceInfo, PluginListenerHandle } from '@capacitor/core';
import { environment } from '../../environments/environment';
const { App, Device, EventSource } = Plugins;

import 'capacitor-eventsource';
import { MessageResult, ErrorResult, EventSourcePlugin } from 'capacitor-eventsource';
import { StreamData } from '../model/streamData';
import { ExtraInnings } from '../extra-innings/extra-innings.service';
import { Platform } from '@ionic/angular';

const SECOND = 1000;
const ONE_MINUTE = 60 * SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
// const ONE_DAY = 60 * ONE_HOUR;

@Injectable({
  providedIn: 'root',
})
export class APIStream {
  /**
   * default interval since the last successful message before retrying
   */
  public defaultRetryMillis: number;

  /**
   * how often to check if a retry is necessary
   */
  public defaultCheckIntervalMillis: number;

  /**
   * if a retry fails, the multiplier to apply to the retry interval for exponential fallback
   */
  public defaultRetryFallback: number;

  /**
   * whether or not the user has started the service
   */
  public ready: Promise<void>;

  /**
   * whether or not we are connected to a network
   */
  public isConnected = true;

  // the event source to pull from
  private source: EventSourcePlugin | null;

  // when we last got a successful message (epoch)
  private lastUpdated = 0;
  // the last update received
  private lastUpdate: any;
  // when the last retry happened
  private lastRetry = 0;
  // the `setInterval` handle for the active background retry checker
  private retryChecker: number | null;
  // current retry interval; on a successful message this resets to `defaultRetryMillis`
  // the `setTimeout` handle for checking on the top of the next hour
  private hourChecker: number | null;
  private retryMillis: number;
  // max out at 10 minutes for a retry interval
  private maxRetryMillis = 10 * ONE_MINUTE;

  private subject: Subject<StreamData|ErrorEvent> | null;
  private deviceInfo: DeviceInfo | null;

  private handles = {} as { [key: string]: PluginListenerHandle };

  private url: Promise<string>;
  private streamData: StreamData;

  /**
   * Create an API object that can subscribe to the Blaseball event stream.
   */
  constructor(
    private platform: Platform,
    private extraInnings: ExtraInnings,
  ) {
    this.defaultRetryMillis = 5 * SECOND;
    this.defaultCheckIntervalMillis = 2 * SECOND;
    this.defaultRetryFallback = 1.5;
    this.retryMillis = this.defaultRetryMillis;

    console.debug(`APIStream(): default retry:          ${this.defaultRetryMillis}ms`);
    console.debug(`APIStream(): default check interval: ${this.defaultCheckIntervalMillis}ms`);
    console.debug(`APIStream(): default retry fallback: ${this.defaultRetryFallback}x`);

    const unenrichedSubject = new Subject<StreamData|ErrorEvent>();
    .subject = this.extraInnings.add(unenrichedSubject);

    App.addListener('appStateChange', (state: AppState) => {
      if (this.deviceInfo?.platform !== 'web') {
        console.debug(`APIStream.appStateChange: active=${state.isActive}`);
        if (state.isActive) {
          this.createSource().catch((err) => {

          });
        } else {
          this.closeSource();
        }
      } else {
        console.debug(`APIStream.appStateChange: skipping, platform is (probably) web`);
      }
    });

    window.addEventListener('beforeunload', (ev: BeforeUnloadEvent) => {
      console.debug('APIStream.beforeunload: completing subject');
      this.subject.complete();
      console.debug('APIStream.beforeunload: closing source');
      this.closeSource();
      console.debug('APIStream.beforeunload: removing app listeners');
      App.removeAllListeners();
    });

    this.ready = new Promise(async (resolve) => {
      await this.platform.ready();
      await this.start();
      resolve();
    });
  }

  /**
   * Start listening on the event stream.
   *
   * @returns an {@link Observable} that can be subscribed to.
   */
  private async start(): Promise<void> {
    if (environment.useReplay) {
      console.info('APIStream.start(): using replay API');

      this.url = new Promise(async (resolve /*, reject */) => {
        resolve(`${environment.replayUrl}?interval=${environment.replayInterval}&from=${environment.replayFrom}&count=${environment.replayCount}`);
      });

    } else {
      console.info('APIStream.start(): using live API');

      this.url = Device.getInfo().then(info => {
        this.deviceInfo = info;
        if (this.deviceInfo.platform !== 'web') {
          return 'https://www.blaseball.com/events/streamData';
        }
        return 'https://cors-proxy.blaseball-reference.com/events/streamData';

      }).catch((err) => {
        console.error('APIStream(): failed to get device info, assuming web', err);
        this.deviceInfo = {
          platform: 'web'
        } as DeviceInfo;
        return 'https://cors-proxy.blaseball-reference.com/events/streamData';
      });

    }
    await this.url;
    this.handleSystemChange();
  }

  /**
   * Subscribe to the ongoing event stream.  Triggers a new event.
   */
  public async subscribe(next?: (value: StreamData|ErrorEvent) => void, error?: (error: any) => void, complete?: () => void) {
    await this.ready;
    console.info('APIStream.subscribe()');
    const subscription = this.subject.subscribe(next, error, complete);
    if (this.streamData) {
      this.subject.next(this.streamData);
    }
    return subscription;
  }

  /**
   * Get the last update returned by the stream.
   */
  public currentStreamData() {
    return this.streamData;
  }

  /**
   * Force a retry.
   *
   * This will close the stream and create a new one, and logarithmically extend the retry time by {@link defaultRetryFallback}.
   */
  public async retry() {
    console.debug('APIStream.retry()');
    return new Promise(async (resolve, reject) => {
      try {
        this.lastRetry = Date.now();

        this.closeSource();

        const newMillis = Math.floor(Math.min(this.maxRetryMillis, this.retryMillis * this.defaultRetryFallback));
        console.debug(`APIStream.retry(): ${this.retryMillis} -> ${newMillis}`);
        this.retryMillis = newMillis;

        this.handleSystemChange();
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  private async handleSystemChange(retrigger?: boolean) {
    console.debug(`APIStream.handleSystemChange(): retrigger=${retrigger}`, this);

    if (retrigger || !this.source) {
      await this.ready;
      console.debug('APIStream.handleSystemChange(): (re)creating connection');
      await this.createSource();
      this.startCheckingLastUpdated();
    }
  }

  private onMessage(data: any) {
    console.debug('APIStream.onMessage()');

    if (!data) {
      console.error('APIStream.onMessage(): missing data?!?');
      return;
    }

    // the replay API only sends 100 messages, restart stream when it ends
    if (environment.useReplay && data === 'end') {
      this.retry();
      return;
    }

    const parsed = JSON.parse(data).value;

    const diff = createPatch(this.lastUpdate, parsed);
    // console.debug(`APIStream.onMessage(): ${diff.length} change(s)`);

    if (diff.length > 0) {
      // successful/new message, reset retry and last updated
      if (this.retryMillis !== this.defaultRetryMillis) {
        console.debug(`APIStream.onMessage(): ${this.retryMillis} -> ${this.defaultRetryMillis}`);
        this.retryMillis = this.defaultRetryMillis;
      }

      this.lastUpdated = Date.now();
      this.lastUpdate = parsed;

      if (!this.streamData) {
        this.streamData = new StreamData({});
      }

      for (const key of Object.keys(parsed)) {
        this.streamData.data[key] = parsed[key];
      }
    }

    // always publish the latest, so things refresh
    if (this.subject) {
      this.subject.next(this.streamData);
    }
  }

  protected async createSource() {
    console.debug('APIStream.createSource()');

    // const es = new EventSourceWeb();
    const es = EventSource;
    this.source = es as EventSourcePlugin;

    return new Promise(async (resolve /*, reject */) => {
      const url = await this.url;

      // clean up existing and create new event source
      await this.closeSource();

      console.debug(`APIStream.createSource(): url=${url}`);
      await es.configure({
        url,
        reconnectTime: 4000,
      });

      this.handles.message = es.addListener('message', (res: MessageResult) => {
        this.onMessage(res.message);
        resolve(true);
      });

      // errors should do a retry
      this.handles.error = es.addListener('error', (res: ErrorResult) => {
        console.error('APIStream.createSource(): An error occurred reading from the event source.  Resetting.', res?.error);
        resolve(true);
        if (this.subject) {
          const ev = new ErrorEvent('error', {
            message: res.error
          });
          this.subject.next(ev);
        } else {
          console.debug('APIStream.createSource(): No observer?');
        }
        this.checkLastUpdated();
      });

      await es.open();
      console.debug('eventSource=', es);
    });
  }

  protected async closeSource() {
    if (!this.source) {
      return;
    }
    console.debug('APIStream.closeSource()');
    for (const key of Object.keys(this.handles)) {
      try {
        this.handles[key].remove();
      } catch (err) {
        console.warn('APIStream.closeSource(): failed to close event handle:', err);
      }
    }
    try {
      await this.source?.close();
      this.source = null;
    } catch (err) {
      console.warn('APIStream.closeSource(): failed to close event source:', err);
    }
  }

  protected startCheckingLastUpdated() {
    if (!this.retryChecker) {
      console.debug('APIStream.startCheckingLastUpdated()');
      setTimeout(() => {
        this.retryChecker = setInterval(() => {
          this.checkLastUpdated();
        }, this.defaultCheckIntervalMillis) as unknown as number;
      }, this.defaultCheckIntervalMillis);
    }
  }

  protected checkLastUpdated() {
    const lastCheck = Math.max(this.lastUpdated, this.lastRetry);

    const now = Date.now();

    if (!this.hourChecker) {
      const msAfterHour = now % ONE_HOUR;
      const nextHour = now - msAfterHour + ONE_HOUR;
      const remaining = nextHour - now;
      console.debug(`APIStream.checkLastUpdated(): now=${now}, remainder=${msAfterHour}, nextHour=${nextHour}`);
      console.debug(`APIStream.checkLastUpdated(): checking in ~${Math.round((remaining) / 1000 / 60)}m`);

      this.hourChecker = setTimeout(() => {
        console.debug('APIStream.checkLastUpdated(): new hour, force a check.');
        this.checkLastUpdated();
      }, remaining + (1 * SECOND)) as unknown as number; // give it an extra second to update
    }

    // check how far through the hour we are
    const lastRetryPercent = Math.round((this.lastRetry % ONE_HOUR) / ONE_HOUR * 100);
    const nowPercent = Math.round((now % ONE_HOUR) / ONE_HOUR * 100);

    if (nowPercent < lastRetryPercent) {
      console.debug(`APIStream.checkLastUpdated(): hour reset (${nowPercent} < ${lastRetryPercent})`);
      // we've hit a new hour, knock retryMillis back down
      this.retryMillis = this.defaultRetryMillis;
      clearTimeout(this.hourChecker);
      this.hourChecker = null;
    }

    const threshold = lastCheck + this.retryMillis;
    if (now > threshold) {
      console.debug(`APIStream.checkLastUpdated(): threshold (retryMillis=~${Math.round(this.retryMillis / SECOND / 1.0)}s) reached: now=${this.formatDate(now)}, lastUpdated=${this.formatDate(this.lastUpdated)}, lastRetry=${this.formatDate(this.lastRetry)}, threshold=${this.formatDate(threshold)}`);
      this.retry();
    } else {
      // console.debug(`APIStream.checkLastUpdated(): ${this.formatDate(now)} < ${this.formatDate(threshold)}`);
    }
  }

  private formatDate(d: Date | number) {
    const date = typeof(d) === 'number' ? new Date(d) : d;
    return date.toISOString();
  }
}
