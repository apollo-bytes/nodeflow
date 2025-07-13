import { nodeTemplates, type NodeType } from "@/language/templateNodes";

export class Node {
  private readonly _id: string;
  private readonly _type: NodeType;
  private readonly _data: any;

  constructor(nodeType: NodeType, data?: any) {
    const nodeTemplate = nodeTemplates.find((template) => template.type === nodeType);
    if (!nodeTemplate) throw new Error(`Node template not found for type: ${nodeType}`);

    const nodeId = crypto.randomUUID();

    this._id = nodeId;
    this._type = nodeType;
    this._data = data;
  }

  assignValue() {
    //
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get data() {
    return this._data;
  }
}
