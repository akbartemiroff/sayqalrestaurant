import { useState, useEffect, useCallback } from 'react';
import { 
  getAllDishes, 
  getDishesByCategory, 
  getDishesGroupedByCategory,
  subscribeToDisheChanges 
} from '../services/dishService';

/**
 * Хук для получения всех блюд из Supabase
 */
export function useAllDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await getAllDishes();
      
      if (fetchError) {
        throw new Error(fetchError);
      }
      
      setDishes(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dishes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDishes();

    // Подписка на изменения в реальном времени
    const unsubscribe = subscribeToDisheChanges((payload) => {
      console.log('Dishes changed:', payload);
      fetchDishes(); // Перезагрузить данные при изменении
    });

    return () => {
      unsubscribe();
    };
  }, [fetchDishes]);

  return { dishes, loading, error, refetch: fetchDishes };
}

/**
 * Хук для получения блюд по категории
 */
export function useDishesByCategory(category) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDishes = useCallback(async () => {
    if (!category) {
      setDishes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await getDishesByCategory(category);
      
      if (fetchError) {
        throw new Error(fetchError);
      }
      
      setDishes(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dishes by category:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchDishes();

    // Подписка на изменения
    const unsubscribe = subscribeToDisheChanges((payload) => {
      if (payload.new?.category === category || payload.old?.category === category) {
        fetchDishes();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [fetchDishes, category]);

  return { dishes, loading, error, refetch: fetchDishes };
}

/**
 * Хук для получения блюд, сгруппированных по категориям
 * Возвращает также переводы категорий из Supabase
 */
export function useMenuGrouped() {
  const [menu, setMenu] = useState({});
  const [dbCategoryTranslations, setDbCategoryTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, categoryTranslations, error: fetchError } = await getDishesGroupedByCategory();
      
      if (fetchError) {
        throw new Error(fetchError);
      }
      
      setMenu(data || {});
      setDbCategoryTranslations(categoryTranslations || {});
    } catch (err) {
      setError(err.message);
      console.error('Error fetching grouped menu:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();

    // Подписка на изменения в реальном времени
    const unsubscribe = subscribeToDisheChanges((payload) => {
      console.log('Menu changed:', payload);
      fetchMenu(); // Перезагрузить данные при изменении
    });

    return () => {
      unsubscribe();
    };
  }, [fetchMenu]);

  return { menu, dbCategoryTranslations, loading, error, refetch: fetchMenu };
}

/**
 * Маппинг категорий между Supabase и локальными названиями
 */
export const CATEGORY_MAP = {
  // Supabase category -> Local category key
  'appetizers': 'salads',
  'main_courses': 'mainDishes',
  'desserts': 'desserts',
  'drinks': 'drinks',
  'salads': 'salads',
  'soups': 'soups',
  'kebabs': 'kebabs',
  'lunchboxes': 'lunchboxes',
  'sets': 'sets',
  'breads': 'breads',
  'sauces': 'sauces'
};

/**
 * Названия категорий на разных языках (UZ, RU, EN)
 * Включает как статические ключи, так и возможные названия из Supabase
 */
export const CATEGORY_TRANSLATIONS = {
  // Статические категории (из menu.js)
  salads: { ru: 'Салаты', uz: 'Salatlar', en: 'Salads' },
  soups: { ru: 'Первые блюда', uz: 'Birinchi taomlar', en: 'First Courses' },
  mainDishes: { ru: 'Вторые блюда', uz: 'Ikkinchi taomlar', en: 'Main Dishes' },
  main_courses: { ru: 'Вторые блюда', uz: 'Ikkinchi taomlar', en: 'Main Dishes' },
  kebabs: { ru: 'Шашлыки', uz: 'Shashliklar', en: 'Kebabs' },
  lunchboxes: { ru: 'Ланчбокс', uz: 'Lanchboks', en: 'Lunchbox' },
  sets: { ru: 'Сеты', uz: 'Setlar', en: 'Sets' },
  breads: { ru: 'Хлеб', uz: 'Nonlar', en: 'Bread' },
  desserts: { ru: 'Десерты', uz: 'Shirinliklar', en: 'Desserts' },
  drinks: { ru: 'Напитки', uz: 'Ichimliklar', en: 'Beverages' },
  sauces: { ru: 'Соусы', uz: 'Souslar', en: 'Sauces' },
  appetizers: { ru: 'Закуски', uz: 'Gazaklar', en: 'Appetizers' },
  other: { ru: 'Другое', uz: 'Boshqa', en: 'Other' },
  // Категории на узбекском (из Supabase)
  'Salatlar': { ru: 'Салаты', uz: 'Salatlar', en: 'Salads' },
  'Birinchi taomlar': { ru: 'Первые блюда', uz: 'Birinchi taomlar', en: 'First Courses' },
  'Ikkinchi taomlar': { ru: 'Вторые блюда', uz: 'Ikkinchi taomlar', en: 'Main Dishes' },
  'Shashliklar': { ru: 'Шашлыки', uz: 'Shashliklar', en: 'Kebabs' },
  'Lanchboks': { ru: 'Ланчбокс', uz: 'Lanchboks', en: 'Lunchbox' },
  'Lanch boks': { ru: 'Ланчбокс', uz: 'Lanch boks', en: 'Lunchbox' },
  'Setlar': { ru: 'Сеты', uz: 'Setlar', en: 'Sets' },
  'Souslar': { ru: 'Соусы', uz: 'Souslar', en: 'Sauces' },
  'Nonlar': { ru: 'Хлеб', uz: 'Nonlar', en: 'Bread' },
  'Shirinliklar': { ru: 'Десерты', uz: 'Shirinliklar', en: 'Desserts' },
  'Ichimliklar': { ru: 'Напитки', uz: 'Ichimliklar', en: 'Beverages' }
};

// Экспортируем getCategoryTranslation из dishService для обратной совместимости
export { getCategoryTranslation } from '../services/dishService';

/**
 * Ключевые слова для определения категории
 * Порядок: Салаты(1), Первые блюда(2), Вторые блюда(3), Шашлыки(4), Ланчбокс(5), Сеты(6), Соусы(7)
 */
const CATEGORY_KEYWORDS = [
  { priority: 1, keywords: ['salat', 'салат'] },                           // Салаты
  { priority: 2, keywords: ['birinchi', 'первы', 'soup', 'суп', 'shorva', 'шурпа', 'шорва'] }, // Первые блюда
  { priority: 3, keywords: ['ikkinchi', 'втор', 'main', 'asosiy'] },       // Вторые блюда
  { priority: 4, keywords: ['shashlik', 'шашлык', 'kebab', 'кебаб'] },     // Шашлыки
  { priority: 5, keywords: ['lanch', 'ланч', 'lunch'] },                   // Ланчбокс
  { priority: 6, keywords: ['set', 'сет'] },                               // Сеты
  { priority: 7, keywords: ['sous', 'соус', 'sauce'] }                     // Соусы
];

/**
 * Получить приоритет категории для сортировки
 */
export const getCategoryPriority = (category) => {
  if (!category) return 999;
  const lowerCategory = category.toLowerCase().trim();
  
  for (const { priority, keywords } of CATEGORY_KEYWORDS) {
    for (const keyword of keywords) {
      if (lowerCategory.includes(keyword)) {
        return priority;
      }
    }
  }
  
  return 999; // Неизвестные категории в конец
};

/**
 * Сортировать категории в нужном порядке
 */
export const sortCategories = (categories) => {
  return [...categories].sort((a, b) => {
    const priorityA = getCategoryPriority(a);
    const priorityB = getCategoryPriority(b);
    return priorityA - priorityB;
  });
};

export default useAllDishes;

