import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { throttle } from '../utils/imagePreloader';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { categoryTranslations } from '../data/menu';
import logoImage from '../assets/sayqallogo.png';
import { Link } from 'react-scroll';
import { FiX, FiMenu, FiUser, FiShoppingBag, FiSearch } from 'react-icons/fi';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Маппинг узбекских названий категорий к ID
const uzCategoryMappings = {
  'Salatlar': 'salads',
  'Birinchi taomlar': 'soups',
  'Ikkinchi taomlar': 'mainDishes',
  'Shashliklar': 'kebabs',
  'Lanchboks': 'lunchboxes',
  'Setlar': 'sets',
  'Nonlar': 'breads',
  'Shirinliklar': 'desserts',
  'Souslar': 'sauces'
};

// Оптимизированные варианты анимации
const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 70, 
      damping: 15,
      mass: 0.5
    }
  }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -5, height: 0 },
  visible: { 
    opacity: 1, 
    y: 0,
    height: 'auto',
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0, 
    y: -5,
    height: 0,
    transition: { duration: 0.15 }
  }
};

// Анимация для подсветки активных элементов
const activeItemVariants = {
  inactive: { width: 0 },
  active: { 
    width: '100%',
    transition: { duration: 0.3 }
  }
};

const Navbar = () => {
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  
  // Хелпер для получения значения по языку
  const t = (ru, uz, en) => {
    if (language === 'ru') return ru;
    if (language === 'en') return en;
    return uz;
  };
  
  // Состояние для выпадающего списка языков
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prevScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();

  // Дебаунсинг функции скролла для улучшения производительности
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrolled(currentScrollY > 50);
        prevScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleScroll, handleClickOutside]);

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Выбор конкретного языка
  const handleLanguageSelect = (lang) => {
    if (lang !== language && setLanguage) {
      setLanguage(lang);
    }
    setLangDropdownOpen(false);
  };
  
  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = useCallback((e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setMenuDropdownOpen(false);
    }
  }, []);

  const toggleDropdown = useCallback(() => {
    setMenuDropdownOpen(!menuDropdownOpen);
  }, [menuDropdownOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Определяем, активен ли текущий путь
  const isActive = useCallback((path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location]);

  // Mемоизированные пункты меню с поддержкой 3х языков
  const menuItems = React.useMemo(() => [
    { id: 'salads', name: categoryTranslations.salads[language] || categoryTranslations.salads.uz },
    { id: 'soups', name: categoryTranslations.soups[language] || categoryTranslations.soups.uz },
    { id: 'mainDishes', name: categoryTranslations.mainDishes[language] || categoryTranslations.mainDishes.uz },
    { id: 'kebabs', name: categoryTranslations.kebabs[language] || categoryTranslations.kebabs.uz },
    { id: 'lunchboxes', name: categoryTranslations.lunchboxes[language] || categoryTranslations.lunchboxes.uz },
    { id: 'sets', name: categoryTranslations.sets[language] || categoryTranslations.sets.uz },
    { id: 'breads', name: categoryTranslations.breads[language] || categoryTranslations.breads.uz },
    { id: 'desserts', name: categoryTranslations.desserts[language] || categoryTranslations.desserts.uz },
    { id: 'sauces', name: categoryTranslations.sauces[language] || categoryTranslations.sauces.uz },
  ], [language]);

  const mainNavItems = React.useMemo(() => [
    { id: 'home', name: t('Главная', 'Bosh sahifa', 'Home'), hasDropdown: false, path: '/' },
    { id: 'about', name: t('Просмотр зала', 'Zal ko\'rinishi', 'View Hall'), hasDropdown: false, path: '/about' },
    { id: 'contacts', name: t('Контакты', 'Bog\'lanish', 'Contacts'), hasDropdown: false, path: '/#contacts' }
  ], [language, isActive]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md py-2 border-b border-sayqal-gold/10' 
            : 'bg-white/95 backdrop-blur-md py-3'
        }`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Обновленный логотип и название ресторана */}
            <RouterLink to="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute inset-0 border-2 border-sayqal-gold rounded-full"
                  animate={{ 
                    scale: [1, 1.05, 1], 
                    opacity: [0.7, 1, 0.7],
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 7, 
                    ease: "linear", 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <img 
                  src={logoImage} 
                  alt="Sayqal Logo"
                  className={`relative transition-all duration-300 rounded-full ${scrolled ? 'h-10 w-10' : 'h-12 w-12'} border-2 border-sayqal-gold object-cover group-hover:shadow-lg`}
                  width={scrolled ? 40 : 48}
                  height={scrolled ? 40 : 48}
                  loading="eager"
                />
              </div>
              <div className="flex flex-col md:flex-rowflex-col">
                <h1 
                  className={`font-playfair font-bold transition-all duration-300 
                    text-sayqal-burgundy text-xl md:text-2xl group-hover:text-sayqal-gold`}
                >
                  Restaurant Sayqal
                </h1>
              </div>
            </RouterLink>
            
            {/* Улучшенное настольное навигационное меню */}
            <div className="hidden md:flex items-center justify-center space-x-8 mx-auto">
              {mainNavItems.map(item => 
                item.hasDropdown ? (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="nav-link flex items-center cursor-pointer text-sayqal-burgundy hover:text-sayqal-gold font-medium px-3 py-2"
                      title={t("Нажмите, чтобы увидеть разделы меню", "Menyu bo'limlarini ko'rish uchun bosing", "Click to see menu sections")}
                    >
                      {item.name}
                      <motion.svg 
                        className="ml-1 w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        animate={{ rotate: menuDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    
                    <AnimatePresence>
                      {menuDropdownOpen && (
                        <motion.div 
                          className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg py-2 z-10 border border-sayqal-gold/10 overflow-hidden"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sayqal-burgundy to-sayqal-gold"></div>
                          {menuItems.map(subItem => (
                            location.pathname === '/' ? (
                              <Link
                                key={subItem.id}
                                to={subItem.id}
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                data-category={subItem.id}
                                onClick={(e) => {
                                  // Преобразуем название категории в ID если нужно
                                  const categoryId = subItem.id;
                                  
                                  console.log('Clicking on category:', subItem.id, subItem.name);
                                  console.log('Using categoryId:', categoryId);
                                  
                                  // Для целей отладки
                                  const targetElement = document.getElementById(categoryId);
                                  console.log('Target element found?', !!targetElement);
                                  if (targetElement) {
                                    console.log('Element position:', targetElement.getBoundingClientRect());
                                  }
                                  
                                  setMenuDropdownOpen(false);
                                  setMobileMenuOpen(false);
                                  
                                  // Сначала прокручиваем к началу раздела меню
                                  const menuSection = document.querySelector('.menu-section');
                                  if (menuSection) {
                                    menuSection.scrollIntoView({ behavior: 'smooth' });
                                  }
                                  
                                  // Затем прокручиваем к нужной категории
                                  setTimeout(() => {
                                    // Ищем нужную категорию разными способами
                                    let element = document.getElementById(categoryId);
                                    
                                    if (!element) {
                                      element = document.querySelector(`[data-category-id="${categoryId}"]`);
                                    }
                                    
                                    if (!element) {
                                      element = document.querySelector(`.menu-category#${categoryId}`);
                                    }
                                    
                                    if (!element) {
                                      element = document.querySelector(`#title-${categoryId}`);
                                    }
                                    
                                    console.log('Found element by additional selectors?', !!element);
                                    
                                    if (element) {
                                      const isMobile = window.innerWidth < 768;
                                      
                                      element.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                      });
                                      
                                      // Подсветим элемент для визуального выделения
                                      element.style.animation = 'pulse 2s';
                                      setTimeout(() => {
                                        element.style.animation = '';
                                      }, 2000);
                                      
                                      setTimeout(() => {
                                        window.scrollBy(0, isMobile ? -60 : -80);
                                      }, 100);
                                    } else {
                                      console.error('Cannot find element with ID:', categoryId);
                                    }
                                  }, 200);
                                }}
                                className="block px-6 py-2 text-sm text-sayqal-burgundy hover:bg-sayqal-cream/30"
                              >
                                {subItem.name}
                              </Link>
                            ) : (
                              <RouterLink
                                key={subItem.id}
                                to={`/#${subItem.id}`}
                                data-category={subItem.id}
                                onClick={() => {
                                  // Преобразуем название категории в ID если нужно
                                  const categoryId = subItem.id;
                                  console.log('Clicking on category (different page):', subItem.id, subItem.name);
                                  console.log('Using categoryId for navigation:', categoryId);
                                  setMenuDropdownOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                                className="block px-6 py-2 text-sm text-sayqal-burgundy hover:bg-sayqal-cream/30"
                              >
                                {subItem.name}
                              </RouterLink>
                            )
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  item.id === 'about' ? (
                    <RouterLink
                      key={item.id}
                      to={item.path}
                      className="nav-link relative px-3 py-2 text-sayqal-burgundy hover:text-sayqal-gold font-medium overflow-hidden"
                    >
                      {item.name}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-sayqal-gold rounded-full"
                        initial="inactive"
                        animate={isActive(item.path) ? "active" : "inactive"}
                        variants={activeItemVariants}
                      />
                    </RouterLink>
                  ) : item.id === 'home' ? (
                    <RouterLink
                      key={item.id}
                      to="/"
                      className="nav-link relative px-3 py-2 text-sayqal-burgundy hover:text-sayqal-gold font-medium overflow-hidden"
                    >
                      {item.name}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-sayqal-gold rounded-full"
                        initial="inactive"
                        animate={isActive('/') ? "active" : "inactive"}
                        variants={activeItemVariants}
                      />
                    </RouterLink>
                  ) : item.id === 'contacts' ? (
                    <RouterLink
                      key={item.id}
                      to="/#contacts"
                      className="nav-link relative px-3 py-2 text-sayqal-burgundy hover:text-sayqal-gold font-medium overflow-hidden"
                    >
                      {item.name}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-sayqal-gold rounded-full"
                        initial="inactive"
                        animate={false}
                        variants={activeItemVariants}
                      />
                    </RouterLink>
                  ) : (
                    <RouterLink
                      key={item.id}
                      to={item.path}
                      className="nav-link relative px-3 py-2 text-sayqal-burgundy hover:text-sayqal-gold font-medium overflow-hidden"
                    >
                      {item.name}
                    </RouterLink>
                  )
                )
              )}
            </div>
            
            {/* Действия - Переключение языка, Мобильное меню */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Выбор языка - dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <motion.button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="h-9 px-3 rounded-full border-2 transition-all border-sayqal-gold text-sayqal-burgundy hover:bg-sayqal-gold hover:text-white font-medium flex items-center gap-1"
                  aria-label={t("Выбрать язык", "Tilni tanlash", "Select language")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language.toUpperCase()}
                  <svg className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                
                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg border border-sayqal-gold/20 overflow-hidden z-50"
                    >
                      {[
                        { code: 'uz', label: 'UZ', name: "O'zbek" },
                        { code: 'ru', label: 'RU', name: 'Русский' },
                        { code: 'en', label: 'EN', name: 'English' }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full px-4 py-2 text-left hover:bg-sayqal-cream transition-colors flex items-center justify-between ${
                            language === lang.code ? 'bg-sayqal-gold/10 text-sayqal-burgundy font-semibold' : 'text-gray-700'
                          }`}
                        >
                          <span>{lang.label}</span>
                          {language === lang.code && (
                            <svg className="w-4 h-4 text-sayqal-gold" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Мобильное меню - улучшенная кнопка */}
              <div className="md:hidden">
                <motion.button
                  onClick={toggleMobileMenu}
                  className="p-2 focus:outline-none rounded-full text-sayqal-burgundy hover:bg-sayqal-cream/30"
                  aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiX size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiMenu size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Мобильное меню в минималистичном стиле */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-sayqal-cream z-40 overflow-auto shadow-lg"
          >
            <div className="flex flex-col">
              {mainNavItems.map(item => (
                item.hasDropdown ? (
                  <div key={item.id} className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="text-sayqal-burgundy text-xl py-3 border-b border-sayqal-burgundy/10 flex items-center justify-between w-full px-4"
                      title={t("Нажмите, чтобы увидеть разделы меню", "Menyu bo'limlarini ko'rish uchun bosing", "Click to see menu sections")}
                    >
                      <span>{item.name}</span>
                      <motion.svg 
                        className="w-4 h-4 text-sayqal-gold" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: menuDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    
                    <AnimatePresence>
                      {menuDropdownOpen && (
                        <motion.div 
                          className="bg-white py-2 border-b border-sayqal-burgundy/10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sayqal-burgundy to-sayqal-gold"></div>
                          {menuItems.map(subItem => (
                            location.pathname === '/' ? (
                              <Link
                                key={subItem.id}
                                to={subItem.id}
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                data-category={subItem.id}
                                onClick={(e) => {
                                  // Преобразуем название категории в ID если нужно
                                  const categoryId = subItem.id;
                                  
                                  console.log('Clicking on category:', subItem.id, subItem.name);
                                  console.log('Using categoryId:', categoryId);
                                  
                                  // Для целей отладки
                                  const targetElement = document.getElementById(categoryId);
                                  console.log('Target element found?', !!targetElement);
                                  if (targetElement) {
                                    console.log('Element position:', targetElement.getBoundingClientRect());
                                  }
                                  
                                  setMenuDropdownOpen(false);
                                  setMobileMenuOpen(false);
                                  
                                  // Сначала прокручиваем к началу раздела меню
                                  const menuSection = document.querySelector('.menu-section');
                                  if (menuSection) {
                                    menuSection.scrollIntoView({ behavior: 'smooth' });
                                  }
                                  
                                  // Затем прокручиваем к нужной категории
                                  setTimeout(() => {
                                    // Ищем нужную категорию разными способами
                                    let element = document.getElementById(categoryId);
                                    
                                    if (!element) {
                                      element = document.querySelector(`[data-category-id="${categoryId}"]`);
                                    }
                                    
                                    if (!element) {
                                      element = document.querySelector(`.menu-category#${categoryId}`);
                                    }
                                    
                                    if (!element) {
                                      element = document.querySelector(`#title-${categoryId}`);
                                    }
                                    
                                    console.log('Found element by additional selectors?', !!element);
                                    
                                    if (element) {
                                      const isMobile = window.innerWidth < 768;
                                      
                                      element.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                      });
                                      
                                      // Подсветим элемент для визуального выделения
                                      element.style.animation = 'pulse 2s';
                                      setTimeout(() => {
                                        element.style.animation = '';
                                      }, 2000);
                                      
                                      setTimeout(() => {
                                        window.scrollBy(0, isMobile ? -60 : -80);
                                      }, 100);
                                    } else {
                                      console.error('Cannot find element with ID:', categoryId);
                                    }
                                  }, 200);
                                }}
                                className="block px-6 py-2 text-sm text-sayqal-burgundy hover:bg-sayqal-cream/30"
                              >
                                {subItem.name}
                              </Link>
                            ) : (
                              <RouterLink
                                key={subItem.id}
                                to={`/#${subItem.id}`}
                                data-category={subItem.id}
                                onClick={() => {
                                  // Преобразуем название категории в ID если нужно
                                  const categoryId = subItem.id;
                                  console.log('Clicking on category (different page):', subItem.id, subItem.name);
                                  console.log('Using categoryId for navigation:', categoryId);
                                  setMenuDropdownOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                                className="block px-6 py-2 text-sm text-sayqal-burgundy hover:bg-sayqal-cream/30"
                              >
                                {subItem.name}
                              </RouterLink>
                            )
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <RouterLink
                    key={item.id}
                    to={item.path}
                    className="text-sayqal-burgundy text-xl py-3 border-b border-sayqal-burgundy/10 flex items-center justify-between px-4"
                    onClick={closeMobileMenu}
                  >
                    <span>{item.name}</span>
                    <svg 
                      className="w-4 h-4 text-sayqal-gold" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </RouterLink>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Обернем компонент в memo для предотвращения ненужных рендеров
export default memo(Navbar); 
