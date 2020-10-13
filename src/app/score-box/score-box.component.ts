import { Component, Input, OnInit } from '@angular/core';

import { Game } from '../../lib/model/game';
import { Team } from '../../lib/model/team';

@Component({
  selector: 'app-score-box',
  templateUrl: './score-box.component.html',
  styleUrls: ['./score-box.component.scss'],
})
export class ScoreBoxComponent implements OnInit {
  @Input() public hideLog: boolean;
  @Input() public openTeam: (id: string, ev?: Event) => Promise<void>;
  @Input() public game = new Game({});
  @Input() public teams = {} as { [key: string]: Team };

  constructor() { }

  ngOnInit() {}

}
