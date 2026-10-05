// Оправы из каталога okoptyk.pl (цены в PLN, октябрь 2026).
// g — для кого: w — damskie, m — męskie, u — uniwersalne. old — цена до скидки.
// crop — [left, top, width, height] в долях: вырезать главный ракурс из коллажа.
// tag: 'new' (Nowość) | 'best' (Bestseller). src — оригинал фото на okoptyk.pl (скачивается npm run images).
const P = 'https://okoptyk.pl/assets/images/products/'

export const frames = [
  { id: 943, brand: 'Red Swiss', model: 'RO8152AW C1', g: 'w', price: 276, old: 460, src: '943/8f3d190f10dd10780c3e4f87e942aefc9433a933' },
  { id: 912, brand: 'Pilano', model: 'P12625 C2', g: 'u', price: 278, old: 464, src: '912/8117bc1986a236440e2ed6324deae8ee99f8c6f3' },
  { id: 1067, brand: 'Enzo Colini', model: '48116 C7', g: 'w', price: 529, old: 719, crop: [0.04, 0.04, 0.72, 0.4], src: '1067/6eaaabbde672d3602d7ce9b048cabbe52da1c56c' },
  { id: 1033, brand: 'Jens Hagen', model: 'JH 20121 B', g: 'm', price: 269, old: 349, tag: 'best', src: '1033/33758653445a470d8040c00a5e4c1d549aac1e0e' },
  { id: 1046, brand: 'Solano', model: 'S 10665 A', g: 'w', price: 369, tag: 'best', src: '1046/b104d90adf511aeeea1979f6375eba74f810138c' },
  { id: 1120, brand: 'Kanza', model: 'K033 C1', g: 'w', price: 529, tag: 'new', src: '1120/ec329eb303759f3e0f60dfcf8a6b3de9e911bafd' },
  { id: 1066, brand: 'Benetton', model: 'Classic', g: 'm', price: 289, old: 349, crop: [0.03, 0.03, 0.73, 0.45], src: '1066/07ff2b9b3523656ffc70c904be5a6b67036a3615' },
  { id: 1068, brand: 'Eva Minge', model: 'EMP 1024 C3', g: 'w', price: 479, old: 519, crop: [0.03, 0.03, 0.73, 0.47], src: '1068/a48645c8b2fb77d75be2b69181ce4c6676856547' },
  { id: 1109, brand: 'Tom Tailor', model: '673020', g: 'm', price: 479, tag: 'new', src: '1109/ee43f7a9fc8114dc959cd6da72a637d98b005928' },
  { id: 952, brand: 'Zanzara', model: 'Z2280U C2', g: 'u', price: 469, tag: 'best', src: '952/bc2c57557011ba3ce37c4d98043a8e259410f49f' },
  { id: 1091, brand: 'Eva Minge', model: 'EM11363', g: 'w', price: 399, old: 439, crop: [0.2, 0, 0.6, 0.55], src: '1091/13c268f0051214b8675895cb64aac8359637c96f' },
  { id: 1032, brand: 'Jens Hagen', model: 'JH 30095 B', g: 'm', price: 289, old: 349, tag: 'best', src: '1032/a1be6c57b74e25af201b8f71bdd5072b87f01706' },
  { id: 1043, brand: 'Jens Hagen', model: 'JH 10474 B', g: 'w', price: 289, old: 349, src: '1043/7a451513a4412ff0d5536a83e7d28a43b34960d0' },
  { id: 1014, brand: 'Solano', model: 'Fishing FL 20063 C', g: 'm', price: 289, old: 349, tag: 'new', src: '1014/be2fcab02ce7d166e5229ba06a08f4317e715833' },
  { id: 1119, brand: 'Moloka', model: 'Hypnotize MM2438 C2', g: 'w', price: 449, tag: 'new', src: '1119/ce3120938c7e38198e06e210d5a033cd45d8b323' },
  { id: 935, brand: 'Red Swiss', model: 'RO8251MU C3', g: 'u', price: 276, tag: 'best', src: '935/f9a904c21341a4d93bf334e6dae9edae863d1245' },
  { id: 1045, brand: 'Solano', model: 'S 10663 B', g: 'w', price: 369, tag: 'best', src: '1045/0e61d9f8441a4a6f95fdc7e9dd2316985b2c2b78' },
  { id: 1107, brand: 'Tom Tailor', model: '672017', g: 'm', price: 499, tag: 'new', src: '1107/23af9f41c18869b0d47280c7314cf79cd150f847' },
  { id: 1039, brand: 'Cynthix', model: 'CX 20010 A', g: 'w', price: 229, tag: 'best', src: '1039/dcdb0224a41d41f55b5f65f76a78cdc0a0781ddc' },
  { id: 1034, brand: 'Jens Hagen', model: 'JH 20128 C', g: 'm', price: 269, tag: 'best', src: '1034/132a7cd7e910fcea07a69e0e8fac4a5a2c6d6f5d' },
  { id: 1037, brand: 'Optimax', model: 'OTX 20273 A', g: 'w', price: 119, tag: 'best', src: '1037/b8ec30c7743685b17cc1203cccd20598539414db' },
  { id: 1012, brand: 'Optimax', model: 'OTX 20232 F', g: 'm', price: 119, tag: 'new', src: '1012/fdd24eff9fe5c7218dae176dccc21196704b0515' },
  { id: 934, brand: 'Red Swiss', model: 'RO8191AW C1', g: 'w', price: 276, tag: 'best', src: '934/a86ffcc315246ff959de7ff3c1ea3762c207d24d' },
  { id: 1070, brand: 'CHE', model: 'YC28045 C2', g: 'm', price: 219, tag: 'best', crop: [0.03, 0.02, 0.73, 0.47], src: '1070/705221484489d57e73a33cf2b8194df832a26b88' },
  { id: 914, brand: 'Bella', model: 'B22825 C2', g: 'w', price: 269, tag: 'best', src: '914/38db4a39b9de25848722cc6fadc58e1ed80d6aa3' },
  { id: 932, brand: 'Kubik', model: 'KO1124A C2', g: 'u', price: 449, src: '932/728ba7738b76a277a968f3681d364ac4df5b141f' },
  { id: 1117, brand: 'Moloka', model: 'Hypnotize MM2427 C3', g: 'w', price: 529, tag: 'new', src: '1117/094196cb28b35d61313cd53899c1b0ffcee3be48' },
  { id: 1057, brand: 'Kwiat', model: 'KW CH 9067 B', g: 'm', price: 429, tag: 'new', src: '1057/b2165cab4c159a0772469d442450657a0aa5ec54' },
  { id: 888, brand: 'Bella', model: 'B20424 C3', g: 'w', price: 269, tag: 'best', src: '888/2af14bef0aefd99ead9eb19be6e7cfb63f517f02' },
  { id: 1035, brand: 'Solano', model: 'S 10814 B', g: 'm', price: 389, tag: 'new', src: '1035/08d41fd893036f99d756b8cc8127b82010728f76' },
  { id: 1110, brand: 'Tom Tailor', model: '673013', g: 'w', price: 479, tag: 'new', src: '1110/b586853d787ec54132393071ab6b63249fa36025' },
  { id: 1065, brand: 'Sover', model: '527 C4', g: 'm', price: 419, src: '1065/1a6dc29e5b3a34e86f4a77caec8f02e0112c205e' },
  { id: 1085, brand: 'Kubik', model: 'KO2146 A C3', g: 'w', price: 449, crop: [0.15, 0, 0.7, 0.55], src: '1085/cb9c1fee67c887ee27554e2b7b836f298462882a' },
  { id: 1056, brand: 'Zanzara', model: 'Z2108', g: 'm', price: 279, src: '1056/2d82f138e46cec73ac840ab68d27048ac37ecb1f' },
  { id: 1136, brand: 'Benetton', model: 'BEO1094', g: 'w', price: 279, src: '1136/c9f559e6fa05a77412bc8bb299b8c5997948de62' },
  { id: 919, brand: 'Vettore', model: 'V32125 C2', g: 'm', price: 249, src: '919/a46d0ab7c1d9b102090e225155648d08e28ce897' },
  { id: 1100, brand: 'VanDenBerg', model: 'VDB2451 CF02', g: 'w', price: 179, crop: [0, 0, 0.58, 1], fit: 'cover', src: '1100/7332f6e0b3606945579c6112e841c1b05a6fe10d' },
  { id: 1137, brand: 'Frido', model: 'F11663', g: 'w', price: 319, src: '1137/7d31c1989ae0c44b8a821b0030f96cb374f0718e' },
].map((f) => ({ ...f, src: `${P}${f.src}.jpg` }))

export const frameImg = (id, size = 'sm') => `/images/frames/${id}${size === 'sm' ? '-sm' : ''}.webp`

export const brands = [...new Set(frames.map((f) => f.brand))].sort()

// Скидка в процентах (как на okoptyk.pl: −40%)
export const discount = (f) => (f.old ? Math.round((1 - f.price / f.old) * 100) : 0)

// Хиты для главной
export const featuredIds = [943, 1067, 1033, 1120, 952, 1046, 1109, 1119]
