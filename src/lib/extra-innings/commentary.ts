import { StreamData } from '../model/streamData';

export default class Commentary {
  /**
   * Adds the text ' an extra inning!' to every game's lastUpdate field
   */
  static processOne(data: StreamData): StreamData {
    console.debug('Commentary.processOne() with data:', data);

    data.data.games.schedule.forEach((game) => {
      game.lastUpdate += ' an extra inning!';
    });
    return data;
  }

  /**
   * Adds the text ' too many extra innings!' to every game's lastUpdate field
   */
  static processTwo(data: StreamData): StreamData {
    console.debug('Commentary.processTwo() with data:', data);

    data.data.games.schedule.forEach((game) => {
      game.lastUpdate += ' an extra inning!';
    });
    return data;
  }
}
