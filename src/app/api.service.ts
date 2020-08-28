import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  public defaultRetryMillis = 10 * 1000;
  public defaultCheckIntervalMillis = this.defaultRetryMillis;
  public defaultRetryFallback = 1.2;

  private lastUpdated = 0;
  private source: EventSource;
  private retryChecker: number;
  private retryMillis = this.defaultRetryMillis;
  private observable: Observable<MessageEvent>;
  private observer: Observer<MessageEvent>;

  constructor(public url?: string) {
    if (!url) {
      // this.url = 'https://cors-anywhere.herokuapp.com/https://www.blaseball.com/events/streamData';
      // this.url = 'https://www.blaseball.com/events/streamData';
      this.url = 'https://cors-proxy.blaseball-reference.com/events/streamData';
    }
    this.observable = Observable.create((observer: Observer<MessageEvent>) => {
      this.observer = observer;
    });
  }

  start(): Observable<MessageEvent> {
    console.info('APIService.start()');

    this.lastUpdated = new Date().getTime();
    this.createSource();
    this.startCheckingLastUpdated();
    return this.observable;
  }

  stop() {
    console.info('APIService.stop()');

    this.closeSource();
    if (this.retryChecker) {
      clearInterval(this.retryChecker);
    }

    // reset everything
    this.retryMillis = this.defaultRetryMillis;
    this.source = undefined;
  }

  public retry() {
    console.debug('APIService.retry()');
    this.closeSource();
    this.createSource();
    this.retryMillis = this.retryMillis * this.defaultRetryFallback;
  }

  protected createSource() {
    console.debug('APIService.createSource()');

    // clean up existing and create new event source
    this.closeSource();
    this.source = new EventSource(this.url);

    this.source.addEventListener('message', (evt: MessageEvent) => {
      // successful message, reset retry and last updated
      this.retryMillis = this.defaultRetryMillis;
      this.lastUpdated = new Date().getTime();

      if (this.observer) {
        this.observer.next(evt);
      }
    });

    // errors should do a retry
    this.source.addEventListener('error', (ev: Event) => {
      console.error('APIService.createSource(): An error occurred reading from the event source.  Resetting.', ev);
      this.retry();
    });
  }

  protected closeSource() {
    try {
      if (this.source && this.source.readyState !== EventSource.CLOSED) {
        console.debug('APIService.closeSource()');
        this.source.close();
      }
    } catch (err) {
      console.warn('Failed to close event source:', err);
    };
  }

  protected startCheckingLastUpdated() {
    console.debug('APIService.startCheckingLastUpdated()');
    if (this.retryChecker) {
      clearInterval(this.retryChecker);
    }
    this.retryChecker = setInterval(this.checkLastUpdated, this.defaultCheckIntervalMillis) as unknown as number;
  }

  protected checkLastUpdated() {
    const now = new Date().getTime();
    console.debug('APIService.checkLastUpdated():', now);

    if (now > (this.lastUpdated + this.retryMillis)) {
      console.debug(`APIService.checkLastUpdated(): now (${now}) > ${this.lastUpdated + this.retryMillis} -- last updated (${this.lastUpdated}) + retry (${this.retryMillis})`);
      this.retry();
    }
  }
}
