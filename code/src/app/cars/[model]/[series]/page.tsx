
import { Metadata } from 'next';
import React from 'react';
import './series.scss';
import Form from '@/components/Form/Form';
import Calculator from '@/components/Calculator/Calculator';
import WhyUs from '@/components/WhyUs/WhyUs';
import Discounts from '@/components/Discounts/Discounts';
import Header from '@/components/Header/Header';
import ScrollToFormButton from '@/components/ScrollToFormButton/ScrollToFormButton';
import fs from 'fs';
import path from 'path';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ model: string; series: string }> }): Promise<Metadata> {
  const { model, series } = await params;
  const seriesTitle = decodeURIComponent(series).replace(/-/g, ' ');

  return {
    title: `${seriesTitle} | Ремонт и обслуживание | YANIS GREK`,
    description: `Профессиональный ремонт и техническое обслуживание ${seriesTitle} в Москве. Диагностика, ремонт АКПП и ДВС с гарантией до 2 лет.`,
    keywords: `${seriesTitle}, ремонт ${seriesTitle}, диагностика ${seriesTitle}, техническое обслуживание`,
    openGraph: {
      title: `${seriesTitle} - Ремонт в YANIS GREK`,
      description: `Профессиональный ремонт и обслуживание ${seriesTitle}`,
      url: `https://yanisgrek.ru/cars/${model}/${series}`,
      type: "website",
    },
    alternates: {
      canonical: `https://yanisgrek.ru/cars/${model}/${series}`,
    },
  };
}

// Пример данных, в реальном проекте можно импортировать из отдельного файла
interface SeriesData {
  title: string;
  subtitle: string;
  description: string;
  advantages: string[];
  problems: string[];
  image: string;
}

// Функция для преобразования slug серии в имя файла JSON
function getSeriesFileName(seriesSlug: string, modelSlug: string): string {
  // Примеры преобразований:
  // f10-s63-m5 -> m5-f10-s63
  // f90-s63b44t -> m5-f90-s63b44t
  // f80-m3 -> m3-f80-m3
  // g80-m3-sedan -> m3-g80-m3-sedan
  // g81-m3-touring -> m3-g81-m3-touring
  // f01f02-n63-750i -> 7-f01-f02-n63-750i
  // g11g12-n74b66u-m760lix -> 7-g11-g12-n74b66u-m760lix
  // 4-f32-b38-418i -> 4-f32-b38-418i
  // 4-f33-n55-435i -> 4-f33-n55-435i
  // 3-e90-e90lci-n52-325 -> 3-e90-e90lci-n52-325
  // 2-f22-b47-218d -> 2-f22-b47-218d
  
  const model = modelSlug.replace('bmw-', '').toLowerCase();
  let slug = seriesSlug;
  
  // Для BMW 1: убираем префикс "1-" из начала если он есть
  if (model === '1' && slug.startsWith('1-')) {
    return slug; // Уже в правильном формате
  }
  
  // Для Rolls Royce: убираем префикс "rr-" из начала если он есть
  if (model === 'rolls-royce' && slug.startsWith('rr-')) {
    return slug; // Уже в правильном формате
  }
  
  // Для BMW 2: убираем префикс "2-" из начала если он есть
  if (model === '2' && slug.startsWith('2-')) {
    return slug; // Уже в правильном формате
  }
  
  // Для BMW 3: убираем префикс "3-" из начала если он есть
  if (model === '3' && slug.startsWith('3-')) {
    return slug; // Уже в правильном формате
  }
  
  // Для BMW 4: убираем префикс "4-" из начала если он есть
  if (model === '4' && slug.startsWith('4-')) {
    return slug; // Уже в правильном формате
  }
  
  // Для BMW 7: исправляем формат f01f02 -> f01-f02 или g11g12 -> g11-g12 или g1112 -> g11-g12
  if (model === '7') {
    // Убираем префикс "7-" если он есть
    if (slug.startsWith('7-')) {
      slug = slug.substring(2);
    }
    // Вариант 1: g11g12 -> g11-g12 (буквы слиплись: буква, 2 цифры, буква, 2 цифры)
    slug = slug.replace(/g(\d{2})g(\d{2})/g, 'g$1-g$2');
    slug = slug.replace(/f(\d{2})f(\d{2})/g, 'f$1-f$2');
    // Вариант 2: общая обработка для других случаев с буквой и цифрами
    slug = slug.replace(/([a-z])(\d{2})([a-z])(\d{2})/g, '$1$2-$3$4');
    return `7-${slug}`;
  }
  
  // Для BMW 5: убираем префикс "5-" если он есть
  if (model === '5' && slug.startsWith('5-')) {
    return slug; // Уже в правильном формате
  }
  
  // Для M-серии: переставляем части
  if (model.startsWith('m')) {
    // Убираем модель с конца если она там есть
    const modelRegex = new RegExp(`-${model}$`);
    if (modelRegex.test(slug)) {
      slug = slug.replace(modelRegex, '');
    }
    return `${model}-${slug}`;
  }
  
  return slug;
}

