import { useState } from 'react'
import { img } from '../config.js'
import { useLang } from '../i18n/index.jsx'

// «До / после»: слева — размытие и блики (обычное стекло), справа — чёткая картинка.
// Ручка — настоящий <input type="range">: работает с клавиатуры и на тач-экранах.
export default function CompareSlider() {
  const { t } = useLang()
  const c = t.lenses.compare
  const [pos, setPos] = useState(50)
  return (
    <figure className="compare" style={{ '--pos': `${pos}%` }} data-reveal>
      <div className="compare__stage">
        <img className="compare__img" src={img('book', 'sm')} srcSet={`${img('book', 'sm')} 800w, ${img('book')} 1600w`} sizes="(max-width: 900px) 92vw, 46vw" alt="" loading="lazy" />
        <div className="compare__before" aria-hidden="true">
          <img className="compare__img" src={img('book', 'sm')} alt="" loading="lazy" />
          <span className="compare__glare" />
        </div>
        <span className="compare__label compare__label--before">{c.before}</span>
        <span className="compare__label compare__label--after">{c.after}</span>
        <span className="compare__handle" aria-hidden="true" />
        <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label={c.handle} />
      </div>
      <figcaption>
        <strong>{c.title}</strong> {c.text}
      </figcaption>
    </figure>
  )
}
