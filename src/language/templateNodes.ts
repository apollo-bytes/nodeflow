export const varNodeTemplate = {
  type: "var",
  numHandles: { input: 1, output: 1 },
} as const;

export const constNodeTemplate = {
  type: "const",
  numHandles: { input: 1, output: 1 },
} as const;

export const boxNodeTemplate = {
  type: "box",
  numHandles: { input: 1, output: 1 },
} as const;

export const branchNodeTemplate = {
  type: "branch",
  numHandles: { input: 1, output: 2 },
} as const;

export const loopNodeTemplate = {
  type: "loop",
  numHandles: { input: 1, output: 1 },
} as const;

export const sumNodesTemplate = {
  type: "sum",
  numHandles: { input: 2, output: 1 },
} as const;

export const startNodeTemplate = {
  type: "start",
  numHandles: { input: 0 },
} as const;

export const nodeTemplates = [
  varNodeTemplate,
  constNodeTemplate,
  boxNodeTemplate,
  branchNodeTemplate,
  loopNodeTemplate,
  sumNodesTemplate,
  startNodeTemplate,
];

export const nodeTypes = nodeTemplates.map((template) => template.type);
export type NodeType = (typeof nodeTypes)[number];
