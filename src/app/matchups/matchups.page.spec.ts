import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchupsPageComponent } from './matchups.page';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

describe('MatchupsPage', () => {
  let component: MatchupsPageComponent;
  let fixture: ComponentFixture<MatchupsPageComponent>;
  let deploySpy: Deploy;

  beforeEach(waitForAsync(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);

    TestBed.configureTestingModule({
      declarations: [MatchupsPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
