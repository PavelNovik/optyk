import CompareSlider from '../components/CompareSlider.jsx'
import LensPicker from '../components/Lenses.jsx'
import { CtaBand, PageHero } from '../components/Sections.jsx'
import { useLang } from '../i18n/index.jsx'

export default function LensesPage() {
  const { t } = useLang()
  return (
    <>
      <PageHero eyebrow={t.lenses.eyebrow} title={t.lenses.title} lead={t.lenses.lead} image="book">
        <p className="pill pill--lime">{t.lenses.promo}</p>
      </PageHero>
      <LensPicker />
      <section className="section">
        <div className="container compare-wrap">
          <CompareSlider />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
