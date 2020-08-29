import { Component } from '@angular/core';
import { VERSION } from '../../environments/version';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public VERSION = VERSION;

  constructor() {}

}
