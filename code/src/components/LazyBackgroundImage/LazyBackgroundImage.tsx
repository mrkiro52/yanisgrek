'use client';

import { CSSProperties, ReactNode, useRef, useEffect, useState } from 'react';

interface LazyBackgroundImageProps {
  src: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Компонент для ленивой загрузки фоновых изображений
 * Использует CSS background-image с lazy loading
 */
export function LazyBackgroundImage({
  src,
  children,
  className,
  style,
}: LazyBackgroundImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
