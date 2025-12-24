import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from '../context/LanguageContext';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const { language } = useLanguage();
  
  // Хелпер для трёх языков
  const t = (ru, uz, en) => {
    if (language === 'ru') return ru;
    if (language === 'en') return en;
    return uz;
  };

  return (
    <footer className="bg-sayqal-burgundy text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={footerVariants}
            className="text-center"
          >
            <p className="text-sayqal-cream">
              &copy; 2025 Restaurant Sayqal. {t('Все права защищены', 'Barcha huquqlar himoyalangan', 'All rights reserved')}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
