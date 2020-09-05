import { TestBed } from '@angular/core/testing';

import { APIStream } from './stream';

describe('APIStream', () => {
  let service: APIStream;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIStream);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
