import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contract = fs.readFileSync(path.join(root, '_common/initialization.md'), 'utf8');
const agents = fs.readFileSync(path.join(root, 'agents.md'), 'utf8');
const team = fs.readFileSync(path.join(root, 'software-development/team/README.md'), 'utf8');

test('public initialization contract preserves duplicate-safe lifecycle gates', () => {
  assert.match(contract, /^## What this contract is$/m);
  assert.match(contract, /reusable safety contract for creating, replacing, and reinitializing/);
  assert.match(contract, /infrastructure policy, not a Team definition or product-work workflow/);
  assert.match(contract, /authoritative, uncapped/);
  assert.match(contract, /BLOCKED_AUTHORITATIVE_ROSTER_INVENTORY_UNAVAILABLE/);
  assert.match(contract, /`clientThreadId` is pending, not absent or failed/);
  assert.match(contract, /WAIT_FOR_PENDING_CREATION_RECEIPTS/);
  assert.match(contract, /BLOCKED_INITIALIZATION_SOURCE_REVISION/);
  assert.match(contract, /Readiness is all-or-nothing/);
  assert.match(agents, /Common Agent Initialization Contract/);
  assert.match(team, /Common Agent Initialization Contract/);
});

test('changed Markdown files contain no broken relative links', () => {
  for (const relative of ['README.md', 'agents.md', '_common/initialization.md', 'software-development/team/README.md']) {
    const source = fs.readFileSync(path.join(root, relative), 'utf8');
    for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^[a-z]+:/i.test(target)) continue;
      assert.ok(fs.existsSync(path.resolve(root, path.dirname(relative), target)), `${relative} -> ${target}`);
    }
  }
});
