// Структура данных:
// Для каждой модели (subId) есть массив объектов
// Каждый объект содержит название серии как ключ
// Внутри серии: services (услуги с ценами) и mileage (какие услуги для какого пробега)

export interface ServicePrices {
  [serviceName: string]: [number, number, number]; // [labor, original_parts, analog_parts]
}

export interface SeriesData {
  services: ServicePrices;
  mileage: {
    [km: string]: string[]; // какие услуги для конкретного пробега
  };
}

export interface ModelSeries {
  [seriesName: string]: SeriesData;
}

// Базовые услуги для всех моделей
const baseServices: ServicePrices = {
  'Замена масла двигателя': [2000, 5000, 3500],
  'Замена масляного фильтра': [800, 1500, 900],
  'Замена воздушного фильтра': [500, 1200, 800],
  'Замена салонного фильтра': [600, 1000, 600],
  'Замена свечей зажигания': [1200, 3000, 2000],
  'Замена тормозной жидкости': [1500, 800, 600],
};

const baseMileage: { [km: string]: string[] } = {
  '10000': ['Замена масла двигателя', 'Замена масляного фильтра'],
  '20000': ['Замена масла двигателя', 'Замена масляного фильтра', 'Замена воздушного фильтра', 'Замена салонного фильтра'],
  '30000': ['Замена масла двигателя', 'Замена масляного фильтра'],
  '40000': ['Замена масла двигателя', 'Замена масляного фильтра', 'Замена свечей зажигания', 'Замена воздушного фильтра'],
  '50000': ['Замена масла двигателя', 'Замена масляного фильтра', 'Замена тормозной жидкости'],
};

// Создаем пустые данные для серии
const createEmptySeries = (): SeriesData => ({
  services: baseServices,
  mileage: baseMileage
});

// Данные по моделям
export const maintenanceData: { [subId: string]: ModelSeries[] } = {
  // BMW 1 серия
  '1': [
    { 'E81': createEmptySeries() },
    { 'E87': createEmptySeries() },
    { 'E88': createEmptySeries() },
    { 'F20': createEmptySeries() },
    { 'F21': createEmptySeries() },
  ],
  // BMW 2 серия
  '2': [
    { 'F22': createEmptySeries() },
    { 'F23': createEmptySeries() },
  ],
  // BMW 3 серия
  '3': [
    { 'E90': createEmptySeries() },
    { 'E91': createEmptySeries() },
    { 'E92': createEmptySeries() },
    { 'E93': createEmptySeries() },
    { 'F30': createEmptySeries() },
    { 'F31': createEmptySeries() },
    { 'F34': createEmptySeries() },
    { 'G20': createEmptySeries() },
  ],
  // BMW 4 серия
  '4': [
    { 'F32': createEmptySeries() },
    { 'F33': createEmptySeries() },
    { 'F36': createEmptySeries() },
  ],
  // BMW 5 серия
  '5': [
    { 'E60': createEmptySeries() },
    { 'E61': createEmptySeries() },
    { 'F10': createEmptySeries() },
    { 'F11': createEmptySeries() },
    { 'G30': createEmptySeries() },
    { 'G31': createEmptySeries() },
  ],
  // BMW 6 серия
  '6': [
    { 'E63': createEmptySeries() },
    { 'E64': createEmptySeries() },
    { 'F06': createEmptySeries() },
    { 'F12': createEmptySeries() },
    { 'F13': createEmptySeries() },
    { 'G32': createEmptySeries() },
  ],
  // BMW 7 серия
  '7': [
    { 'F01': createEmptySeries() },
    { 'F02': createEmptySeries() },
    { 'G11': createEmptySeries() },
    { 'G12': createEmptySeries() },
  ],
  // BMW 8 серия
  '8': [
    { 'G14': createEmptySeries() },
    { 'G15': createEmptySeries() },
    { 'G16': createEmptySeries() },
  ],
  // BMW M2
  'M2': [
    { 'F87': createEmptySeries() },
    { 'G87': createEmptySeries() },
  ],
  // BMW M3
  'M3': [
    { 'F80': createEmptySeries() },
    { 'G80': createEmptySeries() },
    { 'G81': createEmptySeries() },
  ],
  // BMW M4
  'M4': [
    { 'F82': createEmptySeries() },
    { 'F83': createEmptySeries() },
    { 'G82': createEmptySeries() },
    { 'G83': createEmptySeries() },
  ],
  // BMW M5
  'M5': [
    { 'F10': createEmptySeries() },
    { 'F90': createEmptySeries() },
  ],
  // BMW M8
  'M8': [
    { 'F91': createEmptySeries() },
    { 'F92': createEmptySeries() },
    { 'F93': createEmptySeries() },
  ],
  // BMW X1
  'X1': [
    { 'E84': createEmptySeries() },
    { 'F48': createEmptySeries() },
  ],
  // BMW X2
  'X2': [
    { 'F39': createEmptySeries() },
  ],
  // BMW X3
  'X3': [
    { 'F25': createEmptySeries() },
    { 'G01': createEmptySeries() },
  ],
  // BMW X4
  'X4': [
    { 'F26': createEmptySeries() },
    { 'G02': createEmptySeries() },
  ],
  // BMW X5
  'X5': [
    { 'E70': createEmptySeries() },
    { 'F15': createEmptySeries() },
    { 'F85': createEmptySeries() },
    { 'G05': createEmptySeries() },
  ],
  // BMW X6
  'X6': [
    { 'E71': createEmptySeries() },
    { 'F16': createEmptySeries() },
    { 'F86': createEmptySeries() },
    { 'G06': createEmptySeries() },
  ],
  // BMW X7
  'X7': [
    { 'G07': createEmptySeries() },
  ],
  // BMW Z3
  'Z3': [
    { 'E36/7': createEmptySeries() },
    { 'E36/8': createEmptySeries() },
  ],
  // BMW Z4
  'Z4': [
    { 'E85': createEmptySeries() },
    { 'E86': createEmptySeries() },
    { 'E89': createEmptySeries() },
    { 'G29': createEmptySeries() },
  ],
  // Mini Cooper
  'MINI': [
    { 'R50': createEmptySeries() },
    { 'R53': createEmptySeries() },
    { 'R56': createEmptySeries() },
    { 'F55': createEmptySeries() },
    { 'F56': createEmptySeries() },
    { 'F54': createEmptySeries() },
    { 'F60': createEmptySeries() },
  ],
  // Rolls-Royce
  'RR': [
    { 'RR4': createEmptySeries() },
    { 'RR5': createEmptySeries() },
    { 'RR6': createEmptySeries() },
    { 'RR11': createEmptySeries() },
    { 'RR12': createEmptySeries() },
    { 'RR31': createEmptySeries() },
  ],
};

