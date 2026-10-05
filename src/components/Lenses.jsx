import { useState } from 'react'
import { lenses, uses } from '../data/lenses.js'
import { formatPrice, useLang } from '../i18n/index.jsx'
import Icon from './Icon.jsx'

const useIcons = { everyday: 'eye', screen: 'screen', drive: 'car', sun: 'sun', thin: 'lens' }

// Подборщик: чипы «для чего» подсвечивают подходящие линзы; карточки — как «рецепт» с индексом и покрытиями
export default function LensPicker() {
  const { t, lang, contact } = useLang()
  const l = t.lenses
  const [use, setUse] = useState('all')
  const fits = (x) => use === 'all' || x.use.includes(use)

  return (
    <section className="section lens-picker">
      <div className="container">
        <h2 className="h3 lens-picker__q" data-reveal>
          {l.pickerTitle}
        </h2>
        <div className="chips chips--big" role="radiogroup" aria-label={l.pickerTitle} data-reveal>
          <button type="button" role="radio" aria-checked={use === 'all'} className={`chip${use === 'all' ? ' is-on' : ''}`} onClick={() => setUse('all')}>
            {l.all}
          </button>
          {uses.map((u) => (
            <button key={u} type="button" role="radio" aria-checked={use === u} className={`chip${use === u ? ' is-on' : ''}`} onClick={() => setUse(u)}>
              <Icon name={useIcons[u]} size={18} /> {l.uses[u]}
            </button>
          ))}
        </div>

        <ul className="lens-grid">
          {lenses.map((x) => {
            const it = l.items[x.id]
            const on = fits(x)
            return (
              <li key={x.id} className={`lens-card${on ? '' : ' is-dim'}${x.id === 'photo' || x.id === 'photoThin' ? ' lens-card--promo' : ''}`} aria-hidden={on ? undefined : 'true'}>
                <div className="lens-card__top">
                  <span className={`lens-card__swatch lens-card__swatch--${x.id}`} aria-hidden="true" />
                  <span className="lens-card__spec">
                    {l.index} {x.index} · {x.asph ? l.asph : l.sph}
                  </span>
                </div>
                <h3>{it.name}</h3>
                <p>{it.text}</p>
                <ul className="tags">
                  {x.coats.map((c) => (
                    <li key={c}>{l.coats[c]}</li>
                  ))}
                </ul>
                <div className="lens-card__foot">
                  <p className="lens-card__price">
                    <strong>{formatPrice(x.price, lang)}</strong> <span>{t.common.perPair}</span>
                  </p>
                  <button type="button" className="link-btn" tabIndex={on ? undefined : -1} onClick={() => contact('lenses', l.askMsg(it.name))}>
                    {l.ask} <Icon name="arrow" size={16} />
                  </button>
                </div>
                {(x.id === 'photo' || x.id === 'photoThin') && <span className="badge badge--sale lens-card__promo">−10%</span>}
              </li>
            )
          })}
        </ul>
        <p className="catalog__note">
          <Icon name="lens" size={20} /> {l.note}
        </p>
      </div>
    </section>
  )
}
