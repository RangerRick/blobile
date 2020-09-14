import { TestBed } from '@angular/core/testing';

import { Game } from './game';

const basesEmpty          = require('./data/game-bases-occupied-none.json');
const basesFirst          = require('./data/game-bases-occupied-0.json');
const basesFirstAndSecond = require('./data/game-bases-occupied-0-1.json');
const basesFirstAndThird  = require('./data/game-bases-occupied-0-2.json');
const basesSecond         = require('./data/game-bases-occupied-1.json');
const basesSecondAndThird = require('./data/game-bases-occupied-1-2.json');
const basesThird          = require('./data/game-bases-occupied-2.json');

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });


  describe('Bases', () => {
    it('should return nothing for any batter', () => {
      game = new Game(basesEmpty);
      expect(game.getBaseRunner(0)).toBeFalsy();
      expect(game.getBaseRunner(1)).toBeFalsy();
      expect(game.getBaseRunner(2)).toBeFalsy();
      expect(game.getBaseRunner(3)).toBeFalsy();
    });

    it('should return a batter on first base', () => {
      game = new Game(basesFirst);
      expect(game.getBaseRunner(0)).toEqual(jasmine.objectContaining({
        id: 'c31d874c-1b4d-40f2-a1b3-42542e934047'
      }));
      expect(game.getBaseRunner(1)).toBeFalsy();
      expect(game.getBaseRunner(2)).toBeFalsy();
      expect(game.getBaseRunner(3)).toBeFalsy();
    });

    it('should return a batter on second base', () => {
      game = new Game(basesSecond);
      expect(game.getBaseRunner(0)).toBeFalsy();
      expect(game.getBaseRunner(1)).toEqual(jasmine.objectContaining({
        id: '5ca7e854-dc00-4955-9235-d7fcd732ddcf'
      }));
      expect(game.getBaseRunner(2)).toBeFalsy();
      expect(game.getBaseRunner(3)).toBeFalsy();
    });

    it('should return a batter on third base', () => {
      game = new Game(basesThird);
      expect(game.getBaseRunner(0)).toBeFalsy();
      expect(game.getBaseRunner(1)).toBeFalsy();
      expect(game.getBaseRunner(2)).toEqual(jasmine.objectContaining({
        id: '0f61d948-4f0c-4550-8410-ae1c7f9f5613'
      }));
      expect(game.getBaseRunner(3)).toBeFalsy();
    });

    it('should return a batter on first and second', () => {
      game = new Game(basesFirstAndSecond);
      expect(game.getBaseRunner(0)).toEqual(jasmine.objectContaining({
        id: '5bcfb3ff-5786-4c6c-964c-5c325fcc48d7'
      }));
      expect(game.getBaseRunner(1)).toEqual(jasmine.objectContaining({
        id: 'd4a10c2a-0c28-466a-9213-38ba3339b65e'
      }));
      expect(game.getBaseRunner(2)).toBeFalsy();
      expect(game.getBaseRunner(3)).toBeFalsy();
    });

    it('should return a batter on first and third', () => {
      game = new Game(basesFirstAndThird);
      expect(game.getBaseRunner(0)).toEqual(jasmine.objectContaining({
        id: 'c675fcdf-6117-49a6-ac32-99a89a3a88aa'
      }));
      expect(game.getBaseRunner(1)).toBeFalsy();
      expect(game.getBaseRunner(2)).toEqual(jasmine.objectContaining({
        id: '06ced607-7f96-41e7-a8cd-b501d11d1a7e'
      }));
      expect(game.getBaseRunner(3)).toBeFalsy();
    });

    it('should return a batter on second and third', () => {
      game = new Game(basesSecondAndThird);
      expect(game.getBaseRunner(0)).toBeFalsy();
      expect(game.getBaseRunner(1)).toEqual(jasmine.objectContaining({
        id: '5ca7e854-dc00-4955-9235-d7fcd732ddcf'
      }));
      expect(game.getBaseRunner(2)).toEqual(jasmine.objectContaining({
        id: '0d5300f6-0966-430f-903f-a4c2338abf00'
      }));
      expect(game.getBaseRunner(3)).toBeFalsy();
    });

  });

});
