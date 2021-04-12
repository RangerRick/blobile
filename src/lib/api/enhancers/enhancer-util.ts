import { Injectable } from '@angular/core';

export default class EnhancerUtil {
  public static setMetadata(target: any, field: any, value: any) {
    if (target.data._blMetadata === undefined) {
      target.data._blMetadata = {};
    }

    target.data._blMetadata[field] = value;
  }
}
