import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { SEGMENT, SettingsService } from 'src/lib/settings.service';

import { TeamPageComponent } from './team-page.page';

describe('TeamPage', () => {
  let component: TeamPageComponent;
  let fixture: ComponentFixture<TeamPageComponent>;
  let settingsSpy: SettingsService;
  let deploySpy: Deploy;

  beforeEach(waitForAsync(() => {
    settingsSpy = {} as SettingsService;
    settingsSpy.ready = Promise.resolve(true);
    settingsSpy.isFavorite = () => false;
    settingsSpy.segment = () => {
      return 'all' as SEGMENT;
    };
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);

    TestBed.configureTestingModule({
      declarations: [ TeamPageComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SettingsService, useValue: settingsSpy },
        { provide: Deploy, useValue: deploySpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
