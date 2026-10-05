import ContactForm from '../components/ContactForm.jsx'
import Icon from '../components/Icon.jsx'
import Link from '../components/Link.jsx'
import { Faq } from '../components/Contact.jsx'
import { PageHero, Steps } from '../components/Sections.jsx'
import { TRYON_MAX } from '../config.js'
import { frameImg, frames } from '../data/frames.js'
import { formatPrice, useLang } from '../i18n/index.jsx'

export default function TryOnPage() {
  const { t, lang, tryon, toggleTryon } = useLang()
  const h = t.tryon
  const items = tryon.map((id) => frames.find((f) => f.id === id)).filter(Boolean)
  const intro = items.length ? h.msg(items.map((f, i) => `${i + 1}. ${f.brand} ${f.model} (#${f.id})`).join('\n')) : h.msgEmpty

  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} lead={h.lead} image="tryon">
        <ul className="perks">
          {h.perks.map((p) => (
            <li key={p}>
              <Icon name="check" size={18} /> {p}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section">
        <div className="container">
          <Steps steps={h.steps} />
        </div>
      </section>

      <section className="section tryon-order" id="zamow">
        <div className="container tryon-order__inner">
          <div className="tryon-box" data-reveal>
            <h2 className="h3">
              {h.picked}{' '}
              <span className="tryon-box__count">
                {items.length}/{TRYON_MAX}
              </span>
            </h2>
            {items.length ? (
              <ul className="tryon-box__list">
                {items.map((f) => (
                  <li key={f.id}>
                    <img src={frameImg(f.id)} alt="" width="600" height="450" />
                    <div>
                      <strong>{f.brand}</strong> {f.model}
                      <span>{formatPrice(f.price, lang)}</span>
                    </div>
                    <button type="button" className="icon-btn" onClick={() => toggleTryon(f.id)} aria-label={`${t.tray.remove}: ${f.brand} ${f.model}`}>
                      <Icon name="trash" size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="tryon-box__empty">{h.empty}</p>
            )}
            {items.length < TRYON_MAX && (
              <Link to="frames" className="btn btn--ghost">
                <Icon name="plus" size={18} /> {h.goCatalog}
              </Link>
            )}
          </div>
          <div className="card" data-reveal>
            <ContactForm variant="tryon" intro={intro} title={h.formTitle} />
          </div>
        </div>
      </section>
      <Faq />
    </>
  )
}
