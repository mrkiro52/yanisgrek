'use client';

import { useRef, useState } from 'react';

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  alt: string;
}

/**
 * Компонент для ленивой загрузки обычных изображений
 * Заменяет <img> тег на версию с lazy loading
 */
export function LazyImage({ src, alt, className, style, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  // Не рендерим если src пустой или null
  if (!src) {
    return <span style={style} className={className} />;
  }

  // Отфильтровываем пустой src из props если он там есть
  const { src: _, ...cleanProps } = props as any;

  // Используем native lazy loading с loading="lazy"
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
      {...cleanProps}
    />
  );
}
