import { createRegistry } from './registry.js';
import type { ToolModule } from './types.js';

export { createRegistry } from './registry.js';
export type { ToolDefinition, ToolInput, ToolModule, ToolOutput, ToolSummary } from './types.js';

// 后续功能模块在此显式接入，网页和 CLI 使用同一份清单。
export const modules: readonly ToolModule[] = [];
export const registry = createRegistry(modules);