// Функция для загрузки данных серии из JSON файла
function loadSeriesData(seriesSlug: string, modelSlug: string): SeriesData | null {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data', 'seriesData');
    
    // Варианты имен файлов для попытки загрузки
    const fileNames = [
      seriesSlug,
      getSeriesFileName(seriesSlug, modelSlug)
    ];
    
    for (const fileName of fileNames) {
      const filePath = path.join(dataDir, `${fileName}.json`);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
      }
    }
  } catch (error) {
    console.error(`Error loading series data for ${seriesSlug}:`, error);
  }
  return null;
}

function getSeriesKey(series: string) {
  // Приводим к формату ключа: строчные, дефисы вместо пробелов
  return series.toLowerCase().replace(/ /g, '-');
}

export default async function SeriesPage({ params }: { params: Promise<{ model: string; series: string }> }) {
  const { model, series } = await params;
  const seriesTitle = decodeURIComponent(series).replace(/-/g, ' ');
  const key = getSeriesKey(series);
  
  // Определяем изображение на основе модели
  let modelImage = '/images/cars/bmw-default.png';
  if (model === 'rolls-royce' || model === 'rollsroyce' || model === 'rr') {
    modelImage = '/images/cars/rolls-royce.png';
  } else if (model === 'mini-cooper' || model === 'mini' || model === 'minicooper') {
    modelImage = '/images/cars/mini-cooper.png';
  } else if (model.startsWith('bmw-')) {
    // Для BMW моделей убираем префикс 'bmw-' и используем формат bmw-{model}.png
    const shortModel = model.replace('bmw-', '');
    modelImage = `/images/cars/bmw-${shortModel}.png`;
  } else {
    // Если модель без префикса, используем как есть
    modelImage = `/images/cars/bmw-${model}.png`;
  }
  
  // Загружаем данные серии из JSON файла
  const seriesData = loadSeriesData(key, model);
  
  const info: SeriesData = seriesData || {
    title: seriesTitle,
    subtitle: 'Профессиональное обслуживание и ремонт',
    description: `Добро пожаловать на страницу ${seriesTitle}. Здесь вы найдете всю необходимую информацию об этой модели, её особенностях и нашем профессиональном сервисе по обслуживанию.`,
    advantages: [
      'Качественные комплектующие',
      'Надежная конструкция',
      'Проверенные технологии',
      'Доступное обслуживание',
    ],
    problems: [
      'Информация о частых проблемах уточняется',
      'Регулярное обслуживание продлевает срок службы',
    ],
    image: modelImage,
  };
  
  // Если изображение не указано в JSON, используем modelImage
  if (!info.image) {
    info.image = modelImage;
  }

  return (
    <main className="SeriesPage">
      <Header />
      
      {/* Главная секция */}
      <section className="SeriesPage__hero">
        <div className="SeriesPage__hero-content">
          <div className="SeriesPage__hero-text">
            <h1>{info.title}</h1>
            <p className="subtitle">{info.subtitle}</p>
            <p className="description">{info.description}</p>
          </div>
          <div className="SeriesPage__hero-image">
            <img
              src={info.image}
              alt={info.title}
              width={600}
              height={340}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Секция преимуществ */}
      <section className="SeriesPage__advantages">
        <div className="SeriesPage__advantages-content">
          <h2>Главные преимущества</h2>
          <div className="SeriesPage__advantages-grid">
            {info.advantages.map((advantage, idx) => (
              <div key={idx} className="SeriesPage__advantage-card">
                <div className="SeriesPage__advantage-icon">✓</div>
                <p>{advantage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция проблем */}
      <section className="SeriesPage__problems">
        <div className="SeriesPage__problems-content">
          <h2>Частые проблемы</h2>
          <div className="SeriesPage__problems-list">
            {info.problems.map((problem, idx) => (
              <div key={idx} className="SeriesPage__problem-item">
                <span className="SeriesPage__problem-number">{idx + 1}</span>
                <p>{problem}</p>
              </div>
            ))}
          </div>
          <ScrollToFormButton />
        </div>
      </section>

      {/* Секция калькулятора */}
      <section className="SeriesPage__calculator">
        <Calculator initialModel={model} />
      </section>

      {/* Секция почему мы */}
      <section className="SeriesPage__whyus">
        <WhyUs />
      </section>

      {/* Секция скидок */}
      <section className="SeriesPage__discounts">
        <Discounts />
      </section>

      {/* Секция формы */}
      <section className="SeriesPage__form">
        <Form />
      </section>
    </main>
  );
}
