import ContactForm from '../components/ContactForm.jsx'
import Icon from '../components/Icon.jsx'
import { PageHero, SectionHead, Steps } from '../components/Sections.jsx'
import { img } from '../config.js'
import { useLang } from '../i18n/index.jsx'

export default function BusinessPage() {
  const { t } = useLang()
  const b = t.business
  return (
    <>
      <PageHero eyebrow={b.eyebrow} title={b.title} lead={b.lead} image="office" />
      <section className="stats-band">
        <ul className="container stats">
          {b.stats.map((s, i) => (
            <li key={s.label} data-reveal style={{ '--d': `${i * 90}ms` }}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <div className="container split">
          <div data-reveal>
            <SectionHead title={b.includes.title} />
            <ul className="ticks ticks--big">
              {b.includes.items.map((p) => (
                <li key={p}>
                  <Icon name="check" size={20} /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="split__media" data-reveal>
            <img src={img('exam', 'sm')} srcSet={`${img('exam', 'sm')} 700w, ${img('exam')} 1400w`} sizes="(max-width: 900px) 92vw, 44vw" alt="" loading="lazy" />
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <Steps steps={b.steps} />
        </div>
      </section>
      <section className="section">
        <div className="container narrow card" data-reveal>
          <ContactForm variant="business" intro={b.formTitle} title={b.formTitle} lead={b.formLead} />
        </div>
      </section>
    </>
  )
}
