import { routePath, useLang } from '../i18n/index.jsx'

// Внутренняя ссылка SPA: настоящий href (работает без JS и в новой вкладке),
// а обычный клик переключает раздел без перезагрузки.
export default function Link({ to, onClick, children, ...rest }) {
  const { lang, route, go } = useLang()
  return (
    <a
      href={routePath(lang, to)}
      aria-current={route === to ? 'page' : undefined}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        go(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
