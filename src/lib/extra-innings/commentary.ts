import * as mlustard from 'mlustard';

import { StreamData } from '../model/streamData';

export default class Commentary {

  /**
   * todo: comment
   */
  static processGameEvents(data: StreamData): StreamData {
    console.debug('Commentary.processGameEvents() with data:', data);

    data.games?.schedule?.forEach((game) => {

      const analysis = mlustard.analyzeGameEvent(game);
      console.debug('Commentary.processGameEvents analyzed meta:', analysis);

      //debugger
      //
      game.data.mlustard = analysis;

      //console.debug('mlustard here')

      //if (!data.blMetadata?.mlustard) {
        //data.blMetadata.mlustard = analysis;
      //} 
      //if (!game.mlustard) {
        //game.mlustard = analysis;
      //}
      //!game.mlustard && game.mlustard = (analysis);
      //if (!game.mlustard()) {
        //game.mlustard(analysis);
      //}

    });

    //debugger

    return data;
  }
}
