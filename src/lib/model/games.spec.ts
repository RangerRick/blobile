import { TestBed } from '@angular/core/testing';

import { Games } from './games';

const regularSeasonStart = require('./data/season-5-regular-begin.json');
const regularSeasonEnd   = require('./data/season-5-regular-end.json');
const postSeasonStart    = require('./data/season-5-post-begin.json');
const postSeasonEnd      = require('./data/season-5-post-end.json');
const seasonFinished     = require('./data/season-5-finished.json');

describe('Games', () => {
  let streamData: Games;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

});
