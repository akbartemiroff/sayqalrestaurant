import { supabase } from '../lib/supabase';

// Таблицы в Supabase (как в админ-панели)
const DISHES_TABLE = 'products';
const CATEGORIES_TABLE = 'category';

/**
 * Получить все блюда из Supabase
 */
export const getAllDishes = async () => {
  try {
    const { data, error } = await supabase
      .from(DISHES_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Получить блюда по категории
 */
export const getDishesByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from(DISHES_TABLE)
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching dishes for category ${category}:`, error);
    return { data: null, error: error.message };
  }
};

/**
 * Получить блюдо по ID
 */
export const getDishById = async (id) => {
  try {
    const { data, error } = await supabase
      .from(DISHES_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching dish with id ${id}:`, error);
    return { data: null, error: error.message };
  }
};

/**
 * Получить все категории
 */
export const getAllCategories = async () => {
  try {
    // Запрашиваем все поля, включая возможные переводы name_ru, name_en
    const { data, error } = await supabase
      .from(CATEGORIES_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Преобразуем в формат с label и переводами
    const categories = data?.map(cat => ({
      id: cat.id.toString(),
      value: cat.id.toString(),
      label: cat.name || 'Без названия',
      name: cat.name,
      // Переводы из Supabase (если есть)
      name_ru: cat.name_ru || null,
      name_en: cat.name_en || null
    })) || [];

    return { data: categories, error: null };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Группировать блюда по категориям
 * Возвращает объект с:
 * - grouped: блюда сгруппированные по категориям
 * - categoryTranslations: переводы категорий из Supabase
 */
export const getDishesGroupedByCategory = async () => {
  try {
    // Загружаем блюда и категории параллельно
    const [dishesResult, categoriesResult] = await Promise.all([
      getAllDishes(),
      getAllCategories()
    ]);

    if (dishesResult.error) {
      throw new Error(dishesResult.error);
    }

    const dishes = dishesResult.data || [];
    const categories = categoriesResult.data || [];

    // Логирование для отладки
    console.log('📦 Категории из Supabase:', categories);
    console.log('🍽️ Блюда из Supabase:', dishes.length);

    // Создаём маппинг ID категории -> данные категории (включая переводы)
    const categoryMap = {};
    const categoryTranslationsFromDb = {};
    
    categories.forEach(cat => {
      const catName = cat.name || cat.label;
      categoryMap[cat.id] = catName;
      
      // Сохраняем переводы из базы данных если они есть
      if (cat.name_ru || cat.name_en) {
        categoryTranslationsFromDb[catName] = {
          uz: catName,
          ru: cat.name_ru || catName,
          en: cat.name_en || catName
        };
      }
    });
    
    console.log('🗺️ Маппинг категорий:', categoryMap);
    console.log('🌐 Переводы из БД:', categoryTranslationsFromDb);

    // Группировка блюд по категориям
    const grouped = dishes.reduce((acc, dish) => {
      // category в products - это ID категории
      const categoryId = dish.category?.toString() || 'other';
      const categoryName = categoryMap[categoryId] || categoryId;
      
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(dish);
      return acc;
    }, {});

    console.log('📋 Сгруппированные категории:', Object.keys(grouped));

    return { 
      data: grouped, 
      categoryTranslations: categoryTranslationsFromDb,
      error: null 
    };
  } catch (error) {
    console.error('Error grouping dishes:', error);
    return { data: null, categoryTranslations: {}, error: error.message };
  }
};

/**
 * Подписка на изменения в реальном времени
 */
export const subscribeToDisheChanges = (callback) => {
  const subscription = supabase
    .channel('products-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: DISHES_TABLE },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

/**
 * Получить перевод категории на указанный язык
 * @param {string} categoryName - оригинальное название категории из Supabase
 * @param {string} language - код языка (ru, uz, en)
 * @returns {string} - переведённое название
 */
export const getCategoryTranslation = (categoryName, language = 'uz') => {
  if (!categoryName) return '';
  
  const lowerName = categoryName.toLowerCase().trim();
  
  // Переводы категорий
  const translations = {
    salads: { ru: 'Салаты', uz: 'Salatlar', en: 'Salads' },
    soups: { ru: 'Первые блюда', uz: 'Birinchi taomlar', en: 'First Courses' },
    mainDishes: { ru: 'Вторые блюда', uz: 'Ikkinchi taomlar', en: 'Main Dishes' },
    kebabs: { ru: 'Шашлыки', uz: 'Shashliklar', en: 'Kebabs' },
    lunchboxes: { ru: 'Ланчбокс', uz: 'Lanchboks', en: 'Lunchbox' },
    sets: { ru: 'Сеты', uz: 'Setlar', en: 'Sets' },
    sauces: { ru: 'Соусы', uz: 'Souslar', en: 'Sauces' },
    breads: { ru: 'Хлеб', uz: 'Nonlar', en: 'Bread' },
    desserts: { ru: 'Десерты', uz: 'Shirinliklar', en: 'Desserts' },
    beverages: { ru: 'Напитки', uz: 'Ichimliklar', en: 'Beverages' },
    appetizers: { ru: 'Закуски', uz: 'Gazaklar', en: 'Appetizers' },
    other: { ru: 'Другое', uz: 'Boshqa', en: 'Other' }
  };
  
  // Точные соответствия (регистронезависимые) - для известных названий на любом языке
  const exactMatches = {
    // Узбекские названия
    'salat': 'salads',
    'salatlar': 'salads',
    'birinchi taomlar': 'soups',
    'birinchi ovqat': 'soups',
    'ikkinchi taomlar': 'mainDishes',
    'ikkinchi ovqat': 'mainDishes',
    'shashliklar': 'kebabs',
    'kabob': 'kebabs',
    'lanchboks': 'lunchboxes',
    'lanch boks': 'lunchboxes',
    'setlar': 'sets',
    'souslar': 'sauces',
    'nonlar': 'breads',
    'non': 'breads',
    'shirinliklar': 'desserts',
    'desertlar': 'desserts',
    'ichimliklar': 'beverages',
    'gazaklar': 'appetizers',
    'boshqa': 'other',
    // Русские названия
    'салаты': 'salads',
    'первые блюда': 'soups',
    'вторые блюда': 'mainDishes',
    'шашлыки': 'kebabs',
    'ланчбокс': 'lunchboxes',
    'сеты': 'sets',
    'соусы': 'sauces',
    'хлеб': 'breads',
    'десерты': 'desserts',
    'напитки': 'beverages',
    'закуски': 'appetizers',
    'другое': 'other',
    // Английские названия
    'salads': 'salads',
    'first courses': 'soups',
    'soups': 'soups',
    'main dishes': 'mainDishes',
    'kebabs': 'kebabs',
    'lunchbox': 'lunchboxes',
    'sets': 'sets',
    'sauces': 'sauces',
    'bread': 'breads',
    'desserts': 'desserts',
    'beverages': 'beverages',
    'drinks': 'beverages',
    'appetizers': 'appetizers',
    'other': 'other'
  };
  
  // Сначала проверяем точное соответствие
  if (exactMatches[lowerName]) {
    const key = exactMatches[lowerName];
    return translations[key][language] || translations[key].uz;
  }
  
  // Ищем соответствие по ключевым словам (для частичных совпадений и новых вариаций)
  const categoryKeys = [
    { key: 'salads', patterns: ['salat', 'салат', 'salad'] },
    { key: 'soups', patterns: ['birinchi', 'первы', 'soup', 'суп', 'first', 'shorva', 'шурпа', 'шорва'] },
    { key: 'mainDishes', patterns: ['ikkinchi', 'втор', 'main', 'second', 'asosiy'] },
    { key: 'kebabs', patterns: ['shashlik', 'шашлык', 'kebab', 'kabob', 'кебаб'] },
    { key: 'lunchboxes', patterns: ['lanch', 'ланч', 'lunch'] },
    { key: 'sets', patterns: ['set', 'сет'] },
    { key: 'sauces', patterns: ['sous', 'соус', 'sauce'] },
    { key: 'breads', patterns: ['non', 'хлеб', 'bread', 'лепёшк', 'лепешк'] },
    { key: 'desserts', patterns: ['desert', 'десерт', 'dessert', 'shirin', 'ширин', 'сладк', 'sweet'] },
    { key: 'beverages', patterns: ['ichimlik', 'напит', 'beverage', 'drink', 'чай', 'choy', 'кофе', 'kofe'] },
    { key: 'appetizers', patterns: ['gazak', 'закуск', 'appetiz', 'snack'] }
  ];
  
  for (const { key, patterns } of categoryKeys) {
    if (patterns.some(pattern => lowerName.includes(pattern))) {
      return translations[key][language] || translations[key].uz;
    }
  }
  
  // Возвращаем оригинальное название, если перевод не найден
  return categoryName;
};

export default {
  getAllDishes,
  getDishesByCategory,
  getDishById,
  getAllCategories,
  getDishesGroupedByCategory,
  subscribeToDisheChanges,
  getCategoryTranslation
};

