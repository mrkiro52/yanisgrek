import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutTeam() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const team = [
    { name: 'Александр', role: 'Директор автосервиса', image: 'https://s3.regru.cloud/yanis-grek/workers/worker1.webp' },
    { name: 'Максим', role: 'Мастер приемщик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker2.webp' },
    { name: 'Сергей', role: 'Механик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker3.webp' },
    { name: 'Дмитрий', role: 'Мастер приемщик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker4.webp' },
    { name: 'Александр', role: 'Механик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker5.webp' },
    { name: 'Тимур', role: 'Мастер приемщик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker6.webp' },
    { name: 'Гайрат', role: 'Механик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker7.webp' },
    { name: 'Олег', role: 'Механик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker8.webp' },
    { name: 'Виталий', role: 'Механик', image: 'https://s3.regru.cloud/yanis-grek/workers/worker9.webp' },
  ];

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % team.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoplay, team.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % team.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + team.length) % team.length);
    setIsAutoplay(false);
  };

  // Вычисляем видимые слайды (текущий и следующие 3)
  const getVisibleSlides = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push((currentSlide + i) % team.length);
    }
    return visible;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div className="about-team">
      <div className="about-team__container">
        <h2 className="about-team__title">Наша команда</h2>
        <p className="about-team__subtitle">Профессионалы, которые действительно любят свою работу</p>

        <div className="about-team__slider">
          <div className="about-team__slider-track">
            {visibleSlides.map((slideIdx, displayIdx) => {
              const member = team[slideIdx];
              const isCenter = displayIdx === 0;
              return (
                <div
                  key={slideIdx}
                  className={`about-team__slide ${isCenter ? 'active' : ''}`}
                >
                  <div className="about-team__card">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="about-team__image"
                      loading="lazy"
                    />
                    <h3 className="about-team__name">{member.name}</h3>
                    <p className="about-team__role">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="about-team__button about-team__button--prev"
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft size={24} color="white" />
          </button>

          <button
            className="about-team__button about-team__button--next"
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            <ChevronRight size={24} color="white" />
          </button>
        </div>

        <div className="about-team__dots">
          {team.map((_, idx) => (
            <button
              key={idx}
              className={`about-team__dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => {
                setCurrentSlide(idx);
                setIsAutoplay(false);
              }}
              aria-label={`Слайд ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
