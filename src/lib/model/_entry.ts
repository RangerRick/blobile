export class Entry {
  constructor(public data?: any) {
    if (this.data === undefined) {
      this.data = {};
    }
  }

  protected incremented(field: string): number {
    let value = this.data && this.data[field];
    if (value === undefined) {
      value = -1;
    }
    return value + 1;
  }

  protected defineStrings(fields: string[]) {
    for (const field of fields) {
      Object.defineProperty(this, field, {
        get: () => {
          return this.data[field] as string;
        }
      });
    }
  }

  protected defineNumbers(fields: string[]) {
    for (const field of fields) {
      Object.defineProperty(this, field, {
        get: () => {
          return this.data[field] as number;
        }
      });
    }
  }

  protected defineIncrementedNumbers(fields: string[]) {
    for (const field of fields) {
      Object.defineProperty(this, field, {
        get: () => {
          return this.incremented(field);
        }
      });
    }
  }

  protected defineBooleans(fields: string[]) {
    for (const field of fields) {
      Object.defineProperty(this, field, {
        get: () => {
          return Boolean(this.data[field]);
        }
      });
    }
  }
}