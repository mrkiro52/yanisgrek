import React from 'react';
import './Discounts.scss';

export default function Discounts() {
  // Пример данных об акциях
  const discounts = [
    {
      id: 1,
      title: "Скидка 30% на замену масла АКПП и агрегатах",
      description: "Комплексная диагностика авто - бесплатно. Акция до 31.08.2025. Подробности уточняйте у менеджеров технического центра YanisGrek",
      image: "/images/servicesImages/zamena-masla-v-akpp.jpg"
    },
    {
      id: 2,
      title: "Скидка 30% на обслуживание и перезаправку системы кондиционирования",
      description: "Акция до 31.08.2025. Подробности уточняйте у менеджеров технического центра YanisGrek",
      image: "/images/servicesImages/antibakterialnaya-obrabotka-konditsionera.jpg"
    },
  ];

  return (
    <section className="Discounts">
        <div className="Discounts__wrapper">
            <h2 className="Discounts__title">Акции</h2>
            <div className="Discounts__list">
                {discounts.map(discount => (
                    <div 
                        key={discount.id} 
                        className="Discounts__item"
                        style={{ backgroundImage: `url(${discount.image})` }}
                    >
                        <div className="Discounts__content">
                          <h3 className="Discounts__item-title">{discount.title}</h3>
                          <p className="Discounts__item-description">{discount.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}