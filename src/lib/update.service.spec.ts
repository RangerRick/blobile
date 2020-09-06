import { TestBed } from '@angular/core/testing';

import { UpdateService } from './update.service';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

describe('UpdateService', () => {
  let service: UpdateService;
  let deploySpy: Deploy;

  beforeEach(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);
    TestBed.configureTestingModule({
      providers: [
       { provide: Deploy, useValue: deploySpy },
      ],
    });
    service = TestBed.inject(UpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
