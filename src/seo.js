import { brand, img } from './config.js'
import { frames } from './data/frames.js'
import { lenses } from './data/lenses.js'
import { dictionaries, languages, defaultLang, langPath, routePath, routes } from './i18n/index.jsx'

const abs = (path) => brand.siteUrl.replace(/\/$/, '') + path

// Schema.org: салон оптики (Optician) с часами, рейтингом, каталогом линз и оправ, FAQ — для поисковиков, карт и ИИ-ассистентов
export function jsonLd(lang, route = 'home') {
  const t = dictionaries[lang]
  const url = abs(routePath(lang, route))
  const { title, description } = pageMeta(lang, route)
  const bizId = abs('/#business')
  const prices = [...frames, ...lenses].map((p) => p.price)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Optician', 'Store'],
        '@id': bizId,
        name: brand.name,
        alternateName: brand.fullName,
        slogan: 'zrobiono z miłością — noś z dumą',
        url: abs('/'),
        logo: abs('/favicon.svg'),
        image: [abs(img('hero')), abs(img('salon-1'))],
        email: brand.email,
        telephone: brand.phone,
        description: t.meta.description,
        priceRange: `${Math.min(...prices)}–${Math.max(...prices)} PLN`,
        currenciesAccepted: 'PLN',
        paymentAccepted: 'Cash, Credit Card, Invoice',
        areaServed: [{ '@type': 'City', name: brand.city }, { '@type': 'Country', name: 'Polska' }],
        knowsLanguage: languages,
        address: {
          '@type': 'PostalAddress',
          streetAddress: brand.street,
          postalCode: brand.postalCode,
          addressLocality: brand.city,
          addressCountry: brand.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: brand.geo.lat, longitude: brand.geo.lng },
        hasMap: brand.maps,
        openingHoursSpecification: brand.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: brand.rating.value, reviewCount: brand.rating.count, bestRating: 5 },
        sameAs: Object.values(brand.social),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.lenses.eyebrow,
          itemListElement: lenses.map((x) => ({
            '@type': 'Offer',
            name: t.lenses.items[x.id].name,
            description: t.lenses.items[x.id].text,
            price: x.price,
            priceCurrency: 'PLN',
            url: abs(routePath(lang, 'lenses')),
          })),
        },
      },
      route === 'frames' && {
        '@type': 'ItemList',
        '@id': url + '#frames',
        name: t.frames.title,
        numberOfItems: frames.length,
        itemListElement: frames.map((f, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: `${f.brand} ${f.model}`,
            brand: { '@type': 'Brand', name: f.brand },
            category: t.frames.g[f.g],
            image: abs(`/images/frames/${f.id}.webp`),
            offers: {
              '@type': 'Offer',
              price: f.price,
              priceCurrency: 'PLN',
              availability: 'https://schema.org/InStoreOnly',
              seller: { '@id': bizId },
            },
          },
        })),
      },
      (route === 'contact' || route === 'tryon') && {
        '@type': 'FAQPage',
        '@id': url + '#faq',
        inLanguage: lang,
        mainEntity: t.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url,
        name: title,
        description,
        inLanguage: lang,
        about: { '@id': bizId },
        isPartOf: { '@type': 'WebSite', name: brand.name, url: abs(langPath(lang)) },
      },
    ].filter(Boolean),
  }
}

export const pageMeta = (lang, route) => {
  const t = dictionaries[lang]
  return route === 'home' ? t.meta : t.pages[route]
}

function headTags(lang, route) {
  const t = dictionaries[lang]
  const { title, description } = pageMeta(lang, route)
  const url = abs(routePath(lang, route))
  const image = abs(img('hero'))
  return [
    ['meta', { name: 'description', content: description }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['link', { rel: 'canonical', href: url }],
    ...languages.map((l) => ['link', { rel: 'alternate', hreflang: l, href: abs(routePath(l, route)) }]),
    ['link', { rel: 'alternate', hreflang: 'x-default', href: abs(routePath(defaultLang, route)) }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: brand.name }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:locale', content: t.locale }],
    ...languages
      .filter((l) => l !== lang)
      .map((l) => ['meta', { property: 'og:locale:alternate', content: dictionaries[l].locale }]),
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: image }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd(lang, route)).replace(/</g, '\\u003c')],
  ]
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderHead(lang, route = 'home') {
  const tags = headTags(lang, route).map(([tag, attrs, text]) => {
    const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join('')
    return tag === 'script' ? `<script data-seo${a}>${text}</script>` : `<${tag} data-seo${a}>`
  })
  return [`<title>${esc(pageMeta(lang, route).title)}</title>`, ...tags].join('\n    ')
}

export function applyHead(lang, route = 'home') {
  document.documentElement.lang = lang
  document.title = pageMeta(lang, route).title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  const frag = document.createDocumentFragment()
  headTags(lang, route).forEach(([tag, attrs, text]) => {
    const el = document.createElement(tag)
    el.setAttribute('data-seo', '')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    if (text) el.textContent = text
    frag.appendChild(el)
  })
  document.head.appendChild(frag)
}

export function robotsTxt() {
  const aiBots = [
    'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
    'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot',
    'CCBot', 'meta-externalagent', 'DuckAssistBot',
  ]
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# AI search & assistants are welcome',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${abs('/sitemap.xml')}`,
    '',
  ].join('\n')
}

export function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes.flatMap((route) => {
    const alternates = [
      ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(routePath(l, route))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(routePath(defaultLang, route))}"/>`,
    ].join('\n')
    return languages.map(
      (l) => `  <url>
    <loc>${abs(routePath(l, route))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === 'frames' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === 'home' ? (l === defaultLang ? '1.0' : '0.9') : route === 'frames' || route === 'lenses' ? '0.9' : '0.7'}</priority>
${alternates}
  </url>`
    )
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

// llms.txt — краткое описание сайта в Markdown для языковых моделей (llmstxt.org)
export function llmsTxt() {
  const pl = dictionaries.pl
  const en = dictionaries.en
  return [
    `# ${brand.fullName}`,
    '',
    `> ${en.meta.description}`,
    '',
    `Optician's shop in ${brand.city}, Poland: eye exams, prescription glasses and sunglasses made to order, free Home Try-On (up to 5 frames) anywhere in Poland, mobile optician service for companies. Languages: Polish, Ukrainian, English.`,
    '',
    '## Pages',
    '',
    ...languages.flatMap((l) => routes.map((r) => `- [${dictionaries[l].name} — ${r === 'home' ? dictionaries[l].nav.home : dictionaries[l].nav.items[r]}](${abs(routePath(l, r))}): ${pageMeta(l, r).title}`)),
    '',
    '## Lenses (price per pair, PLN)',
    '',
    ...lenses.map((x) => `- ${pl.lenses.items[x.id].name} (${en.lenses.items[x.id].name}), index ${x.index}: ${x.price} PLN — ${en.lenses.items[x.id].text}`),
    '',
    '## Frames (selection)',
    '',
    ...frames.map((f) => `- ${f.brand} ${f.model} (${en.frames.g[f.g]}): ${f.price} PLN${f.old ? ` (was ${f.old} PLN)` : ''}`),
    '',
    '## FAQ',
    '',
    ...en.faq.items.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Contact',
    '',
    `- Address: ${brand.street}, ${brand.postalCode} ${brand.city}, Poland`,
    ...en.contact.hours.map(([d, h]) => `- ${d}: ${h}`),
    `- Phone / WhatsApp: ${brand.phone}`,
    `- Email: ${brand.email}`,
    `- Google rating: ${brand.rating.value}/5 (${brand.rating.count} reviews)`,
    '',
  ].join('\n')
}
