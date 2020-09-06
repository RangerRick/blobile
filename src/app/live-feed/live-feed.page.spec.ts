import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { LiveFeedPage } from './live-feed.page';
import { SettingsService, SEGMENT } from '../settings.service';

describe('LiveFeedPage', () => {
  let component: LiveFeedPage;
  let fixture: ComponentFixture<LiveFeedPage>;

  let loadingSpy, settingsSpy;

  beforeEach(async(() => {
    settingsSpy = {} as SettingsService;
    settingsSpy.ready = Promise.resolve();
    settingsSpy.getSegment = () => {
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
