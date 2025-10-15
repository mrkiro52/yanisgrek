// app/cars/[model]/page.jsx
import React from 'react';
import path from 'path';
import fs from 'fs/promises';
import Header from '@/components/Header/Header';
import EmblaCarousel from '@/components/embla/EmblaCarousel';
import Calculator from '@/components/Calculator/Calculator';
import Form from '../../../components/Form/Form';
import './car.scss';
import Chillzone from '../../../components/Chillzone/Chillzone';
import Discounts from '../../../components/Discounts/Discounts';
import Quiz from '../../../components/Quiz/Quiz';

// ISR: пересобираем страницу раз в минуту
export const revalidate = 60;

// Статическое создание путей из файлов
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src', 'data', 'cars');
  const files = await fs.readdir(dir);
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => ({ model: f.replace(/\.json$/, '') }));
}

export default async function CarPage({ params }) {
  // Await params per Next.js requirements
  const { model } = await params;

  const modelsMap = {
    "bmw-1": "BMW 1",
    "bmw-2": "BMW 2",
    "bmw-3": "BMW 3",
    "bmw-4": "BMW 4",
    "bmw-5": "BMW 5",
    "bmw-7": "BMW 7",
    "bmw-x1": "BMW X1",
    "bmw-x3": "BMW X3",
    "bmw-x5": "BMW X5",
    "bmw-x6": "BMW X6",
    "bmw-m5": "BMW M5",
  };

  const propModel = modelsMap[model];

  // Чтение статичных данных о машине
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'cars',
    `${model}.json`
  );
  const carRaw = await fs.readFile(filePath, 'utf-8');
  const carInfo = JSON.parse(carRaw);

  // Слайды для карусели
  const problemsImages = Array.from({ length: 6 }, (_, i) => ({
    src: `/images/car_slides/car_slide_${i + 1}.jpg`,
    caption: '',
  }));

  return (
    <div className="Car">
      <Header />

      <div
        className="Startscreen"
        style={{ 
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                      url(/images/carsbg/${model}.jpg) center / cover no-repeat` 
        }}
      >
        <div className="first">
          <h1>Ремонт и диагностика {carInfo.title} у профессионалов</h1>
          <span>Гарантия на ремонт до 2-х лет</span>
          <span>Мастера по АКПП с опытом более 15 лет</span>
          <div className="buttons">
            <a href='#Calculator' className='count'>Рассчитать стоимость</a>
            <a href='#Form' className='goform'>Записаться в автосервис</a>
          </div>
        </div>
        <div className="second">
          <h2>{carInfo.title}</h2>
          <span>{carInfo.subtitle}</span>
        </div>
      </div>

      <Discounts/>

      <div className="problems_block">
        <div className="problems_block_top">
          <h1 className="title_problem">
            Даже у самой надёжной<br />машины есть слабые места
          </h1>
          <h2>YANIS GREK</h2>
        </div>
        <div className="container_problems">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="block_title">
              <h1 className="title">{carInfo[`problem${i}_title`]}</h1>
              <p className="subtitle">{carInfo[`problem${i}_text`]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="slider">
        <EmblaCarousel slides={problemsImages} options={{ loop: true, align: 'start' }} />
      </div>

      <Calculator />
      {propModel ? <Quiz propModel={propModel} /> : <Quiz />}
      <div style={{paddingTop: "130px"}}></div>
      <review-lab data-widgetid="68ef05ca67defc8041d3ab95"></review-lab>
      <script src="https://app.reviewlab.ru/widget/index-es2015.js" defer></script>
      <div style={{paddingBottom: "130px"}}></div>
      <Chillzone/>
      <Form />
    </div>
  );
}
