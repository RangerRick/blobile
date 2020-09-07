import { TestBed } from '@angular/core/testing';

import { Sim } from './sim';

const regularSeasonStart   = require('./data/season-5-regular-begin.json').sim;
const regularSeasonDuring1 = require('./data/season-5-regular-during-1.json').sim;
const regularSeasonDuring2 = require('./data/season-5-regular-during-2.json').sim;
const regularSeasonEnd     = require('./data/season-5-regular-end.json').sim;
const postSeasonStart      = require('./data/season-5-post-begin.json').sim;
const postSeasonDuring1    = require('./data/season-5-post-during-1.json').sim;
const postSeasonDuring2    = require('./data/season-5-post-during-2.json').sim;
const postSeasonEnd        = require('./data/season-5-post-end.json').sim;
const seasonFinished       = require('./data/season-5-finished.json').sim;
const seasonVeryFinished   = require('./data/season-5-very-end.json').sim;

describe('Sim', () => {
  let sim: Sim;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  describe('Regular Season Start', () => {
    it('should be a regular season game', () => {
      sim = new Sim(regularSeasonStart);
      expect(sim.isRegularSeason()).toBeTruthy();
      expect(sim.isPostseason()).toBeFalsy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Regular Season During', () => {
    it('should be a regular season game on day 73', () => {
      sim = new Sim(regularSeasonDuring1);
      expect(sim.isRegularSeason()).toBeTruthy();
      expect(sim.isPostseason()).toBeFalsy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
    it('should be a regular season game on day 90', () => {
      sim = new Sim(regularSeasonDuring2);
      expect(sim.isRegularSeason()).toBeTruthy();
      expect(sim.isPostseason()).toBeFalsy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Regular Season End', () => {
    it('should be a regular season game', () => {
      sim = new Sim(regularSeasonEnd);
      expect(sim.isRegularSeason()).toBeTruthy();
      expect(sim.isPostseason()).toBeFalsy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Postseason Start', () => {
    it('should be a postseason game', () => {
      sim = new Sim(postSeasonStart);
      expect(sim.isRegularSeason()).toBeFalsy();
      expect(sim.isPostseason()).toBeTruthy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Postseason During', () => {
    it('should be a postseason game on day 104', () => {
      sim = new Sim(postSeasonDuring1);
      expect(sim.isRegularSeason()).toBeFalsy();
      expect(sim.isPostseason()).toBeTruthy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
    it('should be a postseason game on day 109', () => {
      sim = new Sim(postSeasonDuring2);
      expect(sim.isRegularSeason()).toBeFalsy();
      expect(sim.isPostseason()).toBeTruthy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Postseason End', () => {
    beforeEach(() => {
      sim = new Sim(postSeasonEnd);
    });

    it('should be a postseason game', () => {
      expect(sim.isRegularSeason()).toBeFalsy();
      expect(sim.isPostseason()).toBeTruthy();
      expect(sim.isPostseasonComplete()).toBeFalsy();
    });
  });

  describe('Postseason Finished', () => {
    it('should be a postseason game', () => {
      sim = new Sim(seasonFinished);
      expect(sim.isRegularSeason()).toBeFalsy();
      expect(sim.isPostseason()).toBeTruthy();
      expect(sim.isPostseasonComplete()).toBeTruthy();
    });

    it('should be a postseason game (very end)', () => {
      sim = new Sim(seasonVeryFinished);
      expect(sim.isRegularSeason()).toBeFalsy();
      expect(sim.isPostseason()).toBeFalsy();
      expect(sim.isPostseasonComplete()).toBeTruthy();
    });
  });

});
