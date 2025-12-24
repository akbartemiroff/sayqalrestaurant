import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaMapMarkerAlt, FaPhone, FaClock, FaDirections, FaUtensils, FaInstagram, FaTelegram } from 'react-icons/fa';

const ContactsSection = () => {
  const { language } = useLanguage();
  
  // Хелпер для трёх языков
  const t = (ru, uz, en) => {
    if (language === 'ru') return ru;
    if (language === 'en') return en;
    return uz;
  };

  const handleYandexNavigation = () => {
    const latitude = 39.764866;
    const longitude = 64.428056;
    const address = encodeURIComponent('Газлийское шоссе, 121');
    window.open(`https://yandex.ru/maps/?rtext=~${latitude},${longitude}&rtt=auto&text=${address}`, '_blank');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: [0, -10, 10, -5, 5, 0],
      color: "#D4AF37",
      transition: {
        rotate: { duration: 0.5, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 400 }
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
    }
  };

  const decorPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2, bounce: 0 },
        opacity: { duration: 0.4 }
      }
    }
  };

  return (
    <section id="contacts" className="py-16 bg-sayqal-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <motion.svg width="100%" height="100%" viewBox="0 0 100 100" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.path d="M10,50 C10,10 90,10 90,50 C90,90 10,90 10,50 Z" stroke="#D4AF37" strokeWidth="2" fill="none" variants={decorPathVariants} />
        </motion.svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-40 h-40 opacity-5">
        <motion.svg width="100%" height="100%" viewBox="0 0 100 100" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="#D4AF37" strokeWidth="2" fill="none" variants={decorPathVariants} />
        </motion.svg>
      </div>

      <div className="menu-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
          <div className="relative mb-12 flex justify-center">
            <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }} viewport={{ once: true }} className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <motion.div variants={pulseVariants} initial="initial" animate="animate" className="text-sayqal-gold">
                <FaUtensils size={24} />
              </motion.div>
            </motion.div>
            
            <motion.h2 className="text-3xl md:text-4xl font-playfair font-bold text-sayqal-burgundy text-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }}>
              <motion.span initial={{ backgroundPosition: "0%" }} whileInView={{ backgroundPosition: "100%" }} transition={{ duration: 1.5 }} style={{ background: "linear-gradient(90deg, #D4AF37 0%, #FDE992 50%, #D4AF37 100%)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}>
                {t('Контакты', 'Bog\'lanish', 'Contacts')}
              </motion.span>
            </motion.h2>
            
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-sayqal-gold origin-center" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div className="bg-sayqal-light rounded-lg shadow-lg p-6 relative overflow-hidden" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
              <motion.div className="absolute -bottom-10 -right-10 w-20 h-20 bg-sayqal-gold opacity-10 rounded-full" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} />
              
              <h3 className="text-xl font-playfair font-bold text-sayqal-burgundy mb-6 border-b border-sayqal-gold pb-2">
                {t('Информация', 'Ma\'lumot', 'Information')}
              </h3>
              
              <motion.ul className="space-y-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.li variants={itemVariants} className="flex items-start">
                  <motion.div className="mt-1 mr-3 text-sayqal-gold" variants={iconVariants} initial="initial" whileHover="hover">
                    <FaClock size={18} />
                  </motion.div>
                  <div>
                    <p className="font-medium">{t('Часы работы:', 'Ish soatlari:', 'Working hours:')}</p>
                    <p className="text-gray-700">{t('Ежедневно: 10:00 - 23:00', 'Har kuni: 10:00 - 23:00', 'Daily: 10:00 - 23:00')}</p>
                  </div>
                </motion.li>

                <motion.li variants={itemVariants} className="flex items-start">
                  <motion.div className="mt-1 mr-3 text-sayqal-gold" variants={iconVariants} initial="initial" whileHover="hover">
                    <FaMapMarkerAlt size={18} />
                  </motion.div>
                  <div>
                    <p className="font-medium">{t('Адрес:', 'Manzil:', 'Address:')}</p>
                    <p className="text-gray-700">{t('Узбекистан, Бухара, Газлийское шоссе, 121', 'O\'zbekiston, Buxoro, Gazli shosesi, 121', 'Uzbekistan, Bukhara, Gazli Highway, 121')}</p>
                  </div>
                </motion.li>
                
                <motion.li variants={itemVariants} className="flex items-start">
                  <motion.div className="mt-1 mr-3 text-sayqal-gold" variants={iconVariants} initial="initial" whileHover="hover">
                    <FaPhone size={18} />
                  </motion.div>
                  <div>
                    <p className="font-medium">{t('Телефон:', 'Telefon:', 'Phone:')}</p>
                    <a href="tel:+998956040093" className="text-gray-700 hover:text-sayqal-red transition-colors block">+998 95 604 00 93</a>
                    <a href="tel:+998956080093" className="text-gray-700 hover:text-sayqal-red transition-colors block">+998 95 608 00 93</a>
                  </div>
                </motion.li>
                
                <motion.li variants={itemVariants} className="flex items-start">
                  <motion.div className="mt-1 mr-3 text-sayqal-gold" variants={iconVariants} initial="initial" whileHover="hover">
                    <FaInstagram size={18} />
                  </motion.div>
                  <div>
                    <p className="font-medium">Instagram:</p>
                    <motion.a href="https://www.instagram.com/restaurant_sayqal" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-sayqal-red transition-colors block" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      restaurant_sayqal
                    </motion.a>
                  </div>
                </motion.li>

                <motion.li variants={itemVariants} className="flex items-start">
                  <motion.div className="mt-1 mr-3 text-sayqal-gold" variants={iconVariants} initial="initial" whileHover="hover">
                    <FaTelegram size={18} />
                  </motion.div>
                  <div>
                    <p className="font-medium">Telegram:</p>
                    <motion.a href="https://t.me/sayqal_food" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-sayqal-burgundy font-medium transition-colors block" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      @sayqal_food
                    </motion.a>
                  </div>
                </motion.li>
                
                <motion.li variants={itemVariants} className="flex items-start">
                  <motion.div className="mt-1 mr-3 text-sayqal-gold" variants={iconVariants} initial="initial" whileHover="hover">
                    <FaTelegram size={18} />
                  </motion.div>
                  <div>
                    <p className="font-medium">{t('Связь с администратором:', 'Administrator bilan bog\'lanish:', 'Contact administrator:')}</p>
                    <motion.a href="https://t.me/+998956040093" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-sayqal-burgundy font-medium transition-colors block" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      {t('Написать сообщение', 'Xabar yozish', 'Send message')}
                    </motion.a>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
            
            <motion.div className="bg-sayqal-light rounded-lg shadow-lg p-6 relative overflow-hidden" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
              <motion.div className="absolute -bottom-10 -left-10 w-20 h-20 bg-sayqal-gold opacity-10 rounded-full" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} />
              
              <h3 className="text-xl font-playfair font-bold text-sayqal-burgundy mb-6 border-b border-sayqal-gold pb-2">
                {t('Как нас найти', 'Bizni qanday topish', 'How to find us')}
              </h3>
              
              <motion.div className="h-64 bg-gray-200 rounded mb-4 overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ scale: 1.02 }}>
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=64.428056%2C39.764866&mode=whatshere&whatshere%5Bpoint%5D=64.428056%2C39.764866&whatshere%5Bzoom%5D=16&z=16" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  title={t('Карта расположения ресторана', 'Restoran joylashuvi xaritasi', 'Restaurant location map')}
                  className="w-full h-full"
                ></iframe>
              </motion.div>
              
              <motion.button onClick={handleYandexNavigation} className="flex items-center justify-center w-full px-6 py-3 bg-sayqal-gold text-white rounded hover:bg-opacity-90 transition-colors relative overflow-hidden group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <motion.span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }}></motion.span>
                <FaDirections className="mr-2" />
                {t('Построить маршрут', 'Yo\'nalishni ko\'rsatish', 'Get directions')}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactsSection;
