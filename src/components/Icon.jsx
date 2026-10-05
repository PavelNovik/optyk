// Иконки в стиле «оптики»: тонкая линия 1.6, скруглённые концы (stroke = currentColor)
const paths = {
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
      <path d="M9.2 8.6c.3-.6.6-.6.9-.6h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5a6 6 0 0 0 2.8 2.5c.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.8 1.5-.6.4-1.5.6-3.3-.2a9 9 0 0 1-3.9-3.6c-.6-1-.7-2-.4-2.6Z" />
    </>
  ),
  facebook: <path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.5 1.6-1.5H17V4.4a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8.5v3H11V21" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
  arrowUp: <path d="M12 20V5m-6 6 6-6 6 6" />,
  arrowLeft: <path d="M14.5 5.5 8 12l6.5 6.5" />,
  arrowRight: <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  plus: <path d="M12 5v14M5 12h14" />,
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8Z" />,
  glasses: (
    <>
      <circle cx="6.5" cy="14" r="4" />
      <circle cx="17.5" cy="14" r="4" />
      <path d="M10.5 14c.5-1 2.5-1 3 0M2.5 13 4 6.5M21.5 13 20 6.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  screen: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M9 20h6M12 16.5V20" />
    </>
  ),
  car: (
    <>
      <path d="M4 16.5V12l2-5h12l2 5v4.5Z" />
      <path d="M4 12h16M6 16.5V19M18 16.5V19" />
      <circle cx="7.5" cy="14.3" r=".6" fill="currentColor" />
      <circle cx="16.5" cy="14.3" r=".6" fill="currentColor" />
    </>
  ),
  lens: (
    <>
      <ellipse cx="12" cy="12" rx="5" ry="8.5" />
      <path d="M12 3.5c2.5 2 2.5 15 0 17" />
    </>
  ),
  layers: <path d="m12 4 8.5 4.5L12 13 3.5 8.5Zm-8.5 8L12 17l8.5-4.5M3.5 16 12 20.5l8.5-4.5" />,
  building: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" />
      <path d="M8.5 7.5h2M13.5 7.5h2M8.5 11.5h2M13.5 11.5h2M10 20.5v-4h4v4" />
    </>
  ),
  box: (
    <>
      <path d="m3.5 7.5 8.5-4 8.5 4v9l-8.5 4-8.5-4Z" />
      <path d="m3.5 7.5 8.5 4 8.5-4M12 11.5v9" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7v9h-5.5v-5.5h-5V20H4Z" />,
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11ZM13.5 9.5h4l3 3.2v2.8h-7" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M7 11.5 12 10l5 1.5M12 10v5.5l-2.5 5M12 15.5l2.5 5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  trash: <path d="M5 7h14M10 7V4.5h4V7M6.5 7l1 13h9l1-13" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  send: <path d="M20.5 3.5 3.5 10.5l7 3 3 7Zm0 0-10 10" />,
}

export default function Icon({ name, size = 22, className, label }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
