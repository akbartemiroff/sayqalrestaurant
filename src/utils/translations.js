/**
 * Утилита для мультиязычных переводов (UZ, RU, EN)
 */

// Общие переводы интерфейса
export const UI_TRANSLATIONS = {
  // Кнопки и действия
  viewMenu: { ru: 'Посмотреть меню', uz: 'Menyuni ko\'rish', en: 'View Menu' },
  viewHalls: { ru: 'Просмотр залов', uz: 'Zallarni ko\'rish', en: 'View Halls' },
  moreDetails: { ru: 'Подробнее', uz: 'Batafsil', en: 'Details' },
  close: { ru: 'Закрыть', uz: 'Yopish', en: 'Close' },
  
  // Навигация
  home: { ru: 'Главная', uz: 'Bosh sahifa', en: 'Home' },
  viewHall: { ru: 'Просмотр зала', uz: 'Zal ko\'rinishi', en: 'View Hall' },
  contacts: { ru: 'Контакты', uz: 'Bog\'lanish', en: 'Contacts' },
  ourMenu: { ru: 'Наше Меню', uz: 'Bizning Menyu', en: 'Our Menu' },
  
  // Блюда
  composition: { ru: 'Состав', uz: 'Tarkibi', en: 'Ingredients' },
  setComposition: { ru: 'Состав сета', uz: 'Set tarkibi', en: 'Set Contents' },
  persons: { ru: 'чел.', uz: 'kishi', en: 'pers.' },
  
  // Футер
  allRightsReserved: { ru: 'Все права защищены', uz: 'Barcha huquqlar himoyalangan', en: 'All rights reserved' },
  
  // Контакты
  information: { ru: 'Информация', uz: 'Ma\'lumot', en: 'Information' },
  workingHours: { ru: 'Часы работы:', uz: 'Ish soatlari:', en: 'Working hours:' },
  dailyHours: { ru: 'Ежедневно: 10:00 - 23:00', uz: 'Har kuni: 10:00 - 23:00', en: 'Daily: 10:00 - 23:00' },
  address: { ru: 'Адрес:', uz: 'Manzil:', en: 'Address:' },
  addressValue: { ru: 'Узбекистан, Бухара, Газлийское шоссе, 121', uz: 'O\'zbekiston, Buxoro, Gazli shosesi, 121', en: 'Uzbekistan, Bukhara, Gazli Highway, 121' },
  phone: { ru: 'Телефон:', uz: 'Telefon:', en: 'Phone:' },
  instagram: { ru: 'Инстаграм:', uz: 'Instagram:', en: 'Instagram:' },
  telegram: { ru: 'Телеграм:', uz: 'Telegram:', en: 'Telegram:' },
  contactAdmin: { ru: 'Связь с администратором:', uz: 'Administrator bilan bog\'lanish:', en: 'Contact Administrator:' },
  sendMessage: { ru: 'Написать сообщение', uz: 'Xabar yozish', en: 'Send Message' },
  howToFind: { ru: 'Как нас найти', uz: 'Bizni qanday topish', en: 'How to find us' },
  getDirections: { ru: 'Построить маршрут', uz: 'Yo\'nalishni ko\'rsatish', en: 'Get Directions' },
  
  // Hero секция
  heroTitle: { 
    ru: 'Добро пожаловать в ресторан Sayqal', 
    uz: 'Sayqal restoraniga xush kelibsiz', 
    en: 'Welcome to Sayqal Restaurant' 
  },
  heroSubtitle: { 
    ru: 'Погрузитесь в мир изысканных вкусов узбекской кухни', 
    uz: 'O\'zbek oshxonasining nafis ta\'mlariga sho\'ng\'ing', 
    en: 'Immerse yourself in the exquisite flavors of Uzbek cuisine' 
  },
  
  // Метки
  newLabel: { ru: 'Новинка', uz: 'Yangi', en: 'New' },
  specialLabel: { ru: 'Особое', uz: 'Maxsus', en: 'Special' },
  
  // Переключатель языка
  nextLanguage: { ru: 'UZ', uz: 'EN', en: 'RU' }
};

/**
 * Получить перевод по ключу и языку
 * @param {string} key - ключ перевода
 * @param {string} language - код языка (ru, uz, en)
 * @returns {string} - перевод
 */
export const t = (key, language = 'uz') => {
  if (UI_TRANSLATIONS[key]) {
    return UI_TRANSLATIONS[key][language] || UI_TRANSLATIONS[key].uz || key;
  }
  return key;
};

/**
 * Хелпер для получения значения по языку из объекта
 * @param {object} obj - объект с полями _ru, _uz, _en
 * @param {string} field - базовое имя поля
 * @param {string} language - текущий язык
 * @returns {string} - значение для текущего языка
 */
export const getLocalizedField = (obj, field, language) => {
  if (!obj) return '';
  
  const langField = `${field}_${language}`;
  return obj[langField] || obj[field] || '';
};

export default { UI_TRANSLATIONS, t, getLocalizedField };


