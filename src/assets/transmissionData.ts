export interface TransmissionModel {
  id: string;
  name: string;
  type: 'mkpp' | 'akpp' | 'dct' | 'elektro';
  models: string;
  description: string;
  highlights: string[];
}

export const transmissions: TransmissionModel[] = [
  // МКПП
  {
    id: 'getrag-gs6-17bg',
    name: 'Getrag GS6-17BG',
    type: 'mkpp',
    models: 'F20, F21, F22, F30, F31 (1, 2, 3 серии)',
    description: 'Механическая коробка передач для компактных BMW 1, 2 и 3 серии.',
    highlights: ['6 передач', 'Надежность', 'Спортивный характер', 'Простота в ремонте']
  },
  {
    id: 'getrag-gs6-45bz',
    name: 'Getrag GS6-45BZ',
    type: 'mkpp',
    models: 'F30, F32, F36 (3, 4 серии)',
    description: 'Механическая коробка передач для серии 3 и 4 BMW.',
    highlights: ['6 передач', 'Улучшенная синхронизация', 'Спортивный режим', 'Долговечность']
  },
  {
    id: 'zf-gs6-53dz',
    name: 'ZF GS6-53DZ',
    type: 'mkpp',
    models: 'F80 M3, F82 M4',
    description: 'Спортивная механическая коробка передач для M3 и M4.',
    highlights: ['6 передач', 'Спортивная синхронизация', 'Высокая мощность', 'М-характер']
  },
  {
    id: 'zf-gs6-45dz',
    name: 'ZF GS6-45DZ',
    type: 'mkpp',
    models: 'G20, G21, G42, G87 (M2, 3 серии)',
    description: 'Механическая коробка передач нового поколения для современных BMW.',
    highlights: ['6 передач', 'Легче предыдущих', 'Оптимизированные передаточные числа', 'Экономия топлива']
  },

  // АКПП
  {
    id: 'zf-8hp45',
    name: 'ZF 8HP45',
    type: 'akpp',
    models: 'F30, F32, F36, F10, F11 (3, 4, 5 серии)',
    description: 'Автоматическая коробка передач серии 8HP для BMW среднего класса.',
    highlights: ['8 передач', 'Плавное переключение', 'Экономичность', 'Надежность']
  },
  {
    id: 'zf-8hp50',
    name: 'ZF 8HP50',
    type: 'akpp',
    models: 'G20, G30, G11 (3, 5, 7 серии)',
    description: 'Улучшенная автоматическая коробка для современных BMW.',
    highlights: ['8 передач', 'Умная адаптация', 'Спортивный режим', 'Комфортность']
  },
  {
    id: 'zf-8hp51',
    name: 'ZF 8HP51',
    type: 'akpp',
    models: 'G01, G02, G05 (X3, X4, X5)',
    description: 'Автоматическая коробка для кроссоверов BMW.',
    highlights: ['8 передач', 'Полный привод', 'Внедорожный режим', 'Прочность']
  },
  {
    id: 'zf-8hp70',
    name: 'ZF 8HP70',
    type: 'akpp',
    models: 'F15, F16, F01, F02 (X5, X6, 7 серия)',
    description: 'Мощная автоматическая коробка для люксовых BMW.',
    highlights: ['8 передач', 'V8 совместимость', 'Плавность хода', 'Долговечность']
  },
  {
    id: 'zf-8hp75',
    name: 'ZF 8HP75',
    type: 'akpp',
    models: 'G11, G12, G30 (7, 5 серии)',
    description: 'Флагманская автоматическая коробка для премиум BMW.',
    highlights: ['8 передач', 'Спортивный режим', 'Экономический режим', 'Престиж']
  },
  {
    id: 'zf-8hp76',
    name: 'ZF 8HP76',
    type: 'akpp',
    models: 'G05, G06, G07 (X5, X6, X7)',
    description: 'Современная автоматическая коробка для кроссоверов нового поколения.',
    highlights: ['8 передач', 'Интеллектуальный контроль', 'Экологичность', 'Надежность']
  },
  {
    id: 'zf-8hp90',
    name: 'ZF 8HP90',
    type: 'akpp',
    models: 'F90 M5, F92 M8, G80 M3, G82 M4',
    description: 'Спортивная автоматическая коробка для М-версий BMW.',
    highlights: ['8 передач', 'М-производительность', 'Быстрое переключение', 'Экстремальность']
  },

  // DCT
  {
    id: 'getrag-7dct300',
    name: 'Getrag 7DCT300',
    type: 'dct',
    models: 'F39, F44, F48 (X2, 2 серии Gran Coupe)',
    description: 'Семиступенчатая коробка с двойным сцеплением для компактных BMW.',
    highlights: ['7 передач', 'Двойное сцепление', 'Спортивный характер', 'Экономичность']
  },
  {
    id: 'getrag-7dct500',
    name: 'Getrag 7DCT500',
    type: 'dct',
    models: 'F87 M2 Competition',
    description: 'Спортивная коробка с двойным сцеплением для M2 Competition.',
    highlights: ['7 передач', 'Быстрое переключение', 'М-характер', 'Агрессивность']
  },
  {
    id: 'getrag-7dct600',
    name: 'Getrag 7DCT600',
    type: 'dct',
    models: 'F80 M3, F82 M4, F10 M5, F13 M6',
    description: 'Премиальная коробка с двойным сцеплением для М-моделей.',
    highlights: ['7 передач', 'Молниеносные переключения', 'М-производительность', 'Легендарность']
  },
  {
    id: 'getrag-7dct700',
    name: 'Getrag 7DCT700',
    type: 'dct',
    models: 'F90 M5, F92 M8',
    description: 'Современная коробка с двойным сцеплением для новых М-суперкаров.',
    highlights: ['7 передач', 'Адаптивное управление', 'Экстремальная производительность', 'Инновация']
  },

  // Электро
  {
    id: 'bmw-ix-1at',
    name: 'BMW iX 1AT',
    type: 'elektro',
    models: 'iX, iX3',
    description: 'Односкоростной редуктор для электрических BMW iX и iX3.',
    highlights: ['1 скорость', 'Полный привод', 'Электрическая мощь', 'Экологичность']
  },
  {
    id: 'bmw-i4-1at',
    name: 'BMW i4 1AT',
    type: 'elektro',
    models: 'i4',
    description: 'Односкоростной редуктор для электрического спортивного седана BMW i4.',
    highlights: ['1 скорость', 'Спортивное ускорение', 'Электрическая динамика', 'Модернизм']
  },
  {
    id: 'bmw-i7-1at',
    name: 'BMW i7 1AT',
    type: 'elektro',
    models: 'i7',
    description: 'Односкоростной редуктор для электрического премиум-седана BMW i7.',
    highlights: ['1 скорость', 'Люксовый уровень', 'Электрическая мощь', 'Тишина']
  }
];

export function getTransmissionsByType(type: 'mkpp' | 'akpp' | 'dct' | 'elektro'): TransmissionModel[] {
  return transmissions.filter(t => t.type === type);
}

export function getTransmissionById(id: string): TransmissionModel | undefined {
  return transmissions.find(t => t.id === id);
}

export const transmissionTypes = {
  mkpp: {
    name: 'МКПП',
    description: 'Механические коробки передач',
    icon: '⚙️'
  },
  akpp: {
    name: 'АКПП',
    description: 'Автоматические коробки передач',
    icon: '🔄'
  },
  dct: {
    name: 'DCT',
    description: 'Коробки с двойным сцеплением',
    icon: '⚡'
  },
  elektro: {
    name: 'Электро',
    description: 'Электрические редукторы',
    icon: '🔋'
  }
};
