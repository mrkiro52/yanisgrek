"use client";

import "./Calculator.scss";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from 'next/navigation'

// JSON imports
import services1 from '../../data/calcServices/services_1.json';
import services2 from '../../data/calcServices/services_2.json';
import services3 from '../../data/calcServices/services_3.json';
import services4 from '../../data/calcServices/services_4.json';
import services5 from '../../data/calcServices/services_5.json';
import services7 from '../../data/calcServices/services_7.json';
import servicesM5 from '../../data/calcServices/services_m5.json';
import servicesX1 from '../../data/calcServices/services_x1.json';
import servicesX3 from '../../data/calcServices/services_x3.json';
import servicesX5 from '../../data/calcServices/services_x5.json';
import servicesX6 from '../../data/calcServices/services_x6.json';

// Models and submodels definitions
const models = [
  { id: '7', name: '7' },
  { id: '5', name: '5' },
  { id: '4', name: '4' },
  { id: '3', name: '3' },
  { id: '2', name: '2' },
  { id: '1', name: '1' },
  { id: 'X', name: 'X' },
  { id: 'M', name: 'M' }
];

const submodels = {
  '7': [{ id: '7', name: '7' }],
  '5': [{ id: '5', name: '5' }],
  '4': [{ id: '4', name: '4' }],
  '3': [{ id: '3', name: '3' }],
  '2': [{ id: '2', name: '2' }],
  '1': [{ id: '1', name: '1' }],
  'X': [
    { id: 'X1', name: 'X1' },
    { id: 'X3', name: 'X3' },
    { id: 'X5', name: 'X5' },
    { id: 'X6', name: 'X6' }
  ],
  'M': [{ id: 'M5', name: 'M5' }]
};

// Mapping JSON data to submodel keys
const servicesData = {
  '1': services1,
  '2': services2,
  '3': services3,
  '4': services4,
  '5': services5,
  '7': services7,
  'M5': servicesM5,
  'X1': servicesX1,
  'X3': servicesX3,
  'X5': servicesX5,
  'X6': servicesX6
};

