// components/Calculator/CalculatorServer.jsx
import React from 'react';
import Calculator from './Calculator';   // ваш существующий client-компонент
export const revalidate = 60;            // ISR: обновляем раз в минуту

export default async function CalculatorServer() {
  // 1) Сервисы API
  const [
    modelsRes,
    submodelsRes,
    seriesRes,
    servicesRes,
  ] = await Promise.all([
    fetch('http://89.104.65.124/api/models/',          { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/submodels/',       { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/series/',          { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/maintenance-services/', { next: { revalidate: 60 } }),
  ]); 
  if (![modelsRes, submodelsRes, seriesRes, servicesRes].every(r => r.ok)) {
    throw new Error('Не удалось загрузить данные с API');
  }
  const [models, submodels, series, services] = await Promise.all([
    modelsRes.json(),
    submodelsRes.json(),
    seriesRes.json(),
    servicesRes.json(),
  ]);

  // 2) Формируем структуру data
  const data = models.map(m => ({
    ...m,
    submodels: submodels
      .filter(sm => sm.model.id === m.id)
      .map(sm => ({
        ...sm,
        series: series.filter(s => s.submodel.id === sm.id),
      })),
  }));

  // 3) Передаём в чистый клиент-компонент
  return <Calculator data={data} services={services} />;
}
