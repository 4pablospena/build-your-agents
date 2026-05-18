// Packages templates/*.md into public/templates/build-your-agents.zip.
//
// No external dependencies: we emit a minimal PKZIP archive (deflate method)
// by hand. The format is well documented (APPNOTE.TXT) and we only need the
// "single-disk, files-at-root, no extras" subset. Output is verified to open
// in macOS Archive Utility, GNU unzip and bsdtar.
//
// Engines: package.json pins node >= 20. node:zlib.crc32 only exists since
// 22.2, so we ship a portable CRC-32 implementation below.

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { deflateRawSync } from 'node:zlib'

const ZIP_NAME = 'build-your-agents.zip'

const root = process.cwd()
const srcDir = join(root, 'templates')
const outDir = join(root, 'public', 'templates')
const outPath = join(outDir, ZIP_NAME)

// ---- CRC-32 (IEEE 802.3, polynomial 0xEDB88320) -------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    t[i] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

// ---- DOS date/time encoding ---------------------------------------------
function dosDateTime(date) {
  const yr = Math.max(0, date.getFullYear() - 1980)
  const mo = date.getMonth() + 1
  const dy = date.getDate()
  const hr = date.getHours()
  const mn = date.getMinutes()
  const sc = Math.floor(date.getSeconds() / 2)
  const time = (hr << 11) | (mn << 5) | sc
  const dosDate = (yr << 9) | (mo << 5) | dy
  return { time, dosDate }
}

// ---- ZIP record builders ------------------------------------------------
function buildLocalFileHeader({ name, crc, compSize, uncompSize, time, date }) {
  const nameBuf = Buffer.from(name, 'utf8')
  const buf = Buffer.alloc(30 + nameBuf.length)
  buf.writeUInt32LE(0x04034b50, 0)      // signature
  buf.writeUInt16LE(20, 4)              // version needed
  buf.writeUInt16LE(0x0800, 6)          // flag: bit 11 → name is UTF-8
  buf.writeUInt16LE(8, 8)               // method: deflate
  buf.writeUInt16LE(time, 10)           // mod time
  buf.writeUInt16LE(date, 12)           // mod date
  buf.writeUInt32LE(crc, 14)            // CRC-32
  buf.writeUInt32LE(compSize, 18)       // compressed size
  buf.writeUInt32LE(uncompSize, 22)     // uncompressed size
  buf.writeUInt16LE(nameBuf.length, 26) // name length
  buf.writeUInt16LE(0, 28)              // extra length
  nameBuf.copy(buf, 30)
  return buf
}

function buildCentralDirEntry({ name, crc, compSize, uncompSize, time, date, offset }) {
  const nameBuf = Buffer.from(name, 'utf8')
  const buf = Buffer.alloc(46 + nameBuf.length)
  buf.writeUInt32LE(0x02014b50, 0)      // signature
  buf.writeUInt16LE(20, 4)              // version made by
  buf.writeUInt16LE(20, 6)              // version needed
  buf.writeUInt16LE(0x0800, 8)          // flag
  buf.writeUInt16LE(8, 10)              // method
  buf.writeUInt16LE(time, 12)
  buf.writeUInt16LE(date, 14)
  buf.writeUInt32LE(crc, 16)
  buf.writeUInt32LE(compSize, 20)
  buf.writeUInt32LE(uncompSize, 24)
  buf.writeUInt16LE(nameBuf.length, 28)
  buf.writeUInt16LE(0, 30)              // extra
  buf.writeUInt16LE(0, 32)              // comment
  buf.writeUInt16LE(0, 34)              // disk number
  buf.writeUInt16LE(0, 36)              // internal attrs
  buf.writeUInt32LE((0o100644 << 16) >>> 0, 38) // external attrs (Unix file 0644)
  buf.writeUInt32LE(offset, 42)
  nameBuf.copy(buf, 46)
  return buf
}

function buildEOCD({ totalEntries, cdSize, cdOffset }) {
  const buf = Buffer.alloc(22)
  buf.writeUInt32LE(0x06054b50, 0)
  buf.writeUInt16LE(0, 4)             // this disk
  buf.writeUInt16LE(0, 6)             // disk with CD start
  buf.writeUInt16LE(totalEntries, 8)
  buf.writeUInt16LE(totalEntries, 10)
  buf.writeUInt32LE(cdSize, 12)
  buf.writeUInt32LE(cdOffset, 16)
  buf.writeUInt16LE(0, 20)            // comment length
  return buf
}

// ---- Main ---------------------------------------------------------------
mkdirSync(outDir, { recursive: true })

const entries = readdirSync(srcDir)
  .filter((name) => name.endsWith('.md'))
  .sort() // deterministic order across runs

if (entries.length === 0) {
  console.error('[build-zip] no .md files found in templates/')
  process.exit(1)
}

const parts = []
const central = []
let offset = 0

for (const name of entries) {
  const filePath = resolve(srcDir, name)
  const data = readFileSync(filePath)
  const stat = statSync(filePath)
  const { time, dosDate: date } = dosDateTime(stat.mtime)

  const compressed = deflateRawSync(data, { level: 9 })
  const crc = crc32(data)

  const lfh = buildLocalFileHeader({
    name,
    crc,
    compSize: compressed.length,
    uncompSize: data.length,
    time,
    date
  })

  central.push(
    buildCentralDirEntry({
      name,
      crc,
      compSize: compressed.length,
      uncompSize: data.length,
      time,
      date,
      offset
    })
  )

  parts.push(lfh, compressed)
  offset += lfh.length + compressed.length
}

const cdStart = offset
const cd = Buffer.concat(central)
const eocd = buildEOCD({
  totalEntries: entries.length,
  cdSize: cd.length,
  cdOffset: cdStart
})

const zip = Buffer.concat([...parts, cd, eocd])
writeFileSync(outPath, zip)

const kb = (zip.length / 1024).toFixed(1)
console.log(
  `[build-zip] wrote public/templates/${ZIP_NAME} (${entries.length} files, ${kb} KB)`
)
