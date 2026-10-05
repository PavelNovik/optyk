import { useRef, useState } from 'react'
import { img } from '../config.js'
import { useLang } from '../i18n/index.jsx'

// «До / после»: слева — размытие и блики (обычное стекло), справа — чёткая картинка.
// Мышь и палец — свои pointer-события на всей картинке (тянуть можно из любой точки),
// клавиатура и скринридеры — через <input type="range">.
export default function CompareSlider() {
  const { t } = useLang()
  const c = t.lenses.compare
  const [pos, setPos] = useState(50)
  const stage = useRef(null)
  const dragging = useRef(false)

  const moveTo = (clientX) => {
    const r = stage.current.getBoundingClientRect()
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.round(Math.min(100, Math.max(0, p))))
  }

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e) => dragging.current && moveTo(e.clientX)
  const stop = () => (dragging.current = false)

  return (
    <figure className="compare" style={{ '--pos': `${pos}%` }} data-reveal>
      <div
        className="compare__stage"
        ref={stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
      >
        <img className="compare__img" src={img('book', 'sm')} srcSet={`${img('book', 'sm')} 800w, ${img('book')} 1600w`} sizes="(max-width: 900px) 92vw, 46vw" alt="" loading="lazy" draggable="false" />
        <div className="compare__before" aria-hidden="true">
          <img className="compare__img" src={img('book', 'sm')} alt="" loading="lazy" draggable="false" />
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
