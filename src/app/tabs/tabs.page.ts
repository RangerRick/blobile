import { Component } from '@angular/core';

import { Plugins, DeviceInfo } from '@capacitor/core';
const { Device } = Plugins;

import { UpdateService } from '../../lib/update.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public platform = 'web';

  constructor(
    public updateService: UpdateService,
  ) {
    Device.getInfo().then((info: DeviceInfo) => {
      this.platform = info.platform;
    });
  }

}
