import { useEffect, useRef, useState } from "react";

const images = [
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill1.png", alt: "Зона отдыха 1" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill2.png", alt: "Зона отдыха 2" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill3.png", alt: "Зона отдыха 3" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill4.png", alt: "Зона отдыха 4" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill5.png", alt: "Зона отдыха 5" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill6.png", alt: "Зона отдыха 6" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill7.png", alt: "Зона отдыха 7" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill8.png", alt: "Зона отдыха 8" },
  { src: "https://s3.regru.cloud/yanis-grek/auto-service/chill9.png", alt: "Зона отдыха 9" },
];

export default function ChillZone() {
  const [active, setActive] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active]);

  const handleDotClick = (index: number) => {
    setActive(index);
    setHasUserInteracted(true);
  };

  return (
    <div className="chill-zone">
      <div className="chill-zone__container">
        <div className="chill-zone__content">
          <h2 className="chill-zone__title">Зона ожидания и отдыха</h2>
          <p className="chill-zone__subtitle">Пока мы работаем, вы отдыхаете</p>
          <div className="chill-zone__text">
            <p>Мы заботимся о вашем комфорте во время обслуживания автомобиля. Наша зона ожидания оборудована удобными диванами и креслами, где вы можете расслабиться.</p>
            <p className="chill-zone__highlight">Красивые аквариумы, игровые приставки и прямой вид на работу мастеров через специальные окна создают атмосферу уюта и прозрачности.</p>
            <p>Вы всегда можете наблюдать процесс работы и убедиться в качестве нашего обслуживания.</p>
          </div>
          <div className="chill-zone__features">
            <div className="chill-zone__feature">
              <svg className="chill-zone__feature-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span className="chill-zone__feature-text">Удобные диваны</span>
            </div>
            <div className="chill-zone__feature">
              <svg className="chill-zone__feature-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span className="chill-zone__feature-text">Аквариумы</span>
            </div>
            <div className="chill-zone__feature">
              <svg className="chill-zone__feature-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span className="chill-zone__feature-text">Игровые приставки</span>
            </div>
            <div className="chill-zone__feature">
              <svg className="chill-zone__feature-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span className="chill-zone__feature-text">Вид на работу</span>
            </div>
          </div>
        </div>
        <div className="chill-zone__slider-wrapper">
          <div className="chill-zone__slider">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
                className={`chill-zone__img chill-zone__img-slide${active === idx ? " active" : ""}`}
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
                  background: "#222"
                }}
                loading="lazy"
              />
            ))}
            <div className="chill-zone__slider-dots">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`chill-zone__slider-dot${active === idx ? " active" : ""}`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Показать фото ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .chill-zone {
          padding: 80px 20px;
          background: #fff;
        }

        .chill-zone__container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .chill-zone__content {
          flex: 1;
        }

        .chill-zone__title {
          font-family: 'Russo One', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #262626;
          margin: 0 0 12px 0;
          text-transform: uppercase;
        }

        .chill-zone__subtitle {
          font-size: 16px;
          color: #2b6eff;
          font-weight: 600;
          margin: 0 0 24px 0;
        }

        .chill-zone__text {
          margin-bottom: 32px;
        }

        .chill-zone__text p {
          font-size: 16px;
          color: #666;
          line-height: 1.8;
          margin: 0 0 16px 0;
        }

        .chill-zone__text p:last-child {
          margin-bottom: 0;
        }

        .chill-zone__highlight {
          font-weight: 600;
          color: #262626;
        }

        .chill-zone__features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .chill-zone__feature {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgb(245, 245, 245);
          border-radius: 0;
        }

        .chill-zone__feature-icon {
          width: 28px;
          height: 28px;
          min-width: 28px;
          color: #2b6eff;
          stroke: currentColor;
        }

        .chill-zone__feature-text {
          font-size: 14px;
          font-weight: 600;
          color: #262626;
        }

        .chill-zone__slider-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          background: #222;
        }

        .chill-zone__slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .chill-zone__img {
          display: block;
        }

        .chill-zone__slider-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        .chill-zone__slider-dot {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.5);
          color: white;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .chill-zone__slider-dot:hover {
          background: rgba(255, 255, 255, 0.5);
          border-color: white;
        }

        .chill-zone__slider-dot.active {
          background: white;
          color: #262626;
          border-color: white;
        }

        @media (max-width: 1024px) {
          .chill-zone {
            padding: 60px 20px;
          }

          .chill-zone__container {
            gap: 40px;
          }

          .chill-zone__title {
            font-size: 32px;
          }

          .chill-zone__text p {
            font-size: 15px;
          }

          .chill-zone__features {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .chill-zone {
            padding: 50px 20px;
          }

          .chill-zone__container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .chill-zone__title {
            font-size: 28px;
          }

          .chill-zone__text p {
            font-size: 14px;
          }

          .chill-zone__features {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .chill-zone__feature {
            padding: 12px;
          }

          .chill-zone__feature-icon {
            font-size: 24px;
            width: 24px;
            height: 24px;
          }

          .chill-zone__feature-text {
            font-size: 12px;
          }

          .chill-zone__slider-dots {
            bottom: 12px;
            gap: 8px;
          }

          .chill-zone__slider-dot {
            width: 32px;
            height: 32px;
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .chill-zone {
            padding: 40px 16px;
          }

          .chill-zone__container {
            gap: 24px;
          }

          .chill-zone__title {
            font-size: 24px;
          }

          .chill-zone__subtitle {
            font-size: 14px;
          }

          .chill-zone__text p {
            font-size: 13px;
          }

          .chill-zone__features {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .chill-zone__feature {
            padding: 12px 10px;
          }

          .chill-zone__feature-icon {
            font-size: 20px;
            width: 20px;
            height: 20px;
            min-width: 20px;
          }

          .chill-zone__slider-dots {
            bottom: 10px;
            gap: 6px;
          }

          .chill-zone__slider-dot {
            width: 28px;
            height: 28px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
