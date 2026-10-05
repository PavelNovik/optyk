// Блоки главной (и повторно — на внутренних страницах): категории, услуги, Home Try-On, салон, линзы-тизер
import { brandsCarried, img, salonPhotos } from '../config.js'
import { lenses } from '../data/lenses.js'
import { formatPrice, useLang } from '../i18n/index.jsx'
import CompareSlider from './CompareSlider.jsx'
import Icon from './Icon.jsx'
import Link from './Link.jsx'
import { SectionHead, Steps } from './Sections.jsx'

export function Categories() {
  const { t, openFrames, go, contact } = useLang()
  const c = t.cats
  const items = [
    { id: 'w', image: 'hero', action: () => openFrames('w') },
    { id: 'm', image: 'man', action: () => openFrames('m') },
    { id: 'sun', image: 'sun', action: () => go('lenses') },
    { id: 'kids', image: 'kids', action: () => contact('exam') },
  ]
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <ul className="cats">
          {items.map(({ id, image, action }, i) => (
            <li key={id} data-reveal style={{ '--d': `${i * 80}ms` }}>
              <button type="button" className="cat" onClick={action}>
                <span className="cat__lens">
                  <img src={img(image, 'sm')} alt="" loading="lazy" width="700" height="700" />
                </span>
                <span className="cat__title">
                  {c.items[id].title} <Icon name="arrow" size={20} />
                </span>
                <span className="cat__text">{c.items[id].text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Services() {
  const { t, go, contact } = useLang()
  const s = t.services
  const items = [
    { id: 'exam', icon: 'eye', action: () => contact('exam') },
    { id: 'custom', icon: 'glasses', action: () => go('frames') },
    { id: 'sun', icon: 'sun', action: () => go('lenses') },
    { id: 'business', icon: 'building', action: () => go('business') },
  ]
  return (
    <section className="section services">
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} />
        <ul className="services__list">
          {items.map(({ id, icon, action }, i) => (
            <li key={id} data-reveal style={{ '--d': `${i * 80}ms` }}>
              <button type="button" className="service" onClick={action}>
                <span className="service__icon">
                  <Icon name={icon} size={28} />
                </span>
                <h3>{s.items[id].title}</h3>
                <p>{s.items[id].text}</p>
                <Icon name="arrow" size={20} className="service__arrow" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function TryOnTeaser() {
  const { t } = useLang()
  const h = t.tryon
  return (
    <section className="section tryon-teaser">
      <div className="container tryon-teaser__inner">
        <div className="tryon-teaser__media" data-reveal>
          <img src={img('tryon', 'sm')} srcSet={`${img('tryon', 'sm')} 700w, ${img('tryon')} 1400w`} sizes="(max-width: 900px) 92vw, 44vw" alt="" loading="lazy" />
          <span className="tryon-teaser__stamp" aria-hidden="true">
            0 zł
          </span>
        </div>
        <div>
          <SectionHead eyebrow={h.eyebrow} title={h.title} lead={h.lead} />
          <Steps steps={h.steps} compact />
          <ul className="perks" data-reveal>
            {h.perks.map((p) => (
              <li key={p}>
                <Icon name="check" size={18} /> {p}
              </li>
            ))}
          </ul>
          <Link to="tryon" className="btn">
            {t.tray.send} <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function LensesTeaser() {
  const { t, lang } = useLang()
  const l = t.lenses
  const min = Math.min(...lenses.map((x) => x.price))
  return (
    <section className="section lenses-teaser">
      <div className="container lenses-teaser__inner">
        <div>
          <SectionHead eyebrow={l.eyebrow} title={l.title} lead={l.lead} />
          <ul className="mini-lenses" data-reveal>
            {lenses.slice(0, 5).map((x) => (
              <li key={x.id}>
                <span>{l.items[x.id].name}</span>
                <span className="dots" aria-hidden="true" />
                <strong>{formatPrice(x.price, lang)}</strong>
              </li>
            ))}
          </ul>
          <Link to="lenses" className="btn btn--ghost">
            {l.teaser.replace(/\d+ zł/, formatPrice(min, lang))} <Icon name="arrow" size={18} />
          </Link>
        </div>
        <CompareSlider />
      </div>
    </section>
  )
}

// На главной — с описанием и ссылкой на страницу салона, на странице салона — только галерея
export function SalonStrip({ page }) {
  const { t, openGallery } = useLang()
  return (
    <section className="section salon-strip">
      <div className="container">
        {page ? (
          <SectionHead eyebrow={t.salon.eyebrow} title={t.salon.gallery} />
        ) : (
          <SectionHead eyebrow={t.salon.eyebrow} title={t.salon.title} lead={t.salon.lead}>
            <Link to="salon" className="btn btn--ghost section-head__link">
              {t.salon.visit} <Icon name="arrow" size={18} />
            </Link>
          </SectionHead>
        )}
        <ul className="gallery">
          {salonPhotos.map((p, i) => (
            <li key={p} data-reveal style={{ '--d': `${i * 70}ms` }}>
              <button type="button" onClick={() => openGallery(i)} aria-label={t.salon.alts[i]}>
                <img src={img(p)} alt={t.salon.alts[i]} loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Brands() {
  const { t } = useLang()
  const row = [...brandsCarried, ...brandsCarried]
  return (
    <section className="brands" aria-label={t.salon.brands}>
      <p className="eyebrow container">{t.salon.brands}</p>
      <div className="brands__track">
        <ul>
          {row.map((b, i) => (
            <li key={i} aria-hidden={i >= brandsCarried.length ? 'true' : undefined}>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
