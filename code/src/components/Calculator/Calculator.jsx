"use client";

import "./Calculator.scss";
import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import fetchMaintenanceServices from './fetchServices';
import Link from "next/link";
import Image from 'next/image';

export default function Calculator({ data, services }) {
  /* -------- выбор машины -------- */
  const [modelId, setModelId] = useState(
    data?.length ? data[data.length - 2].id : null
  );
  const [subId, setSubId] = useState(null);
  const [seriesName, setSeriesName] = useState(""); // имя серии
  const [mileage, setMileage] = useState(0);
  const [partType, setPartType] = useState("Аналог");

  /* -------- выбранные строки таблицы -------- */
  const [selectedRows, setSelectedRows] = useState([]); // индексы выбранных строк

  /* -------- вычисляем списки -------- */
  const model = data.find((m) => m.id === modelId);
  const subsList = model?.submodels ?? [];
  const sub = subsList.find((sm) => sm.id === subId);
  const seriesList = sub?.series ?? [];

  /* -------- фильтрация услуг -------- */
  const filteredServices = useMemo(() => {
    if (!seriesName || !mileage) return [];
  
    const apiPartType =
      partType.toLowerCase() === "оригинал" ? "original" : "analog";
  
    const mileageNum = Number(mileage);
    const targetMileage = mileageNum < 60000 ? 10 : 60;
  
    return services
      .filter(
        (s) =>
          s.car_series.name === seriesName &&
          s.mileage === targetMileage &&
          s.part_type === apiPartType
      )
      .map((s) => ({
        name: s.name,
        part_price: s.part_price,
        labor_price: s.labor_price,
      }));
  }, [seriesName, mileage, partType, services]);
  

  /* -------- всегда выбираем все строки при изменении списка услуг -------- */
  useEffect(() => {
    setSelectedRows(filteredServices.map(() => true));
  }, [filteredServices]);

  /* -------- сумма только по выбранным строкам -------- */
  const totalSum = useMemo(() => {
    return filteredServices.reduce((acc, s, idx) => {
      if (!selectedRows[idx]) return acc;
      return acc + Number(s.part_price) + Number(s.labor_price);
    }, 0);
  }, [filteredServices, selectedRows]);

  /* -------- переключатель выбора строки -------- */
  const toggleRow = (index) => {
    setSelectedRows((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // плавно
    });
  };

  return (
    <div className="Calculator" id="Calculator">
      <div className="choose_model">
        <div className="title_row">
          <h2>
            Рассчитайте стоимость <span>ТО</span>, не выходя из дома
          </h2>
          {subId === null ? (
            <span className="red">Выберите модель</span>
          ) : (
            <Link
              href={`/cars/bmw-${sub.name.toLowerCase()}`}
              className="black"
            >
              &gt;
              Страница BMW {sub.name}
            </Link>
          )}
        </div>
        <h3 className="stepTitle">1. Выберите модель</h3>
        <div className="buttons">
          {data.map((m) => (
            <button
              key={m.id}
              className={m.id === modelId ? "selected" : ""}
              onClick={() => {
                setModelId(m.id);
                setSubId(null);
                setSeriesName("");
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>
      <h3 className="stepTitle">2. Уточните модель (листается)</h3>
      <div className="choose_car_block">
        {subsList.map((sm) => {
          const fileName = `bmw-${sm.name}`.toLowerCase();
          const imageUrl = `/images/cars/${fileName}.png`;

          return (
            <div
              key={sm.id}
              className={`block${sm.id === subId ? " selected" : ""}`}
              onClick={() => {
                setSubId(sm.id);
                setSeriesName("");
              }}
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
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
          <label form="model" className="model-select__label">
            СЕРИЯ
          </label>
          <div className="model-select__control">
            <select
              id="series"
              name="series"
              className="model-select__dropdown"
              value={seriesName}
              onChange={(e) => setSeriesName(e.target.value)}
            >
              <option value="">Выберите серию</option>
              {seriesList.map((s) => (
                <option key={s.id} value={s.name}>
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
            ПРОБЕГ
          </label>
          <div className="mileage-input__control">
            <input
              id="mileage"
              name="mileage"
              type="text"
              inputMode="numeric"
              pattern="\\d*"
              placeholder="Пробег авто"
              className="mileage-input__field"
              value={mileage === 0 ? "" : mileage}
              onChange={(e) => {
                const val = e.target.value.replace(/\\D/g, "");
                setMileage(val === "" ? 0 : Number(val));
              }}
            />
            <span className="mileage-input__unit">км</span>
          </div>
        </div>
        <div className="buttons">
          {["Аналог", "Оригинал"].map((type) => (
            <button
              key={type}
              className={partType === type ? "selected" : ""}
              onClick={() => setPartType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="calculator_table">
        {/* Header */}
        <div className="calculator_table__row--header">
          <div className="calculator_table__cell--first">Услуга</div>
          <div className="calculator_table__cell">Стоимость услуги</div>
          <div className="calculator_table__cell">Стоимость работ</div>
          <div className="calculator_table__cell">Общая стоимость</div>
        </div>

        {/* Услуги */}
        {filteredServices.map((s, index) => {
          const total = Number(s.part_price) + Number(s.labor_price);
          return (
            <div className="calculator_table__row" key={index}>
              <div className="calculator_table__cell--first">
              <div
                className={`sq ${selectedRows[index] ? "selected" : ""}`}
                onClick={() => toggleRow(index)}
              >
                {selectedRows[index] && (
                  <Image 
                    src="/images/CheckmarkFill.png" 
                    alt="Checkmark" 
                    width={20}
                    height={20}
                    className="checkmark-icon"
                    unoptimized={true} // Если изображение очень маленькое (меньше 40px), лучше отключить оптимизацию
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

        {/* Итого */}
        <div className="calculator_table__row">
          <div className="calculator_table__cell--first-summ">
            <span onClick={scrollToBottom}>Записаться через форму</span>
          </div>
          <div className="calculator_table__cell--second">
            <div className="calculator_table__cell--second-left">
              итоговая стоимость
            </div>
            <div className="calculator_table__cell--second-right">
              {totalSum.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <div className="calculator_table__mobile">
        {filteredServices.map((s, index) => {
          const total = Number(s.part_price) + Number(s.labor_price);
          return (
            <div className="card" key={index} onClick={() => toggleRow(index)}>
              <div className="top">
                <div
                  className={`sq ${selectedRows[index] ? "selected" : ""}`}
                >
                  {selectedRows[index] && (
                    <Image 
                      src="/images/CheckmarkFill.png" 
                      alt="Checkmark" 
                      width={20}
                      height={20}
                      className="checkmark-icon"
                      unoptimized={true} // Если изображение очень маленькое (меньше 40px), лучше отключить оптимизацию
                    />
                  )}
              </div>
                <span className="title">{s.name}</span>
                <span className="price">{total}</span>
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
          )
        })}
        <div className="totalRow">
          <div className="textBlock">итоговая стоимость</div>
          <div className="sumBlock">{totalSum.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
