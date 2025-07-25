// src/components/Calculator/CalculatorServer.jsx
import React from 'react';
import Calculator from './Calculator';   // ваш существующий client-компонент
import servicesData from '../../data/servicesTo/data.json';  // локальные данные услуг из JSON

export const revalidate = 60;            // ISR: обновляем раз в минуту

export default async function CalculatorServer() {

  const models = [
    { id: 5, name: '7', brand: { id: 2, name: 'BMW' } },
    { id: 7, name: '5', brand: { id: 2, name: 'BMW' } },
    { id: 8, name: '4', brand: { id: 2, name: 'BMW' } },
    { id: 9, name: '3', brand: { id: 2, name: 'BMW' } },
    { id: 10, name: '2', brand: { id: 2, name: 'BMW' } },
    { id: 11, name: '1', brand: { id: 2, name: 'BMW' } },
    { id: 12, name: 'X', brand: { id: 2, name: 'BMW' } },
    { id: 13, name: 'M', brand: { id: 2, name: 'BMW' } },
  ];
  
  // 1) Подгружаем модели, субмодели и серию из API
  const [
    submodelsRes,
    seriesRes,
  ] = await Promise.all([
    fetch('https://api.test-grek.online/api/submodels/', { next: { revalidate: 60 } }),
    fetch('https://api.test-grek.online/api/series/',    { next: { revalidate: 60 } }),
  ]);
  if (![submodelsRes, seriesRes].every(r => r.ok)) {
    throw new Error('Не удалось загрузить данные моделей из API');
  }
  const [submodels, series] = await Promise.all([
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
