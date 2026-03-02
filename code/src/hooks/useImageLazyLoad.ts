import { useEffect, useRef, useState } from 'react';

/**
 * Hook для ленивой загрузки изображений
 * Использует Intersection Observer для отслеживания видимости элемента
 */
export function useImageLazyLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          // Отписываемся после загрузки
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
  }, []);

  return { ref, isLoaded };
}
