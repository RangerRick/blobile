import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Platform } from '@ionic/angular';

import { Plugins, SplashScreenPlugin } from '@capacitor/core';
const { SplashScreen } = Plugins;

import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let deploySpy: Deploy, splashScreenSpy: SplashScreenPlugin, platformReadySpy: Promise<any>, platformSpy: Platform;

  beforeEach(async(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
       { provide: Deploy, useValue: deploySpy },
       { provide: SplashScreen, useValue: splashScreenSpy },
       { provide: Platform, useValue: platformSpy },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    // expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    // expect(splashScreenSpy.hide).toHaveBeenCalled();
    // expect(deploySpy.sync).toHaveBeenCalled();
  });

  // TODO: add more tests!

});
