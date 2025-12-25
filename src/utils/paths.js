/**
 * Утилита для работы с путями
 * Автоматически определяет базовый путь в зависимости от окружения
 */

// Определяем базовый путь
// На GitHub Pages: /bukhara
// На Vercel или локально: пустая строка
const getBasePath = () => {
  // Проверяем, есть ли PUBLIC_URL (устанавливается в homepage в package.json)
  const publicUrl = process.env.PUBLIC_URL || '';
  return publicUrl;
};

export const BASE_PATH = getBasePath();

/**
 * Получить полный путь к изображению
 * @param {string} path - относительный путь к изображению (например: /images/salads/sezar/IMG_4052.JPG)
 */
export const getImagePath = (path) => {
  if (!path) return '';
  
  // Если путь уже содержит http/https - это внешняя ссылка
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Убираем /bukhara/ если он есть в начале пути
  let cleanPath = path;
  if (cleanPath.startsWith('/bukhara/')) {
    cleanPath = cleanPath.replace('/bukhara/', '/');
  }
  
  // Добавляем базовый путь
  return `${BASE_PATH}${cleanPath}`;
};

/**
 * Placeholder изображение
 */
export const PLACEHOLDER_IMAGE = `${BASE_PATH}/images/background/uzbek-pattern.jpg`;

export default {
  BASE_PATH,
  getImagePath,
  PLACEHOLDER_IMAGE
};



