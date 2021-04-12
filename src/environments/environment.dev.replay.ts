export const environment = {
  production: false,
  useReplay: true,
  replayUrl: 'https://api.sibr.dev/replay/v1/replay',
  replayFrom: '2021-04-12T16:05:37.602003Z',
  // the replay API uses a default interval of 3000ms between events
  // which currently makes the stream restart too frequently
  replayInterval: 2500,
  // how many events should the replay stream?
  replayCount: 10
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
 *
 * s16 d2 (incineration test)
 * 2021-04-12T16:21:51.610813Z
 * https://reblase.sibr.dev/game/21629b59-211d-4b98-a543-b1451bf069ea
 *
 * s16 d2 (home run test)
 * 2021-04-12T16:05:37.602003Z
 * https://reblase.sibr.dev/game/c0bb7fa0-b68c-4e6a-be27-38e06c7a216e
 */
