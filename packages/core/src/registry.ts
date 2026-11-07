import type { ToolDefinition, ToolModule, ToolSummary } from './types.js';

export function createRegistry(modules: readonly ToolModule[] = []) {
  const moduleMap = new Map<string, ToolModule>();
  const toolMap = new Map<string, { tool: ToolDefinition; moduleId: string }>();

  for (const module of modules) {
    if (!module.id.trim() || moduleMap.has(module.id)) {
      throw new Error(`模块 ID 为空或重复：${module.id}`);
    }
    moduleMap.set(module.id, module);
    for (const tool of module.tools) {
      if (!tool.id.trim() || toolMap.has(tool.id)) {
        throw new Error(`工具 ID 为空或重复：${tool.id}`);
      }
      toolMap.set(tool.id, { tool, moduleId: module.id });
    }
  }

  return {
    listModules: () => [...moduleMap.values()].map(({ id, name }) => ({ id, name })),
    listTools: (): ToolSummary[] =>
      [...toolMap.values()].map(({ tool, moduleId }) => ({
        id: tool.id,
        name: tool.name,
        description: tool.description,
        moduleId,
      })),
    getTool: (id: string) => toolMap.get(id)?.tool,
  };
}
