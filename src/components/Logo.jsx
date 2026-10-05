import Link from './Link.jsx'

// Знак: две линзы-«O» с перемычкой; в слове «Ok.Optyk» точка — фирменный лайм
export default function Logo({ tag, className = '' }) {
  return (
    <Link to="home" className={`logo ${className}`} aria-label="Ok.Optyk">
      <svg className="logo__mark" viewBox="0 0 44 24" width="44" height="24" aria-hidden="true">
        <circle cx="10" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="34" cy="12" r="8.5" fill="var(--lime)" stroke="currentColor" strokeWidth="2.4" />
        <path d="M18.5 11c1.6-2 5.4-2 7 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="31" cy="9" r="2" fill="#fff" opacity=".85" />
      </svg>
      <span className="logo__text">
        <span className="logo__word">
          Ok<i>.</i>Optyk
        </span>
        {tag && <span className="logo__tag">{tag}</span>}
      </span>
    </Link>
  )
}
