import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { IoMdClose } from 'react-icons/io';
import { getLocalizedWeight } from '../data/menu';
import { getImagePath, PLACEHOLDER_IMAGE } from '../utils/paths';

const ModalDish = ({ isOpen, onClose, dish }) => {
  const { language } = useLanguage();
  const isRussian = language === LANGUAGES.RU;

  // Если нет данных о блюде, не рендерим ничего
  if (!dish && isOpen) return null;

  // Check if this is a set item
  const isSet = dish?.hasOwnProperty('persons_ru') || dish?.hasOwnProperty('persons');
  
  // Поддержка данных из Supabase (name вместо name_ru)
  const getName = () => {
    if (isRussian) {
      return dish?.name_ru || dish?.name || '';
    }
    return dish?.name_uz || dish?.name || '';
  };
  
  // Поддержка описания/ингредиентов из Supabase
  const getDescription = () => {
    if (isRussian) {
      return dish?.ingredients_ru || dish?.description || '';
    }
    return dish?.ingredients_uz || dish?.description_uz || dish?.description || '';
  };

  // Handle backward compatibility
  const getPersons = () => {
    if (dish?.persons_ru && dish?.persons_uz) {
      return isRussian ? dish.persons_ru : dish.persons_uz;
    }
    return dish?.persons; // For backward compatibility
  };

  // Handle portions with proper translations
  const getPortions = () => {
    if (dish?.portions_ru && dish?.portions_uz) {
      return isRussian ? dish.portions_ru : dish.portions_uz;
    }
    return dish?.portions; // For backward compatibility
  };

  // Get localized weight
  const weightDisplay = !isRussian && dish?.weight_uz ? dish.weight_uz : (dish?.weight ? getLocalizedWeight(dish.weight, language) : '');

  return (
    <AnimatePresence>
      {isOpen && dish && (
        <motion.div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 md:p-6"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-sayqal-light rounded-2xl overflow-hidden max-w-md md:max-w-2xl w-full mx-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="relative">
              {/* Верхняя панель с кнопкой закрытия */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-end p-3">
                <button
                  onClick={onClose}
                  className="bg-sayqal-light bg-opacity-80 p-2 rounded-full text-sayqal-burgundy hover:bg-opacity-100 transition-all shadow-md"
                  aria-label={isRussian ? "Закрыть" : "Yopish"}
                >
                  <IoMdClose size={24} />
                </button>
              </div>
              
              {/* Основное изображение блюда */}
              <img loading="lazy" src={getImagePath(dish?.image || dish?.images) || PLACEHOLDER_IMAGE}
                alt={getName()}
                className="w-full h-72 sm:h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
              />
              
              {/* Градиент и название блюда */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pb-6 text-white">
                <div className="flex flex-col gap-1">
                  <h3 className="font-playfair text-2xl font-bold">{getName()}</h3>
                  <div className="flex items-center space-x-2 text-sm opacity-90">
                    {isSet ? (
                      <span className="bg-sayqal-gold/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        {isRussian ? `${getPersons()} чел.` : `${getPersons()} kishi`}
                      </span>
                    ) : (
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 11-6 0 3 3 0 016 0zm-1 9a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                        {weightDisplay}
                        {getPortions() ? ` | ${getPortions()}` : ''}
                      </span>
                    )}
                    
                    {dish?.price && (
                      <span className="bg-sayqal-cream/30 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                        {new Intl.NumberFormat('ru-RU').format(dish.price)} сум
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Содержимое модального окна */}
            <div className="p-6">
              {isSet ? (
                <div className="mb-4">
                  <h4 className="text-sayqal-burgundy font-semibold mb-3 flex items-center text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    {isRussian ? 'Состав сета' : 'Set tarkibi'}:
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 divide-y divide-gray-100">
                    {(isRussian ? dish?.items_ru : dish?.items_uz)?.map((item, index) => (
                      <li key={index} className="py-2">{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mb-4">
                  <h4 className="text-sayqal-burgundy font-semibold mb-3 flex items-center text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {isRussian ? 'Состав' : 'Tarkibi'}:
                  </h4>
                  <p className="text-gray-700 bg-sayqal-cream/20 p-4 rounded-lg">
                    {getDescription()}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalDish; 
