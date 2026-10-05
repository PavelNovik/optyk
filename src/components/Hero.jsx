import { img } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import { Rating } from './Sections.jsx'

// Главный экран: заголовок «наводится на резкость», фото в большой линзе,
// во второй линзе — таблица Снеллена, перемычка между ними — как у очков.
export default function Hero() {
  const { t, contact, openFrames, go } = useLang()
  const h = t.hero
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow hero__eyebrow">
            <Icon name="pin" size={18} /> {h.eyebrow}
          </p>
          <h1 className="hero__title">
            {h.title.map((line, i) => (
              <span key={line} className="focus-in" style={{ '--d': `${i * 160}ms` }}>
                {line}
              </span>
            ))}
            <em className="focus-in" style={{ '--d': '360ms' }}>
              {h.accent}
            </em>
          </h1>
          <p className="lead hero__lead">{h.lead}</p>
          <div className="hero__actions">
            <button type="button" className="btn btn--big" onClick={() => contact('exam')}>
              <Icon name="eye" size={22} /> {h.cta1}
            </button>
            <button type="button" className="btn btn--big btn--ghost" onClick={() => openFrames('all')}>
              <Icon name="glasses" size={22} /> {h.cta2}
            </button>
          </div>
          <Rating />
        </div>

        <div className="hero__visual">
          <div className="hero__lens hero__lens--photo">
            <img
              src={img('hero', 'sm')}
              srcSet={`${img('hero', 'sm')} 1000w, ${img('hero')} 2000w`}
              sizes="(max-width: 900px) 86vw, 44vw"
              alt=""
              fetchPriority="high"
            />
            <span className="hero__glare" aria-hidden="true" />
          </div>
          <div className="hero__lens hero__lens--chart" role="img" aria-label={h.chart}>
            <span className="snellen" aria-hidden="true">
              <b>E</b>
              <b>F P</b>
              <b>T O Z</b>
              <b>L P E D</b>
              <b>P E C F D</b>
            </span>
          </div>
          <button type="button" className="hero__badge" onClick={() => go('tryon')}>
            <Icon name="box" size={22} />
            <span>
              <strong>{h.badge.title}</strong>
              {h.badge.text}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
