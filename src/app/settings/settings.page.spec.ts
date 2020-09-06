import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { ICurrentConfig } from 'cordova-plugin-ionic/dist/ngx/IonicCordova';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  let deploySpy: Deploy;

  beforeEach(async(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);
    deploySpy.getConfiguration = async () => {
      return Promise.resolve({
        channel: 'Beta',
      } as ICurrentConfig);
    };

    TestBed.configureTestingModule({
      declarations: [ SettingsPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Deploy, useValue: deploySpy },
      ]
     }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
