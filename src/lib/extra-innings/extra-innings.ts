import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import { StreamData } from '../model/streamData';

import Commentary from './commentary';

export default class ExtraInnings {

  /**
   * a list of functions that enrich the data stream
   */
  private static processingFuncs = [
      Commentary.processGameEvents,
  ];

  // todo: why does this return an AnonymousSubject? is that ok?
  public static add(subject: Subject<StreamData|ErrorEvent>): any {
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

  public static setMetadata(target: any, field: any, value: any) {
    if (target.data._blMetadata === undefined) {
      target.data._blMetadata = {};
    }

    target.data._blMetadata[field] = value;
  }
}
