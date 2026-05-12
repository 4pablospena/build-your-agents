import { cpSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const src = join(root, 'templates')
const dest = join(root, 'public', 'templates')

mkdirSync(dest, { recursive: true })

for (const name of readdirSync(src)) {
  if (!name.endsWith('.md')) continue
  cpSync(join(src, name), join(dest, name), { force: true })
}

console.log('[sync-templates] copied templates/*.md → public/templates/')
