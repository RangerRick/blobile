import { Entry, ID } from './_entry';

export class GlobalEvent extends Entry {
  get id(): ID {
    return this.data?.id;
  }

  get msg(): string {
    return this.data?.msg;
  }

  get expire(): Date {
    return this.data?.expire ? new Date(this.data.expire) : null;
  }
}
