import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const src = join(root, 'assets', 'og-card.svg')
const dest = join(root, 'public', 'og.png')

const svg = readFileSync(src)
await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'cover' })
  .png()
  .toFile(dest)

console.log('[generate-og] wrote public/og.png (1200×630) from assets/og-card.svg')
