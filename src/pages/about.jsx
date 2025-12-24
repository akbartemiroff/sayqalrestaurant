import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import Navbar from '../components/Navbar';
import { FiX, FiMaximize2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Ленивая загрузка компонента Footer
const Footer = lazy(() => import('../components/Footer'));

const About = () => {
  
  const { language, toggleLanguage } = useLanguage();
  
  // Хелпер для трёх языков
  const t = (ru, uz, en) => {
    if (language === 'ru') return ru;
    if (language === 'en') return en;
    return uz;
  };
  const [scrollY, setScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageArray, setSelectedImageArray] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Gallery image states
  const [premiumImageIndex, setPremiumImageIndex] = useState(0);
  const [vipImageIndex, setVipImageIndex] = useState(0);
  const [commonImageIndex, setCommonImageIndex] = useState(0);
  const [cabinImageIndex, setCabinImageIndex] = useState(0);
  const [terraceImageIndex, setTerraceImageIndex] = useState(0);

  // Add viewport meta tag to ensure proper mobile rendering
  useEffect(() => {
    // Check if viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    // Set the content to prevent scaling and horizontal scrolling
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    
    return () => {
      // Optional cleanup if component unmounts
      if (viewportMeta && viewportMeta.parentNode) {
        viewportMeta.content = 'width=device-width, initial-scale=1.0';
      }
    };
  }, []);

  // Add the missing galleryImages variable
  const galleryImages = [
    `${process.env.PUBLIC_URL}/images/gallery/1.jpg`,
    `${process.env.PUBLIC_URL}/images/gallery/2.jpg`,
    `${process.env.PUBLIC_URL}/images/gallery/3.jpg`,
    `${process.env.PUBLIC_URL}/images/gallery/4.jpg`,
    `${process.env.PUBLIC_URL}/images/gallery/5.jpg`,
    `${process.env.PUBLIC_URL}/images/gallery/6.jpg`,
  ];

  // Use mobile optimizations
  const useGalleryMobileOptimization = () => {
    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          document.querySelectorAll('.gallery-image').forEach(img => {
            img.style.height = '180px';
            img.style.width = '100%';
            img.style.objectFit = 'cover';
          });
          
          // Improve touch targets
          document.querySelectorAll('.gallery-nav-button').forEach(btn => {
            btn.style.width = '44px';
            btn.style.height = '44px';
          });

          // Ensure no horizontal overflow
          document.querySelectorAll('.overflow-hidden').forEach(el => {
            el.style.maxWidth = '100%';
          });
          
          // Apply smaller heights to all section images for mobile
          document.querySelectorAll('.section-image').forEach(img => {
            img.style.maxHeight = '200px';
          });
        } else {
          // Reset for desktop
          document.querySelectorAll('.gallery-image').forEach(img => {
            img.style.height = '';
            img.style.width = '';
            img.style.objectFit = '';
          });
          document.querySelectorAll('.gallery-nav-button').forEach(btn => {
            btn.style.width = '';
            btn.style.height = '';
          });
          document.querySelectorAll('.overflow-hidden').forEach(el => {
            el.style.maxWidth = '';
          });
          document.querySelectorAll('.section-image').forEach(img => {
            img.style.maxHeight = '';
          });
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  };

  // Функция для управления прокруткой
  const handleScroll = () => {
    // Используем троттлинг для оптимизации обработки событий прокрутки
    if (!window.requestAnimationFrame) {
      // Fallback для браузеров, которые не поддерживают requestAnimationFrame
      setScrollY(window.scrollY);
    } else {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    }
  };

  useEffect(() => {
    // Прокручиваем страницу вверх при монтировании компонента
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Добавляем обработчик события прокрутки
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Варианты анимации для улучшения производительности
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5 } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        duration: 0.3
      } 
    }
  };

  // Параллакс эффект для фоновых элементов
  const parallaxY = scrollY * 0.2;

  // Функция переключения языка
  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  // Массивы с изображениями для каждого зала
  const premiumImages = [
    `${process.env.PUBLIC_URL}/images/about/premium/DSC01432.jpg`,
    `${process.env.PUBLIC_URL}/images/about/premium/DSC01435.jpg`
  ];
  
  const vipImages = [
    `${process.env.PUBLIC_URL}/images/about/vip/DSC01446.jpg`,
    `${process.env.PUBLIC_URL}/images/about/vip/DSC01447.jpg`
  ];
  
  const commonImages = [
    `${process.env.PUBLIC_URL}/images/about/obshiy/DSC01421.jpg`,
    `${process.env.PUBLIC_URL}/images/about/obshiy/DSC01425.jpg`
  ];
  
  const cabinImages = [
    `${process.env.PUBLIC_URL}/images/about/kabinka/DSC01417.jpg`,
    `${process.env.PUBLIC_URL}/images/about/kabinka/DSC01427.jpg`
  ];
  
  const terraceImages = [
    `${process.env.PUBLIC_URL}/images/about/teracce/IMG_3460.png`
  ];

  // Functions for image modal
  const openImageModal = (image, index, imagesArray) => {
    setSelectedImageArray(imagesArray);
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedImageArray([]);
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const changeModalImage = (increment) => {
    if (!selectedImageArray || selectedImageArray.length === 0) return;
    
    const newIndex = (currentImageIndex + increment + selectedImageArray.length) % selectedImageArray.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(selectedImageArray[newIndex]);
  };

  // Functions for gallery sliders
  const changeSlide = (setter, currentIndex, imagesArray, increment) => {
    let newIndex = currentIndex + increment;
    if (newIndex < 0) newIndex = imagesArray.length - 1;
    if (newIndex >= imagesArray.length) newIndex = 0;
    setter(newIndex);
  };

  // Touch handling for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      changeModalImage(1);
    }
    if (isRightSwipe) {
      changeModalImage(-1);
    }
  };

  // Handle Escape key for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen, selectedImage]);

  // Use mobile optimizations
  useGalleryMobileOptimization();

  useEffect(() => {
    // Add some CSS for better mobile display
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 767px) {
        .section-image {
          height: 200px !important;
          max-height: 250px !important;
        }
        .gallery-container {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
        .gallery-image-container {
          margin: 0 !important;
          border-radius: 4px !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-sayqal-cream to-[#fff5f0] min-h-screen">
      {/* Декоративные элементы с параллакс эффектом */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0 pattern-dot" 
           style={{ transform: `translateY(${parallaxY * 0.5}px)` }}></div>
      
      {/* Заменяем встроенный навбар на компонент Navbar */}
      <Navbar />

      {/* Image modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-sayqal-cream transition-colors z-10 bg-black/30 hover:bg-black/50 p-1.5 rounded-full"
                onClick={closeImageModal}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div
                className="relative aspect-auto min-h-[200px] max-h-[80vh]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <OptimizedImage
                  src={selectedImage}
                  alt="Gallery image"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <button
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-sayqal-cream transition-colors bg-black/30 hover:bg-black/50 rounded-full p-1.5 sm:p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeModalImage(-1);
                  }}
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-sayqal-cream transition-colors bg-black/30 hover:bg-black/50 rounded-full p-1.5 sm:p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeModalImage(1);
                  }}
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center mt-2 sm:mt-4 space-x-3">
                {selectedImageArray.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? 'bg-sayqal-cream'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                      setSelectedImage(selectedImageArray[index]);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full mx-auto px-0 sm:px-4 py-8 relative z-10 pt-24">
        <motion.div 
          className="bg-white rounded-xl shadow-xl p-4 sm:p-8 mb-12 border border-sayqal-burgundy/10 mx-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="relative mb-12 flex justify-center" 
            variants={fadeInVariants}
          >
            <h1 className="text-4xl md:text-5xl text-center text-sayqal-burgundy mb-3 font-playfair relative inline-block">
              {t('О нашем ресторане', 'Bizning restoran haqida', 'About our restaurant')}
              <motion.div 
                className="absolute -bottom-3 left-1/2 h-1 bg-sayqal-gold rounded-full" 
                initial={{ width: 0, x: '-50%' }}
                animate={{ width: '60%', x: '-50%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h1>
          </motion.div>

          <motion.div className="space-y-24" variants={containerVariants}>
            {/* Премиум-зал */}
            <motion.div 
              className="flex flex-col lg:flex-row gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="lg:w-1/2 space-y-5">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-0.5 bg-sayqal-gold mr-3"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-sayqal-burgundy font-playfair">
                    {t('Премиум зал', 'Premium zali', 'Premium Hall')}
                  </h3>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md border border-sayqal-burgundy/10">
                  {/* Decorative pattern */}
                  <div className="absolute top-0 right-0 w-28 h-28 opacity-5 pattern-dot rounded-bl-full"></div>
                  
                  <p className="text-lg mb-4 leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Наш премиум-зал предлагает элегантную обстановку для особых случаев и торжественных мероприятий. Изысканный интерьер, выполненный в традиционном узбекском стиле с современными акцентами, создает атмосферу роскоши и комфорта.',
                      'Premium zalimiz maxsus tadbirlar va tantanali marosimlar uchun nafis muhit taklif etadi. Zamonaviy aksentlar bilan an\'anaviy o\'zbek uslubida yaratilgan hashamatli interer, hashamat va qulaylik muhitini yaratadi.',
                      'Our premium hall offers an elegant setting for special occasions and celebrations. The exquisite interior, designed in traditional Uzbek style with modern accents, creates an atmosphere of luxury and comfort.'
                    )}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Безупречное обслуживание и внимание к деталям делают каждое посещение незабываемым. Идеально подходит для корпоративных мероприятий, свадеб и семейных праздников.',
                      'Benuqson xizmat va tafsilotlarga e\'tibor har bir tashrifni unutilmas qiladi. Korporativ tadbirlar, to\'ylar va oilaviy bayramlar uchun ideal.',
                      'Impeccable service and attention to detail make every visit unforgettable. Perfect for corporate events, weddings, and family celebrations.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Вместимость', 'Sig\'imi', 'Capacity')}</div>
                    <div className="text-2xl font-bold">{t('до 150 чел.', '150 kishigacha', 'up to 150 pers.')}</div>
                  </div>
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Подходит для', 'Mos keladi', 'Suitable for')}</div>
                    <div className="text-sm font-medium">
                      {t('Торжеств, Свадеб', 'Tantanalar, To\'ylar', 'Celebrations, Weddings')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 gallery-container">
                <div className="relative overflow-hidden rounded-xl shadow-xl group gallery-image-container">
                  {/* Main image with subtle hover effect */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => openImageModal(premiumImages[premiumImageIndex], premiumImageIndex, premiumImages)}
                  >
                    <OptimizedImage 
                      src={premiumImages[premiumImageIndex]}
                      alt={t("Премиум зал", "Premium zali", "Premium Hall")} 
                      className="w-full h-[200px] sm:h-[350px] md:h-[450px] object-cover rounded-lg section-image"
                      width={800} 
                      height={600}
                      priority={true}
                      fallbackSrc="/images/background/uzbek-pattern.jpg"
                    />
                  </motion.div>
                  
                  {/* Image navigation buttons if multiple images */}
                  {premiumImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setPremiumImageIndex, premiumImageIndex, premiumImages, -1);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Предыдущее изображение", "Oldingi rasm", "Previous image")}
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setPremiumImageIndex, premiumImageIndex, premiumImages, 1);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Следующее изображение", "Keyingi rasm", "Next image")}
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  )}
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/70 rounded-tl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/70 rounded-br-lg"></div>
                  
                  {/* Feature tag */}
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-sayqal-burgundy py-2 px-4 rounded-lg shadow-lg"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="font-medium">
                      {t("Роскошная обстановка", "Hashamatli muhit", "Luxurious atmosphere")}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* VIP-зал */}
            <motion.div 
              className="flex flex-col lg:flex-row-reverse gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="lg:w-1/2 space-y-5">
                <div className="flex items-center justify-end mb-2">
                  <h3 className="text-2xl md:text-3xl font-semibold text-sayqal-burgundy font-playfair">
                    {t('VIP зал', 'VIP zali', 'VIP Hall')}
                  </h3>
                  <div className="w-8 h-0.5 bg-sayqal-gold ml-3"></div>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md border border-sayqal-burgundy/10">
                  {/* Decorative pattern */}
                  <div className="absolute top-0 left-0 w-28 h-28 opacity-5 pattern-dot rounded-br-full"></div>
                  
                  <p className="text-lg mb-4 leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'VIP-зал Sayqal - это эксклюзивное пространство для тех, кто ценит приватность и особый подход. Здесь каждая деталь продумана для создания уютной и роскошной атмосферы. Отдельный вход обеспечивает полную конфиденциальность.',
                      'Sayqalning VIP zali - bu maxfiylik va maxsus yondashuvni qadrlaydigan kishilar uchun eksklyuziv makon. Bu erda har bir tafsilot qulay va hashamatli muhit yaratish uchun o\'ylangan. Alohida kirish to\'liq maxfiylikni ta\'minlaydi.',
                      'Sayqal VIP hall is an exclusive space for those who value privacy and a special approach. Every detail here is designed to create a cozy and luxurious atmosphere. A separate entrance ensures complete confidentiality.'
                    )}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Персональный подход к обслуживанию, изысканное меню и возможность индивидуальной настройки пространства делают VIP-зал идеальным выбором для деловых встреч и романтических вечеров.',
                      'Xizmat ko\'rsatishga shaxsiy yondashuv, nafis menyu va makonni individual sozlash imkoniyati VIP zalini ishbilarmonlik uchrashuvi va romantik kechalar uchun ideal tanlov qiladi.',
                      'Personal approach to service, exquisite menu, and the ability to customize the space make the VIP hall an ideal choice for business meetings and romantic evenings.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Вместимость', 'Sig\'imi', 'Capacity')}</div>
                    <div className="text-2xl font-bold">{t('до 20 чел.', '20 kishigacha', 'up to 20 pers.')}</div>
                  </div>
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Особенности', 'Xususiyatlar', 'Features')}</div>
                    <div className="text-sm font-medium">
                      {t('Приватность, Люкс', 'Maxfiylik, Luks', 'Privacy, Luxury')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 gallery-container">
                <div className="relative overflow-hidden rounded-xl shadow-xl group gallery-image-container">
                  {/* Main image with subtle hover effect */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => openImageModal(vipImages[vipImageIndex], vipImageIndex, vipImages)}
                  >
                    <OptimizedImage 
                      src={vipImages[vipImageIndex]}
                      alt={t("VIP зал", "VIP zali", "VIP Hall")} 
                      className="w-full h-[200px] sm:h-[350px] md:h-[450px] object-cover rounded-lg section-image"
                      width={800} 
                      height={600}
                      priority={false}
                      fallbackSrc="/images/background/uzbek-pattern.jpg"
                    />
                  </motion.div>
                  
                  {/* Image navigation buttons if multiple images */}
                  {vipImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setVipImageIndex, vipImageIndex, vipImages, -1);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Предыдущее изображение", "Oldingi rasm", "Previous image")}
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setVipImageIndex, vipImageIndex, vipImages, 1);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Следующее изображение", "Keyingi rasm", "Next image")}
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  )}
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white/70 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white/70 rounded-bl-lg"></div>
                  
                  {/* Feature tag */}
                  <div className="relative mt-2">
                    <motion.div 
                      className="bg-white/80 backdrop-blur-sm text-sayqal-burgundy py-2 px-4 rounded-lg shadow-lg inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="font-medium">
                        {t("Элитное обслуживание", "Elite xizmat", "Elite service")}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Общий зал */}
            <motion.div 
              className="flex flex-col lg:flex-row gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="lg:w-1/2 space-y-5">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-0.5 bg-sayqal-gold mr-3"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-sayqal-burgundy font-playfair">
                    {t('Общий зал', 'Umumiy zal', 'Main Hall')}
                  </h3>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md border border-sayqal-burgundy/10">
                  {/* Decorative pattern */}
                  <div className="absolute top-0 right-0 w-28 h-28 opacity-5 pattern-dot rounded-bl-full"></div>
                  
                  <p className="text-lg mb-4 leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Светлый и просторный общий зал ресторана Sayqal создан для комфортного отдыха и наслаждения аутентичной узбекской кухней. Неповторимый восточный дизайн с современными элементами создает атмосферу гостеприимства и тепла.',
                      'Sayqal restoranining yorug\' va keng umumiy zali qulay dam olish va haqiqiy o\'zbek oshxonasidan zavqlanish uchun yaratilgan. Noyob sharqona dizayn zamonaviy elementlar bilan mehmondo\'stlik va iliqlik muhitini yaratadi.',
                      'The bright and spacious main hall of Sayqal restaurant is designed for comfortable relaxation and enjoyment of authentic Uzbek cuisine. The unique oriental design with modern elements creates an atmosphere of hospitality and warmth.'
                    )}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Зал идеально подходит для семейных обедов, встреч с друзьями и повседневных посещений. Наши гости всегда отмечают особую атмосферу и внимательное обслуживание.',
                      'Zal oilaviy tushliklar, do\'stlar bilan uchrashuvlar va kundalik tashriflar uchun juda mos. Mehmonlarimiz doimo alohida muhit va e\'tiborli xizmatni ta\'kidlashadi.',
                      'The hall is perfect for family dinners, meetings with friends, and everyday visits. Our guests always note the special atmosphere and attentive service.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Особенности', 'Xususiyatlar', 'Features')}</div>
                    <div className="text-sm font-medium">
                      {t('Светлый, Просторный', 'Yorug\', Keng', 'Bright, Spacious')}
                    </div>
                  </div>
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Подходит для', 'Mos keladi', 'Suitable for')}</div>
                    <div className="text-sm font-medium">
                      {t('Семейных встреч, Групп', 'Oilaviy uchrashuvlar, Guruhlar', 'Family gatherings, Groups')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full gallery-container">
                <div className="relative overflow-hidden rounded-xl shadow-xl group gallery-image-container">
                  {/* Main image with subtle hover effect */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => openImageModal(commonImages[commonImageIndex], commonImageIndex, commonImages)}
                  >
                    <OptimizedImage 
                      src={commonImages[commonImageIndex]}
                      alt={t("Общий зал", "Umumiy zal", "Main Hall")}
                      className="gallery-image w-full h-[200px] sm:h-[350px] md:h-[450px] object-cover rounded-lg section-image"
                    />
                  </motion.div>
                  
                  {/* Image navigation buttons if multiple images */}
                  {commonImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setCommonImageIndex, commonImageIndex, commonImages, -1);
                        }}
                        className="gallery-nav-button absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Предыдущее изображение", "Oldingi rasm", "Previous image")}
                      >
                        <IoIosArrowBack className="text-xl" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setCommonImageIndex, commonImageIndex, commonImages, 1);
                        }}
                        className="gallery-nav-button absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Следующее изображение", "Keyingi rasm", "Next image")}
                      >
                        <IoIosArrowForward className="text-xl" />
                      </button>
                    </>
                  )}
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/70 rounded-tl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/70 rounded-br-lg"></div>
                  
                  {/* Feature tag */}
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-sayqal-burgundy py-2 px-4 rounded-lg shadow-lg"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="font-medium">
                      {t("Восточное гостеприимство", "Sharqona mehmondo'stlik", "Eastern hospitality")}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Наши кабины */}
            <motion.div 
              className="flex flex-col lg:flex-row-reverse gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="lg:w-1/2 space-y-5">
                <div className="flex items-center justify-end mb-2">
                  <h3 className="text-2xl md:text-3xl font-semibold text-sayqal-burgundy font-playfair">
                    {t('Наши кабины', 'Bizning kabinalarimiz', 'Our Private Rooms')}
                  </h3>
                  <div className="w-8 h-0.5 bg-sayqal-gold ml-3"></div>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md border border-sayqal-burgundy/10">
                  {/* Decorative pattern */}
                  <div className="absolute top-0 left-0 w-28 h-28 opacity-5 pattern-dot rounded-br-full"></div>
                  
                  <p className="text-lg mb-4 leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Для любителей уединённого отдыха мы предлагаем комфортабельные кабины, где вы сможете насладиться едой и общением в приватной обстановке. Каждая кабина оформлена в восточном стиле и создаёт ощущение особого пространства.',
                      'Xilvat dam olishni yaxshi ko\'radiganlar uchun biz qulay kabinalarni taklif etamiz, bu erda siz ovqat va muloqotdan xususi muhitda bahramand bo\'lishingiz mumkin. Har bir kabina sharqona uslubda bezatilgan va maxsus makon hissini yaratadi.',
                      'For those who love secluded relaxation, we offer comfortable private rooms where you can enjoy food and conversation in a private setting. Each room is decorated in oriental style and creates a sense of a special space.'
                    )}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Идеальный выбор для романтического ужина, небольшого семейного праздника или деловой встречи, где важна конфиденциальность.',
                      'Romantik kechki ovqat, kichik oilaviy bayram yoki maxfiylik muhim bo\'lgan ishbilarmonlik uchrashuvi uchun ideal tanlov.',
                      'An ideal choice for a romantic dinner, small family celebration, or business meeting where privacy is important.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Вместимость', 'Sig\'imi', 'Capacity')}</div>
                    <div className="text-2xl font-bold">{t('4-8 чел.', '4-8 kishi', '4-8 pers.')}</div>
                  </div>
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Особенности', 'Xususiyatlar', 'Features')}</div>
                    <div className="text-sm font-medium">
                      {t('Уединенность, Комфорт', 'Xilvatlik, Qulaylik', 'Seclusion, Comfort')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 gallery-container">
                <div className="relative overflow-hidden rounded-xl shadow-xl group gallery-image-container">
                  {/* Main image with subtle hover effect */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => openImageModal(cabinImages[cabinImageIndex], cabinImageIndex, cabinImages)}
                  >
                    <OptimizedImage 
                      src={cabinImages[cabinImageIndex]}
                      alt={t("Наши кабины", "Bizning kabinalarimiz", "Our Private Rooms")} 
                      className="w-full h-[200px] sm:h-[350px] md:h-[450px] object-cover rounded-lg section-image"
                      width={800} 
                      height={600}
                      priority={false}
                      fallbackSrc="/images/background/uzbek-pattern.jpg"
                    />
                  </motion.div>
                  
                  {/* Image navigation buttons if multiple images */}
                  {cabinImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setCabinImageIndex, cabinImageIndex, cabinImages, -1);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Предыдущее изображение", "Oldingi rasm", "Previous image")}
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setCabinImageIndex, cabinImageIndex, cabinImages, 1);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Следующее изображение", "Keyingi rasm", "Next image")}
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  )}
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white/70 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white/70 rounded-bl-lg"></div>
                  
                  {/* Feature tag */}
                  <motion.div 
                    className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-sayqal-burgundy py-2 px-4 rounded-lg shadow-lg"
                    initial={{ x: 10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="font-medium">
                      {t("Приватность и уют", "Xususiy va qulaylik", "Privacy and comfort")}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Наша терраса */}
            <motion.div 
              className="flex flex-col lg:flex-row gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="lg:w-1/2 space-y-5">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-0.5 bg-sayqal-gold mr-3"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-sayqal-burgundy font-playfair">
                    {t('Наша терраса', 'Bizning terrassamiz', 'Our Terrace')}
                  </h3>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md border border-sayqal-burgundy/10">
                  {/* Decorative pattern */}
                  <div className="absolute top-0 right-0 w-28 h-28 opacity-5 pattern-dot rounded-bl-full"></div>
                  
                  <p className="text-lg mb-4 leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'В теплое время года мы приглашаем наших гостей насладиться трапезой на открытой террасе. Свежий воздух, уютная атмосфера и вкусная еда – идеальное сочетание для приятного отдыха.',
                      'Yilning iliq vaqtida biz mehmonlarimizni ochiq terrassada ovqatlanishdan bahramand bo\'lishga taklif qilamiz. Toza havo, qulay muhit va mazali taom - yoqimli dam olish uchun ideal uyg\'unlik.',
                      'In warm weather, we invite our guests to enjoy a meal on the open terrace. Fresh air, cozy atmosphere and delicious food - the perfect combination for a pleasant relaxation.'
                    )}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 relative z-10">
                    {t(
                      'Терраса оформлена в восточном стиле с современными элементами, создающими комфортную обстановку для приятного времяпрепровождения в кругу друзей и близких.',
                      'Terrassa do\'stlar va yaqinlar davrasida yoqimli vaqt o\'tkazish uchun qulay sharoit yaratadigan zamonaviy elementlar bilan sharqona uslubda bezatilgan.',
                      'The terrace is decorated in oriental style with modern elements, creating a comfortable setting for pleasant time with friends and family.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Вместимость', 'Sig\'imi', 'Capacity')}</div>
                    <div className="text-2xl font-bold">{t('до 150 чел.', '150 kishigacha', 'up to 150 pers.')}</div>
                  </div>
                  <div className="bg-white text-sayqal-burgundy py-3 px-4 rounded-lg text-center border border-sayqal-burgundy/10 shadow-sm">
                    <div className="font-semibold mb-1">{t('Сезон', 'Mavsum', 'Season')}</div>
                    <div className="text-sm font-medium">
                      {t('Весна-Осень', 'Bahor-Kuz', 'Spring-Autumn')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 gallery-container">
                <div className="relative overflow-hidden rounded-xl shadow-xl group gallery-image-container">
                  {/* Main image with subtle hover effect */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => openImageModal(terraceImages[terraceImageIndex], terraceImageIndex, terraceImages)}
                  >
                    <OptimizedImage 
                      src={terraceImages[terraceImageIndex]}
                      alt={t("Наша терраса", "Bizning terrassamiz", "Our Terrace")}
                      className="w-full h-[200px] sm:h-[350px] md:h-[450px] object-cover rounded-lg section-image"
                      width={800} 
                      height={600}
                      priority={false}
                      fallbackSrc="/images/background/uzbek-pattern.jpg"
                    />
                  </motion.div>
                  
                  {/* Image navigation buttons if multiple images */}
                  {terraceImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setTerraceImageIndex, terraceImageIndex, terraceImages, -1);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Предыдущее изображение", "Oldingi rasm", "Previous image")}
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(setTerraceImageIndex, terraceImageIndex, terraceImages, 1);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-sayqal-burgundy transition-all duration-200"
                        aria-label={t("Следующее изображение", "Keyingi rasm", "Next image")}
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  )}
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/70 rounded-tl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/70 rounded-br-lg"></div>
                  
                  {/* Feature tag */}
                  <div className="relative mt-2">
                    <motion.div 
                      className="bg-white/80 backdrop-blur-sm text-sayqal-burgundy py-2 px-4 rounded-lg shadow-lg inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="font-medium">
                        {t("Отдых на свежем воздухе", "Ochiq havoda dam olish", "Outdoor relaxation")}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Добро пожаловать в Sayqal - перемещено после раздела "Общий зал" */}
            <motion.div 
              className="flex flex-col md:flex-row gap-10 items-center mb-16"
              variants={fadeInVariants}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="md:w-3/5">
                <h2 className="text-2xl md:text-3xl font-semibold text-sayqal-burgundy mb-6 font-playfair relative before:content-[''] before:absolute before:w-12 before:h-1 before:-bottom-2 before:left-0 before:bg-sayqal-gold before:rounded-full">
                  {t('Добро пожаловать в Sayqal', 'Sayqalga xush kelibsiz', 'Welcome to Sayqal')}
                </h2>
                <p className="text-lg mb-5 leading-relaxed text-gray-700">
                  {t(
                    'Ресторан Sayqal - это уникальное сочетание аутентичной узбекской кухни и современного подхода к сервису. Мы гордимся тем, что предлагаем нашим гостям блюда, приготовленные по традиционным рецептам с использованием только свежих и качественных ингредиентов.',
                    'Sayqal restorani - bu o\'zbek milliy taomlari va zamonaviy xizmat ko\'rsatishning noyob uyg\'unlashuvidir. Biz mehmonlarimizga faqat yangi va sifatli ingredientlardan foydalangan holda an\'anaviy retseptlar bo\'yicha tayyorlangan taomlarni taklif etishdan faxrlanamiz.',
                    'Sayqal Restaurant is a unique combination of authentic Uzbek cuisine and a modern approach to service. We are proud to offer our guests dishes prepared according to traditional recipes using only fresh and quality ingredients.'
                  )}
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  {t(
                    'Наша миссия - создать пространство, где каждый гость может не только насладиться превосходной едой, но и погрузиться в атмосферу узбекского гостеприимства и культуры.',
                    'Bizning vazifamiz - har bir mehmon nafaqat ajoyib taomlardan bahramand bo\'lishi, balki o\'zbek mehmondo\'stligi va madaniyati muhitiga sho\'ng\'ishi mumkin bo\'lgan joy yaratishdir.',
                    'Our mission is to create a space where every guest can not only enjoy excellent food, but also immerse themselves in the atmosphere of Uzbek hospitality and culture.'
                  )}
                </p>
              </div>
              <motion.div 
                className="w-full md:w-2/5 mx-auto relative px-4 md:px-6 gallery-container"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg border-2 sm:border-4 border-white transform rotate-1 sm:rotate-2 bg-white gallery-image-container">
                  <div className="p-2 sm:p-4">
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/about/kocha/IMG_3456.png`}
                      alt={t("Ресторан Sayqal", "Sayqal restorani", "Sayqal Restaurant")} 
                      className="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[450px] object-contain rounded-lg max-w-full section-image"
                      loading="eager"
                      onError={(e) => { 
                        console.log("Image load error, using fallback"); 
                        e.target.onerror = null; 
                        e.target.src = `${process.env.PUBLIC_URL}/images/background/uzbek-pattern.jpg`; 
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Кнопка перехода к меню */}
            <motion.div
              className="flex justify-center mt-16 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <Link 
                to="/#salads" 
                className="flex items-center justify-center gap-2 bg-sayqal-gold hover:bg-sayqal-gold/90 text-sayqal-burgundy font-medium rounded-xl px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl text-center"
              >
                <span>{t('Перейти к меню', 'Menyuga o\'tish', 'Go to Menu')}</span>
                <IoIosArrowForward />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer - с ленивой загрузкой */}
      <Suspense fallback={<div className="h-32 bg-sayqal-burgundy"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default About; 