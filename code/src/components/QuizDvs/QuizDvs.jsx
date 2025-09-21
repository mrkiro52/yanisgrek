'use client';

import { useState } from "react";
import "./QuizDvs.scss";

export default function QuizDvs() {
  const models = [
    "BMW 1", "BMW 2", "BMW 3", "BMW 4",
    "BMW 5", "BMW 7", "BMW X1", "BMW X3",
    "BMW X5", "BMW X6", "BMW M5", "Другая"
  ];

  const services = [
    "Устранение течи масла ",
    "Замена маслосъемных колпачков",
    "Замена ваносов, замена цепи",
    "Капитальный ремонт двигателя",
    "Замена навесного двигателя",
    "Техническое обслуживание двигател",
    "Диагностика ДВС",
    "Консультация"
  ];

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = () => {
    const message = `Клиент оставил заявку:
Модель: ${selectedModel || "-"}
Услуги:
${selectedServices.map(s => "- " + s).join("\n")}
Имя: ${name}
Телефон: ${phone}`;

    const phoneNumber = "79852707575"; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const isFormValid =
    selectedModel && selectedServices.length > 0 && name.trim() && phone.trim();

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Zа-яА-ЯёЁ\s-]*$/.test(value)) setName(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\+?\d*$/.test(value)) setPhone(value);
  };

  // Разбиваем массивы на колонки
  const halfModels = Math.ceil(models.length / 2);
  const firstModelsCol = models.slice(0, halfModels);
  const secondModelsCol = models.slice(halfModels);

  const halfServices = Math.ceil(services.length / 2);
  const firstServicesCol = services.slice(0, halfServices);
  const secondServicesCol = services.slice(halfServices);

  return (
    <div className="QuizDvs">
      <div className="wrapper">
        <h2>Запишись на ремонт коробки передач</h2>

        {/* Выбор модели */}
        <div className="block">
        <div className="block">
  <div className="row models">
    <h3>Выбери модель BMW</h3>
    {models.map((m, idx) => (
      <div
        key={idx}
        className={`model_tab ${selectedModel === m ? "selected" : ""}`}
        onClick={() => setSelectedModel(m)}
      >
        {m}
      </div>
    ))}
  </div>
</div>

        </div>

        {/* Выбор услуг */}
        <div className="block">
          {selectedModel && <div className="row services">
            <h3>Выбери услуги</h3>
            <div className="column">
              {firstServicesCol.map((s, idx) => (
                <div
                  key={idx}
                  className={`model_tab ${selectedServices.includes(s) ? "selected" : ""}`}
                  onClick={() => toggleService(s)}
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="column">
              {secondServicesCol.map((s, idx) => (
                <div
                  key={idx}
                  className={`model_tab ${selectedServices.includes(s) ? "selected" : ""}`}
                  onClick={() => toggleService(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>}

          {selectedServices.length !== 0 && <div className="row">
            <h3>Имя</h3>
            <input type="text" placeholder="Имя" value={name} onChange={handleNameChange} />
          </div>}

          {selectedServices.length !== 0 && <div className="row">
            <h3>Телефон</h3>
            <input type="text" placeholder="+7XXXXXXXXXX" value={phone} onChange={handlePhoneChange} />
          </div>}

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
