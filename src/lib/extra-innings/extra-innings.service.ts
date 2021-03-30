import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import { StreamData } from '../model/streamData';

import Commentary from './commentary';

@Injectable({
  providedIn: 'root'
})
export class ExtraInnings {

  /**
   * a list of functions that enrich the data stream
   */
  private processingFuncs: Array<(data: StreamData) => StreamData>;

  constructor() {
    console.debug('ExtraInnings loading.');

    this.processingFuncs = [
      Commentary.processOne,
      Commentary.processTwo
    ];
  }

  // todo: why does this return an AnonymousSubject? is that ok?
  public add(subject: Subject<StreamData|ErrorEvent>): any {
    console.debug('ExtraInnings.add()');

    let ret;

    this.processingFuncs.forEach((func, i) => {
      if (i === 0) {
        ret = subject.pipe(map(func));
      } else {
        ret = ret.pipe(map(func));
      }
    });

    return ret;
  }
}
