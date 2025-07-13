export class ProgramStack {
  private readonly _items: Record<string, any>[];

  constructor() {
    this._items = [];
  }

  pushScope(item: Record<string, any>) {
    this._items.push(item);
  }

  popScope() {
    return this._items.pop();
  }

  getVar(name: string) {
    for (const item of this._items) {
      if (item[name]) return item[name];
    }

    return undefined;
  }

  setVarInCurrentScope(name: string, value: any) {
    if (this._items.length === 0) {
      this.pushScope({});
    }

    this._items[this._items.length - 1][name] = value;
  }
}
