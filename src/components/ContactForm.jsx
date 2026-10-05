import { useEffect, useId, useState } from 'react'
import { useLang } from '../i18n/index.jsx'
import { composeMessage, sendMessage } from '../send.js'
import Icon from './Icon.jsx'

// Одна форма на три случая: обычный контакт, заказ Home Try-On (variant="tryon", intro — список оправ)
// и запрос для фирм (variant="business": поля «Firma», «Liczba pracowników»).
export default function ContactForm({ variant = 'contact', intro = '', title, lead }) {
  const { t } = useLang()
  const f = t.contact.form
  const { preset } = useLang()
  const uid = useId()
  const [data, setData] = useState({
    name: '',
    phone: '',
    company: '',
    people: '',
    address: '',
    topic: variant === 'business' ? 'business' : variant === 'tryon' ? 'tryon' : 'exam',
    message: '',
  })
  const [channel, setChannel] = useState('wa')
  const [status, setStatus] = useState(null)

  // Пришли с кнопки «Umów badanie» / «Zapytaj o dobór» — подставляем тему и текст
  useEffect(() => {
    if (variant === 'contact' && preset) setData((d) => ({ ...d, topic: preset.topic, message: preset.message || d.message }))
  }, [preset, variant])

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!data.name.trim() || !data.phone.trim()) {
      setStatus('error')
      return
    }
    const text = composeMessage([
      ['', intro],
      [f.topic, variant === 'contact' ? f.topics[data.topic] : null],
      [f.company, data.company],
      [f.people, data.people],
      [t.tryon.address, data.address],
      ['', data.message],
      [f.name, data.name],
      [f.phone, data.phone],
    ])
    sendMessage(channel, text, `${f.subject}: ${f.topics[data.topic]}`)
    setStatus('sent')
  }

  const id = (k) => `${uid}-${k}`

  return (
    <form className="form" onSubmit={submit} noValidate>
      {title && <h2 className="h3">{title}</h2>}
      {lead && <p className="form__lead">{lead}</p>}
      <div className="form__grid">
        <div className="field">
          <label htmlFor={id('name')}>{f.name} *</label>
          <input id={id('name')} autoComplete="name" value={data.name} onChange={set('name')} required />
        </div>
        <div className="field">
          <label htmlFor={id('phone')}>{f.phone} *</label>
          <input id={id('phone')} type="tel" autoComplete="tel" inputMode="tel" value={data.phone} onChange={set('phone')} required />
        </div>
        {variant === 'business' && (
          <>
            <div className="field">
              <label htmlFor={id('company')}>{f.company}</label>
              <input id={id('company')} autoComplete="organization" value={data.company} onChange={set('company')} />
            </div>
            <div className="field">
              <label htmlFor={id('people')}>{f.people}</label>
              <input id={id('people')} type="number" min="1" inputMode="numeric" value={data.people} onChange={set('people')} />
            </div>
          </>
        )}
        {variant === 'tryon' && (
          <div className="field field--wide">
            <label htmlFor={id('address')}>{t.tryon.address}</label>
            <input id={id('address')} autoComplete="street-address" value={data.address} onChange={set('address')} />
          </div>
        )}
        {variant === 'contact' && (
          <div className="field field--wide">
            <span className="field__label" id={id('topic')}>{f.topic}</span>
            <div className="chips" role="radiogroup" aria-labelledby={id('topic')}>
              {Object.entries(f.topics).map(([k, v]) => (
                <button key={k} type="button" role="radio" aria-checked={data.topic === k} className={`chip chip--small${data.topic === k ? ' is-on' : ''}`} onClick={() => setData((d) => ({ ...d, topic: k }))}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="field field--wide">
          <label htmlFor={id('message')}>{f.message}</label>
          <textarea id={id('message')} rows="4" placeholder={f.placeholder} value={data.message} onChange={set('message')} />
        </div>
      </div>

      <div className="form__foot">
        <div className="segmented" role="radiogroup" aria-label={f.channel}>
          <span className="segmented__label">{f.channel}</span>
          {[
            ['wa', 'whatsapp', f.wa],
            ['mail', 'mail', f.mail],
          ].map(([k, icon, label]) => (
            <button key={k} type="button" role="radio" aria-checked={channel === k} className={channel === k ? 'is-on' : ''} onClick={() => setChannel(k)}>
              <Icon name={icon} size={18} /> {label}
            </button>
          ))}
        </div>
        <button type="submit" className="btn btn--big">
          <Icon name="send" size={20} /> {f.submit}
        </button>
      </div>
      <p className="form__consent">{f.consent}</p>
      <p className={`form__status${status ? ` is-${status}` : ''}`} role="status">
        {status === 'error' ? f.required : status === 'sent' ? f.sent : ''}
      </p>
    </form>
  )
}
