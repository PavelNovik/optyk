import { FeaturedFrames } from '../components/Catalog.jsx'
import Hero from '../components/Hero.jsx'
import { Brands, Categories, LensesTeaser, SalonStrip, Services, TryOnTeaser } from '../components/Home.jsx'
import { CtaBand, Promo, Reviews, Trust } from '../components/Sections.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <Categories />
      <FeaturedFrames />
      <TryOnTeaser />
      <Promo />
      <LensesTeaser />
      <Services />
      <Reviews />
      <SalonStrip />
      <Brands />
      <CtaBand />
    </>
  )
}
