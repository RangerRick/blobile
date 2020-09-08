import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bl-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input() public team: 'home'|'away'|undefined;
  @Input() public emoji: number;
  @Input() public foregroundColor: string;
  @Input() public backgroundColor = 'transparent';
  @Input() public name: string;

  constructor() {
    // console.debug('TeamComponent instantiated.');
  }

  async ngOnInit() {
    // console.debug('TeamComponent initialized.');
  }

  getEmoji() {
    return this.emoji? String.fromCodePoint(this.emoji) : undefined;
  }

  getStyle() {
    let ret = `background-color: ${this.backgroundColor};`;
    if (this.foregroundColor) {
      ret += `color: ${this.foregroundColor};`;
    }
    return ret;
  }
}
