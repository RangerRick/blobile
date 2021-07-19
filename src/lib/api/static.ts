import '@capacitor-community/http';
import { Http, HttpResponse } from '@capacitor-community/http';

const isString = (val: any) => {
  return typeof val === 'string' || val instanceof String;
}

export class Static {
  private static cache = {} as { [url: string]: Promise<any> };

  public static async get(asset: string): Promise<any> {
    if (!Static.cache[asset]) {
      const url = `https://raw.githubusercontent.com/RangerRick/blobile/main/src/assets/static/${asset}.json`;
      Static.cache[asset] = Http.request({
        method: 'GET',
        url,
      }).then((ret: HttpResponse) => {
        if (ret.status >= 200 && ret.status < 300) {
          let data = ret.data;
          if (isString(ret.data)) {
            data = JSON.parse(ret.data);
          }
          console.debug(`Static.get(${asset}): got result: ` + JSON.stringify(data));
          return data;
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
