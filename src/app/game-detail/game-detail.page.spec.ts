import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameDetailPage } from './game-detail.page';

describe('GameDetailPage', () => {
  let component: GameDetailPage;
  let fixture: ComponentFixture<GameDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
