// import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AppState, Plugins } from '@capacitor/core';
const { App, Device, Network } = Plugins;

/*
@Injectable({
  providedIn: 'root'
})
*/
export class APIService {
  /**
   * the URL to connect to when creating an event source
   */
  public url: string;

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
  public isStarted: boolean;

  /**
   * whether or not we are in the foreground
   */
  public isActive: boolean;
  /**
   * whether or not we are connected to a network
   */
  public isConnected = true;

  // the event source to pull from
  private source: EventSource | null;

  // when we last got a successful message (epoch)
  private lastUpdated = 0;
  // the `setInterval` handle for the active background retry checker
  private retryChecker: number | null;
  // current retry interval; on a successful message this resets to `defaultRetryMillis`
  private retryMillis: number;
  // max out at 10 minutes for a retry interval
  private maxRetryMillis = 10 * 60 * 1000; // 10 minutes

  private observable: Observable<MessageEvent> | null;
  private observer: Observer<MessageEvent> | null;

  /**
   * Create an API object that can subscribe to an event stream.
   *
   * @param url the URL with an EventStream to stream from (defaults to the SIBR CORS proxy)
   */
  constructor(url?: string) {
    this.init(url);
  }

  async init(url?: string) {
    console.debug('APIService.init(): initializing.');
    this.isStarted = false;

    this.observable = Observable.create((observer: Observer<MessageEvent>) => {
      this.observer = observer;
    });

    if (url) {
      this.url = url;
    } else {
      // this.url = 'https://cors-anywhere.herokuapp.com/https://www.blaseball.com/events/streamData';
      // this.url = 'https://www.blaseball.com/events/streamData';
      this.url = 'https://cors-proxy.blaseball-reference.com/events/streamData';
    }

    try {
      this.isActive = (await App.getState()).isActive;
    } catch (err) {
      console.error('APIService.init(): failed to get app state, assuming active.', err);
      this.isActive = true;
    }
    try {
      this.isConnected = (await Network.getStatus()).connected;
    } catch (err) {
      console.error('APIService.init(): failed to get connection state, assuming connected.', err);
      this.isConnected = true;
    }

    App.addListener('appStateChange', async (state: AppState) => {
      try {
        const info = await Device.getInfo();
        console.debug(`APIService.init() isActive: ${this.isActive} -> ${state.isActive}`);
        if (info.platform === 'web') {
          console.debug('APIService.init() isActive: platform is web, assuming active.');
          this.isActive = true;
        } else {
          this.isActive = state.isActive;
        }
        this.handleSystemChange();
      } catch (err) {
        console.debug('APIService.init() isActive: Device.getInfo() failed, assuming web', err);
        this.isActive = true;
        this.handleSystemChange();
      };
    });

    Network.addListener('networkStatusChange', status => {
      console.debug(`APIService.init() isConnected: ${this.isConnected} -> ${status.connected}`);
      this.isConnected = status.connected;
      this.handleSystemChange();
    });

    this.defaultRetryMillis = 60 * 1000; // 60s
    this.defaultCheckIntervalMillis = this.defaultRetryMillis;
    this.defaultRetryFallback = 1.2;
    this.retryMillis = this.defaultRetryMillis;
  }

  handleSystemChange() {
    console.debug(`APIService.handleSystemChange(): isStarted=${this.isStarted}, isActive=${this.isActive}, isConnected=${this.isConnected}`);
    if (this.isStarted && this.isActive && this.isConnected) {
      if (!this.source) {
        console.debug('APIService.handleSystemChange(): starting up');
        this.lastUpdated = Date.now();
        this.createSource();
        setTimeout(() => {
          this.startCheckingLastUpdated();
        }, 1000);
      }
    } else {
      console.debug('APIService.handleSystemChange(): shutting down');
      // disable checker
      if (this.retryChecker) {
        clearInterval(this.retryChecker);
        this.retryChecker = null;
      }

      // close the event source
      this.closeSource();
      this.source = null;
    }
  }
  
  /**
   * Start listening on the event stream.
   *
   * @returns an {@link Observable} that can be subscribed to.
   */
  start(): Observable<MessageEvent> {
    console.info('APIService.start()');

    this.isStarted = true;
    this.handleSystemChange();
    return this.observable;
  }

  /**
   * Stop listening on the event stream.
   *
   * Completes the {@link Observable} and closes all resources.
   */
  stop() {
    console.info('APIService.stop()');

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
  public retry() {
    console.debug('APIService.retry()');
    this.closeSource();

    const newMillis = Math.min(this.maxRetryMillis, this.retryMillis * this.defaultRetryFallback);
    console.debug(`APIService.retry(): ${this.retryMillis} -> ${newMillis}`);
    this.retryMillis = newMillis;

    this.createSource();
  }

  private onMessage(ev: MessageEvent) {
    console.debug('APIService.onMessage()');
    // successful message, reset retry and last updated
    if (this.retryMillis !== this.defaultRetryMillis) {
      console.debug(`APIService.onMessage(): ${this.retryMillis} -> ${this.defaultRetryMillis}`);
      this.retryMillis = this.defaultRetryMillis;
    }
    this.lastUpdated = Date.now();

    // tell the observable about the update
    if (this.observer) {
      this.observer.next(ev);
    }
  }

  protected createSource() {
    console.debug('APIService.createSource()');

    // clean up existing and create new event source
    this.closeSource();
    this.source = new EventSource(this.url);
    this.source.addEventListener('message', (ev: MessageEvent) => {
      this.onMessage(ev);
    });

    // errors should do a retry
    this.source.addEventListener('error', (ev: Event) => {
      console.error('APIService.createSource(): An error occurred reading from the event source.  Resetting.', ev);
      if (this.observer) {
        this.observer.error(ev);
      } else {
        console.debug('APIService.createSource(): No observer?');
      }
    });
  }

  protected closeSource() {
    try {
      if (this.source && this.source.readyState !== EventSource.CLOSED) {
        console.debug('APIService.closeSource()');
        this.source.close();
      }
    } catch (err) {
      console.warn('APIService.closeSource(): failed to close event source:', err);
    };
  }

  protected startCheckingLastUpdated() {
    console.debug('APIService.startCheckingLastUpdated()');
    if (this.retryChecker) {
      clearInterval(this.retryChecker);
    }
    this.retryChecker = setInterval(() => {
      this.checkLastUpdated();
    }, this.defaultCheckIntervalMillis) as unknown as number;
  }

  protected checkLastUpdated() {
    const now = Date.now();
    const threshold = this.lastUpdated + this.retryMillis;
    console.log(`APIService.checkLastUpdated(): now=${this.formatDate(now)}, lastUpdated=${this.formatDate(this.lastUpdated)}, threshold=${this.formatDate(threshold)}, retryMillis=${(this.retryMillis / 1000.0).toPrecision(2)}s`);
    if (now > threshold) {
      this.retry();
    } else {
      console.debug(`APIService.checkLastUpdated(): ${this.formatDate(now)} < ${this.formatDate(threshold)}`);
    }
  }

  private formatDate(d: Date | number) {
    const date = typeof(d) === 'number' ? new Date(d) : d;
    return date.toISOString();
  }
}
