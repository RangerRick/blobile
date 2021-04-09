import * as mlustard from 'mlustard';

import { StreamData } from '../model/streamData';
import ExtraInnings from './extra-innings';

export default class Commentary {

  /**
   * todo: comment
   */
  static processGameEvents(data: StreamData): StreamData {
    console.debug('Commentary.processGameEvents() with data:', data);

    data.games?.schedule?.forEach((game) => {

      const analysis = mlustard.analyzeGameEvent(game);
      console.debug('Commentary.processGameEvents analyzed meta:', analysis);

      ExtraInnings.setMetadata(game, 'mlustard', analysis);
      //game.data.mlustard = analysis;
    });

    return data;
  }
}
