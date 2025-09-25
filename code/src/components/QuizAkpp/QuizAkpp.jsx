'use client';

import { useState, useEffect } from "react";
import "./QuizAkpp.scss";
import { usePathname } from 'next/navigation';

export default function QuizAkpp() {
  const allModels = [
    "BMW 1", "BMW 2", "BMW 3", "BMW 4",
    "BMW 5", "BMW 7", "BMW X1", "BMW X3",
    "BMW X5", "BMW X6", "BMW M5", "Другая"
  ];

  const [models, setModels] = useState(allModels);

  const services = [
    "Замена масла АКПП",
    "Устранение течи масла",
    "Устранение пинков АКПП",
    "Капитальный ремонт АКПП",
    "Ремонт гидротрансформатора",
    "Ремонт гидроблока",
    "Ремонт мехатроника",
    "Замена муфты карданного вала",
    "Диагностика",
    "Консультация"
  ];

  const transmissions = {
    "bmw-i4-1at": ["BMW i4", "Другая"],
    "bmw-i7-1at": ["BMW i7", "Другая"],
    "bmw-ix-1at": ["BMW iX", "Другая"],
    "getrag-7dct300": ["BMW 1", "BMW 2", "BMW 3", "BMW 4"],
    "getrag-7dct500": ["BMW 3", "BMW 4", "BMW 5"],
    "getrag-7dct600": ["BMW 5", "BMW 7"],
    "getrag-7dct700": ["BMW 7", "BMW X5", "BMW X6"],
    "getrag-gs6-17bg": ["BMW 1", "BMW 2", "BMW 3"],
    "getrag-gs6-45bz": ["BMW 3", "BMW 4", "BMW 5"],
    "zf-8hp45": ["BMW 3", "BMW 4", "BMW X3"],
    "zf-8hp50": ["BMW 4", "BMW 5", "BMW X3", "BMW X5"],
    "zf-8hp51": ["BMW 5", "BMW 7"],
    "zf-8hp70": ["BMW 7", "BMW X5", "BMW X6"],
    "zf-8hp75": ["BMW 7", "BMW X5", "BMW X6", "BMW M5"],
    "zf-8hp76": ["BMW X5", "BMW X6", "BMW M5"],
    "zf-8hp90": ["BMW 7", "BMW X5", "BMW X6"],
    "zf-gs6-45dz": ["BMW 1", "BMW 2", "BMW 3"],
    "zf-gs6-53dz": ["BMW 3", "BMW 4", "BMW 5"],
  };

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");


      // Получаем slug из URL
      const pathname = usePathname(); // получаем полный путь
      const slug = pathname.split("/").filter(Boolean).pop(); // вытаскиваем последний сегмент

  useEffect(() => {
    if (slug && transmissions[slug]) {
      // Обновляем models на основании выбранной коробки + "Другая"
      setModels([...new Set([...transmissions[slug], "Другая"])]);
    } else {
      setModels(allModels);
    }
  }, []);

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const BOT_TOKEN = "8284718697:AAFV_l6X0bdzKhyJ39SlNzAdszYp5ieKcNQ";
  const CHAT_ID = "-1002955332793";
  
  const handleSubmit = async () => {
    const message = `Клиент оставил заявку на АКПП:
  Модель: ${selectedModel || "-"}
  АКПП: ${slug}
  Услуги:
  ${selectedServices.map(s => "- " + s).join("\n")}
  Имя: ${name}
  Телефон: ${phone}`;
  
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      });
  
      if (response.ok) {
        console.log("Сообщение отправлено в Telegram ✅");
  
        // 1. Очистка полей
        setSelectedModel("");
        setSelectedServices([]);
        setName("");
        setPhone("");
  
        // 2. Уведомление
        alert("Заявка успешно отправлена!");
      } else {
        console.error("Ошибка при отправке:", await response.text());
        alert("Ошибка при отправке. Попробуйте ещё раз.");
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
      alert("Ошибка при отправке. Попробуйте позже.");
    }
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
    <div className="QuizAkpp">
      <div className="wrapper">
        <h2>Запишись на ремонт коробки передач</h2>

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
