'use client';

import { ImgHTMLAttributes, useRef, useState } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Компонент для ленивой загрузки обычных изображений
 * Использует встроенный HTML5 loading="lazy" атрибут
 */
export function LazyImage({ src, alt, className, style, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
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
