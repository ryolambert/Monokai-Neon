import { spawnSync } from 'node:child_process';

const build = spawnSync('node', ['./scripts/build.mjs'], { stdio: 'inherit' });
if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const result = spawnSync('npx', ['@vscode/vsce@3.7.1', 'package', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

process.exit(result.status ?? 1);