// Определения моделей и подмоделей
export const models = [
  { id: '1', name: '1 серия' },
  { id: '2', name: '2 серия' },
  { id: '3', name: '3 серия' },
  { id: '4', name: '4 серия' },
  { id: '5', name: '5 серия' },
  { id: '6', name: '6 серия' },
  { id: '7', name: '7 серия' },
  { id: 'X', name: 'X серия' },
  { id: 'M', name: 'M серия' },
  { id: 'i', name: 'i серия' },
  { id: 'z', name: 'z серия' },
  { id: 'RR', name: 'Rolls' },
  { id: 'MINI', name: 'Mini' },
  { id: 'OTHER', name: 'Другая' }
];

export const submodels: { [key: string]: { id: string; name: string }[] } = {
  '8': [{ id: '8', name: '8' }],
  '7': [{ id: '7', name: '7' }],
  '6': [{ id: '6', name: '6' }],
  '5': [{ id: '5', name: '5' }],
  '4': [{ id: '4', name: '4' }],
  '3': [{ id: '3', name: '3' }],
  '2': [{ id: '2', name: '2' }],
  '1': [{ id: '1', name: '1' }],
  'X': [
    { id: 'X1', name: 'X1' },
    { id: 'X2', name: 'X2' },
    { id: 'X3', name: 'X3' },
    { id: 'X4', name: 'X4' },
    { id: 'X5', name: 'X5' },
    { id: 'X6', name: 'X6' },
    { id: 'X7', name: 'X7' },
  ],
  'M': [
    { id: 'M8', name: 'M8' },
    { id: 'M5', name: 'M5' },
    { id: 'M4', name: 'M4' },
    { id: 'M3', name: 'M3' },
    { id: 'M2', name: 'M2' },
  ],
  'i': [],
  'z': [
    { id: 'Z3', name: 'Z3' },
    { id: 'Z4', name: 'Z4' },
  ],
  'RR': [
    { id: 'RR', name: 'Rolls Royce' }
  ],
  'MINI': [
    { id: 'MINI', name: 'Mini Cooper' }
  ],
  'OTHER': [
    { id: 'OTHER', name: 'Другая' }
  ]
};
