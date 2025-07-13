import type { HandleType, SingleEdge } from "@/language/schema";

export class Edge {
  private _source: HandleType;
  private _target: HandleType;

  constructor(data: SingleEdge) {
    this._source = data.source;
    this._target = data.target;
  }

  get source() {
    return this._source;
  }

  get target() {
    return this._target;
  }

  connect(source: string, target: string) {
    this._source = source;
    this._target = target;
  }

  remove() {
    this._source = undefined;
    this._target = undefined;
  }
}
