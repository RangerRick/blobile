import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { LiveFeedPageComponent } from './live-feed.page';
import { SettingsService, SEGMENT } from '../../lib/settings.service';

describe('LiveFeedPage', () => {
  let component: LiveFeedPageComponent;
  let fixture: ComponentFixture<LiveFeedPageComponent>;

  let loadingSpy, settingsSpy;

  beforeEach(waitForAsync(() => {
    settingsSpy = {} as SettingsService;
    settingsSpy.ready = Promise.resolve();
    settingsSpy.segment = () => {
      return 'all' as SEGMENT;
    };

    loadingSpy = {} as LoadingController;

    TestBed.configureTestingModule({
      declarations: [LiveFeedPageComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SettingsService, useValue: settingsSpy },
        { provide: LoadingController, useValue: loadingSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
