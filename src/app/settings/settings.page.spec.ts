import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsPageComponent } from './settings.page';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { ICurrentConfig } from 'cordova-plugin-ionic/dist/ngx/IonicCordova';

describe('SettingsPage', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  let deploySpy: Deploy;

  beforeEach(waitForAsync(() => {
    deploySpy = jasmine.createSpyObj('Deploy', ['sync']);
    deploySpy.getConfiguration = async () => {
      return Promise.resolve({
        channel: 'Beta',
      } as ICurrentConfig);
    };

    TestBed.configureTestingModule({
      declarations: [ SettingsPageComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Deploy, useValue: deploySpy },
      ]
     }).compileComponents();

    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
