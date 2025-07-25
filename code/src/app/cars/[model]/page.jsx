// app/cars/[model]/page.jsx
import React from 'react';
import path from 'path';
import fs from 'fs/promises';
import Header from '@/components/Header/Header';
import EmblaCarousel from '@/components/embla/EmblaCarousel';
import CalculatorServer from '@/components/Calculator/CalculatorServer';
import Contacts from '@/app/contacts/page';
import './car.scss';

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
        style={{ background: `url(/images/carsbg/${model}.jpg) center / cover no-repeat` }}
      >
        <h1>{carInfo.title}</h1>
        <div className="startscreen_title">{carInfo.subtitle}</div>
      </div>

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

      <CalculatorServer />
      <Contacts />
    </div>
  );
}
