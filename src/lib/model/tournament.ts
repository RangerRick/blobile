import { Entry, ID } from './_entry';

export class Tournament extends Entry {
  public id: ID;
  public description: string;
  public finalsName: string;
  public index: number;
  public name: string;
  public playoffs: ID;

  constructor(data?: any) {
    super(data);

    this.defineStrings([
      'id',
      'description',
      'finalsName',
      'name',
      'playoffs',
    ]);
    this.defineNumbers([
      'index',
    ]);
  }

  public get teams(): ID[] {
    return this.data?.teams || [];
  }
}