export default function Calculator() {
  const [modelId, setModelId] = useState('X');
  const [subId, setSubId] = useState('X5');
  const [seriesName, setSeriesName] = useState('');
  const [mileage, setMileage] = useState(50000);
  const [partType, setPartType] = useState('Аналог');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const pathname = usePathname()

  // Update services when parameters change
  useEffect(() => {
    if (subId && seriesName) {
      const list = servicesData[subId] || [];
      const entry = list.find(item => Object.keys(item)[0] === seriesName);
      if (entry) {
        const data = entry[seriesName];
        const services = data.services;
        const mileageObj = data.mileage || {};
        const names = mileageObj[mileage] || Object.keys(services);
        const result = names.map(name => {
          const prices = services[name] || [0,0,0];
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

    let defaultSub = '';
    if (['7','5','4','3','2','1'].includes(modelId)) {
      defaultSub = modelId;
    } else if (modelId === 'M') {
      defaultSub = 'M5';
    } else if (modelId === 'X') {
      defaultSub = 'X5';
    }

    setSubId(defaultSub);
    setSeriesName('');
  }, [modelId]);

  useEffect(() => {
    // Список доступных подмоделей
    const validSubs = ['1','2','3','4','5','7','X1','X3','X5','X6','M5']
    const m = pathname.match(/^\/cars\/bmw-([a-z0-9]+)/i)

    if (m) {
      const id = m[1].toUpperCase()
      if (validSubs.includes(id)) {
        // Устанавливаем subId
        setSubId(id)
        // Модель — первая буква/цифра подмодели
        setModelId(id.charAt(0))
        return
      }
    }
    // Если не совпало, сбрасываем на дефолт
    setSubId('X5')
    setModelId('X')
  }, [pathname]);

  const toggleRow = idx => {
    setSelectedRows(prev => prev.map((v,i) => i === idx ? !v : v));
  };

  const totalSum = useMemo(() =>
    filteredServices.reduce((sum, s, i) =>
      selectedRows[i] ? sum + Number(s.part_price) + Number(s.labor_price) : sum
    , 0)
  , [filteredServices, selectedRows]);

  const scrollToBottom = () => {
    const formEl = document.getElementById('Form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };  

  const data = models;
  const subsList = useMemo(() => submodels[modelId] || [], [modelId]);
  const seriesList = useMemo(() => {
    if (!subId) return [];
    return (servicesData[subId] || []).map(item => {
      const name = Object.keys(item)[0];
      return { id: name, name };
    });
  }, [subId]);

  return (
    <div className="Calculator" id="Calculator">
      <div className="choose_model">
        <div className="title_row">
          <h2>
            Рассчитайте стоимость <span>ТО</span>, не выходя из дома
          </h2>
          {subId === '' ? (
            <span className="red">Выберите модель</span>
          ) : (
            <Link
              href={`/cars/bmw-${subId.toLowerCase()}`}
              className="black"
            >
              &gt; Страница BMW {subId}
            </Link>
          )}
        </div>
        <h3 className="stepTitle">1. Выберите модель</h3>
        <div className="buttons">
          {data.map(m => (
            <button
              key={m.id}
              className={m.id === modelId ? 'selected' : ''}
              onClick={() => {
                setModelId(m.id);
                setSubId('');
                setSeriesName('');
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <h3 className="stepTitle">2. Уточните модель</h3>
      <div className="choose_car_block">
        {subsList.map(sm => {
          const fileName = `bmw-${sm.name}`.toLowerCase();
          const imageUrl = `/images/cars/${fileName}.png`;
          return (
            <div
              key={'model_' + sm.id}
              className={`block${sm.id === subId ? ' selected' : ''}`}
              onClick={() => {
                setSubId(sm.id);
                setSeriesName('');
              }}
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <span>{`BMW ${sm.name}`}</span>
            </div>
          );
        })}
      </div>

      <h3 className="stepTitle">3. Выберите серию</h3>
      <div className="choose_special_model">
        <div className="model-select">
          <label htmlFor="series" className="model-select__label">
            Серия
          </label>
          <div className="model-select__control">
            <select
              id="series"
              name="series"
              className="model-select__dropdown"
              value={seriesName}
              onChange={e => setSeriesName(e.target.value)}
            >
              <option value="">Выберите серию</option>
              {seriesList.map(s => (
                <option key={'series_' + s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <svg
              className="model-select__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="mileage-input">
          <label form="mileage" className="mileage-input__label">
            Пробег
          </label>
          <div className="mileage-input__control">
          <input
            id="mileage"
            name="mileage"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            placeholder="Пробег авто"
            className="mileage-input__field"
            value={mileage === 0 ? "" : mileage}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault(); // блокируем ввод, если не цифра
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = e.clipboardData.getData("Text");
              const digitsOnly = pasted.replace(/\D/g, "");
              setMileage(digitsOnly === "" ? 0 : Number(digitsOnly));
            }}
            onChange={(e) => {
              const raw = e.target.value;
              const digitsOnly = raw.replace(/\D/g, "");
              setMileage(digitsOnly === "" ? 0 : Number(digitsOnly));
            }}
          />
            <span className="mileage-input__unit">км</span>
          </div>
        </div>
        <div className="buttons">
          {['Аналог', 'Оригинал'].map(type => (
            <button
              key={type}
              className={partType === type ? 'selected' : ''}
              onClick={() => setPartType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

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
                <div className="calculator_table__cell--first">
                  <div
                    className={`sq ${selectedRows[idx] ? 'selected' : ''}`}
                    onClick={() => toggleRow(idx)}
                  >
                    {selectedRows[idx] && (
                      <Image
                        src="/images/CheckmarkFill.png"
                        alt="Checkmark"
                        width={20}
                        height={20}
                        className="checkmark-icon"
                        unoptimized
                      />
                    )}
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
          <a href="#Form">Записаться через форму</a>
        </span>
      </div>
    </div>
  );
}