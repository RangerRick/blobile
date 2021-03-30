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
   * a list of extra inning processor functions
   */
  private extras: Array<(data: StreamData) => StreamData>;

  constructor() {
    console.debug('ExtraInnings loading.');

    this.extras = [
      Commentary.process,
      Commentary.anotherOne,
    ];
  }

  // todo: what type does this return? i don't get it
  public add(subject: Subject<StreamData|ErrorEvent>): any {
    console.debug('ExtraInnings.add()');

    let ret;

    this.extras.forEach((func, i) => {
      if (i === 0) {
        ret = subject.pipe(map(func));
      } else {
        ret = ret.pipe(map(func));
      }
    });

    return ret;
  }
}
