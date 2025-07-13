import { ProgramStack } from "@/structures/programStack";
import type { NodeType } from "@/language/templateNodes";
import { ExecutionQueue } from "@/structures/executionQueue";
import type { HandleType, SingleEdge, SingleNode } from "@/language/schema";

export type ProgramOptions = {
  name: string;
  nodes: SingleNode<NodeType>[];
  edges: SingleEdge[];
};

export class Program {
  private readonly _name: string;
  private readonly _nodes: SingleNode<NodeType>[];
  private readonly _edges: SingleEdge[];
  private readonly _stack: ProgramStack;
  private readonly _executedNodes: Set<HandleType>;
  private readonly executionQueue: ExecutionQueue;

  constructor(data: ProgramOptions) {
    this._name = data.name;
    this._nodes = data.nodes;
    this._edges = data.edges;
    this.executionQueue = new ExecutionQueue();
    this._executedNodes = new Set<HandleType>();
    this._stack = new ProgramStack();
  }

  get nodes() {
    return this._nodes;
  }

  get edges() {
    return this._edges;
  }

  get name() {
    return this._name;
  }

  runNode(node: SingleNode<NodeType> | undefined) {
    if (!node) {
      console.error("Node is undefined");
      return;
    }

    if (this._executedNodes.has(node.id)) {
      console.log("node already executed, skipping:", node);
      return;
    }

    for (const e of this._edges) {
      if (node.id === e.target) {
        if (!this._executedNodes.has(e.source)) {
          console.log(e.source, "dependency not executed, skipping current node:", node);
          return;
        }
      }
    }

    console.log("executing node:", node);
    this._executedNodes.add(node.id);

    if (node.type === "var" || node.type === "const") {
      this._stack.setVarInCurrentScope(node.id, node.data);
    }

    if (node.type === "box") {
      this._stack.setVarInCurrentScope(node.id, node.data);
      // TODO: merge the execution contexts in box, with whatever values it references
    }

    if (node.type === "sum") {
      if (!Array.isArray(node.data)) {
        console.error("sum node data must be an array", node);
        return;
      }

      let sum = 0;
      for (const attr of node.data) {
        const val = this._stack.getVar(attr);
        console.log("sum attribute", attr, "has value", val);
        if (val) sum += val;
      }

      this._stack.setVarInCurrentScope(node.id, sum);
    }

    if (node.type === "branch") {
      // TODO: handle branch
    }

    if (node.type === "loop") {
      //
    }

    const edge = this._edges.find((e) => e.source === node.id);
    if (!edge) return; // TODO: handle case

    const nextNode = this._nodes.find((node) => node.id === edge.target);
    console.log("next node", nextNode);

    if (node.isEndNode) {
      console.log("end node reached, setting execution context to undefined");
    }
  }

  execute() {
    const startNodes = this.nodes.filter((n) => n.isStartNode);
    if (startNodes.length !== 1) throw new Error("There must be exactly one start node");

    this.executionQueue.enqueue(startNodes[0]);

    while (this.executionQueue.length > 0) {
      const node = this.executionQueue.dequeue();
      if (!node) continue;

      this.runNode(node);

      for (const e of this._edges) {
        if (e.source === node.id) {
          const nextNode = this._nodes.find((n) => n.id === e.target);
          if (nextNode) this.executionQueue.enqueue(nextNode);
        }
      }
    }

    console.log("final", { stack: this._stack, execNodes: this._executedNodes });
  }
}
