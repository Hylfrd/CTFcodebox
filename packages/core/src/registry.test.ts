import { describe, expect, it } from 'vitest';
import { createRegistry } from './registry.js';
import { registry } from './index.js';
import type { ToolModule } from './types.js';

const module: ToolModule = {
  id: 'test',
  name: '测试模块',
  tools: [
    {
      id: 'test.echo',
      name: '测试工具',
      description: '仅用于验证模块接入',
      execute: (input) =>
        input.kind === 'text'
          ? input
          : { ...input, name: 'test.bin', mime: 'application/octet-stream' },
    },
  ],
};

describe('共享模块接入', () => {
  it('新模块的发现与执行使用同一份定义', async () => {
    const tools = createRegistry([module]);
    expect(tools.listTools()).toEqual([
      { id: 'test.echo', name: '测试工具', description: '仅用于验证模块接入', moduleId: 'test' },
    ]);
    await expect(tools.getTool('test.echo')?.execute({ kind: 'text', text: '中文输入' })).toEqual({
      kind: 'text',
      text: '中文输入',
    });
  });

  it('拒绝不同模块注册同名工具', () => {
    expect(() => createRegistry([module, { ...module, id: 'other' }])).toThrow(
      '工具 ID 为空或重复',
    );
  });

  it('框架阶段如实返回空清单', () => {
    expect(registry.listModules()).toEqual([]);
    expect(registry.listTools()).toEqual([]);
  });
});
