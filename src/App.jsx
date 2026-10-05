import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Lightbox from './components/Lightbox.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import FrameModal from './components/FrameModal.jsx'
import TryOnTray from './components/TryOnTray.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import HomePage from './pages/HomePage.jsx'
import FramesPage from './pages/FramesPage.jsx'
import LensesPage from './pages/LensesPage.jsx'
import TryOnPage from './pages/TryOnPage.jsx'
import BusinessPage from './pages/BusinessPage.jsx'
import SalonPage from './pages/SalonPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { TRYON_MAX, img, salonPhotos } from './config.js'
import { frames } from './data/frames.js'
import { useReveal } from './hooks/useReveal.js'
import { LangProvider, dictionaries, langFromPath, routeFromPath, routePath, useLang } from './i18n/index.jsx'
import { applyHead } from './seo.js'

const TRYON_KEY = 'okoptyk-tryon-v1'

export default function App({ initialLang, initialRoute = 'home' }) {
  const [lang, setLangState] = useState(initialLang)
  const [route, setRoute] = useState(initialRoute)
  const [viewer, setViewer] = useState(null)
  const [frameId, setFrameId] = useState(null)
  const [tryon, setTryon] = useState([])
  const [gender, setGender] = useState('all')
  const [preset, setPreset] = useState(null) // { topic, message } для формы контактов
  const mainRef = useRef(null)
  const firstRender = useRef(true)
  const loaded = useRef(false)
  useReveal(`${lang}/${route}`)

  const go = useCallback(
    (next) => {
      if (next !== route) history.pushState(null, '', routePath(lang, next))
      setRoute(next)
      if (next === route) window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [lang, route]
  )

  const setLang = useCallback(
    (next) => {
      if (next === lang) return
      history.pushState(null, '', routePath(next, route))
      setLangState(next)
    },
    [lang, route]
  )

  useEffect(() => {
    applyHead(lang, route)
  }, [lang, route])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [route])

  useEffect(() => {
    const onPop = () => {
      setLangState(langFromPath(location.pathname))
      setRoute(routeFromPath(location.pathname))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Przymiarka Home Try-On — помним между визитами (после гидратации, чтобы не расходиться с пререндером)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TRYON_KEY))
      if (Array.isArray(saved)) setTryon(saved.filter((id) => frames.some((f) => f.id === id)).slice(0, TRYON_MAX))
    } catch {
      /* пусто или нет доступа */
    }
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(TRYON_KEY, JSON.stringify(tryon))
    } catch {
      /* приватный режим */
    }
  }, [tryon])

  const toggleTryon = useCallback(
    (id) =>
      setTryon((list) => (list.includes(id) ? list.filter((x) => x !== id) : list.length < TRYON_MAX ? [...list, id] : list)),
    []
  )

  const contact = useCallback(
    (topic, message = '') => {
      setPreset({ topic, message, at: Date.now() })
      go('contact')
    },
    [go]
  )

  const openFrames = useCallback(
    (g = 'all') => {
      setGender(g)
      go('frames')
    },
    [go]
  )

  const t = dictionaries[lang]
  const photos = useMemo(() => salonPhotos.map((image, i) => ({ src: img(image), alt: t.salon.alts[i] })), [t])

  const shop = { tryon, toggleTryon, setTryon, openFrame: setFrameId, contact, openFrames, gender, setGender, preset, openGallery: setViewer }

  const pages = {
    home: <HomePage />,
    frames: <FramesPage />,
    lenses: <LensesPage />,
    tryon: <TryOnPage />,
    business: <BusinessPage />,
    salon: <SalonPage />,
    contact: <ContactPage />,
  }

  return (
    <LangProvider value={{ lang, setLang, route, go, ...shop }}>
      <SkipLink />
      <CookieConsent />
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <div key={route} className={`page page--${route}`}>
          {pages[route]}
        </div>
      </main>
      <Footer />
      <TryOnTray />
      <WhatsAppFloat />
      <FrameModal id={frameId} onClose={() => setFrameId(null)} />
      <Lightbox items={photos} index={viewer} setIndex={setViewer} />
    </LangProvider>
  )
}

function SkipLink() {
  const { t } = useLang()
  return <a href="#main" className="skip-link">{t.nav.skip}</a>
}
