/**
 * Утилита для оптимизации изображений
 * Поддерживает Supabase Storage Image Transformation
 */

/**
 * Добавить параметры трансформации к URL Supabase Storage
 * @param {string} url - URL изображения
 * @param {object} options - Опции трансформации
 * @returns {string} - URL с параметрами трансформации
 */
export const optimizeSupabaseImage = (url, options = {}) => {
  if (!url) return '';
  
  // Если это не Supabase URL, возвращаем как есть
  if (!url.includes('supabase.co') && !url.includes('supabase.in')) {
    return url;
  }
  
  const {
    width = 400,      // Ширина изображения
    height,           // Высота (опционально)
    quality = 75,     // Качество (1-100)
    format = 'webp',  // Формат (webp, avif, jpeg, png)
    resize = 'cover'  // Метод изменения размера (cover, contain, fill)
  } = options;
  
  // Supabase Storage поддерживает трансформацию через query params
  // Формат: ?width=400&height=300&resize=cover&quality=75&format=webp
  const params = new URLSearchParams();
  
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  if (quality) params.append('quality', quality.toString());
  if (format) params.append('format', format);
  if (resize) params.append('resize', resize);
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
};

/**
 * Получить оптимизированный URL для карточки блюда
 * @param {string} url - URL изображения
 * @returns {string} - Оптимизированный URL
 */
export const getCardImageUrl = (url) => {
  return optimizeSupabaseImage(url, {
    width: 400,
    quality: 70,
    format: 'webp'
  });
};

/**
 * Получить оптимизированный URL для модального окна
 * @param {string} url - URL изображения
 * @returns {string} - Оптимизированный URL
 */
export const getModalImageUrl = (url) => {
  return optimizeSupabaseImage(url, {
    width: 800,
    quality: 80,
    format: 'webp'
  });
};

/**
 * Получить оптимизированный URL для превью (thumbnail)
 * @param {string} url - URL изображения
 * @returns {string} - Оптимизированный URL
 */
export const getThumbnailUrl = (url) => {
  return optimizeSupabaseImage(url, {
    width: 150,
    quality: 60,
    format: 'webp'
  });
};

/**
 * Получить оптимизированный URL для Hero секции
 * @param {string} url - URL изображения
 * @returns {string} - Оптимизированный URL
 */
export const getHeroImageUrl = (url) => {
  return optimizeSupabaseImage(url, {
    width: 1200,
    quality: 85,
    format: 'webp'
  });
};

export default {
  optimizeSupabaseImage,
  getCardImageUrl,
  getModalImageUrl,
  getThumbnailUrl,
  getHeroImageUrl
};

