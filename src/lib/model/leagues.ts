import { Division } from './division';
import { Team } from './team';
import { League } from './league';
import { Entry } from './_entry';
import { Subleague } from './subleague';

export class Leagues extends Entry {
  public get divisions(): Division[] {
    return this.data.divisions?.map((div: any) => new Division(div)) || [];
  }

  public get teams(): Team[] {
    return this.data.teams?.map((team: any) => new Team(team)) || [];
  }

  public get leagues(): League[] {
    return this.data.leagues?.map((league: any) => new League(league)) || [];
  }

  public get subleagues(): Subleague[] {
    return this.data.subleagues?.map((subleague: any) => new Subleague(subleague)) || [];
  }
}
