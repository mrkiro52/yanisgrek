import { useEffect, useRef, useState } from "react";

const images = [
  { src: "/images/workerpc.webp", alt: "Работа за компьютером" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/rel2.png", alt: "отношения 2" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/rel3.png", alt: "отношения 3" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/rel4.png", alt: "отношения 4" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/rel5.png", alt: "отношения 5" },
];

export default function AboutApproach() {
  const [active, setActive] = useState(0);
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
  };

  return (
    <div className="about-approach">
      <div className="about-approach__container">
        <div className="about-approach__content">
          <h2 className="about-approach__title">Не просто ремонт, а отношения с клиентом</h2>
          <div className="about-approach__blocks">
            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Работа без излишнего пафоса</h3>
              <p>Мы не просто ремонтируем автомобили — мы строим долгосрочные отношения с каждым клиентом. Нам важна обратная связь, ведь именно она помогает нам становиться лучше.</p>
            </div>
            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Человеческий подход</h3>
              <p>Для нашей компании приоритетом являются не автомобили, а люди — клиенты, обращающиеся к нам за обслуживанием. Мы ценим каждого, кто приезжает в наш сервис.</p>
            </div>
            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Постоянное развитие</h3>
              <p>Мы не претендуем на статус «супермастеров». Мы выполняем свою работу профессионально, изучаем новейшие технологии и методики, чтобы оставаться в курсе трендов.</p>
            </div>
            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Качество и честность</h3>
              <p>Наша главная задача — обеспечить максимально высокий уровень удовлетворённости клиентов и качеством выполненных работ, и уровнем сервиса.</p>
            </div>
          </div>
        </div>
        <div className="about-approach__slider">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={img.alt}
              className={`about-approach__img about-approach__img-slide${active === idx ? " active" : ""}`}
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
          <div className="about-approach__slider-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`about-approach__slider-dot${active === idx ? " active" : ""}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Показать фото ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="about-approach__quote">
        <p>С уважением,</p>
        <p className="about-approach__quote-author">Янис Грек, владелец мастерской</p>
      </div>
    </div>
  );
}
