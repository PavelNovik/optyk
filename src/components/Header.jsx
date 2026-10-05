import { useEffect, useState } from 'react'
import { brand, navIds, tel } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import LangSwitcher from './LangSwitcher.jsx'
import Link from './Link.jsx'
import Logo from './Logo.jsx'

export default function Header() {
  const { t, route, contact } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [route])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [open])

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header__inner">
        <Logo tag={t.logoTag} />

        <nav id="site-nav" className="nav" aria-label={t.nav.menu}>
          <ul>
            {navIds.map((id) => (
              <li key={id}>
                <Link to={id} className={route === id ? 'is-active' : undefined}>
                  {t.nav.items[id]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav__extra">
            <a href={tel} className="nav__phone">
              <Icon name="phone" size={18} /> {brand.phone}
            </a>
            <p className="nav__addr">
              <Icon name="pin" size={18} /> {brand.street}, {brand.city}
            </p>
          </div>
        </nav>

        <div className="header__actions">
          <LangSwitcher />
          <a href={tel} className="icon-btn header__call" aria-label={`${t.common.call}: ${brand.phone}`}>
            <Icon name="phone" size={20} />
          </a>
          <button type="button" className="btn btn--small header__cta" onClick={() => contact('exam')}>
            {t.nav.cta}
          </button>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t.nav.close : t.nav.open}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
