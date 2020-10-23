import { TestBed } from '@angular/core/testing';

import { Games } from './games';
import { PHASES } from './phases';

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

const season10PreWildcard = require('./data/season-10-pre-wildcard.json');
const season10WildcardDuring = require('./data/season-10-wildcard-during.json');
const season10WildcardAlmostFinished = require('./data/season-10-wildcard-near-end.json');
const season10PostWildcard = require('./data/season-10-wildcard-finished.json');
const season10Playoffs = require('./data/season-10-playoffs-during.json');

describe('Games', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  describe('gamePhases', () => {
    it('gamePhase.PRESEASON', () => {
      const games = new Games(season7Pre);
      expect(games.gamePhase(1600091520000)).toEqual(PHASES.PRESEASON);
      expect(new Games(postSeasonEnd).gamePhase(1601060979349)).toEqual(PHASES.PRESEASON);
      expect(new Games(seasonFinished).gamePhase(1601060979349)).toEqual(PHASES.PRESEASON);
      expect(new Games(seasonVeryFinished).gamePhase(1599400000000)).toEqual(PHASES.PRESEASON);
      expect(new Games(season6Finished).gamePhase(1599948000304)).toEqual(PHASES.PRESEASON);
      expect(new Games(season7Pre).gamePhase(1600091520000)).toEqual(PHASES.PRESEASON);
    });
    it('gamePhase.REGULAR_SEASON', () => {
      expect(new Games(regularSeasonStart).gamePhase(1600091520000)).toEqual(PHASES.REGULAR_SEASON);
      expect(new Games(regularSeasonDuring1).gamePhase(1600091520000)).toEqual(PHASES.REGULAR_SEASON);
      expect(new Games(regularSeasonDuring2).gamePhase(1600091520000)).toEqual(PHASES.REGULAR_SEASON);
    });
    it('gamePhase.OFFSEASON', () => {
      expect(new Games(regularSeasonEnd).gamePhase(1600463030386)).toEqual(PHASES.OFFSEASON);
      expect(new Games(season7RegularEnd).gamePhase(1600463030386)).toEqual(PHASES.OFFSEASON);
      expect(new Games(season8RegularEnd).gamePhase(1601060070698)).toEqual(PHASES.OFFSEASON);
      expect(new Games(season8RegularEnd2).gamePhase(1601060979349)).toEqual(PHASES.OFFSEASON);
      expect(new Games(season10PreWildcard).gamePhase(1602892491626)).toEqual(PHASES.OFFSEASON);
    });
    it('gamePhase.WILDCARD', () => {
      expect(new Games(postSeasonStart).gamePhase(1600463030386)).toEqual(PHASES.WILDCARD);
      expect(new Games(season10WildcardDuring).gamePhase(1602892491626)).toEqual(PHASES.WILDCARD);
      expect(new Games(season10WildcardAlmostFinished).gamePhase(1602892491626)).toEqual(PHASES.WILDCARD);
    });
    it('gamePhase.POST_WILDCARD', () => {
      expect(new Games(season10PostWildcard).gamePhase(1602892491626)).toEqual(PHASES.POST_WILDCARD);
    });
    it('gamePhase.POSTSEASON', () => {
      expect(new Games(postSeasonDuring1).gamePhase(1601060979349)).toEqual(PHASES.POSTSEASON);
      expect(new Games(postSeasonDuring2).gamePhase(1601060979349)).toEqual(PHASES.POSTSEASON);
      expect(new Games(season10Playoffs).gamePhase(1601060979349)).toEqual(PHASES.POSTSEASON);
    });
    it('gamePhase.BOSS_FIGHT', () => {
//      expect(new Games(postSeasonDuring1).gamePhase(1601060979349)).toEqual(PHASES.BOSS_FIGHT);
    });
  });

  xdescribe('isSeason', () => {

    describe('Pre-Season', () => {
      it('should be the preseason', () => {
        const games = new Games(season7Pre);
        const time = 1600091520000;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeFalsy();
        expect(games.isPostseasonComplete(time)).toBeTruthy();
      });
    });

    describe('Regular Season Start', () => {
      it('should be a regular season game', () => {
        const games = new Games(regularSeasonStart);
        const time = 1600091520000;
        expect(games.isRegularSeason(time)).toBeTruthy();
        expect(games.isPostseason(time)).toBeFalsy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });
    });

    describe('Regular Season During', () => {
      const time = 1600091520000;
      it('should be a regular season game on day 73', () => {
        const games = new Games(regularSeasonDuring1);
        expect(games.isRegularSeason(time)).toBeTruthy();
        expect(games.isPostseason(time)).toBeFalsy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });
      it('should be a regular season game on day 90', () => {
        const games = new Games(regularSeasonDuring2);
        expect(games.isRegularSeason(time)).toBeTruthy();
        expect(games.isPostseason(time)).toBeFalsy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });
    });

    describe('Regular Season End', () => {
      it('should be a regular season game', () => {
        const games = new Games(regularSeasonEnd);
        const time = 1600463030386;
        expect(games.isRegularSeason(time)).toBeTruthy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });

      it('should be the end of regular season', () => {
        const games = new Games(season7RegularEnd);
        const time = 1600463030386;
        expect(games.isRegularSeason(time)).toBeTruthy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });

      it('should be the end of regular season 8', () => {
        const games = new Games(season8RegularEnd);
        const time = 1601060070698;
        expect(games.isRegularSeason(time)).toBeTruthy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });

      it('should still be the end of regular season 8', () => {
        const games = new Games(season8RegularEnd2);
        const time = 1601060979349;
        expect(games.isRegularSeason(time)).toBeTruthy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });
    });

    describe('Postseason Start', () => {
      it('should be a postseason game', () => {
        const games = new Games(postSeasonStart);
        const time = 1601060979349;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });
    });

    describe('Postseason During', () => {
      it('should be a postseason game on day 104', () => {
        const games = new Games(postSeasonDuring1);
        const time = 1601060979349;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });
      it('should be a postseason game on day 109', () => {
        const games = new Games(postSeasonDuring2);
        const time = 1601060979349;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeFalsy();
      });
    });

    describe('Postseason End', () => {
      it('should be a postseason game', () => {
        const games = new Games(postSeasonEnd);
        const time = 1601060979349;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeTruthy();
      });
    });

    describe('Postseason Finished', () => {
      it('should be post-postseason', () => {
        const games = new Games(seasonFinished);
        const time = 1601060979349;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeTruthy();
      });

      it('should be post-post-season', () => {
        const games = new Games(seasonVeryFinished);
        const time = 1599400000000;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeFalsy();
        expect(games.isPostseasonComplete(time)).toBeTruthy();
      });

      it('should be a finished season', () => {
        const games = new Games(season6Finished);
        const time = 1599948000304;
        expect(games.isRegularSeason(time)).toBeFalsy();
        expect(games.isPostseason(time)).toBeTruthy();
        expect(games.isPostseasonComplete(time)).toBeTruthy();
      });
    });

  });

});
