import { useState } from 'react'
import { brand, mailLink, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export function ContactInfo() {
  const { t } = useLang()
  const c = t.contact
  return (
    <ul className="contact-info">
      <li>
        <Icon name="pin" />
        <div>
          <span className="contact-info__label">{c.address}</span>
          <a href={brand.maps} target="_blank" rel="noopener">
            {brand.street}
            <br />
            {brand.postalCode} {brand.city}
          </a>
        </div>
      </li>
      <li>
        <Icon name="clock" />
        <div>
          <span className="contact-info__label">{c.hoursTitle}</span>
          <Hours />
        </div>
      </li>
      <li>
        <Icon name="phone" />
        <div>
          <span className="contact-info__label">{c.phone}</span>
          <a href={tel}>{brand.phone}</a>
          <a href={waLink(t.wa.hello)} target="_blank" rel="noopener" className="contact-info__wa">
            <Icon name="whatsapp" size={18} /> WhatsApp
          </a>
        </div>
      </li>
      <li>
        <Icon name="mail" />
        <div>
          <span className="contact-info__label">{c.email}</span>
          <a href={mailLink(c.form.subject)}>{brand.email}</a>
        </div>
      </li>
      <li>
        <Icon name="instagram" />
        <div>
          <span className="contact-info__label">{c.social}</span>
          <span className="contact-info__social">
            <a href={brand.social.instagram} target="_blank" rel="noopener">
              Instagram
            </a>
            <a href={brand.social.facebook} target="_blank" rel="noopener">
              Facebook
            </a>
          </span>
        </div>
      </li>
    </ul>
  )
}

export function Hours() {
  const { t } = useLang()
  return (
    <dl className="hours">
      {t.contact.hours.map(([d, h]) => (
        <div key={d}>
          <dt>{d}</dt>
          <dd>{h}</dd>
        </div>
      ))}
    </dl>
  )
}

// Карта Google грузится только по клику — без cookies третьих сторон до согласия
export function MapEmbed() {
  const { t, lang } = useLang()
  const m = t.contact.map
  const [on, setOn] = useState(false)
  const src = `https://maps.google.com/maps?q=${brand.geo.lat},${brand.geo.lng}&z=16&hl=${lang}&output=embed`
  return (
    <div className="map">
      {on ? (
        <iframe title={m.title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="map__placeholder">
          <svg className="map__art" viewBox="0 0 400 260" aria-hidden="true">
            <path d="M-10 190 150 120 420 160M60-10l40 280M230-10l-30 280M-10 60l420 30" />
            <circle cx="186" cy="132" r="46" />
            <circle cx="186" cy="132" r="22" />
          </svg>
          <span className="map__pin">
            <Icon name="pin" size={30} />
          </span>
          <button type="button" className="btn btn--small" onClick={() => setOn(true)}>
            {m.load}
          </button>
          <p>{m.note}</p>
          <a href={brand.maps} target="_blank" rel="noopener" className="link-btn">
            {m.open} <Icon name="arrow" size={16} />
          </a>
        </div>
      )}
    </div>
  )
}

export function Faq() {
  const { t } = useLang()
  return (
    <section className="section faq">
      <div className="container faq__inner">
        <h2 className="h2" data-reveal>
          {t.faq.title}
        </h2>
        <div className="faq__list">
          {t.faq.items.map((f) => (
            <details key={f.q} data-reveal>
              <summary>
                {f.q}
                <Icon name="plus" size={22} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
