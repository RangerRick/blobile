import { Component } from '@angular/core';
import { VERSION } from '../../environments/version';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  public VERSION = VERSION;

  constructor() {}

}
