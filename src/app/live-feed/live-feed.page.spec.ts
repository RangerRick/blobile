import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiveFeedPage } from './live-feed.page';

describe('LiveFeedPage', () => {
  let component: LiveFeedPage;
  let fixture: ComponentFixture<LiveFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveFeedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
