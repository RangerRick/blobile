import { OnInit, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { Plugins, DeviceInfo, PluginListenerHandle } from '@capacitor/core';
const { Device, EventSource } = Plugins;

import 'capacitor-eventsource';
import { MessageResult, ErrorResult, EventSourcePlugin /*, EventSourceWeb */ } from 'capacitor-eventsource';

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
  public isStarted = false;

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

  private observable: Observable<MessageEvent|Event> | null;
  private observer: Observer<MessageEvent|Event> | null;
  private deviceInfo: DeviceInfo | null;

  private handles = {} as { [key: string]: PluginListenerHandle };

  private url: Promise<string>;

  /**
   * Create an API object that can subscribe to the Blaseball event stream.
   */
  constructor() {
    this.defaultRetryMillis = 5 * SECOND;
    this.defaultCheckIntervalMillis = 2 * SECOND;
    this.defaultRetryFallback = 1.2;
    this.retryMillis = this.defaultRetryMillis;
    this.isStarted = false;

    console.debug(`APIStream(): default retry:          ${this.defaultRetryMillis}ms`);
    console.debug(`APIStream(): default check interval: ${this.defaultCheckIntervalMillis}ms`);
    console.debug(`APIStream(): default retry fallback: ${this.defaultRetryFallback}x`);

    this.observable = new Observable((observer: Observer<MessageEvent|Event>) => {
      this.observer = observer;
    });
  }

  async init() {
    if (this.url) {
      console.debug('APIStream.init(): already initialized.');
      return this.url;
    }

    console.debug('APIStream.ngOnInit(): initializing.');
    this.isStarted = false;

    return this.url = Device.getInfo().then(info => {
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

  async handleSystemChange(retrigger?: boolean) {
    console.debug(`APIStream.handleSystemChange(): retrigger=${retrigger}`);

    if (this.isStarted) {
      if (retrigger || !this.source) {
        console.debug('APIStream.handleSystemChange(): (re)creating connection');
        await this.createSource();
        this.startCheckingLastUpdated();
      }
    } else {
      console.debug('APIStream.handleSystemChange(): shutting down');
      // disable checker
      if (this.retryChecker) {
        clearInterval(this.retryChecker);
        this.retryChecker = null;
      }

      // close the event source
      await this.closeSource();
      this.source = null;
    }
    return this.source;
  }

  /**
   * Start listening on the event stream.
   *
   * @returns an {@link Observable} that can be subscribed to.
   */
  start(): Observable<MessageEvent|Event> {
    console.info('APIStream.start()');

    this.init().finally(() => {
      this.isStarted = true;
      this.handleSystemChange();
    });

    return this.observable;
  }

  /**
   * Subscribe to the ongoing event stream.
   */
  subscribe(next?: (value: MessageEvent|Event) => void, error?: (error: any) => void, complete?: () => void) {
    return this.observable.subscribe(next, error, complete);
  }

  /**
   * Stop listening on the event stream.
   *
   * Completes the {@link Observable} and closes all resources.
   */
  stop() {
    console.info('APIStream.stop()');

    this.isStarted = false;
    this.handleSystemChange();

    // clean up observable
    this.observer.complete();
    this.observer = null;
    this.observable = null;

    // reset retry state
    this.retryMillis = this.defaultRetryMillis;
    this.lastUpdated = 0;
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

        const ret = await this.createSource();
        this.handleSystemChange();
        resolve(ret);
      } catch (err) {
        reject(err);
      }
    });
  }

  private onMessage(data: any) {
    console.debug('APIStream.onMessage()');

    const ev = new MessageEvent('message', {
      data
    });

    if (this.lastUpdate !== ev.data) {
      // console.debug('APIStream.onMessage(): change:', this.lastUpdate, ev?.data);

      // successful/new message, reset retry and last updated
      if (this.retryMillis !== this.defaultRetryMillis) {
        console.debug(`APIStream.onMessage(): ${this.retryMillis} -> ${this.defaultRetryMillis}`);
        this.retryMillis = this.defaultRetryMillis;
      }

      this.lastUpdated = Date.now();

      this.lastUpdate = ev.data;
      // tell the observable about the update
      if (this.observer) {
        this.observer.next(ev);
      }
    }
  }

  protected async createSource() {
    console.debug('APIStream.createSource()');

    return new Promise(async (resolve, reject) => {
      // clean up existing and create new event source
      await this.closeSource();
      // const es = new EventSourceWeb();
      const es = EventSource;
      this.source = es as EventSourcePlugin;

      const url = await this.url;
      console.debug(`APIStream.createSource(): url=${url}`);
      await es.configure({ url });
      this.handles.message = es.addListener('message', (res: MessageResult) => {
        this.onMessage(res.message);
        resolve(true);
      });

      // errors should do a retry
      this.handles.error = es.addListener('error', (res: ErrorResult) => {
        console.error('APIStream.createSource(): An error occurred reading from the event source.  Resetting.', res.error);
        reject(true);
        if (this.observer) {
          const ev = new ErrorEvent('error', {
            message: res.error
          });
          this.observer.next(ev);
        } else {
          console.debug('APIStream.createSource(): No observer?');
        }
        this.checkLastUpdated();
      });

      await es.open();
    });
  }

  protected async closeSource() {
    try {
      if (this.source) {
        await this.source.close();
        this.source = null;

        for (const key of Object.keys(this.handles)) {
          this.handles[key].remove();
        }
        this.handles = {};
      }
    } catch (err) {
      console.warn('APIStream.closeSource(): failed to close event source:', err);
    }
  }

  protected startCheckingLastUpdated() {
    this.stopCheckingLastUpdated();
    setTimeout(() => {
      this.retryChecker = setInterval(() => {
        this.checkLastUpdated();
      }, this.defaultCheckIntervalMillis) as unknown as number;
    }, this.defaultCheckIntervalMillis);
  }

  protected stopCheckingLastUpdated() {
    console.debug('APIStream.startCheckingLastUpdated()');
    if (this.retryChecker) {
      clearInterval(this.retryChecker);
    }
  }

  protected checkLastUpdated() {
    const lastCheck = Math.max(this.lastUpdated, this.lastRetry);

    const now = Date.now();

    if (!this.hourChecker) {
      const remainder = now % ONE_HOUR;
      const nextHour = now - remainder + ONE_HOUR;

      this.hourChecker = setTimeout(() => {
        console.debug('APIStream.checkLastUpdate(): new hour, force a check.');
        this.checkLastUpdated();
      }, nextHour) as unknown as number;
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
      console.debug(`APIStream.checkLastUpdated(): threshold reached: now=${this.formatDate(now)}, lastUpdated=${this.formatDate(this.lastUpdated)}, lastRetry=${this.formatDate(this.lastRetry)}, threshold=${this.formatDate(threshold)}, retryMillis=${(this.retryMillis / SECOND / 1.0).toPrecision(2)}s`);
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
