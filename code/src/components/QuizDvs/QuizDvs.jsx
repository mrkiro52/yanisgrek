'use client';

import { useState, useEffect } from "react";
import "./QuizDvs.scss";
import { usePathname } from 'next/navigation';

export default function QuizDvs() {
  const pathname = usePathname(); // получаем полный путь
  const slug = pathname.split("/").filter(Boolean).pop(); // вытаскиваем последний сегмент

  useEffect(() => {
    console.log("Slug страницы:", slug);
  }, [slug]);

  const allModels = [
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

  const engines = {
    "b37d15": ["BMW 1", "BMW 2", "BMW 3"], // дизель 1.5, F20/F21/F22/F30
    "b38b15": ["BMW 1", "BMW 2", "BMW 3", "BMW X1"], // бензин 1.5, много компактных
    "b47d20": ["BMW 1", "BMW 2", "BMW 3", "BMW 5", "BMW X1", "BMW X3", "BMW X5"], // дизель 2.0
    "b48-elektromotor": ["BMW X3"], // гибриды, но не в чистом виде
    "b48b20": ["BMW 1", "BMW 2", "BMW 3", "BMW 4", "BMW 5", "BMW X1", "BMW X3"], // бензин 2.0 turbo
    "b57d30": ["BMW 5", "BMW 7", "BMW X5", "BMW X6"], // дизель 3.0
    "b58-elektromotor": ["BMW X5"], // гибридная установка
    "b58b30": ["BMW 3", "BMW 4", "BMW 5", "BMW 7", "BMW X3", "BMW X5", "BMW X6"], // бензин 3.0 turbo
    "i4-edrive40-m50": ["BMW i4"], // только i4
    "ix-xdrive40-50-m60": ["BMW iX"], // только iX
    "ix3-edrive80": ["BMW iX3"], // только iX3
    "n13b16": ["BMW 1", "BMW 3"], // бензин 1.6 turbo, ставился в F20/F30
    "n20-elektromotor-edrive": ["BMW 3"], // гибриды
    "n20b16-n20b20": ["BMW 1", "BMW 3", "BMW 5", "BMW X3", "BMW X5"], // бензин 2.0 turbo
    "n26b20": ["BMW 3"], // аналог N20 для США, чаще 3 серия
    "n47d160-n47d20": ["BMW 1", "BMW 3", "BMW 5", "BMW X1", "BMW X3"], // дизель 2.0
    "n52b30": ["BMW 3", "BMW 5", "BMW X3", "BMW X5"], // атмосферный 3.0
    "n54b30": ["BMW 3", "BMW 5"], // ранний 3.0 turbo
    "n55b30": ["BMW 3", "BMW 4", "BMW 5", "BMW X3", "BMW X5", "BMW X6"], // 3.0 turbo
    "n57d30": ["BMW 3", "BMW 5", "BMW 7", "BMW X3", "BMW X5", "BMW X6"], // дизель 3.0
    "n63b44-tu-tu2-tu3": ["BMW 5", "BMW 7", "BMW X5", "BMW X6", "BMW M5"], // 4.4 V8 twin turbo
    "n63b44": ["BMW 5", "BMW 7", "BMW X5", "BMW X6"], // ранняя версия
    "s55b30": ["BMW 3", "BMW 4"], // M3/M4
    "s58b30": ["BMW 3", "BMW 4", "BMW X3", "BMW X4"], // новые M3/M4/X3M/X4M (X4 нет в списке, убираю)
    "s63b44": ["BMW M5", "BMW X5", "BMW X6"], // M5/M X5M/X6M
    "s68-elektromotor": ["BMW M5"], // гибриды M
    "s68b44": ["BMW 7", "BMW X7", "BMW X5", "BMW X6", "BMW M5"], // новый V8 M (X7 нет в списке → убираем)
  };

  // Если slug есть в engines — используем его модели + "Другая", иначе — все модели
  const [models, setModels] = useState(allModels);

  useEffect(() => {
    if (slug && engines[slug]) {
      const newModels = [...engines[slug], "Другая"].filter((v, i, a) => a.indexOf(v) === i); // убираем дубликаты
      setModels(newModels);
    } else {
      setModels(allModels);
    }
  }, [slug]);
  

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
