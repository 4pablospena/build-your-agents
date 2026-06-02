import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import {
  generateConfiguredAgentFiles,
  patchSection,
  textToBullets
} from '../composables/useAgentConfigurator.renderer.ts'

const root = new URL('..', import.meta.url).pathname

function loadTemplate(name) {
  return readFileSync(join(root, 'templates', name), 'utf8')
}

test('textToBullets formats lines', () => {
  const out = textToBullets('alpha\nbeta')
  assert.match(out, /^- alpha/)
  assert.match(out, /- beta/)
})

test('patchSection replaces body until next heading', () => {
  const md = '## Foo\nold\n\n## Bar\nkeep\n'
  const next = patchSection(md, 'Foo', '- new')
  assert.match(next, /## Foo\n- new/)
  assert.match(next, /## Bar\nkeep/)
})

test('generateConfiguredAgentFiles includes required SOUL sections', () => {
  const templates = {
    soul: loadTemplate('SOUL.md'),
    identity: loadTemplate('IDENTITY.md'),
    agents: loadTemplate('AGENTS.md'),
    user: loadTemplate('USER.md'),
    tools: loadTemplate('TOOLS.md'),
    memory: loadTemplate('MEMORY.md'),
    heartbeat: loadTemplate('HEARTBEAT.md')
  }
  const answers = {
    soul: { name: 'TestBot', purpose: 'Test helper' },
    user: { owner_name: 'Alex' }
  }
  const out = generateConfiguredAgentFiles(answers, templates)
  assert.match(out.soul, /TestBot/)
  assert.match(out.soul, /## Personality & Tone/)
  assert.match(out.identity, /name: TestBot/)
})
