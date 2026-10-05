import { useEffect, useRef } from 'react'
import { TRYON_MAX, waLink } from '../config.js'
import { discount, frameImg, frames } from '../data/frames.js'
import { formatPrice, useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Карточка оправы во весь экран (<dialog>): фото, цена, «Zamów» (WhatsApp) и «Do przymiarki»
export default function FrameModal({ id, onClose }) {
  const { t, lang, tryon, toggleTryon } = useLang()
  const m = t.frames.modal
  const dialog = useRef(null)
  const f = frames.find((x) => x.id === id)

  useEffect(() => {
    const d = dialog.current
    if (f && !d.open) d.showModal()
    if (!f && d.open) d.close()
  }, [f])

  const inTryon = f && tryon.includes(f.id)
  const full = f && !inTryon && tryon.length >= TRYON_MAX
  const name = f ? `${f.brand} ${f.model}` : ''
  const off = f ? discount(f) : 0

  return (
    <dialog
      ref={dialog}
      className="frame-modal"
      aria-label={name}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
    >
      {f && (
        <div className="frame-modal__inner">
          <div className="frame-modal__media">
            <img src={frameImg(f.id, 'lg')} alt={name} width="1200" height="900" />
            {off > 0 && <span className="badge badge--sale">−{off}%</span>}
          </div>
          <div className="frame-modal__info">
            <p className="eyebrow">
              {f.brand} · {t.frames.g[f.g]}
            </p>
            <h2 className="frame-modal__title">{f.model}</h2>
            <p className="frame-modal__price">
              <strong>{formatPrice(f.price, lang)}</strong>
              {f.old && (
                <>
                  <s>{formatPrice(f.old, lang)}</s>
                  <span className="frame-modal__save">
                    {m.save} {formatPrice(f.old - f.price, lang)}
                  </span>
                </>
              )}
            </p>
            <p className="frame-modal__note">{m.includes}</p>
            <ul className="ticks">
              {m.perks.map((p) => (
                <li key={p}>
                  <Icon name="check" size={18} /> {p}
                </li>
              ))}
            </ul>
            <div className="frame-modal__actions">
              <a className="btn" href={waLink(m.orderMsg(name))} target="_blank" rel="noopener">
                <Icon name="whatsapp" size={20} /> {m.order}
              </a>
              <button type="button" className={`btn btn--ghost${inTryon ? ' is-on' : ''}`} disabled={full} onClick={() => toggleTryon(f.id)}>
                <Icon name={inTryon ? 'close' : 'home'} size={20} /> {inTryon ? m.inTryon : full ? m.full : m.tryon}
              </button>
            </div>
          </div>
          <button type="button" className="icon-btn frame-modal__close" aria-label={m.close} onClick={() => dialog.current.close()}>
            <Icon name="close" />
          </button>
        </div>
      )}
    </dialog>
  )
}
