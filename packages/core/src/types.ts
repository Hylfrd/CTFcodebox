export type ToolInput =
  { kind: 'text'; text: string } | { kind: 'bytes'; bytes: Uint8Array; name?: string };

export type ToolOutput =
  { kind: 'text'; text: string } | { kind: 'bytes'; bytes: Uint8Array; name: string; mime: string };

export interface ToolDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  execute(input: ToolInput): ToolOutput | Promise<ToolOutput>;
}

export interface ToolModule {
  readonly id: string;
  readonly name: string;
  readonly tools: readonly ToolDefinition[];
}

export interface ToolSummary {
  id: string;
  name: string;
  description: string;
  moduleId: string;
}
