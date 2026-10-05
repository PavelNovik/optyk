// Общие блоки: заголовок секции, «шапка» внутренней страницы, рейтинг, CTA, промо
import { brand, img, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export function SectionHead({ eyebrow, title, lead, align = 'left', children }) {
  return (
    <div className={`section-head section-head--${align}`} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  )
}

// Шапка внутренней страницы: текст + фото в «линзе»
export function PageHero({ eyebrow, title, lead, image, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <div className="page-hero__text">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1 focus-in">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {image && (
          <div className="page-hero__lens" aria-hidden="true">
            {image.startsWith('salon') ? (
              <img src={img(image)} alt="" />
            ) : (
              <img src={img(image, 'sm')} srcSet={`${img(image, 'sm')} 700w, ${img(image)} 1400w`} sizes="(max-width: 800px) 70vw, 34vw" alt="" />
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export function Stars({ value = brand.rating.value }) {
  return (
    <span className="stars" style={{ '--rating': value / 5 }} aria-hidden="true">
      ★★★★★
    </span>
  )
}

export function Rating({ compact }) {
  const { t, lang } = useLang()
  const v = brand.rating.value.toLocaleString(lang === 'en' ? 'en-GB' : lang)
  return (
    <span className={`rating${compact ? ' rating--compact' : ''}`}>
      <strong>{v}</strong>
      <Stars />
      <span>
        {brand.rating.count} {t.common.reviews} {t.common.rating}
      </span>
    </span>
  )
}

export function Reviews() {
  const { t, lang } = useLang()
  return (
    <section className="section reviews">
      <div className="container reviews__inner" data-reveal>
        <div className="reviews__score">
          <span className="reviews__big">{brand.rating.value.toLocaleString(lang === 'en' ? 'en-GB' : lang)}</span>
          <Stars />
          <span className="reviews__count">
            {brand.rating.count} {t.common.reviews} {t.common.rating}
          </span>
        </div>
        <div className="reviews__text">
          <h2 className="h2">{t.reviews.title}</h2>
          <p className="lead">{t.reviews.text}</p>
          <a className="btn btn--ghost" href={brand.maps} target="_blank" rel="noopener">
            <Icon name="star" size={20} /> {t.reviews.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

export function CtaBand() {
  const { t, contact } = useLang()
  return (
    <section className="section cta-band">
      <div className="container">
        <div className="cta-band__inner" data-reveal>
          <div className="cta-band__lens" aria-hidden="true" />
          <div className="cta-band__text">
            <h2 className="h2">{t.cta.title}</h2>
            <p>{t.cta.text}</p>
          </div>
          <div className="cta-band__actions">
            <button type="button" className="btn btn--lime" onClick={() => contact('exam')}>
              <Icon name="eye" size={20} /> {t.nav.cta}
            </button>
            <a className="btn btn--outline-light" href={tel}>
              <Icon name="phone" size={20} /> {brand.phone}
            </a>
            <a className="btn btn--outline-light" href={waLink(t.wa.hello)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={20} /> {t.common.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Promo() {
  const { t } = useLang()
  return (
    <section className="section promo">
      <div className="container">
        <div className="promo__inner" data-reveal>
          <div className="promo__head">
            <p className="eyebrow">{t.promo.eyebrow}</p>
            <h2 className="h2">{t.promo.title}</h2>
          </div>
          <ul className="promo__list">
            {t.promo.items.map((p) => (
              <li key={p.text}>
                <span className="promo__value">{p.value}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="promo__note">{t.promo.note}</p>
        </div>
      </div>
    </section>
  )
}

export function Trust() {
  const { t } = useLang()
  const icons = ['user', 'shield', 'truck', 'clock']
  return (
    <section className="trust" aria-label="Ok.Optyk">
      <ul className="container trust__list">
        {t.trust.map((s, i) => (
          <li key={s.label} data-reveal style={{ '--d': `${i * 70}ms` }}>
            <Icon name={icons[i]} size={26} />
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Steps({ steps, compact }) {
  return (
    <ol className={`steps${compact ? ' steps--compact' : ''}`}>
      {steps.map((s, i) => (
        <li key={s.title} data-reveal style={{ '--d': `${i * 90}ms` }}>
          <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  )
}
