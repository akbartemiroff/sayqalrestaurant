import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = {
  UZ: 'uz',
  RU: 'ru',
  EN: 'en',
};

// Порядок переключения языков: UZ -> RU -> EN -> UZ
const LANGUAGE_ORDER = [LANGUAGES.UZ, LANGUAGES.RU, LANGUAGES.EN];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(LANGUAGES.UZ);

  // Переключение на следующий язык по кругу
  const toggleLanguage = () => {
    const currentIndex = LANGUAGE_ORDER.indexOf(language);
    const nextIndex = (currentIndex + 1) % LANGUAGE_ORDER.length;
    setLanguage(LANGUAGE_ORDER[nextIndex]);
  };

  // Установить конкретный язык
  const setLang = (lang) => {
    if (Object.values(LANGUAGES).includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage: setLang, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 
