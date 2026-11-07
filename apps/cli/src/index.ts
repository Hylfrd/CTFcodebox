#!/usr/bin/env node
import { registry } from '@ctfcodebox/core';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as { version: string };
const help = `CTFcodebox 本地工具箱

用法：ctfcodebox <命令> [选项]

命令：
  modules       列出已接入模块
  tools         列出已接入工具

选项：
  --json        输出结构化 JSON
  --help, -h    查看帮助
  --version     查看版本

当前为工程框架，具体工具将在后续接入。
`;

const args = process.argv.slice(2);
const [command, ...flags] = args;
if (!command || command === '--help' || command === '-h') {
  process.stdout.write(help);
} else if (command === '--version') {
  process.stdout.write(`${version}\n`);
} else if (
  (command === 'modules' || command === 'tools') &&
  flags.every((flag) => flag === '--json')
) {
  const items = command === 'modules' ? registry.listModules() : registry.listTools();
  if (flags.includes('--json'))
    process.stdout.write(`${JSON.stringify({ items, count: items.length })}\n`);
  else
    process.stdout.write(
      items.length
        ? `${items.map((item) => `${item.id}\t${item.name}`).join('\n')}\n`
        : '尚未接入模块或工具。\n',
    );
} else {
  process.stderr.write(`未知命令或选项：${args.join(' ')}\n使用 --help 查看帮助。\n`);
  process.exitCode = 2;
}
