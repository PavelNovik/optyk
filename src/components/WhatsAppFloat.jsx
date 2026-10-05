import { waLink } from '../config.js'
import { useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

export default function WhatsAppFloat() {
  const { t, tryon, route } = useLang()
  // Когда снизу открыта «коробка» примерки — кнопка поднимается над ней
  const raised = tryon.length > 0 && route !== 'tryon'
  return (
    <a className={`wa-float${raised ? ' is-raised' : ''}`} href={waLink(t.wa.hello)} target="_blank" rel="noopener" aria-label={t.wa.label}>
      <Icon name="whatsapp" size={28} />
    </a>
  )
}
