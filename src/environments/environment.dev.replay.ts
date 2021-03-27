export const environment = {
  production: false,
  useReplay: true,
  replayUrl: 'https://api.sibr.dev/replay/v1/replay',
  replayFrom: '2020-08-30T01:00:08.17Z',
  // the replay API uses a default interval of 3000ms between events
  // which currently makes the stream restart too frequently
  replayInterval: 1500,
  // how many events should the replay stream?
  replayCount: 100
};

/*
 * replayFrom timestamps reference, with Reblase links
 * ---------------------------------------------------
 * s4 d112
 * 2020-08-30T01:00:08.17Z
 * https://reblase.sibr.dev/game/628a2ddb-f608-411b-8d2e-2768cd36d58b
 *
 * s12 d116
 * 2021-03-06T23:00:00.907735Z
 * https://reblase.sibr.dev/game/0f19d78d-c27d-4146-863d-b55e6dae1679
 */
