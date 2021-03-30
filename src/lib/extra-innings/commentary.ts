import { StreamData } from '../model/streamData';

export default class Commentary {
  static process(data: StreamData): StreamData {
    console.debug('Commentary.process() with data:', data);

    data.data.games.schedule[0].lastUpdate += ' an extra inning!';
    return data;
  }

  static anotherOne(data: StreamData): StreamData {
    console.debug('Commentary.process() with data:', data);

    data.data.games.schedule[0].lastUpdate += ' too many extra innings!';
    return data;
  }
}
