import React from 'react';
import FoodCard from './FoodCard';
import { motion } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { categoryTranslations } from '../data/menu';
import { CATEGORY_TRANSLATIONS, getCategoryTranslation } from '../hooks/useMenu';

const MenuSection = ({ category, items, onItemClick }) => {
  const { language } = useLanguage();
  const isRussian = language === LANGUAGES.RU;
  const langKey = isRussian ? 'ru' : 'uz';

  // Поддержка категорий из Supabase и статических категорий
  const getCategoryTitle = () => {
    // Сначала пробуем статические переводы из menu.js
    if (categoryTranslations[category]) {
      return categoryTranslations[category][langKey];
    }
    // Затем пробуем переводы из хука useMenu
    if (CATEGORY_TRANSLATIONS[category]) {
      return CATEGORY_TRANSLATIONS[category][langKey];
    }
    // Для динамических категорий из Supabase - возвращаем как есть
    // (название категории уже на понятном языке)
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
