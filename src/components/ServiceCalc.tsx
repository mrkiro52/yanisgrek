import { useState, useEffect, useMemo } from 'react';
import { maintenanceData, models, submodels } from '../assets/maintenanceData';
import CustomSelect from './CustomSelect';
import { sendToTelegram } from '../utils/telegram';
import SuccessPopup from './SuccessPopup';

export default function ServiceCalc() {
  // Инициализируем с null/дефолтными значениями для SSR
  const [modelId, setModelId] = useState('M');
  const [subId, setSubId] = useState('M8');
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
    const savedSubId = localStorage.getItem('selectedCarSubId');
    
    if (savedSubId) {
      setSubId(savedSubId);
      // Если есть сохраненная подмодель, определяем правильный modelId
      if (savedModelId) {
        setModelId(savedModelId);
      }
    }
    
    setIsHydrated(true);
  }, []);

  // Сохраняем выбранную модель в localStorage при её изменении (только после гидрации)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('selectedCarModelId', modelId);
    }
  }, [modelId, isHydrated]);

  // Сохраняем выбранную подмодель в localStorage при её изменении (только после гидрации)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('selectedCarSubId', subId);
    }
  }, [subId, isHydrated]);

  // Обновление услуг при изменении параметров
  useEffect(() => {
    if (subId && seriesName) {
      const list = maintenanceData[subId] || [];
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
  }, [subId, seriesName, mileage, partType]);

  // Автовыбор подмодели при смене модели
  useEffect(() => {
    if (!modelId) return;
    const subs = submodels[modelId] || [];
    
    // Проверяем, есть ли сохраненный subId в списке подмоделей текущей модели
    const savedSubId = localStorage.getItem('selectedCarSubId');
    if (savedSubId && subs.some((sm: any) => sm.id === savedSubId)) {
      setSubId(savedSubId);
    } else {
      // Если нет, выбираем первую подмодель
      const defaultSub = subs.length > 0 ? subs[0].id : '';
      setSubId(defaultSub);
    }
  }, [modelId]);

  // Автовыбор серии при смене подмодели
  useEffect(() => {
    if (!subId) {
      setSeriesName('');
      return;
    }
    const list = maintenanceData[subId] || [];
    const defaultSeries = list.length > 0 ? Object.keys(list[0])[0] : '';
    setSeriesName(defaultSeries);
  }, [subId]);

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
        model: `${subId === 'RR' ? 'Rolls Royce' : subId === 'MINI' ? 'Mini Cooper' : `BMW ${subId}`}`,
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
  };  const subsList = useMemo(() => submodels[modelId] || [], [modelId]);
  const seriesList = useMemo(() => {
    if (!subId) return [];
    return (maintenanceData[subId] || []).map(item => {
      const name = Object.keys(item)[0];
      return { id: name, name };
    });
  }, [subId]);

  const getModelSlug = (subId: string) => {
    if (subId === 'RR') return 'rolls-royce';
    if (subId === 'MINI') return 'mini-cooper';
    return `bmw-${subId.toLowerCase()}`;
  };

  const getCarImage = (fileName: string) => {
    return `/images/cars/${fileName}.png`;
  };

  return (
    <div className="Calculator ServiceCalc">
      <h2 className="calculator-title">
        Рассчитайте стоимость <span>ТО</span>, не выходя из дома
      </h2>

      <h3 className="section-title">
        <span>Выберите модель</span>
        {subId && (
          <a 
            href={`/cars/${getModelSlug(subId)}`}
            className="section-title-link"
          >
            Перейти на страницу {subId === 'RR' ? 'Rolls Royce' : subId === 'MINI' ? 'Mini Cooper' : `BMW ${subId}`}
          </a>
        )}
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
                    setSubId('');
                    setSeriesName('');
                  }
                }}
              >
                BMW {m.name === 'Rolls' ? 'Rolls Royce' : m.name === 'Mini' ? 'Mini Cooper' : m.name}
              </button>
            ))}
          </div>
          
          {/* Второй ряд для X, M, i */}
          {['X', 'M', 'i', 'z'].includes(modelId) && subsList.length > 0 && (
            <>
              <h3 className="section-title" style={{ marginTop: '24px' }}>
                <span>Уточните модель</span>
              </h3>
              <div className="submodel-buttons">
                {subsList.map(sm => (
                  <button
                    key={sm.id}
                    className={sm.id === subId ? 'selected' : ''}
                    onClick={() => {
                      if (sm.id !== subId) {
                        setSubId(sm.id);
                        setSeriesName('');
                      }
                    }}
                  >
                    {sm.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {subId && (
          <img 
            className="selected-car-image"
            src={`/images/cars/${getModelSlug(subId)}.png`}
            alt={subId === 'RR' ? 'Rolls Royce' : subId === 'MINI' ? 'Mini Cooper' : `BMW ${subId}`}
          />
        )}
      </div>

      <div className="controls-row">
        <div className="control-group">
          <div className="control-label">Серия</div>
          <CustomSelect
            value={seriesName}
            onChange={setSeriesName}
            options={[
              { value: '', label: 'Выберите серию' },
              ...seriesList.map(s => ({ value: s.name, label: s.name }))
            ]}
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

      {subId && seriesName && (
        <div className="series-link-wrapper">
          <a 
            href={`/cars/${getModelSlug(subId)}/${seriesName.toLowerCase().replace(/\s+/g, '-')}`}
            className="series-link"
          >
            Перейти на страницу {subId === 'RR' ? 'Rolls Royce' : subId === 'MINI' ? 'Mini Cooper' : `BMW ${subId}`} {seriesName}
          </a>
        </div>
      )}

      {subId && seriesName && mileage > 0 && (
        <div className="calculator_table">
          <div className="calculator_table__row--header">
          <div className="calculator_table__cell--first">Услуга</div>
          <div className="calculator_table__cell">Стоимость запчастей</div>
          <div className="calculator_table__cell">Стоимость работ</div>
          <div className="calculator_table__cell">Общая стоимость</div>
        </div>
        {filteredServices
          .filter(s => Number(s.part_price) !== 0 || Number(s.labor_price) !== 0)
          .map((s, idx) => {
            const total = Number(s.part_price) + Number(s.labor_price);
            return (
              <div className="calculator_table__row" key={idx}>
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
      )}

      {subId && seriesName && mileage > 0 && (
        <div className="calculator_table__mobile">
        {filteredServices
          .filter(s => Number(s.part_price) !== 0 || Number(s.labor_price) !== 0)
          .map((s, idx) => {
            const total = Number(s.part_price) + Number(s.labor_price);
            return (
              <div className="card" key={idx} onClick={() => toggleRow(idx)}>
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
      )}

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </div>
  );
}
