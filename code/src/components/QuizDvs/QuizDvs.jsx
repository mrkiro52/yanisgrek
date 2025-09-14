'use client';

import { useState, useEffect } from "react";
import "./QuizDvs.scss";

export default function QuizDvs({ defaultEngine }) {
  const models = [
    "BMW 1", "BMW 2", "BMW 3", "BMW 4",
    "BMW 5", "BMW 7", "BMW X1", "BMW X3",
    "BMW X5", "BMW X6", "BMW M5"
  ];

  const engines = {
    "BMW 1": ["n13b16", "n20b16-n20b20", "b38b15"],
    "BMW 2": ["b37d15", "b47d20", "b48b20"],
    "BMW 3": ["n20-elektromotor-edrive", "n26b20", "n52b30", "b48-elektromotor"],
    "BMW 4": ["n54b30", "n55b30", "s55b30"],
    "BMW 5": ["b57d30", "b58b30", "n63b44"],
    "BMW 7": ["b58-elektromotor", "n63b44-tu-tu2-tu3", "s68b44"],
    "BMW X1": ["n47d160-n47d20", "b37d15", "b38b15"],
    "BMW X3": ["b47d20", "b58b30", "ix3-edrive80"],
    "BMW X5": ["n57d30", "n63b44-tu-tu2-tu3", "ix-xdrive40-50-m60"],
    "BMW X6": ["n63b44", "s63b44", "b58-elektromotor"],
    "BMW M5": ["s63b44", "s68-elektromotor", "s68b44"]
  };

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Если передан defaultEngine → ищем в какой модели он есть
  useEffect(() => {
    if (!defaultEngine) return;

    let foundModel = null;
    for (const model in engines) {
      if (engines[model].includes(defaultEngine)) {
        foundModel = model;
        break;
      }
    }

    if (foundModel) {
      setSelectedModel(foundModel);
      setSelectedEngine(defaultEngine);
    }
  }, [defaultEngine]);

  const handleSubmit = () => {
    const message = `Клиент оставил заявку на ремонт двигателя:
  - Модель: ${selectedModel}
  - Двигатель: ${selectedEngine}
  - Имя: ${name}
  - Телефон: ${phone}`;
  
    const phoneNumber = "79852707575";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const isFormValid =
    selectedEngine && name.trim() !== "" && phone.trim() !== "";

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
    <div className="QuizDvs">
      <div className="wrapper">
        <h2>Запишись на ремонт двигателя</h2>
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
                  setSelectedEngine(null);
                }}
              >
                <span>{model}</span>
              </div>
            ))}
          </div>

          {/* Шаг 2 - двигатель */}
          {selectedModel && (
            <div className="row">
              <h3>2. Выбери двигатель</h3>
              {engines[selectedModel].map((engine, idx) => (
                <div
                  key={idx}
                  className={`model_tab ${selectedEngine === engine ? "selected" : ""}`}
                  onClick={() => setSelectedEngine(engine)}
                >
                  <span>{engine}</span>
                </div>
              ))}
            </div>
          )}

          {/* Шаг 3 и 4 - данные */}
          {selectedEngine && (
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
