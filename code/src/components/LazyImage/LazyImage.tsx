'use client';

import { ImgHTMLAttributes, useRef, useEffect, useState } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Компонент для ленивой загрузки обычных изображений
 * Заменяет <img> тег на версию с lazy loading
 */
export function LazyImage({ src, alt, className, style, ...props }: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        rootMargin: '50px', // Начинаем загрузку за 50px до видимости
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <img
      ref={ref}
      src={imageSrc}
      alt={alt}
      className={className}
      style={{
        opacity: isLoading ? 0.7 : 1,
        transition: 'opacity 0.3s ease-in-out',
        ...style,
      }}
      onLoad={handleLoad}
      {...props}
    />
  );
}
