// src/components/Calculator/CalculatorServer.jsx
import React from 'react';
import Calculator from './Calculator';   // ваш существующий client-компонент
import servicesData from '../../data/servicesTo/data.json';  // локальные данные услуг из JSON

export const revalidate = 60;            // ISR: обновляем раз в минуту

export default async function CalculatorServer() {
  // 1) Подгружаем модели, субмодели и серию из API
  const [
    modelsRes,
    submodelsRes,
    seriesRes,
  ] = await Promise.all([
    fetch('http://89.104.65.124/api/models/',    { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/submodels/', { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/series/',    { next: { revalidate: 60 } }),
  ]);
  if (![modelsRes, submodelsRes, seriesRes].every(r => r.ok)) {
    throw new Error('Не удалось загрузить данные моделей из API');
  }
  const [models, submodels, series] = await Promise.all([
    modelsRes.json(),
    submodelsRes.json(),
    seriesRes.json(),
  ]);

  // 2) Собираем структуру data из API-ответов
  const data = models.map(m => ({
    ...m,
    submodels: submodels
      .filter(sm => sm.model.id === m.id)
      .map(sm => ({
        ...sm,
        series: series.filter(s => s.submodel.id === sm.id),
      })),
  }));

  // 3) Используем локальные данные услуг вместо запроса к API
  const services = servicesData;

  // 4) Передаем данные в клиент-компонент
  return <Calculator data={data} services={services} />;
}
