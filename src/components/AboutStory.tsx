
import { useEffect, useRef, useState } from "react";

const images = [
  { src: "/images/yearthrow.webp", alt: "14 лет опыта" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/exp2.png", alt: "опыт 2" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/exp3.png", alt: "опыт 3" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/exp4.png", alt: "опыт 4" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/exp5.png", alt: "опыт 5" },
];

export default function AboutStory() {
  const [active, setActive] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setActive((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
  }, [active]);

  const handleDotClick = (index: number) => {
    setActive(index);
    setHasUserInteracted(true);
  };

  return (
    <div className="about-story">
      <div className="about-story__container">
          <div className="about-story__slider">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
                className={`about-story__img about-story__img-slide${active === idx ? " active" : ""}`}
                style={{
                  opacity: active === idx ? 1 : 0,
                  zIndex: active === idx ? 2 : 1,
                  transition: "opacity 0.7s cubic-bezier(.4,0,.2,1)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  background: idx === 0 ? undefined : "#222"
                }}
                loading={idx === 0 ? "lazy" : undefined}
              />
            ))}
            <div className="about-story__slider-dots">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`about-story__slider-dot${active === idx ? " active" : ""}`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Показать фото ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        <div className="about-story__content">
            <h2 className="about-story__title">18 лет вместе: история сервиса, который понимает</h2>
          <p className="about-story__subtitle">18 лет вместе: история сервиса, который понимает</p>
          <div className="about-story__text">
            <p>Наш автосервис открылся 18 лет назад с простой, но сильной идеей:</p>
            <p className="about-story__highlight">Первый сервис с человеческим подходом.</p>
            <p>С тех пор мы не изменили принципам. Мы действительно верим, что обслуживание автомобиля может быть честным, понятным и основанным на доверии. Мы не стремимся «выделиться ради эффекта» — мы просто делаем свою работу по-человечески и профессионально.</p>
          </div>
            <div className="about-story__year">
                <span className="about-story__year-number">18</span>
                <span className="about-story__year-text">лет опыта</span>
            </div>
        </div>
      </div>
    </div>
  );
}
