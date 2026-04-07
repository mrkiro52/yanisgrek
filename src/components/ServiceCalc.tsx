import { useState, useEffect, useMemo } from 'react';
import { maintenanceData, models, submodels } from '../assets/maintenanceData';
import CustomSelect from './CustomSelect';
import { sendToTelegram } from '../utils/telegram';
import SuccessPopup from './SuccessPopup';

export default function ServiceCalc() {
  // Инициализируем с null для SSR, чтобы избежать дергания
  const [modelId, setModelId] = useState<string>('');
  const [seriesName, setSeriesName] = useState('');
  const [mileage, setMileage] = useState(100000);
  const [partType, setPartType] = useState<'Оригинал' | 'Аналог'>('Оригинал');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<boolean[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Загружаем из localStorage после гидрации
  useEffect(() => {
    const savedModelId = localStorage.getItem('selectedCarModelId');
    const savedSeriesName = localStorage.getItem('selectedCarSeriesName');
    
    // Сначала проверяем localStorage, если нет - берем первую модель
    let initialModelId = savedModelId || '1';
    setModelId(initialModelId);
    
    // Если серия сохранена и она есть в текущей модели - используем её
    // Иначе выбираем первую серию для модели
    if (savedSeriesName) {
      const list = maintenanceData[initialModelId] || [];
      const seriesExists = list.some(item => Object.keys(item)[0] === savedSeriesName);
      if (seriesExists) {
        setSeriesName(savedSeriesName);
      } else {
        // Если сохраненная серия не подходит, выбираем первую
        const defaultSeries = list.length > 0 ? Object.keys(list[0])[0] : '';
        setSeriesName(defaultSeries);
      }
    } else {
      // Если серия не сохранена, выбираем первую для модели
      const list = maintenanceData[initialModelId] || [];
      const defaultSeries = list.length > 0 ? Object.keys(list[0])[0] : '';
      setSeriesName(defaultSeries);
    }
    
    setIsHydrated(true);
  }, []);

  // Сохраняем выбранную модель в localStorage при её изменении (только после гидрации)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('selectedCarModelId', modelId);
    }
  }, [modelId, isHydrated]);

  // Сохраняем выбранную серию в localStorage при её изменении (только после гидрации)
  useEffect(() => {
    if (isHydrated && seriesName) {
      localStorage.setItem('selectedCarSeriesName', seriesName);
    }
  }, [seriesName, isHydrated]);

  // Обновление услуг при изменении параметров
  useEffect(() => {
    if (modelId && seriesName) {
      const list = maintenanceData[modelId] || [];
      const entry = list.find(item => Object.keys(item)[0] === seriesName);
      if (entry) {
        const data = entry[seriesName];
        const services = data.services;
        const mileageObj = data.mileage || {};
        
        // Находим ближайший меньший пробег
        const availableMileages = Object.keys(mileageObj).map(Number).sort((a, b) => a - b);
        let targetMileage = availableMileages[0];
        for (const m of availableMileages) {
          if (m <= mileage) {
            targetMileage = m;
          } else {
            break;
          }
        }
        
        const names = mileageObj[targetMileage.toString()] || Object.keys(services);
        const result = names.map((name: string) => {
          const prices = services[name] || [0, 0, 0];
          const part = partType === 'Оригинал' ? prices[1] : prices[2];
          const labor = prices[0];
          return { name, part_price: part, labor_price: labor };
        });
        setFilteredServices(result);
        setSelectedRows(result.map(() => true));
      } else {
        setFilteredServices([]);
        setSelectedRows([]);
      }
    } else {
      setFilteredServices([]);
      setSelectedRows([]);
    }
  }, [modelId, seriesName, mileage, partType]);

  const toggleRow = (idx: number) => {
    setSelectedRows(prev => prev.map((v, i) => i === idx ? !v : v));
  };

  const totalSum = useMemo(() =>
    filteredServices.reduce((sum, s, i) =>
      selectedRows[i] ? sum + Number(s.part_price) + Number(s.labor_price) : sum
    , 0)
  , [filteredServices, selectedRows]);

  const scrollToBottom = () => {
    const contactForm = document.querySelector('.ContactForm');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendCalculatorData = async () => {
    const selectedServices = filteredServices
      .filter((s, idx) => selectedRows[idx])
      .map(s => ({
        name: s.name,
        partPrice: Number(s.part_price),
        laborPrice: Number(s.labor_price),
        total: Number(s.part_price) + Number(s.labor_price)
      }));

    if (selectedServices.length === 0) {
      alert('Пожалуйста, выберите хотя бы одну услугу');
      return;
    }

    const success = await sendToTelegram({
      type: 'calculator',
      data: {
        model: `${modelId === 'RR' ? 'Rolls Royce' : modelId === 'MINI' ? 'Mini Cooper' : `BMW ${modelId}`}`,
        series: seriesName,
        mileage: mileage,
        partType: partType,
        services: selectedServices,
        totalSum: totalSum
      },
      url: window.location.href
    });

    if (success) {
      setShowSuccessPopup(true);
    } else {
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
    }
  };  const seriesList = useMemo(() => {
    if (!modelId) return [];
    return (maintenanceData[modelId] || []).map(item => {
      const name = Object.keys(item)[0];
      return { id: name, name };
    });
  }, [modelId]);

  const getModelSlug = (modelId: string) => {
    if (modelId === 'RR') return 'rolls-royce';
    if (modelId === 'MINI') return 'mini-cooper';
    return `bmw-${modelId.toLowerCase()}`;
  };

  const getCarImage = (fileName: string) => {
    return `/images/cars/${fileName}.webp`;
  };

  // Не отрисовываем компонент до гидрации, чтобы избежать дергания
  if (!isHydrated || !modelId) {
    return null;
  }

  return (
    <div className="Calculator ServiceCalc">
      <h2 className="calculator-title">
        Рассчитайте стоимость <span>ТО</span>, не выходя из дома
      </h2>

      <h3 className="section-title">
        <span>Выберите модель</span>
      </h3>

      <div className="model-selection-wrapper">
        <div className="model-selection">
          <div className="model-buttons">
            {models.map(m => (
              <button
                key={m.id}
                className={m.id === modelId ? 'selected' : ''}
                onClick={() => {
                  if (m.id !== modelId) {
                    setModelId(m.id);
                    // Автоматически выбираем первую серию для новой модели
                    const list = maintenanceData[m.id] || [];
                    const defaultSeries = list.length > 0 ? Object.keys(list[0])[0] : '';
                    setSeriesName(defaultSeries);
                  }
                }}
              >
                {m.id === 'RR' ? 'Rolls Royce' : m.id === 'MINI' ? 'Mini Cooper' : `BMW ${m.name}`}
              </button>
            ))}
          </div>
        </div>

        {modelId && (
          <img 
            key={modelId}
            className="selected-car-image"
            src={`/images/cars/${getModelSlug(modelId)}.webp`}
            alt={modelId === 'RR' ? 'Rolls Royce' : modelId === 'MINI' ? 'Mini Cooper' : `BMW ${modelId}`}
            loading="lazy"
          />
        )}
      </div>

      <div className="controls-row">
        <div className="control-group">
          <div className="control-label">Серия</div>
          <CustomSelect
            value={seriesName}
            onChange={setSeriesName}
            options={seriesList.map(s => ({ value: s.name, label: s.name }))}
            placeholder="Выберите серию"
          />
        </div>

        <div className="control-group">
          <div className="control-label">Пробег</div>
          <CustomSelect
            value={mileage.toString()}
            onChange={(val) => setMileage(Number(val))}
            options={Array.from({length: 20}, (_, i) => {
              const m = (i + 1) * 10000;
              return { value: m.toString(), label: `${m} км` };
            })}
            placeholder="Выберите пробег"
          />
        </div>
        
        <div className="control-group parts-buttons">
          <button
            className={partType === 'Оригинал' ? 'selected' : ''}
            onClick={() => setPartType('Оригинал')}
          >
            Оригинал
          </button>
          <button
            className={partType === 'Аналог' ? 'selected' : ''}
            onClick={() => setPartType('Аналог')}
          >
            Аналог
          </button>
        </div>
      </div>

      <div className="calculator_table">
        <div className="calculator_table__row--header">
          <div className="calculator_table__cell--first">Услуга</div>
          <div className="calculator_table__cell">Стоимость запчастей</div>
          <div className="calculator_table__cell">Стоимость работ</div>
          <div className="calculator_table__cell">Общая стоимость</div>
        </div>
        {modelId && seriesName && mileage > 0 && filteredServices
          .filter(s => Number(s.part_price) !== 0 || Number(s.labor_price) !== 0)
          .map((s, idx) => {
            const total = Number(s.part_price) + Number(s.labor_price);
            return (
              <div 
                className="calculator_table__row" 
                key={idx}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div 
                  className="calculator_table__cell--first"
                  onClick={() => toggleRow(idx)}
                >
                  <div
                    className={`sq ${selectedRows[idx] ? 'selected' : ''}`}
                  >
                  </div>
                  <span>{s.name}</span>
                </div>
                <div className="calculator_table__cell">
                  {Number(s.part_price).toLocaleString()}
                </div>
                <div className="calculator_table__cell">
                  {Number(s.labor_price).toLocaleString()}
                </div>
                <div className="calculator_table__cell">
                  {total.toLocaleString()}
                </div>
              </div>
            );
          })}
        <div className="calculator_table__row">
          <div className="calculator_table__cell--second">
            <div className="calculator_table__cell--second-left">Итоговая стоимость</div>
            <div className="calculator_table__cell--second-right">{totalSum.toLocaleString()}</div>
          </div>
          <div className="calculator_table__cell--first-summ">
            <span onClick={scrollToBottom}>Записаться через форму</span>
          </div>
        </div>
      </div>

      <div className="calculator_table__mobile">
          {modelId && seriesName && mileage > 0 && filteredServices
          .filter(s => Number(s.part_price) !== 0 || Number(s.labor_price) !== 0)
          .map((s, idx) => {
            const total = Number(s.part_price) + Number(s.labor_price);
            return (
              <div 
                className="card" 
                key={idx} 
                onClick={() => toggleRow(idx)}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="top">
                  <div className={`sq ${selectedRows[idx] ? 'selected' : ''}`}></div>
                  <span className="title">{s.name}</span>
                  <span className="price">{total.toLocaleString()}</span>
                </div>
                <div className="bottom">
                  <div className="left">
                    <span className="title">Стоимость запчастей</span>
                    <span className="price">{Number(s.part_price).toLocaleString()}</span>
                  </div>
                  <div className="right">
                    <span className="title">Стоимость работы</span>
                    <span className="price">{Number(s.labor_price).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="totalRow">
          <div className="textBlock">итоговая стоимость</div>
          <div className="sumBlock">{totalSum.toLocaleString()}</div>
        </div>
        <span onClick={scrollToBottom} className="mobileFormButton">
          Записаться через форму
        </span>
      </div>

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </div>
  );
}
