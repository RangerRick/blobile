import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import { StreamData } from '../../model/streamData';

import Commentary from './commentary';

export default class StreamEnhancer {

  private static enhancerFuncs = [
      Commentary.processGameEvents,
  ];

  // todo: why does this return an AnonymousSubject? is that ok?
  public static addEnhancements(subject: Subject<StreamData|ErrorEvent>): any {
    console.debug('ExtraInnings.addEnhancements()');

    let ret;

    this.enhancerFuncs.forEach((func, i) => {
      if (i === 0) {
        ret = subject.pipe(map(func));
      } else {
        ret = ret.pipe(map(func));
      }
    });

    return ret;
  }
}
