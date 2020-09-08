import { Component } from '@angular/core';

import { UpdateService } from '../../lib/update.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public updateService: UpdateService
  ) {}

}
