import { Hours, MapEmbed } from '../components/Contact.jsx'
import { Brands, SalonStrip } from '../components/Home.jsx'
import Icon from '../components/Icon.jsx'
import { CtaBand, PageHero, Reviews } from '../components/Sections.jsx'
import { brand, img } from '../config.js'
import { useLang } from '../i18n/index.jsx'

export default function SalonPage() {
  const { t, contact } = useLang()
  const s = t.salon
  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} lead={s.lead} image="salon-3" />
      <section className="section">
        <div className="container split">
          <div className="split__media split__media--round" data-reveal>
            <img src={img('exam', 'sm')} srcSet={`${img('exam', 'sm')} 700w, ${img('exam')} 1400w`} sizes="(max-width: 900px) 92vw, 44vw" alt="" loading="lazy" />
          </div>
          <div data-reveal>
            <h2 className="h2">{s.exam.title}</h2>
            <ul className="ticks ticks--big">
              {s.exam.items.map((p) => (
                <li key={p}>
                  <Icon name="check" size={20} /> {p}
                </li>
              ))}
            </ul>
            <button type="button" className="btn" onClick={() => contact('exam')}>
              <Icon name="eye" size={20} /> {t.nav.cta}
            </button>
          </div>
        </div>
      </section>
      <SalonStrip page />
      <Brands />
      <section className="section">
        <div className="container visit">
          <div className="visit__info" data-reveal>
            <h2 className="h2">{s.visit}</h2>
            <p className="visit__addr">
              <Icon name="pin" /> {brand.street}, {brand.postalCode} {brand.city}
            </p>
            <Hours />
          </div>
          <MapEmbed />
        </div>
      </section>
      <Reviews />
      <CtaBand />
    </>
  )
}
