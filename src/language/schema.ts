import { z } from "zod";
import type { NodeType } from "@/language/templateNodes";

export const dataType = z.union([
  z.literal("string"),
  z.literal("integer"),
  z.literal("boolean"),
  z.literal("decimal"),
  z.literal("character"),
  z.literal("void"),
]);

export type HandleType = string | undefined;

export type NodeData<T extends NodeType> = T extends "var" | "const"
  ? any
  : T extends "box"
  ? Record<string, any>
  : T extends "branch" | "loop"
  ? boolean
  : never;

export type SingleNode<T extends NodeType> = {
  id: string;
  type: T;
  data?: NodeData<T>;
  isStartNode?: boolean;
  isEndNode?: boolean;
};

export type SingleEdge = {
  source: HandleType;
  target: HandleType;
};
