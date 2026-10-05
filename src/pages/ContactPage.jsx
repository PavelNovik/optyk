import { ContactInfo, Faq, MapEmbed } from '../components/Contact.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { useLang } from '../i18n/index.jsx'

export default function ContactPage() {
  const { t } = useLang()
  const c = t.contact
  return (
    <>
      <section className="page-hero page-hero--plain">
        <div className="container">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="h1 focus-in">{c.title}</h1>
          <p className="lead">{c.lead}</p>
        </div>
      </section>
      <section className="section section--flush">
        <div className="container contact">
          <div className="contact__aside">
            <ContactInfo />
            <MapEmbed />
          </div>
          <div className="card">
            <ContactForm title={c.form.title} />
          </div>
        </div>
      </section>
      <Faq />
    </>
  )
}
