import React from 'react';
import FoodCard from './FoodCard';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryTranslation } from '../services/dishService';

// Полный маппинг всех возможных названий категорий на 3 языка
// ПРИМЕЧАНИЕ: Для новых категорий, которых нет в этом списке, 
// используется функция getCategoryTranslation с поиском по ключевым словам
const ALL_CATEGORY_TRANSLATIONS = {
  // Английские названия
  'Salads': { uz: 'Salatlar', ru: 'Салаты', en: 'Salads' },
  'First Courses': { uz: 'Birinchi taomlar', ru: 'Первые блюда', en: 'First Courses' },
  'Main Dishes': { uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Dishes' },
  'Kebabs': { uz: 'Shashliklar', ru: 'Шашлыки', en: 'Kebabs' },
  'Lunchbox': { uz: 'Lanchboks', ru: 'Ланчбокс', en: 'Lunchbox' },
  'Sets': { uz: 'Setlar', ru: 'Сеты', en: 'Sets' },
  'Sauces': { uz: 'Souslar', ru: 'Соусы', en: 'Sauces' },
  'Bread': { uz: 'Nonlar', ru: 'Хлеб', en: 'Bread' },
  'Desserts': { uz: 'Shirinliklar', ru: 'Десерты', en: 'Desserts' },
  'Beverages': { uz: 'Ichimliklar', ru: 'Напитки', en: 'Beverages' },
  'Drinks': { uz: 'Ichimliklar', ru: 'Напитки', en: 'Beverages' },
  'Appetizers': { uz: 'Gazaklar', ru: 'Закуски', en: 'Appetizers' },
  'Other': { uz: 'Boshqa', ru: 'Другое', en: 'Other' },
  // Узбекские названия - варианты из Supabase
  'Salat': { uz: 'Salatlar', ru: 'Салаты', en: 'Salads' },
  'Salatlar': { uz: 'Salatlar', ru: 'Салаты', en: 'Salads' },
  'Birinchi ovqat': { uz: 'Birinchi taomlar', ru: 'Первые блюда', en: 'First Courses' },
  'Birinchi taomlar': { uz: 'Birinchi taomlar', ru: 'Первые блюда', en: 'First Courses' },
  'Ikkinchi ovqat': { uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Dishes' },
  'Ikkinchi taomlar': { uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Dishes' },
  'Shashliklar': { uz: 'Shashliklar', ru: 'Шашлыки', en: 'Kebabs' },
  'Kabob': { uz: 'Shashliklar', ru: 'Шашлыки', en: 'Kebabs' },
  'Kaboblar': { uz: 'Shashliklar', ru: 'Шашлыки', en: 'Kebabs' },
  'Lanchboks': { uz: 'Lanchboks', ru: 'Ланчбокс', en: 'Lunchbox' },
  'Lanch boks': { uz: 'Lanchboks', ru: 'Ланчбокс', en: 'Lunchbox' },
  'Lunch boks': { uz: 'Lanchboks', ru: 'Ланчбокс', en: 'Lunchbox' },
  'Setlar': { uz: 'Setlar', ru: 'Сеты', en: 'Sets' },
  'Souslar': { uz: 'Souslar', ru: 'Соусы', en: 'Sauces' },
  'Non': { uz: 'Nonlar', ru: 'Хлеб', en: 'Bread' },
  'Nonlar': { uz: 'Nonlar', ru: 'Хлеб', en: 'Bread' },
  'Desertlar': { uz: 'Shirinliklar', ru: 'Десерты', en: 'Desserts' },
  'Shirinliklar': { uz: 'Shirinliklar', ru: 'Десерты', en: 'Desserts' },
  'Ichimliklar': { uz: 'Ichimliklar', ru: 'Напитки', en: 'Beverages' },
  'Gazaklar': { uz: 'Gazaklar', ru: 'Закуски', en: 'Appetizers' },
  'Boshqa': { uz: 'Boshqa', ru: 'Другое', en: 'Other' },
  // Русские названия
  'Салаты': { uz: 'Salatlar', ru: 'Салаты', en: 'Salads' },
  'Первые блюда': { uz: 'Birinchi taomlar', ru: 'Первые блюда', en: 'First Courses' },
  'Вторые блюда': { uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Dishes' },
  'Шашлыки': { uz: 'Shashliklar', ru: 'Шашлыки', en: 'Kebabs' },
  'Ланчбокс': { uz: 'Lanchboks', ru: 'Ланчбокс', en: 'Lunchbox' },
  'Сеты': { uz: 'Setlar', ru: 'Сеты', en: 'Sets' },
  'Соусы': { uz: 'Souslar', ru: 'Соусы', en: 'Sauces' },
  'Хлеб': { uz: 'Nonlar', ru: 'Хлеб', en: 'Bread' },
  'Десерты': { uz: 'Shirinliklar', ru: 'Десерты', en: 'Desserts' },
  'Напитки': { uz: 'Ichimliklar', ru: 'Напитки', en: 'Beverages' },
  'Закуски': { uz: 'Gazaklar', ru: 'Закуски', en: 'Appetizers' },
  'Другое': { uz: 'Boshqa', ru: 'Другое', en: 'Other' },
  // Статические ключи (из menu.js)
  'salads': { uz: 'Salatlar', ru: 'Салаты', en: 'Salads' },
  'soups': { uz: 'Birinchi taomlar', ru: 'Первые блюда', en: 'First Courses' },
  'mainDishes': { uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Dishes' },
  'main_courses': { uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Dishes' },
  'kebabs': { uz: 'Shashliklar', ru: 'Шашлыки', en: 'Kebabs' },
  'lunchboxes': { uz: 'Lanchboks', ru: 'Ланчбокс', en: 'Lunchbox' },
  'sets': { uz: 'Setlar', ru: 'Сеты', en: 'Sets' },
  'sauces': { uz: 'Souslar', ru: 'Соусы', en: 'Sauces' },
  'breads': { uz: 'Nonlar', ru: 'Хлеб', en: 'Bread' },
  'desserts': { uz: 'Shirinliklar', ru: 'Десерты', en: 'Desserts' },
  'beverages': { uz: 'Ichimliklar', ru: 'Напитки', en: 'Beverages' },
  'drinks': { uz: 'Ichimliklar', ru: 'Напитки', en: 'Beverages' },
  'appetizers': { uz: 'Gazaklar', ru: 'Закуски', en: 'Appetizers' },
  'other': { uz: 'Boshqa', ru: 'Другое', en: 'Other' }
};

const MenuSection = ({ category, items, onItemClick, dbTranslations = {} }) => {
  const { language } = useLanguage();

  // Перевод категории на выбранный язык
  const getCategoryTitle = () => {
    // 1. Сначала проверяем переводы из базы данных Supabase (приоритет!)
    const dbTrans = dbTranslations[category];
    if (dbTrans && dbTrans[language]) {
      return dbTrans[language];
    }
    
    // 2. Затем пробуем точное соответствие из статического объекта
    const translations = ALL_CATEGORY_TRANSLATIONS[category];
    if (translations && translations[language]) {
      return translations[language];
    }
    
    // 3. Если не найдено - используем функцию с поиском по ключевым словам
    // Это работает для новых категорий, добавленных в Supabase
    const translated = getCategoryTranslation(category, language);
    if (translated && translated !== category) {
      return translated;
    }
    
    // 4. Fallback - возвращаем как есть
    return category;
  };

  const categoryTitle = getCategoryTitle();

  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50
      }
    }
  };

  // Decorative elements animations
  const decorationVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className="py-8 md:py-12 relative menu-section menu-category" id={category} data-category-id={category}>
      {/* Decorative elements */}
      <div className="absolute -left-12 top-1/4 opacity-10 hidden lg:block">
        <motion.svg 
          width="150" 
          height="150" 
          viewBox="0 0 100 100"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke="#D4AF37" 
            strokeWidth="2" 
            fill="none"
            variants={decorationVariants}
          />
        </motion.svg>
      </div>
      
      <div className="absolute -right-12 bottom-1/4 opacity-10 hidden lg:block">
        <motion.svg 
          width="120" 
          height="120" 
          viewBox="0 0 100 100"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.path 
            d="M10,50 Q50,10 90,50 Q50,90 10,50" 
            stroke="#D4AF37" 
            strokeWidth="2" 
            fill="none"
            variants={decorationVariants}
          />
        </motion.svg>
      </div>

      <div
        className="menu-container relative z-10"
      >
        <div id={`title-${category}`} className="relative mb-8 md:mb-10 flex justify-center category-title">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-sayqal-gold"
          />
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-sayqal-burgundy text-center px-4 relative"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.6 }}
            data-category={category}
          >
            <motion.span
              initial={{ backgroundPosition: "0%" }}
              whileInView={{ backgroundPosition: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                background: "linear-gradient(90deg, #D4AF37 0%, #FDE992 50%, #D4AF37 100%)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textFillColor: "transparent",
                display: "inline-block"
              }}
            >
              {categoryTitle}
            </motion.span>
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-sayqal-gold"
          />
        </div>
        
        <div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 menu-grid"
          style={{opacity: 1}}
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index}
              className="h-full menu-item"
              style={{opacity: 1, transform: 'none'}}
            >
              <FoodCard item={item} onClick={onItemClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection; 
