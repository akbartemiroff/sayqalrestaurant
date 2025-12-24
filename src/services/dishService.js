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
    const { data, error } = await supabase
      .from(CATEGORIES_TABLE)
      .select('id, name, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Преобразуем в формат с label
    const categories = data?.map(cat => ({
      id: cat.id.toString(),
      value: cat.id.toString(),
      label: cat.name || 'Без названия',
      name: cat.name
    })) || [];

    return { data: categories, error: null };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Группировать блюда по категориям
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

    // Создаём маппинг ID категории -> название
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.id] = cat.name || cat.label;
    });
    
    console.log('🗺️ Маппинг категорий:', categoryMap);

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

    return { data: grouped, error: null };
  } catch (error) {
    console.error('Error grouping dishes:', error);
    return { data: null, error: error.message };
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
  
  const lowerName = categoryName.toLowerCase();
  
  // Переводы категорий
  const translations = {
    salads: { ru: 'Салаты', uz: 'Salatlar', en: 'Salads' },
    soups: { ru: 'Первые блюда', uz: 'Birinchi taomlar', en: 'First Courses' },
    mainDishes: { ru: 'Вторые блюда', uz: 'Ikkinchi taomlar', en: 'Main Dishes' },
    kebabs: { ru: 'Шашлыки', uz: 'Shashliklar', en: 'Kebabs' },
    lunchboxes: { ru: 'Ланчбокс', uz: 'Lanchboks', en: 'Lunchbox' },
    sets: { ru: 'Сеты', uz: 'Setlar', en: 'Sets' },
    sauces: { ru: 'Соусы', uz: 'Souslar', en: 'Sauces' },
    breads: { ru: 'Хлеб', uz: 'Non', en: 'Bread' },
    desserts: { ru: 'Десерты', uz: 'Desertlar', en: 'Desserts' },
    beverages: { ru: 'Напитки', uz: 'Ichimliklar', en: 'Beverages' }
  };
  
  // Ищем соответствие по ключевым словам
  const categoryKeys = [
    { key: 'salads', patterns: ['salat', 'салат', 'salad'] },
    { key: 'soups', patterns: ['birinchi', 'первы', 'soup', 'суп', 'first'] },
    { key: 'mainDishes', patterns: ['ikkinchi', 'втор', 'main', 'second'] },
    { key: 'kebabs', patterns: ['shashlik', 'шашлык', 'kebab', 'kabob'] },
    { key: 'lunchboxes', patterns: ['lanch', 'ланч', 'lunch'] },
    { key: 'sets', patterns: ['set', 'сет'] },
    { key: 'sauces', patterns: ['sous', 'соус', 'sauce'] },
    { key: 'breads', patterns: ['non', 'хлеб', 'bread'] },
    { key: 'desserts', patterns: ['desert', 'десерт', 'dessert'] },
    { key: 'beverages', patterns: ['ichimlik', 'напит', 'beverage', 'drink'] }
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

