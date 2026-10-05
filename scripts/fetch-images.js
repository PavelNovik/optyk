// Скачивает фото и сохраняет в public/images два WebP-варианта: <name>.webp и <name>-sm.webp.
// 1) scripts/images.json: "src" — Unsplash (+ "params" для кадрирования), "url" — прямая ссылка (фото салона с okoptyk.pl).
// 2) Оправы из src/data/frames.js → public/images/frames/<id>.webp: из коллажей вырезается главный ракурс (crop),
//    белые поля обрезаются (trim), всё приводится к кадру 4:3 — карточки каталога выглядят одинаково.
// Запуск: npm run images [--frames] (только оправы). Свои фото — просто положите WebP в public/images.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { frames } from '../src/data/frames.js'

const out = path.resolve('public/images')
fs.mkdirSync(path.join(out, 'frames'), { recursive: true })
const onlyFrames = process.argv.includes('--frames')

async function download(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

if (!onlyFrames) {
  const list = JSON.parse(fs.readFileSync(path.resolve('scripts/images.json'), 'utf8'))
  for (const [name, img] of Object.entries(list)) {
    const buf = await download(img.url ?? `${img.src}?w=${img.width}&q=90&fm=jpg${img.params ? `&${img.params}` : ''}`)
    const meta = await sharp(buf).metadata()
    const full = Math.min(img.width, meta.width)
    await sharp(buf).resize({ width: full }).webp({ quality: 78 }).toFile(path.join(out, `${name}.webp`))
    await sharp(buf).resize({ width: Math.round(full / 2) }).webp({ quality: 74 }).toFile(path.join(out, `${name}-sm.webp`))
    console.log(`  ${name}  ${meta.width}×${meta.height}`)
  }
}

const W = 1200
const H = 900
for (const f of frames) {
  let buf = await download(f.src)
  let { width, height } = await sharp(buf).metadata()
  if (f.crop) {
    const [l, t, w, h] = f.crop
    buf = await sharp(buf)
      .extract({ left: Math.round(l * width), top: Math.round(t * height), width: Math.round(w * width), height: Math.round(h * height) })
      .toBuffer()
    ;({ width, height } = await sharp(buf).metadata())
  }
  // Фото на бежевом фоне студии (1620×1080) — кадрируем «cover», белые — обрезаем поля и вписываем с отступом
  const beige = width === 1620 || f.fit === 'cover'
  let pipeline
  if (beige) {
    pipeline = sharp(buf).resize(W, H, { fit: 'cover' })
  } else {
    const trimmed = await sharp(buf).trim({ background: '#ffffff', threshold: 18 }).toBuffer()
    const inner = await sharp(trimmed)
      .resize(Math.round(W * 0.84), Math.round(H * 0.74), { fit: 'inside' })
      .toBuffer()
    const m = await sharp(inner).metadata()
    pipeline = sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } }).composite([
      { input: inner, left: Math.round((W - m.width) / 2), top: Math.round((H - m.height) / 2) },
    ])
  }
  const flat = await pipeline.jpeg({ quality: 95 }).toBuffer()
  await sharp(flat).webp({ quality: 80 }).toFile(path.join(out, 'frames', `${f.id}.webp`))
  await sharp(flat).resize({ width: 600 }).webp({ quality: 76 }).toFile(path.join(out, 'frames', `${f.id}-sm.webp`))
  console.log(`  frame ${f.id}  ${width}×${height}${beige ? ' (cover)' : ''}`)
}
