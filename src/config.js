// Данные салона Ok.Optyk (с okoptyk.pl, октябрь 2026). Тексты — в src/i18n/*.js
export const brand = {
  name: 'Ok.Optyk',
  fullName: 'Ok.Optyk — salon optyczny w Poznaniu',
  siteUrl: __SITE_URL__ || 'https://okoptyk.pl',
  phone: '+48 732 432 925',
  whatsapp: '48732432925',
  email: 'okoptyk.pl@gmail.com',
  street: 'ul. Jeleniogórska 1/3',
  postalCode: '60-179',
  city: 'Poznań',
  country: 'PL',
  geo: { lat: 52.3900919, lng: 16.8491922 },
  maps: 'https://maps.app.goo.gl/ZDgky5o9D9CArA6n8',
  // Часы работы для Schema.org; niedziele handlowe — отдельной строкой в текстах
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
    { days: ['Saturday'], opens: '10:00', closes: '17:00' },
  ],
  rating: { value: 4.7, count: 49 },
  social: {
    instagram: 'https://www.instagram.com/ok.optyk',
    facebook: 'https://www.facebook.com/share/1AQcRM3etW/',
  },
}

export const tel = `tel:${brand.phone.replace(/\s/g, '')}`
export const waLink = (text = '') => `https://wa.me/${brand.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const mailLink = (subject, body = '') =>
  `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export const img = (name, size) => `/images/${name}${size === 'sm' ? '-sm' : ''}.webp`

// Разделы в меню (порядок)
export const navIds = ['frames', 'lenses', 'tryon', 'business', 'salon', 'contact']

// Максимум оправ в одной посылке Home Try-On
export const TRYON_MAX = 5

// Фото салона (с okoptyk.pl)
export const salonPhotos = ['salon-1', 'salon-3', 'salon-2', 'salon-4', 'salon-5']

export const brandsCarried = [
  'Bella', 'Enzo Colini', 'Eva Minge', 'Jaguar', 'Kubik Eyewear', 'Pilano', 'Red Swiss', 'Zanzara',
  'Solano', 'Jens Hagen', 'Benetton', 'Tom Tailor', 'Moloka', 'Optimax', 'Cynthix', 'Kanza',
]
