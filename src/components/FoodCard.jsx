import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { getLocalizedWeight } from '../data/menu';
import { isImageCached, preloadImage } from '../utils/imagePreloader';

// Константы для оптимизации
const PLACEHOLDER_IMAGE = '/bukhara/images/background/uzbek-pattern.jpg';

// Минимизированные варианты анимации для лучшей производительности
const CARD_VARIANTS = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { 
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(150, 69, 60, 0.2)",
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { scale: 0.98 }
};

// Мемоизированный компонент для предотвращения лишних рендеров
const FoodCard = React.memo(({ item, onClick }) => {
  const { language } = useLanguage();
  const isRussian = language === LANGUAGES.RU;
  const [imageLoaded, setImageLoaded] = useState(isImageCached(item?.image || PLACEHOLDER_IMAGE));
  const [imageError, setImageError] = useState(false);

  // Сокращаем количество проверок через оптимизированные геттеры
  const isSet = Boolean(item.persons_ru || item.persons);
  
  // Мемоизируем данные, чтобы избежать перерасчетов
  // Поддержка данных из Supabase (name вместо name_ru) и статических данных
  const itemData = useMemo(() => ({
    persons: isRussian 
      ? (item.persons_ru || item.persons || "") 
      : (item.persons_uz || item.persons || ""),
    portions: isRussian 
      ? (item.portions_ru || item.portions || "") 
      : (item.portions_uz || item.portions || ""),
    weight: !isRussian && item.weight_uz 
      ? item.weight_uz 
      : getLocalizedWeight(item.weight, language),
    // Поддержка Supabase (name) и статических данных (name_ru/name_uz)
    name: isRussian 
      ? (item.name_ru || item.name || "") 
      : (item.name_uz || item.name || ""),
    // Поддержка Supabase (description) и статических данных (ingredients_ru/ingredients_uz)
    ingredients: isRussian 
      ? (item.ingredients_ru || item.description || "") 
      : (item.ingredients_uz || item.description_uz || item.description || ""),
    items: isRussian ? item.items_ru : item.items_uz,
    price: item.price,
    // Поддержка разных полей для изображений
    imagePath: item?.image || item?.images || PLACEHOLDER_IMAGE,
    specialLabel: item.new 
      ? (isRussian ? 'Новинка' : 'Yangi') 
      : (isRussian ? 'Особое' : 'Maxsus')
  }), [item, isRussian, language]);
  
  // Предзагрузка изображения с оптимизацией
  useEffect(() => {
    if (imageLoaded) return;
    
    let isMounted = true;
    const loadImage = async () => {
      try {
        await preloadImage(itemData.imagePath);
        if (isMounted) setImageLoaded(true);
      } catch (error) {
        if (isMounted) setImageError(true);
      }
    };
    
    loadImage();
    return () => { isMounted = false; };
  }, [itemData.imagePath, imageLoaded]);

  return (
    <div
      className="overflow-hidden rounded-xl shadow-sm bg-white h-full flex flex-col cursor-pointer food-card"
      onClick={() => onClick(item)}
      style={{ border: '1px solid rgba(150, 69, 60, 0.05)' }}
    >
      {/* Image Container с оптимизированной загрузкой */}
      <div className="relative aspect-video overflow-hidden">
        {/* Используем обычный img вместо motion.img для быстрой загрузки */}
        <img 
          src={imageError ? PLACEHOLDER_IMAGE : itemData.imagePath} 
          alt={itemData.name}
          className="w-full h-full object-cover"
          loading="lazy" 
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        
        {/* Плейсхолдер с упрощенной анимацией */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          </div>
        )}
        
        {/* Упрощенный градиент */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
        
        {/* Стильные метаданные о блюде - с оптимизированным рендерингом */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 items-end">
          <div className="bg-white/80 text-sayqal-burgundy px-3 py-1 rounded-full text-xs font-medium shadow-md backdrop-blur-sm">
            {isSet ? (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                {isRussian 
                  ? `${itemData.persons} чел.` 
                  : `${itemData.persons} kishi`}
              </span>
            ) : (
              <span className="flex items-center gap-1 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 11-6 0 3 3 0 016 0zm-1 9a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd" />
                </svg>
                {itemData.weight}
                {itemData.portions ? ` | ${itemData.portions}` : ''}
              </span>
            )}
          </div>
        </div>
        
        {/* Показываем метку только если есть специальное предложение */}
        {(item.special || item.new) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className="golden-gradient text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {itemData.specialLabel}
            </div>
          </div>
        )}
      </div>
      
      {/* Информация о блюде в стильном контейнере */}
      <div className="p-4 relative flex-grow flex flex-col">
        <h3 className="font-playfair font-bold text-lg mb-2 text-sayqal-burgundy">
          {itemData.name}
        </h3>
        
        {isSet ? (
          <div className="text-sm text-gray-600 max-h-24 overflow-y-auto flex-grow">
            <p className="font-semibold mb-1 text-sayqal-burgundy/80">{isRussian ? 'Состав:' : 'Tarkib:'}</p>
            <ul className="list-disc pl-4">
              {itemData.items && itemData.items.slice(0, 3).map((listItem, index) => (
                <li key={index} className="mb-1 leading-tight">
                  {listItem}
                </li>
              ))}
              {itemData.items && itemData.items.length > 3 && (
                <li className="text-sayqal-gold">...</li>
              )}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-600 line-clamp-3 leading-tight flex-grow">
            {itemData.ingredients}
          </p>
        )}

        {/* Обновленная цена с современным дизайном */}
        <div className="mt-3 flex justify-between items-center">
          {itemData.price && (
            <div className="font-semibold text-sayqal-burgundy">
              {new Intl.NumberFormat('ru-RU').format(itemData.price)} <span className="text-sm">сум</span>
            </div>
          )}
          
          {/* Индикатор с минимальной анимацией */}
          <div className="text-sayqal-gold text-xs flex items-center font-medium bg-sayqal-cream/30 px-3 py-1 rounded-full">
            <span className="mr-1">{isRussian ? 'Подробнее' : 'Batafsil'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

// Дисплейное имя для отладки в React DevTools
FoodCard.displayName = 'FoodCard';

export default FoodCard; 
