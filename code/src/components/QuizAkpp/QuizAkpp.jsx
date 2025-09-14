'use client';

import { useState, useEffect } from "react";
import "./QuizAkpp.scss";

export default function QuizAkpp({ defaultGearbox }) {
  const models = [
    "BMW 1", "BMW 2", "BMW 3", "BMW 4",
    "BMW 5", "BMW 7", "BMW X1", "BMW X3",
    "BMW X5", "BMW X6", "BMW M5"
  ];

  const gearboxes = {
    "BMW 1": ["bmw-i4-1at", "getrag-gs6-45bz", "zf-8hp45"],
    "BMW 2": ["bmw-i7-1at", "getrag-7dct300", "zf-8hp50"],
    "BMW 3": ["bmw-ix-1at", "getrag-7dct500", "zf-8hp51"],
    "BMW 4": ["getrag-7dct600", "zf-8hp70"],
    "BMW 5": ["getrag-7dct700", "zf-8hp75"],
    "BMW 7": ["zf-8hp76", "zf-8hp90"],
    "BMW X1": ["getrag-gs6-17bg", "zf-gs6-45dz"],
    "BMW X3": ["zf-gs6-53dz", "zf-8hp50"],
    "BMW X5": ["zf-8hp70", "zf-8hp90"],
    "BMW X6": ["getrag-7dct700", "zf-8hp76"],
    "BMW M5": ["zf-8hp90", "zf-gs6-53dz"]
  };

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedGearbox, setSelectedGearbox] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Если есть пропс defaultGearbox → ищем, в какой модели он находится
  useEffect(() => {
    if (!defaultGearbox) return;

    let foundModel = null;
    for (const model in gearboxes) {
      if (gearboxes[model].includes(defaultGearbox)) {
        foundModel = model;
        break;
      }
    }

    if (foundModel) {
      setSelectedModel(foundModel);
      setSelectedGearbox(defaultGearbox);
    }
  }, [defaultGearbox]);

  const handleSubmit = () => {
    const message = `Клиент оставил заявку на ремонт коробки передач:
  - Модель: ${selectedModel}
  - Коробка: ${selectedGearbox}
  - Имя: ${name}
  - Телефон: ${phone}`;

    const phoneNumber = "79852707575"; // без +
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const isFormValid =
    selectedGearbox && name.trim() !== "" && phone.trim() !== "";

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Zа-яА-ЯёЁ\s-]*$/.test(value)) {
      setName(value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\+?\d*$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="QuizAkpp">
      <div className="wrapper">
        <h2>Запишись на ремонт коробки передач</h2>
        <div className="block">
          {/* Шаг 1 - модель */}
          <div className="row">
            <h3>1. Выбери модель</h3>
            {models.map((model, idx) => (
              <div
                key={idx}
                className={`model_tab ${selectedModel === model ? "selected" : ""}`}
                onClick={() => {
                  setSelectedModel(model);
                  setSelectedGearbox(null);
                }}
              >
                <span>{model}</span>
              </div>
            ))}
          </div>

          {/* Шаг 2 - коробки */}
          {selectedModel && (
            <div className="row">
              <h3>2. Выбери коробку передач</h3>
              {gearboxes[selectedModel].map((gb, idx) => (
                <div
                  key={idx}
                  className={`model_tab ${selectedGearbox === gb ? "selected" : ""}`}
                  onClick={() => setSelectedGearbox(gb)}
                >
                  <span>{gb}</span>
                </div>
              ))}
            </div>
          )}

          {/* Шаг 3 и 4 - данные */}
          {selectedGearbox && (
            <>
              <div className="row">
                <h3>3. Введи имя</h3>
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="row">
                <h3>4. Введи телефон</h3>
                <input
                  type="text"
                  placeholder="+7XXXXXXXXXX"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </>
          )}

          <button
            onClick={isFormValid ? handleSubmit : undefined}
            className={`submit_btn ${!isFormValid ? "disabled" : ""}`}
            disabled={!isFormValid}
          >
            Записаться
          </button>
        </div>
      </div>
    </div>
  );
}
