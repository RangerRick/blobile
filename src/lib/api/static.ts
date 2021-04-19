import { Plugins } from '@capacitor/core';

import '@capacitor-community/http';
import { HttpResponse } from '@capacitor-community/http';

const isString = (val: any) => {
  return typeof val === 'string' || val instanceof String;
}

export class Static {
  private static cache = {} as { [url: string]: Promise<any> };

  public static async get(asset: string): Promise<any> {
    if (!Static.cache[asset]) {
      const { Http } = Plugins;
      const url = `https://raw.githubusercontent.com/RangerRick/blobile/main/src/assets/static/${asset}.json`;
      Static.cache[asset] = Http.request({
        method: 'GET',
        url,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }).then((ret: HttpResponse) => {
        if (ret.status >= 200 && ret.status < 300) {
          if (isString(ret.data)) {
            return JSON.parse(ret.data);
          }
          return ret.data;
        }
        throw new Error(`HTTP response ${ret.status}`);
      }).catch((err: any) => {
        console.warn(`Static.get(${asset}): got error: ` + JSON.stringify(err));
        return import(`../../assets/static/${asset}.json`);
      });
    }

    return await Static.cache[asset];
  }
}
