import { Program, type ProgramOptions } from "@/language/program";

export const sampleProgram: ProgramOptions = {
  name: "sample program",
  nodes: [
    { id: "start", type: "start", isStartNode: true },
    { id: "one", type: "var", data: 1 },
    { id: "two", type: "const", data: 2 },
    { id: "three", type: "sum", data: ["one", "two"], isEndNode: true },
  ],
  edges: [
    { source: "start", target: "one" },
    { source: "start", target: "two" },
    { source: "one", target: "three" },
    { source: "two", target: "three" },
  ],
};

export function runSampleProgram() {
  const program = new Program(sampleProgram);
  program.execute();
}
