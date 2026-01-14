"use client";

import React, { useEffect, useState } from "react";
import "./Form.scss";
import SuccessModal from "../SuccessModal/SuccessModal";

export default function Form() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vin: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);  

  // Формат сегодняшней даты для ограничения min
  const now = new Date();
  const yyyyToday = now.getFullYear();
  const mmToday = String(now.getMonth() + 1).padStart(2, "0");
  const ddToday = String(now.getDate()).padStart(2, "0");
  const todayString = `${yyyyToday}-${mmToday}-${ddToday}`;

  useEffect(() => {
    // По умолчанию — завтра в 10:00
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
    setSelectedTime("10:00");
  }, []);

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[\s()-]/g, "");
    if (cleaned.startsWith("+")) {
      return cleaned.length === 12;
    } else if (cleaned.startsWith("7") || cleaned.startsWith("8")) {
      return cleaned.length === 11;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Проверка рабочего времени
    if (selectedTime < "10:00" || selectedTime > "20:00") {
      alert("Выберите рабочее время автосервиса с 10:00 до 20:00");
      return;
    }
  
    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }
  
    if (!validatePhone(formData.phone)) {
      alert("Неверный формат телефона.");
      return;
    }
  
    try {
      const TELEGRAM_TOKEN = '8432413502:AAGc6KyVjREe9J1384idB9URnJpo_gjfy_k';
      const CHAT_ID = '-4730139718';
      const text = `Заявка с сайта YANIS GREK\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nVIN: ${formData.vin || '—'}\nДата: ${selectedDate}\nВремя: ${selectedTime}`;

      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error('Telegram API error');
      }

      setIsModalOpen(true);
      setFormData({ name: '', phone: '', vin: '' });
    } catch (error) {
      console.error('Send error:', error);
      alert('Ошибка при отправке. Попробуйте ещё раз.');
    }
  };  

  return (
    <>
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="Form" id="Form">
        <img
          src="/images/contacts_green_car.jpg"
          alt="Фон — автомобиль"
          className="bg-image"
        />
        <div className="right-blur-overlay" />

        <div className="ContactFormSection">
          <h2>
            Оставь заявку, <br />
            выбрав день и время
          </h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name" className="form-label">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label htmlFor="phone" className="form-label">
                Ваш телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label htmlFor="vin" className="form-label">
                Ваш VIN-номер*
              </label>
              <input
                type="text"
                id="vin"
                name="vin"
                className="form-input"
                placeholder="НЕОБЯЗАТЕЛЬНО"
                value={formData.vin}
                onChange={(e) =>
                  setFormData({ ...formData, vin: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <label htmlFor="datetime" className="form-label-1">
                Дата и время
              </label>
              <div className="form-datetime">
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-input"
                  value={selectedDate}
                  min={todayString}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="form-input"
                  value={selectedTime}
                  step={60}
                  min="00:00"
                  max="23:59"
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="form-button">
              Записаться
            </button>
          </form>

          <div className="contacts-info">
            <div className="contacts-info-block">
              <h2 className="title-contacts-info">Адрес</h2>
              <a
                href="https://yandex.ru/profile/1175654222?lang=ru"
                target="_blank"
              >
                г. Москва
                <br />
                Высоковольтный проезд, д. 1, стр. 29
              </a>
            </div>
            <div className="contacts-info-block">
              <h2 className="title-contacts-info">Режим работы</h2>
              <p>
                Пн–Пт: 10:00–20:00
                <br />
                Сб: 11:00–20:00
                <br />
                Вс: 11:00–18:00
              </p>
            </div>
            <div className="contacts-info-block">
              <h2 className="title-contacts-info">Телефоны</h2>
              <a href="tel:+74957676500" target="_blank">
               +7 495 76 76 500
              </a>
              <p>Запишитесь по телефону</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ filter: "invert(0.9) hue-rotate(180deg)" }}
        className="yandex_map"
      >
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A9cd8128f022d9c52582359f6749d3206589822ddbb5c480e49a54483a2093b0d&amp;source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
}