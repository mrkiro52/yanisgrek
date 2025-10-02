'use client';

import React, { useState } from 'react';
import './Discounts.scss';

export default function Discounts() {
  const discounts = [
    {
      id: 1,
      title: "Скидка 30% на замену масла АКПП и агрегатах",
      description: "Комплексная диагностика авто - бесплатно. Акция до 31.08.2025. Подробности уточняйте у менеджеров технического центра YanisGrek",
      image: "/images/banner1.png"
    },
    {
      id: 2,
      title: "Скидка 30% на обслуживание и перезаправку системы кондиционирования",
      description: "Акция до 31.08.2025. Подробности уточняйте у менеджеров технического центра YanisGrek",
      image: "/images/banner2.png"
    },
  ];

  const [activeDiscount, setActiveDiscount] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Zа-яА-ЯёЁ\s-]*$/.test(value)) setName(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\+?\d*$/.test(value)) setPhone(value);
  };

  const handleSubmit = async () => {
    if (!name || !phone) return;
  
    const message = `Клиент записался на акцию:
  ${activeDiscount.title}
  Имя: ${name}
  Телефон: ${phone}`;
  
    const BOT_TOKEN = "8284718697:AAFV_l6X0bdzKhyJ39SlNzAdszYp5ieKcNQ";
    const CHAT_ID = "-1002955332793";
    const URI_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
    try {
      const response = await fetch(URI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
  
      if (response.ok) {
        // Очистка формы и закрытие модалки
        setActiveDiscount(null);
        setName('');
        setPhone('');
  
        // Уведомление
        alert("Заявка успешно отправлена!");
      } else {
        console.error("Ошибка при отправке:", await response.text());
        alert("Ошибка при отправке. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
      alert("Ошибка при отправке. Попробуйте позже.");
    }
  };
  

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
              onClick={() => setActiveDiscount(discount)}
            >
              <div className="Discounts__content">
                {/* <h3 className="Discounts__item-title">{discount.title}</h3>
                <p className="Discounts__item-description">{discount.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeDiscount && (
        <div className="Discounts__modal">
          <div className="Discounts__modal-content">
            <h3>{activeDiscount.title}</h3>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={handleNameChange}
            />
            <input
              type="text"
              placeholder="+7XXXXXXXXXX"
              value={phone}
              onChange={handlePhoneChange}
            />
            <button
              onClick={handleSubmit}
              className={`submit_btn ${(!name || !phone) ? "disabled" : ""}`}
              disabled={!name || !phone}
            >
              Записаться
            </button>
            <button
              className="close_btn"
              onClick={() => setActiveDiscount(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
