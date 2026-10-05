import { TRYON_MAX } from '../config.js'
import { frameImg, frames } from '../data/frames.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

// Плавающая «коробка» Home Try-On: миниатюры выбранных оправ (до 5) и переход к заказу
export default function TryOnTray() {
  const { t, tryon, toggleTryon, setTryon, go, route } = useLang()
  if (!tryon.length || route === 'tryon') return null
  const items = tryon.map((id) => frames.find((f) => f.id === id)).filter(Boolean)

  return (
    <aside className="tray" aria-label={t.tray.title}>
      <div className="tray__head">
        <Icon name="box" size={20} />
        <strong>{t.tray.title}</strong>
        <span className="tray__count">{t.tray.hint(items.length, TRYON_MAX)}</span>
      </div>
      <ul className="tray__slots">
        {Array.from({ length: TRYON_MAX }, (_, i) => {
          const f = items[i]
          return (
            <li key={f ? f.id : `empty-${i}`} className={f ? 'is-filled' : ''}>
              {f && (
                <button type="button" onClick={() => toggleTryon(f.id)} aria-label={`${t.tray.remove}: ${f.brand} ${f.model}`}>
                  <img src={frameImg(f.id)} alt="" width="600" height="450" />
                  <span className="tray__x" aria-hidden="true">
                    <Icon name="close" size={12} />
                  </span>
                </button>
              )}
            </li>
          )
        })}
      </ul>
      <div className="tray__actions">
        <button type="button" className="btn btn--small" onClick={() => go('tryon')}>
          {t.tray.send} <Icon name="arrow" size={18} />
        </button>
        <button type="button" className="link-btn" onClick={() => setTryon([])}>
          {t.tray.clear}
        </button>
      </div>
    </aside>
  )
}
