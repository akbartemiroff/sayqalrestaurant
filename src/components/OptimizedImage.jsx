import React, { useState, useEffect, memo } from 'react';
import ensureImagePath from '../utils/ensureImagePath';

/**
 * Оптимизированный компонент изображений - простая версия для быстрой загрузки
 */
const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc = '/images/background/uzbek-pattern.jpg',
  priority = false,
  ...props
}) => {
  const formattedSrc = ensureImagePath(src);
  const formattedFallback = ensureImagePath(fallbackSrc);
  
  const [imageSrc, setImageSrc] = useState(formattedSrc);
  const [error, setError] = useState(false);
  
  // Сбрасываем состояние при изменении источника
  useEffect(() => {
    setImageSrc(formattedSrc);
    setError(false);
  }, [formattedSrc]);
  
  const handleError = () => {
    if (!error) {
      setError(true);
      setImageSrc(formattedFallback);
    }
  };
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      width={width}
      height={height}
      onError={handleError}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
