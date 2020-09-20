import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { SEGMENT, SettingsService } from 'src/lib/settings.service';

import { TeamPage } from './team-page.page';

describe('TeamPage', () => {
  let component: TeamPage;
  let fixture: ComponentFixture<TeamPage>;
  let settingsSpy: SettingsService;
  let deploySpy: Deploy;

  beforeEach(async(() => {
    settingsSpy = {} as SettingsService;
    settingsSpy.ready = Promise.resolve(true);
    settingsSpy.isFavorite = () => { return false; };
    settingsSpy.segment = () => {
      return 'all' as SEGMENT;
    };
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);

    TestBed.configureTestingModule({
      declarations: [ TeamPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SettingsService, useValue: settingsSpy },
        { provide: Deploy, useValue: deploySpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
