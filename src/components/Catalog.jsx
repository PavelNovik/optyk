import { useMemo, useState } from 'react'
import { brands, discount, featuredIds, frames } from '../data/frames.js'
import { formatPrice, useLang } from '../i18n/index.jsx'
import FrameCard from './FrameCard.jsx'
import Icon from './Icon.jsx'
import Link from './Link.jsx'
import { SectionHead } from './Sections.jsx'

const MAX_PRICE = Math.ceil(Math.max(...frames.map((f) => f.price)) / 50) * 50

// Хиты на главной: 8 оправ + ссылка на весь каталог
export function FeaturedFrames() {
  const { t } = useLang()
  const list = featuredIds.map((id) => frames.find((f) => f.id === id))
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow={t.frames.eyebrow} title={t.frames.featured} lead={t.frames.lead}>
          <Link to="frames" className="btn btn--ghost section-head__link">
            {t.frames.all} <Icon name="arrow" size={18} />
          </Link>
        </SectionHead>
        <div className="frame-grid">
          {list.map((f) => (
            <FrameCard key={f.id} frame={f} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Полный каталог с фильтрами: для кого, марка, цена, только промо, сортировка
export function FramesCatalog() {
  const { t, lang, gender, setGender } = useLang()
  const fl = t.frames.filters
  const [brand, setBrand] = useState('all')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [sale, setSale] = useState(false)
  const [sort, setSort] = useState('default')

  const list = useMemo(() => {
    const out = frames.filter(
      (f) =>
        (gender === 'all' || f.g === gender || (gender !== 'u' && f.g === 'u')) &&
        (brand === 'all' || f.brand === brand) &&
        f.price <= maxPrice &&
        (!sale || f.old)
    )
    const by = {
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      discount: (a, b) => discount(b) - discount(a),
    }[sort]
    return by ? [...out].sort(by) : out
  }, [gender, brand, maxPrice, sale, sort])

  const dirty = gender !== 'all' || brand !== 'all' || maxPrice !== MAX_PRICE || sale || sort !== 'default'
  const reset = () => {
    setGender('all')
    setBrand('all')
    setMaxPrice(MAX_PRICE)
    setSale(false)
    setSort('default')
  }

  return (
    <section className="section catalog" id="katalog">
      <div className="container">
        <div className="filters" role="group" aria-label={t.frames.all}>
          <div className="filters__row">
            <div className="chips" role="radiogroup" aria-label={fl.gender}>
              {['all', 'w', 'm', 'u'].map((g) => (
                <button key={g} type="button" role="radio" aria-checked={gender === g} className={`chip${gender === g ? ' is-on' : ''}`} onClick={() => setGender(g)}>
                  {fl[g]}
                </button>
              ))}
            </div>
            <label className="toggle">
              <input type="checkbox" checked={sale} onChange={(e) => setSale(e.target.checked)} />
              <span className="toggle__track" aria-hidden="true" />
              {fl.sale}
            </label>
          </div>
          <div className="filters__row">
            <label className="field field--inline">
              <span>{fl.brand}</span>
              <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="all">{fl.allBrands}</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="field field--inline field--range">
              <span>
                {fl.price} <output>{formatPrice(maxPrice, lang)}</output>
              </span>
              <input type="range" min="150" max={MAX_PRICE} step="25" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
            </label>
            <label className="field field--inline">
              <span>{fl.sort}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(fl.sorts).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="filters__status">
            <p aria-live="polite">{fl.count(list.length)}</p>
            {dirty && (
              <button type="button" className="link-btn" onClick={reset}>
                <Icon name="close" size={16} /> {fl.reset}
              </button>
            )}
          </div>
        </div>

        {list.length ? (
          <div className="frame-grid">
            {list.map((f) => (
              <FrameCard key={f.id} frame={f} />
            ))}
          </div>
        ) : (
          <p className="empty">{t.frames.empty}</p>
        )}
        <p className="catalog__note">
          <Icon name="glasses" size={20} /> {t.frames.note}
        </p>
      </div>
    </section>
  )
}
