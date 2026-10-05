// Szkła okularowe z okoptyk.pl — cena za parę (PLN). Названия и описания — в i18n (t.lenses.items[id]).
// index — współczynnik załamania, asph — asferyczne. use — для подборщика: screen | drive | sun | thin | everyday
export const lenses = [
  { id: 'standard', price: 158, index: '1.50', asph: false, use: ['everyday'], coats: ['ar', 'hard'] },
  { id: 'comfort', price: 238, index: '1.50', asph: false, use: ['everyday'], coats: ['ar', 'hard', 'antistatic', 'hydro'] },
  { id: 'computer', price: 398, index: '1.50', asph: false, use: ['screen'], coats: ['blue', 'ar', 'hard'] },
  { id: 'driver', price: 498, index: '1.50', asph: false, use: ['drive'], coats: ['contrast', 'ar', 'hard'] },
  { id: 'sun', price: 318, index: '1.50', asph: false, use: ['sun'], coats: ['tint', 'uv', 'hard'] },
  { id: 'polar', price: 818, index: '1.50', asph: false, use: ['sun', 'drive'], coats: ['polar', 'uv', 'hard'] },
  { id: 'photo', price: 738, index: '1.50', asph: false, use: ['sun', 'everyday'], coats: ['photo', 'uv', 'ar'] },
  { id: 'thin', price: 658, index: '1.67', asph: true, use: ['thin'], coats: ['ar', 'hard', 'hydro'] },
  { id: 'photoThin', price: 1540, index: '1.67', asph: true, use: ['thin', 'sun'], coats: ['photo', 'uv', 'ar'] },
]

export const uses = ['everyday', 'screen', 'drive', 'sun', 'thin']
