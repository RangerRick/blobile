import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiamondComponent } from './diamond.component';
import { Game } from 'src/lib/model/game';

describe('DiamondComponent', () => {
  let component: DiamondComponent;
  let fixture: ComponentFixture<DiamondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiamondComponent ],
      imports: [IonicModule.forRoot()]
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
