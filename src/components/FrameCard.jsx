import { useRef } from 'react'
import { TRYON_MAX } from '../config.js'
import { discount, frameImg } from '../data/frames.js'
import { formatPrice, useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Карточка оправы. На десктопе над фото — «лупа»: круглая линза с увеличением 2.4× следует за курсором.
export default function FrameCard({ frame: f }) {
  const { t, lang, tryon, toggleTryon, openFrame } = useLang()
  const media = useRef(null)
  const inTryon = tryon.includes(f.id)
  const full = !inTryon && tryon.length >= TRYON_MAX
  const off = discount(f)
  const name = `${f.brand} ${f.model}`

  const onMove = (e) => {
    const el = media.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    el.style.setProperty('--x', `${x}%`)
    el.style.setProperty('--y', `${y}%`)
    if (!el.dataset.zoom) {
      el.dataset.zoom = '1'
      el.style.setProperty('--zoom-img', `url(${frameImg(f.id, 'lg')})`)
    }
  }

  return (
    <article className="frame-card">
      <button type="button" className="frame-card__media" ref={media} onPointerMove={onMove} onClick={() => openFrame(f.id)} aria-label={`${t.frames.card.view}: ${name}`}>
        <img src={frameImg(f.id)} alt={name} width="600" height="450" loading="lazy" decoding="async" />
        <span className="frame-card__loupe" aria-hidden="true" />
        <span className="frame-card__badges">
          {off > 0 && <span className="badge badge--sale">−{off}%</span>}
          {f.tag && <span className={`badge badge--${f.tag}`}>{t.frames.tags[f.tag]}</span>}
        </span>
      </button>
      <div className="frame-card__body">
        <p className="frame-card__brand">
          {f.brand} <span>· {t.frames.g[f.g]}</span>
        </p>
        <h3 className="frame-card__model">{f.model}</h3>
        <p className="frame-card__price">
          <strong>{formatPrice(f.price, lang)}</strong>
          {f.old && <s>{formatPrice(f.old, lang)}</s>}
        </p>
      </div>
      <button
        type="button"
        className={`frame-card__try${inTryon ? ' is-on' : ''}`}
        aria-pressed={inTryon}
        disabled={full}
        title={full ? t.frames.modal.full : undefined}
        onClick={() => toggleTryon(f.id)}
      >
        <Icon name={inTryon ? 'check' : 'plus'} size={18} />
        {inTryon ? t.frames.card.added : t.frames.card.add}
      </button>
    </article>
  )
}
