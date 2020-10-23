import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { LiveFeedPage } from './live-feed.page';
import { SettingsService, SEGMENT } from '../../lib/settings.service';

describe('LiveFeedPage', () => {
  let component: LiveFeedPage;
  let fixture: ComponentFixture<LiveFeedPage>;

  let loadingSpy, settingsSpy;

  beforeEach(waitForAsync(() => {
    settingsSpy = {} as SettingsService;
    settingsSpy.ready = Promise.resolve();
    settingsSpy.segment = () => {
      return 'all' as SEGMENT;
    };

    loadingSpy = {} as LoadingController;

    TestBed.configureTestingModule({
      declarations: [LiveFeedPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SettingsService, useValue: settingsSpy },
        { provide: LoadingController, useValue: loadingSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
