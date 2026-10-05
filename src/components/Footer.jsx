import { brand, navIds, tel, waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import { openCookieSettings } from './CookieConsent.jsx'
import { Hours } from './Contact.jsx'
import Icon from './Icon.jsx'
import Link from './Link.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  const { t } = useLang()
  const year = 2026
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>{t.footer.about}</p>
          <div className="footer__social">
            <a href={brand.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="icon-btn">
              <Icon name="instagram" />
            </a>
            <a href={brand.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="icon-btn">
              <Icon name="facebook" />
            </a>
            <a href={waLink(t.wa.hello)} target="_blank" rel="noopener" aria-label="WhatsApp" className="icon-btn">
              <Icon name="whatsapp" />
            </a>
          </div>
        </div>
        <nav aria-label={t.footer.nav}>
          <h2 className="footer__title">{t.footer.nav}</h2>
          <ul>
            <li>
              <Link to="home">{t.nav.home}</Link>
            </li>
            {navIds.map((id) => (
              <li key={id}>
                <Link to={id}>{t.nav.items[id]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="footer__title">{t.footer.contact}</h2>
          <address>
            <a href={brand.maps} target="_blank" rel="noopener">
              {brand.street}, {brand.postalCode} {brand.city}
            </a>
            <a href={tel}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>
        <div>
          <h2 className="footer__title">{t.contact.hoursTitle}</h2>
          <Hours />
        </div>
      </div>
      <div className="container footer__bottom">
        <p>
          © {year} {brand.name}. {t.footer.rights}
        </p>
        <p>{t.footer.photos}</p>
        <button type="button" className="link-btn" onClick={openCookieSettings}>
          {t.footer.cookies}
        </button>
        <a href="#main" className="link-btn">
          {t.footer.top} <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  )
}
