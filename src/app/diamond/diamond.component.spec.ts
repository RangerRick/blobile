import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiamondComponent } from './diamond.component';
import { Game } from 'src/lib/model/game';
import { SEGMENT, SettingsService } from 'src/lib/settings.service';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

describe('DiamondComponent', () => {
  let component: DiamondComponent;
  let fixture: ComponentFixture<DiamondComponent>;
  let settingsSpy: SettingsService, deploySpy: Deploy;

  beforeEach(async(() => {
    settingsSpy = {} as SettingsService;
    settingsSpy.ready = Promise.resolve(true);
    settingsSpy.segment = () => {
      return 'all' as SEGMENT;
    };
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);

    TestBed.configureTestingModule({
      declarations: [ DiamondComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SettingsService, useValue: settingsSpy },
        { provide: Deploy, useValue: deploySpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DiamondComponent);
    component = fixture.componentInstance;

    component.game = new Game({
      awayTeamName: 'Philly Pies',
      awayTeamNickname: 'Pies',
      awayTeamEmoji: '0x1F967',
      homeTeamName: 'Hades Tigers',
      homeTeamNickname: 'Tigers',
      homeTeamEmoji: '0x1F405',
      basesOccupied: [],
    });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
