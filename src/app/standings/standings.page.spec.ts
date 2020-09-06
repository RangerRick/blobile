import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StandingsPage } from './standings.page';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

describe('StandingsPage', () => {
  let component: StandingsPage;
  let fixture: ComponentFixture<StandingsPage>;
  let deploySpy: Deploy;

  beforeEach(async(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);

    TestBed.configureTestingModule({
      declarations: [StandingsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StandingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
