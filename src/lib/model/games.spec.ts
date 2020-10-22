import { TestBed } from '@angular/core/testing';

import { Games } from './games';

const regularSeasonStart   = require('./data/season-5-regular-begin.json');
const regularSeasonDuring1 = require('./data/season-5-regular-during-1.json');
const regularSeasonDuring2 = require('./data/season-5-regular-during-2.json');
const regularSeasonEnd     = require('./data/season-5-regular-end.json');
const postSeasonStart      = require('./data/season-5-post-begin.json');
const postSeasonDuring1    = require('./data/season-5-post-during-1.json');
const postSeasonDuring2    = require('./data/season-5-post-during-2.json');
const postSeasonEnd        = require('./data/season-5-post-end.json');
const seasonFinished       = require('./data/season-5-finished.json');
const seasonVeryFinished   = require('./data/season-5-very-end.json');
const season6Finished      = require('./data/season-6-finished.json');
const season7Pre           = require('./data/season-7-pre.json');
const season7RegularEnd    = require('./data/season-7-regular-end.json');
const season8RegularEnd    = require('./data/season-8-regular-end.json');
const season8RegularEnd2    = require('./data/season-8-regular-end-post-start.json');

const season10PostWildcard = require('./data/season-10-wildcard-finished.json');
// 1602892491626

describe('Games', () => {
  let games: Games;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  describe('Pre-Season', () => {
    it('should be the preseason', () => {
      games = new Games(season7Pre);
      expect(games.isRegularSeason(1600091520000)).toBeFalsy();
      expect(games.isPostseason(1600091520000)).toBeFalsy();
      expect(games.isPostseasonComplete(1600091520000)).toBeTruthy();
    });
  });

  describe('Regular Season Start', () => {
    it('should be a regular season game', () => {
      games = new Games(regularSeasonStart);
      expect(games.isRegularSeason()).toBeTruthy();
      expect(games.isPostseason()).toBeFalsy();
      expect(games.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Regular Season During', () => {
    it('should be a regular season game on day 73', () => {
      games = new Games(regularSeasonDuring1);
      expect(games.isRegularSeason()).toBeTruthy();
      expect(games.isPostseason()).toBeFalsy();
      expect(games.isPostseasonComplete()).toBeFalsy();
    });
    it('should be a regular season game on day 90', () => {
      games = new Games(regularSeasonDuring2);
      expect(games.isRegularSeason()).toBeTruthy();
      expect(games.isPostseason()).toBeFalsy();
      expect(games.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Regular Season End', () => {
    it('should be a regular season game', () => {
      games = new Games(regularSeasonEnd);
      expect(games.isRegularSeason()).toBeTruthy();
      expect(games.isPostseason()).toBeTruthy();
      expect(games.isPostseasonComplete()).toBeFalsy();
    });

    it('should be the end of regular season', () => {
      games = new Games(season7RegularEnd);
      expect(games.isRegularSeason(1600463030386)).toBeTruthy();
      expect(games.isPostseason(1600463030386)).toBeTruthy();
      expect(games.isPostseasonComplete(1600463030386)).toBeFalsy();
    });

    it('should be the end of regular season 8', () => {
      games = new Games(season8RegularEnd);
      expect(games.isRegularSeason(1601060070698)).toBeTruthy();
      expect(games.isPostseason(1601060070698)).toBeTruthy();
      expect(games.isPostseasonComplete(1601060070698)).toBeFalsy();
    });

    it('should still be the end of regular season 8', () => {
      games = new Games(season8RegularEnd2);
      expect(games.isRegularSeason(1601060979349)).toBeTruthy();
      expect(games.isPostseason(1601060979349)).toBeTruthy();
      expect(games.isPostseasonComplete(1601060979349)).toBeFalsy();
    });
  });

  describe('Postseason Start', () => {
    it('should be a postseason game', () => {
      games = new Games(postSeasonStart);
      expect(games.isRegularSeason()).toBeFalsy();
      expect(games.isPostseason()).toBeTruthy();
      expect(games.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Postseason During', () => {
    it('should be a postseason game on day 104', () => {
      games = new Games(postSeasonDuring1);
      expect(games.isRegularSeason()).toBeFalsy();
      expect(games.isPostseason()).toBeTruthy();
      expect(games.isPostseasonComplete()).toBeFalsy();
    });
    it('should be a postseason game on day 109', () => {
      games = new Games(postSeasonDuring2);
      expect(games.isRegularSeason()).toBeFalsy();
      expect(games.isPostseason()).toBeTruthy();
      expect(games.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Postseason End', () => {
    beforeEach(() => {
      games = new Games(postSeasonEnd);
    });

    it('should be a postseason game', () => {
      expect(games.isRegularSeason()).toBeFalsy();
      expect(games.isPostseason()).toBeTruthy();
      expect(games.isPostseasonComplete()).toBeTruthy();
    });
  });

  describe('Postseason Finished', () => {
    it('should be post-postseason', () => {
      games = new Games(seasonFinished);
      expect(games.isRegularSeason()).toBeFalsy();
      expect(games.isPostseason()).toBeTruthy();
      expect(games.isPostseasonComplete()).toBeTruthy();
    });

    it('should be post-post-season', () => {
      games = new Games(seasonVeryFinished);
      expect(games.isRegularSeason(1599400000000)).toBeFalsy();
      expect(games.isPostseason(1599400000000)).toBeFalsy();
      expect(games.isPostseasonComplete(1599400000000)).toBeTruthy();
    });

    it('should be a finished season', () => {
      games = new Games(season6Finished);
      expect(games.isRegularSeason(1599948000304)).toBeFalsy();
      expect(games.isPostseason(1599948000304)).toBeTruthy();
      expect(games.isPostseasonComplete(1599948000304)).toBeTruthy();
    });
  });

});
