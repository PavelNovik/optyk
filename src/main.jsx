import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { langFromPath, routeFromPath } from './i18n/index.jsx'
// Шрифты с нашего домена (без Google Fonts CDN — RODO); latin-ext — польские буквы, cyrillic — украинская версия.
// Jost — геометрический гротеск с круглыми «O» (как линзы), Mulish — текст, Playfair italic — акценты, Source Code Pro — цифры/спеки
import '@fontsource/jost/latin-500.css'
import '@fontsource/jost/latin-ext-500.css'
import '@fontsource/jost/cyrillic-500.css'
import '@fontsource/jost/latin-600.css'
import '@fontsource/jost/latin-ext-600.css'
import '@fontsource/jost/cyrillic-600.css'
import '@fontsource/mulish/latin-400.css'
import '@fontsource/mulish/latin-ext-400.css'
import '@fontsource/mulish/cyrillic-400.css'
import '@fontsource/mulish/latin-700.css'
import '@fontsource/mulish/latin-ext-700.css'
import '@fontsource/mulish/cyrillic-700.css'
import '@fontsource/playfair-display/latin-400-italic.css'
import '@fontsource/playfair-display/latin-ext-400-italic.css'
import '@fontsource/playfair-display/cyrillic-400-italic.css'
import '@fontsource/source-code-pro/latin-500.css'
import '@fontsource/source-code-pro/latin-ext-500.css'
import '@fontsource/source-code-pro/cyrillic-500.css'
import './styles/variables.css'
import './styles/global.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App initialLang={langFromPath(location.pathname)} initialRoute={routeFromPath(location.pathname)} />
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
