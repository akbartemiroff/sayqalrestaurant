import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedWeight } from '../data/menu';
import { isImageCached, preloadImage } from '../utils/imagePreloader';
import { getImagePath, PLACEHOLDER_IMAGE } from '../utils/paths';
import { useInView } from 'react-intersection-observer';
import { getCardImageUrl } from '../utils/imageOptimizer';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Intersection Observer для lazy loading - загружаем изображение только когда карточка видна
  const { ref: cardRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px' // Предзагрузка за 100px до появления в viewport
  });

  // Сокращаем количество проверок через оптимизированные геттеры
  const isSet = Boolean(item.persons_ru || item.persons || item.persons_uz || item.persons_en);
  
  // Мемоизируем данные, чтобы избежать перерасчетов
  // Поддержка данных из Supabase с тремя языками (en, uz, ru)
  const itemData = useMemo(() => {
    // Получить значение по текущему языку
    const getByLang = (ruVal, uzVal, enVal, fallback = '') => {
      if (language === 'ru') return ruVal || fallback;
      if (language === 'en') return enVal || fallback;
      return uzVal || fallback; // uz по умолчанию
    };

    // Метки для специальных предложений
    const specialLabels = {
      ru: item.new ? 'Новинка' : 'Особое',
      uz: item.new ? 'Yangi' : 'Maxsus',
      en: item.new ? 'New' : 'Special'
    };

    return {
      persons: getByLang(
        item.persons_ru || item.persons,
        item.persons_uz || item.persons,
        item.persons_en || item.persons,
        ""
      ),
      portions: getByLang(
        item.portions_ru || item.portions,
        item.portions_uz || item.portions,
        item.portions_en || item.portions,
        ""
      ),
      weight: item.weight_uz && language === 'uz' 
        ? item.weight_uz 
        : getLocalizedWeight(item.weight, language),
      // Мультиязычные названия
      name: getByLang(
        item.name_ru || item.name,
        item.name_uz || item.name,
        item.name_en || item.name,
        item.name || ""
      ),
      // Мультиязычные описания/ингредиенты
      ingredients: getByLang(
        item.ingredients_ru || item.description_ru || item.description,
        item.ingredients_uz || item.description_uz || item.description,
        item.ingredients_en || item.description_en || item.description,
        item.description || ""
      ),
      items: getByLang(item.items_ru, item.items_uz, item.items_en),
      price: item.price,
      // Поддержка разных полей для изображений с оптимизацией
      imagePath: getCardImageUrl(getImagePath(item?.image || item?.images)) || PLACEHOLDER_IMAGE,
      specialLabel: specialLabels[language] || specialLabels.uz
    };
  }, [item, language]);
  
  // Предзагрузка изображения только когда карточка видна в viewport
  useEffect(() => {
    if (!inView || imageLoaded || imageError) return;
    
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
  }, [itemData.imagePath, imageLoaded, imageError, inView]);

  return (
    <div
      ref={cardRef}
      className="overflow-hidden rounded-xl shadow-sm bg-white h-full flex flex-col cursor-pointer food-card"
      onClick={() => onClick(item)}
      style={{ border: '1px solid rgba(150, 69, 60, 0.05)' }}
    >
      {/* Image Container с оптимизированной загрузкой */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {/* Skeleton placeholder - показывается пока изображение не загружено */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
            <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Загружаем изображение только когда карточка видна */}
        {inView && (
          <img 
            src={imageError ? PLACEHOLDER_IMAGE : itemData.imagePath} 
            alt={itemData.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
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
                {`${itemData.persons} ${{ ru: 'чел.', uz: 'kishi', en: 'pers.' }[language] || 'kishi'}`}
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
            <p className="font-semibold mb-1 text-sayqal-burgundy/80">{{ ru: 'Состав:', uz: 'Tarkib:', en: 'Contents:' }[language] || 'Tarkib:'}</p>
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
            <span className="mr-1">{{ ru: 'Подробнее', uz: 'Batafsil', en: 'Details' }[language] || 'Batafsil'}</span>
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
