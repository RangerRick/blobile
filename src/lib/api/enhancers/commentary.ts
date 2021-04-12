import * as mlustard from 'mlustard';

import { StreamData } from '../../model/streamData';

import EnhancerUtil from './enhancer-util';

export default class Commentary {

  /**
   * todo: comment
   */
  static processGameEvents(data: StreamData): StreamData {
    console.debug('Commentary.processGameEvents() with data:', data);

    data.games?.schedule?.forEach((game) => {

      const analysis = mlustard.analyzeGameEvent(game);
      console.debug('Commentary.processGameEvents analyzed meta:', analysis);

      EnhancerUtil.setMetadata(game, 'mlustard', analysis);
    });

    return data;
  }
}
