'use client';

import React, { useState } from 'react';
import './Discounts.scss';
import SuccessModal from '../SuccessModal/SuccessModal';

export default function Discounts() {
  const discounts = [
    {
      id: 1,
      title: "Скидка 30% на работы по чистке/мойке впускного коллектора*",
      description: "Акция действует до 15.02.2026. Подробности акции уточняйте у менеджеров Технического центра!",
      image: "/images/banner1.png"
    },
    {
      id: 2,
      title: "Скидка 30% на работы по чистке/мойке впускного коллектора*",
      description: "Акция действует до 15.02.2026. Подробности акции уточняйте у менеджеров Технического центра!",
      image: "/images/banner2.png"
    },
  ];

  const [activeDiscount, setActiveDiscount] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
  
    try {
      const BOT_TOKEN = '8432413502:AAGc6KyVjREe9J1384idB9URnJpo_gjfy_k';
      const CHAT_ID = '-4730139718';
      const text = `Заявка по акции\nИмя: ${name}\nТелефон: ${phone}\nАкция: ${activeDiscount?.title || ''}`;
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      // Отправляем цель в Яндекс.Метрику
      if (typeof window !== "undefined" && window.ym) {
        window.ym(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID, 'reachGoal', 'discountForm');
      }

      // Очистка формы и закрытие модалки
      setActiveDiscount(null);
      setName('');
      setPhone('');

      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Ошибка при отправке. Попробуйте позже.");
    }
  };
  

  return (
    <section className="Discounts">
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
      
      <div className="Discounts__wrapper">
        <h2 className="Discounts__title">Акции</h2>
        <div className="Discounts__list">
          {discounts.map(discount => (
            <img
              key={discount.id}
              src={discount.image}
              className="Discounts__item"
              alt="discount"
              onClick={() => setActiveDiscount(discount)}
            />
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
