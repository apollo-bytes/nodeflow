import type { SingleNode } from "@/language/schema";
import type { NodeType } from "@/language/templateNodes";

export class ExecutionQueue {
  private readonly _items: Array<SingleNode<NodeType>>;

  constructor() {
    this._items = [];
  }

  enqueue(node: SingleNode<NodeType>) {
    this._items.push(node);
  }

  dequeue() {
    return this._items.shift();
  }

  get top() {
    if (this._items.length === 0) return undefined;
    return this._items[this._items.length - 1];
  }

  get length() {
    return this._items.length;
  }
}
