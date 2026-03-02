'use client';

import { useRef, useState } from 'react';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  webp?: string | null;
  avif?: string | null;
  alt: string;
  sizes?: string;
}

/**
 * Компонент для загрузки изображений с поддержкой WebP/AVIF
 * Автоматически выбирает оптимальный формат на основе поддержки браузера
 */
export function ResponsiveImage({ 
  src, 
  webp, 
  avif,
  alt, 
  className, 
  style,
  sizes,
  ...props 
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  // Не рендерим если src пустой или null
  if (!src) {
    return <span style={style} className={className} />;
  }

  // Отфильтровываем пустой src из props если он там есть
  const { src: _, ...cleanProps } = props as any;

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <picture>
      {avif && <source srcSet={avif} type="image/avif" />}
      {webp && <source srcSet={webp} type="image/webp" />}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        sizes={sizes}
        className={className}
        style={{
          opacity: isLoading ? 0.7 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...style,
        }}
        onLoad={handleLoad}
        {...cleanProps}
      />
    </picture>
  );
}
