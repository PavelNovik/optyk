import { mailLink, waLink } from './config.js'

// Формы без бэкенда: собираем текст и открываем WhatsApp или почтовую программу.
// fields — [[подпись, значение], …]; пустые значения пропускаем.
export function composeMessage(fields) {
  return fields
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => (k ? `${k}: ${String(v).trim()}` : String(v).trim()))
    .join('\n')
}

export function sendMessage(channel, text, subject) {
  const url = channel === 'mail' ? mailLink(subject, text) : waLink(text)
  if (channel === 'mail') window.location.href = url
  else window.open(url, '_blank', 'noopener')
}
