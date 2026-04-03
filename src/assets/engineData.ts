export interface EngineModel {
  id: string;
  name: string;
  type: 'benzine' | 'diesel' | 'hybrid';
  models: string;
  description: string;
  highlights: string[];
}

export const engines: EngineModel[] = [
  // БЕНЗИНОВЫЕ
  {
    id: 'n13b16',
    name: 'N13B16',
    type: 'benzine',
    models: 'F20, F21 (116i, 118i)',
    description: 'Трёхцилиндровый бензиновый двигатель для компактных BMW 1 серии.',
    highlights: ['3 цилиндра', '1.6л', 'Надежность', 'Экономичность']
  },
  {
    id: 'n20b16-n20b20',
    name: 'N20B16/N20B20',
    type: 'benzine',
    models: 'F10, F30, F32, F25, F26 (520i, 328i, X3 20i)',
    description: 'Четырёхцилиндровый турбированный двигатель для BMW среднего класса.',
    highlights: ['4 цилиндра', 'Турбо', '1.6л-2.0л', 'Эффективность']
  },
  {
    id: 'n26b20',
    name: 'N26B20',
    type: 'benzine',
    models: 'F30 (328i, 428i в США)',
    description: 'Четырёхцилиндровый турбированный двигатель для BMW 3 серии.',
    highlights: ['4 цилиндра', 'Турбо', '2.0л', 'Производительность']
  },
  {
    id: 'n52b30',
    name: 'N52B30',
    type: 'benzine',
    models: 'F10, F25 (528i, X3 28i)',
    description: 'Шестицилиндровый двигатель для BMW премиум-класса.',
    highlights: ['6 цилиндров', '3.0л', 'Плавность', 'Надежность']
  },
  {
    id: 'n54b30',
    name: 'N54B30',
    type: 'benzine',
    models: 'F01, F10, F07, F13 (740i, 535i, 335is)',
    description: 'Шестицилиндровый двигатель с двойным турбо для производительности.',
    highlights: ['6 цилиндров', 'Двойное турбо', '3.0л', 'Высокая мощность']
  },
  {
    id: 'n55b30',
    name: 'N55B30',
    type: 'benzine',
    models: 'F20, F22, F30, F32, F10, F15, F16 (M135i, 335i, 435i, 535i, X5 35i)',
    description: 'Шестицилиндровый турбированный двигатель нового поколения.',
    highlights: ['6 цилиндров', 'Одиночное турбо', '3.0л', 'Спортивность']
  },
  {
    id: 'n63b44',
    name: 'N63B44',
    type: 'benzine',
    models: 'F01, F07, F10, F15, F16 (750i, X5 50i)',
    description: 'Восьмицилиндровый двигатель для люксовых BMW.',
    highlights: ['8 цилиндров', '4.4л', 'Премиум', 'Мощность']
  },
  {
    id: 's55b30',
    name: 'S55B30',
    type: 'benzine',
    models: 'F80 M3, F82 M4, F87 M2 Comp',
    description: 'Шестицилиндровый двигатель для М-версий BMW.',
    highlights: ['6 цилиндров', 'Двойное турбо', '3.0л', 'М-производительность']
  },
  {
    id: 's63b44',
    name: 'S63B44',
    type: 'benzine',
    models: 'F10 M5, F13 M6, F85 X5 M, F86 X6 M',
    description: 'Восьмицилиндровый двигатель для М-суперкаров.',
    highlights: ['8 цилиндров', 'Двойное турбо', '4.4л', 'Экстремальность']
  },
  {
    id: 'b38b15',
    name: 'B38B15',
    type: 'benzine',
    models: 'F20, F22, F45, F46 (218i, 118i)',
    description: 'Трёхцилиндровый турбированный двигатель нового поколения.',
    highlights: ['3 цилиндра', 'Турбо', '1.5л', 'Современный']
  },
  {
    id: 'b48b20',
    name: 'B48B20',
    type: 'benzine',
    models: 'F30, F32, G20, G30, G11, G01 (320i, 330i, X3 20i)',
    description: 'Четырёхцилиндровый турбированный двигатель для BMW.',
    highlights: ['4 цилиндра', 'Турбо', '2.0л', 'Экономичность']
  },
  {
    id: 'b58b30',
    name: 'B58B30',
    type: 'benzine',
    models: 'G20, G30, G11, G01, G05 (M340i, 540i, X3 M40i)',
    description: 'Шестицилиндровый турбированный двигатель для премиум BMW.',
    highlights: ['6 цилиндров', 'Турбо', '3.0л', 'Динамичность']
  },
  {
    id: 'n63b44-tu',
    name: 'N63B44 (TU/TU2/TU3)',
    type: 'benzine',
    models: 'G11, G30, G05, G07, G15 (750i, X5 50i, M850i)',
    description: 'Обновленный восьмицилиндровый двигатель для современных люксовых BMW.',
    highlights: ['8 цилиндров', '4.4л', 'Продвинутые', 'Люксовый уровень']
  },
  {
    id: 's58b30',
    name: 'S58B30',
    type: 'benzine',
    models: 'G80 M3, G82 M4, G87 M2',
    description: 'Современный М-двигатель для новых М-моделей.',
    highlights: ['6 цилиндров', 'Двойное турбо', '3.0л', 'М-технология']
  },
  {
    id: 's63b44-g90',
    name: 'S63B44 (G90/G15)',
    type: 'benzine',
    models: 'G90 M5, G15 M8, G05 X5 M',
    description: 'Восьмицилиндровый двигатель для современных М-суперкаров.',
    highlights: ['8 цилиндров', 'Двойное турбо', '4.4л', 'Новая платформа']
  },
  {
    id: 's68b44',
    name: 'S68B44',
    type: 'benzine',
    models: 'G70 760i, G99 X5 M',
    description: 'Двенадцатицилиндровый двигатель для премиального флагмана.',
    highlights: ['12 цилиндров', '6.0л', 'Люксовый', 'Редкость']
  },

  // ДИЗЕЛЬНЫЕ
  {
    id: 'n47d16-n47d20',
    name: 'N47D16/N47D20',
    type: 'diesel',
    models: 'F20, F30, F10, F25 (116d, 320d, 520d, X3 20d)',
    description: 'Четырёхцилиндровый дизельный двигатель для BMW.',
    highlights: ['4 цилиндра', '1.6л-2.0л', 'Экономичность', 'Крутящий момент']
  },
  {
    id: 'n57d30',
    name: 'N57D30',
    type: 'diesel',
    models: 'F10, F15, F16, F01 (530d, 730d, X5 30d)',
    description: 'Шестицилиндровый дизельный двигатель для премиум BMW.',
    highlights: ['6 цилиндров', '3.0л', 'Мощность', 'Надежность']
  },
  {
    id: 'b37d15',
    name: 'B37D15',
    type: 'diesel',
    models: 'F20, F45, F46, F48 (116d, 218d, X1 18d)',
    description: 'Трёхцилиндровый дизельный двигатель для компактных BMW.',
    highlights: ['3 цилиндра', '1.5л', 'Компактность', 'Экономичность']
  },
  {
    id: 'b47d20',
    name: 'B47D20',
    type: 'diesel',
    models: 'F30, G20, G30, G01, G11 (320d, 520d, X3 20d)',
    description: 'Четырёхцилиндровый дизельный двигатель нового поколения.',
    highlights: ['4 цилиндра', '2.0л', 'Современный', 'Эффективный']
  },
  {
    id: 'b57d30',
    name: 'B57D30',
    type: 'diesel',
    models: 'G30, G11, G01, G05, G07 (530d, 730d, X3 30d, X5 30d)',
    description: 'Шестицилиндровый дизельный двигатель для современных BMW.',
    highlights: ['6 цилиндров', '3.0л', 'Производительность', 'Экономичность']
  },

  // ГИБРИДНЫЕ/ЭЛЕКТРО
  {
    id: 'n20-edrive',
    name: 'N20 + электромотор (eDrive)',
    type: 'hybrid',
    models: 'F30 330e',
    description: 'Гибридная система с четырёхцилиндровым двигателем.',
    highlights: ['Гибрид', 'N20 + мотор', 'Экономичность', 'Экологичность']
  },
  {
    id: 'b48-edrive',
    name: 'B48 + электромотор',
    type: 'hybrid',
    models: 'G20 330e, G30 530e',
    description: 'Современная гибридная система BMW.',
    highlights: ['Гибрид', 'B48 + мотор', 'Динамичность', 'Экономия']
  },
  {
    id: 'b58-edrive',
    name: 'B58 + электромотор',
    type: 'hybrid',
    models: 'G11 745e, G05 X5 45e',
    description: 'Премиальная гибридная система с шестицилиндровым двигателем.',
    highlights: ['Гибрид', 'B58 + мотор', 'Производительность', 'Люксовый']
  },
  {
    id: 's68-edrive',
    name: 'S68 + электромотор',
    type: 'hybrid',
    models: 'G09 XM',
    description: 'М-гибридная система с двенадцатицилиндровым двигателем.',
    highlights: ['Гибрид М', 'S68 + мотор', 'Экстремальность', 'Редкость']
  },
  {
    id: 'ix3-edrive-80',
    name: 'iX3 eDrive 80',
    type: 'hybrid',
    models: 'G08 iX3',
    description: 'Полностью электрический редуктор для iX3.',
    highlights: ['Электро', 'Полный привод', 'Тишина', 'Экологичность']
  },
  {
    id: 'i4-edrive',
    name: 'i4 eDrive 40 / M50',
    type: 'hybrid',
    models: 'G26 i4',
    description: 'Электрический редуктор для спортивного электроседана i4.',
    highlights: ['Электро', 'Спортивность', 'Производительность', 'Инновация']
  },
  {
    id: 'ix-xdrive',
    name: 'iX xDrive 40 / 50 / M60',
    type: 'hybrid',
    models: 'G09 iX',
    description: 'Электрический редуктор для люксового электрокроссовера iX.',
    highlights: ['Электро', 'Полный привод', 'Люксовый', 'Мощность']
  }
];

export function getEnginesByType(type: 'benzine' | 'diesel' | 'hybrid'): EngineModel[] {
  return engines.filter(e => e.type === type);
}

export function getEngineById(id: string): EngineModel | undefined {
  return engines.find(e => e.id === id);
}

export const engineTypes = {
  benzine: {
    name: 'Бензиновые',
    description: 'Бензиновые двигатели BMW'
  },
  diesel: {
    name: 'Дизельные',
    description: 'Дизельные двигатели BMW'
  },
  hybrid: {
    name: 'Гибрид/Электро',
    description: 'Гибридные и электрические системы BMW'
  }
};
