import { TestBed } from '@angular/core/testing';

import { UpdateService } from './update.service';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { Platform } from '@ionic/angular';

describe('UpdateService', () => {
  let service: UpdateService;
  let deploySpy: Deploy;
  let platformSpy: Platform;

  beforeEach(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['configure', 'sync']);
    platformSpy = jasmine.createSpyObj('Platform', { ready: Promise.resolve('test') });
    TestBed.configureTestingModule({
      providers: [
        { provide: Deploy, useValue: deploySpy },
        { provide: Platform, useValue: platformSpy },
      ],
    }).compileComponents();
    service = TestBed.inject(UpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
