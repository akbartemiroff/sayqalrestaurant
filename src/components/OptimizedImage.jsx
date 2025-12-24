import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { preloadImage, isImageCached } from '../utils/imagePreloader';
import ensureImagePath from '../utils/ensureImagePath';
import { useInView } from 'react-intersection-observer';

/**
 * Оптимизированный компонент изображений с улучшенной производительностью
 */
const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc = '/bukhara/images/background/uzbek-pattern.jpg',
  priority = false,
  animate = true,
  ...props
}) => {
  // Intersection Observer для lazy loading
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '150px' // Предзагрузка за 150px до появления
  });
  
  // Ensure paths are correctly formatted
  const formattedSrc = ensureImagePath(src);
  const formattedFallback = ensureImagePath(fallbackSrc);
  
  const [loaded, setLoaded] = useState(isImageCached(formattedSrc));
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(formattedSrc);
  const [shouldLoad, setShouldLoad] = useState(priority); // Высокоприоритетные загружаем сразу
  
  // Сбрасываем состояние при изменении источника изображения
  useEffect(() => {
    setImageSrc(formattedSrc);
    setLoaded(isImageCached(formattedSrc));
    setError(false);
  }, [formattedSrc]);
  
  // Начинаем загрузку когда изображение видно в viewport
  useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [inView, shouldLoad]);
  
  useEffect(() => {
    // Если изображение уже загружено, произошла ошибка, или ещё не пора загружать - ничего не делаем
    if (loaded || error || !shouldLoad) return;
    
    // Предотвращаем утечки памяти при размонтировании
    let isMounted = true;
    
    // Высокоприоритетная загрузка без задержки
    if (priority) {
      const img = new Image();
      img.src = formattedSrc;
      img.onload = () => isMounted && setLoaded(true);
      img.onerror = () => {
        if (isMounted) {
          console.error(`Ошибка загрузки изображения: ${formattedSrc}`);
          setError(true);
          setImageSrc(formattedFallback);
        }
      };
    } else {
      // Низкоприоритетная загрузка
      preloadImage(formattedSrc)
        .then(() => isMounted && setLoaded(true))
        .catch((err) => {
          if (isMounted) {
            console.error(`Ошибка загрузки изображения: ${formattedSrc}`, err);
            setError(true);
            setImageSrc(formattedFallback);
          }
        });
    }
    
    return () => {
      isMounted = false;
    };
  }, [formattedSrc, formattedFallback, priority, loaded, error, shouldLoad]);
  
  // Упрощенный обработчик ошибки загрузки изображения
  const handleError = () => {
    setError(true);
    setImageSrc(formattedFallback);
    console.warn(`Image failed to load: ${formattedSrc}, using fallback: ${formattedFallback}`);
  };
  
  // Skeleton placeholder для состояния загрузки
  const renderPlaceholder = () => {
    if (loaded) return null;
    
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
        <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  };
  
  // Рендерим различные варианты изображения в зависимости от настроек
  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`} 
      style={{ width, height }}
    >
      {/* Плейсхолдер */}
      {renderPlaceholder()}
      
      {/* Сообщение об ошибке */}
      {error && imageSrc === formattedFallback && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
            Изображение не найдено
          </div>
        </div>
      )}
      
      {/* Изображение - загружаем только когда shouldLoad=true */}
      {shouldLoad && (
        animate ? (
          <motion.img
            src={imageSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width={width}
            height={height}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            {...props}
          />
        ) : (
          <img 
            src={imageSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width={width}
            height={height}
            onError={handleError}
            {...props}
          />
        )
      )}
    </div>
  );
});

// Дисплейное имя для отладки
OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 
