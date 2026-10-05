import { FramesCatalog } from '../components/Catalog.jsx'
import { Brands, TryOnTeaser } from '../components/Home.jsx'
import { CtaBand, PageHero, Promo } from '../components/Sections.jsx'
import { useLang } from '../i18n/index.jsx'

export default function FramesPage() {
  const { t } = useLang()
  return (
    <>
      <PageHero eyebrow={t.frames.eyebrow} title={t.frames.title} lead={t.frames.lead} image="wall" />
      <FramesCatalog />
      <Promo />
      <TryOnTeaser />
      <Brands />
      <CtaBand />
    </>
  )
}
