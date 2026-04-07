import { useState, useMemo } from 'react';
import { maintenanceData, modelsWithOther, submodels } from '../assets/maintenanceData';
import CustomSelect from './CustomSelect';
import { sendToTelegram } from '../utils/telegram';
import SuccessPopup from './SuccessPopup';

const services = [
  'Диагностика Авто',
  'Консультация',
  'Ремонт АКПП',
  'Диагностика АКПП',
  'Ремонт ДВС',
  'Диагностика ДВС',
  'Ремонт подвески',
  'Ремонт тормозной системы',
  'Ремонт системы охлаждения',
  'Ремонт и замена аккумуляторов'
];

export default function ServiceQuiz() {
  const [step, setStep] = useState(1);
  const [modelId, setModelId] = useState('1');
  const [seriesName, setSeriesName] = useState('');
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [vin, setVin] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const seriesList = useMemo(() => {
    if (!modelId) return [];
    return (maintenanceData[modelId] || []).map(item => {
      const name = Object.keys(item)[0];
      return { id: name, name };
    });
  }, [modelId]);

  const handleNext = () => {
    if (step === 1 && !modelId) return;
    // Пропускаем шаг 2 если выбрана "Другая"
    if (step === 1 && modelId === 'OTHER') {
      setStep(3);
      return;
    }
    if (step === 2 && !seriesName) return;
    if (step === 3 && selectedService.length === 0) return;
    if (step === 5 && !phone) return;
    
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      // Если мы на шаге 3 и выбрана "Другая", возвращаемся на шаг 1
      if (step === 3 && modelId === 'OTHER') {
        setStep(1);
      } else {
        setStep(step - 1);
      }
    }
  };

  const handleSubmit = async () => {
    const modelName = modelId === 'RR' ? 'Rolls Royce' 
      : modelId === 'MINI' ? 'Mini Cooper' 
      : modelId === 'OTHER' ? 'Другая' 
      : `BMW ${modelId}`;
    
    const success = await sendToTelegram({
      type: 'service-quiz',
      data: {
        model: modelName,
        series: seriesName || 'Не указана',
        services: selectedService,
        vin: vin || 'Не указан',
        phone: phone
      },
      url: window.location.href
    });

    if (success) {
      setShowSuccessPopup(true);
      // Сбрасываем форму
      setStep(1);
      setSelectedService([]);
      setVin('');
      setPhone('');
    } else {
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
    }
  };

  const toggleService = (service: string) => {
    setSelectedService(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="ServiceQuiz">
      <h2 className="quiz-title">
        Получите расчет <span>конкретной услуги</span>
      </h2>

      <div className="quiz-progress">
        {[1, 2, 3, 4, 5].map(s => (
          <div key={s} className={`progress-step ${s <= step ? 'active' : ''}`}>
            {s}
          </div>
        ))}
      </div>

      <div className="quiz-content">
        {step === 1 && (
          <div className="quiz-step">
            <h3 className="step-title">Шаг 1: Выберите модель вашей машины</h3>
            <div className="model-buttons">
              {modelsWithOther.map(m => (
                <button
                  key={m.id}
                  className={m.id === modelId ? 'selected' : ''}
                  onClick={() => {
                    if (m.id !== modelId) {
                      setModelId(m.id);
                      setSeriesName('');
                      // Если выбрана не "Другая", автоматически выбираем первую серию
                      if (m.id !== 'OTHER') {
                        const list = maintenanceData[m.id] || [];
                        const defaultSeries = list.length > 0 ? Object.keys(list[0])[0] : '';
                        setSeriesName(defaultSeries);
                      }
                    }
                  }}
                >
                  {m.id === 'RR' ? 'Rolls Royce' : m.id === 'MINI' ? 'Mini Cooper' : m.id === 'OTHER' ? 'Другая' : `BMW ${m.name}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="quiz-step">
            <h3 className="step-title">Шаг 2: Выберите серию машины</h3>
            <div className="series-select">
              <CustomSelect
                value={seriesName}
                onChange={setSeriesName}
                options={seriesList.map(s => ({ value: s.name, label: s.name }))}
                placeholder="Выберите серию"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="quiz-step">
            <h3 className="step-title">Шаг 3: Выберите вид работ</h3>
            <div className="services-grid">
              {services.map(service => (
                <button
                  key={service}
                  className={selectedService.includes(service) ? 'selected' : ''}
                  onClick={() => toggleService(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="quiz-step">
            <h3 className="step-title">Шаг 4: Введите VIN номер</h3>
            <p className="step-description">Сразу проверим стоимость и наличие запчастей (необязательное поле)</p>
            <input
              id="quiz-vin"
              name="vin"
              type="text"
              placeholder="VIN номер"
              value={vin}
              onChange={e => setVin(e.target.value.toUpperCase())}
              maxLength={17}
            />
          </div>
        )}

        {step === 5 && (
          <div className="quiz-step">
            <h3 className="step-title">Шаг 5: Введите ваш номер WhatsApp</h3>
            <p className="step-description">Для отправки расчета</p>
            <input
              id="quiz-phone"
              name="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={e => {
                let value = e.target.value.replace(/[^\d+]/g, '');
                // Разрешаем + только в начале
                if (value.includes('+')) {
                  const digits = value.replace(/\+/g, '');
                  value = '+' + digits.slice(0, 11);
                } else {
                  value = value.slice(0, 11);
                }
                setPhone(value);
              }}
              maxLength={12}
              required
            />
          </div>
        )}
      </div>

      <div className="quiz-buttons">
        <button 
          className="btn-back" 
          onClick={handleBack}
          disabled={step === 1}
        >
          Назад
        </button>
        <button 
          className="btn-next" 
          onClick={handleNext}
          disabled={
            (step === 1 && !modelId) ||
            (step === 2 && !seriesName) ||
            (step === 3 && selectedService.length === 0) ||
            (step === 5 && !phone)
          }
        >
          {step === 5 ? 'Отправить' : 'Дальше'}
        </button>
      </div>

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </div>
  );
}
