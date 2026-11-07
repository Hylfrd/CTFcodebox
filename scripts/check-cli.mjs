import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const entry = fileURLToPath(new URL('../apps/cli/dist/index.js', import.meta.url));
for (const command of ['modules', 'tools']) {
  const result = spawnSync(process.execPath, [entry, command, '--json'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, '');
  const data = JSON.parse(result.stdout);
  assert.ok(Array.isArray(data.items));
  assert.equal(data.count, data.items.length);
}
const help = spawnSync(process.execPath, [entry, '--help'], { encoding: 'utf8' });
assert.equal(help.status, 0, help.stderr);
assert.match(help.stdout, /用法/);
const invalid = spawnSync(process.execPath, [entry, 'missing'], { encoding: 'utf8' });
assert.equal(invalid.status, 2);
assert.equal(invalid.stdout, '');
console.log('CLI 入口、JSON 输出和错误退出码检查通过。');
