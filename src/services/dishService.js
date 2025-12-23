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

export default {
  getAllDishes,
  getDishesByCategory,
  getDishById,
  getAllCategories,
  getDishesGroupedByCategory,
  subscribeToDisheChanges
};

