import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchupsPage } from './matchups.page';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

describe('MatchupsPage', () => {
  let component: MatchupsPage;
  let fixture: ComponentFixture<MatchupsPage>;
  let deploySpy: Deploy;

  beforeEach(waitForAsync(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);

    TestBed.configureTestingModule({
      declarations: [MatchupsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
