// app/cars/[model]/page.jsx
import { Metadata } from 'next';
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

export const revalidate = 60;

const modelsMap = {
  // 1 Series
  "bmw-1": { name: "BMW 1", description: "Ремонт BMW 1 серии - диагностика АКПП, ДВС и техническое обслуживание с гарантией до 2 лет" },
  // 2 Series
  "bmw-2": { name: "BMW 2", description: "Ремонт BMW 2 серии - обслуживание и ремонт коробок передач, двигателей и электроники" },
  // 3 Series
  "bmw-3": { name: "BMW 3", description: "Ремонт BMW 3 серии - профессиональная диагностика и ремонт АКПП, ДВС с гарантией" },
  // 4 Series
  "bmw-4": { name: "BMW 4", description: "Ремонт BMW 4 серии - сертифицированный техцентр для диагностики и ремонта BMW 4" },
  // 5 Series
  "bmw-5": { name: "BMW 5", description: "Ремонт BMW 5 серии - полное техническое обслуживание и ремонт премиального автомобиля" },
  // 6 Series
  "bmw-6-e24": { name: "BMW 6 Series E24", description: "Ремонт BMW 6 серии E24 Coupe - классический купе с легендарным дизайном" },
  "bmw-6-e63": { name: "BMW 6 Series E63", description: "Ремонт BMW 6 серии E63 Coupe - премиальный купе с мощными двигателями" },
  "bmw-6-e64": { name: "BMW 6 Series E64", description: "Ремонт BMW 6 серии E64 Convertible - люксовый кабриолет с электрической крышей" },
  "bmw-6-f06": { name: "BMW 6 Series F06", description: "Ремонт BMW 6 серии F06 Gran Coupe - четырёхдверный люксовый купе" },
  "bmw-6-f12": { name: "BMW 6 Series F12", description: "Ремонт BMW 6 серии F12 Convertible - элегантный кабриолет нового поколения" },
  "bmw-6-f13": { name: "BMW 6 Series F13", description: "Ремонт BMW 6 серии F13 Coupe - спортивный двухдверный купе" },
  "bmw-6-g32": { name: "BMW 6 Series G32", description: "Ремонт BMW 6 серии G32 Gran Turismo - современное GT с инновационными технологиями" },
  // 7 Series
  "bmw-7": { name: "BMW 7", description: "Ремонт BMW 7 серии - люксовый сервис для флагмана BMW с гарантией качества" },
  // 8 Series
  "bmw-8-e31": { name: "BMW 8 Series E31", description: "Ремонт BMW 8 серии E31 Coupe - легендарный классический купе" },
  "bmw-8-g14": { name: "BMW 8 Series G14", description: "Ремонт BMW 8 серии G14 Convertible - премиальный кабриолет с V8 и V12" },
  "bmw-8-g15": { name: "BMW 8 Series G15", description: "Ремонт BMW 8 серии G15 Coupe - мощный купе с передовыми технологиями" },
  "bmw-8-g16": { name: "BMW 8 Series G16", description: "Ремонт BMW 8 серии G16 Gran Coupe - четырёхдверный люксовый купе" },
  // X1 Series
  "bmw-x1": { name: "BMW X1", description: "Ремонт BMW X1 - техническое обслуживание и диагностика кроссовера BMW X1" },
  // X2 Series
  "bmw-x2-f39": { name: "BMW X2 F39", description: "Ремонт BMW X2 F39 - компактный спортивный кроссовер с динамичным дизайном" },
  // X3 Series
  "bmw-x3": { name: "BMW X3", description: "Ремонт BMW X3 - ремонт АКПП, ДВС и подвески для кроссовера BMW X3" },
  "bmw-x3-m-f97": { name: "BMW X3 M F97", description: "Ремонт BMW X3 M F97 - высокопроизводительный спортивный кроссовер" },
  // X4 Series
  "bmw-x4-f26": { name: "BMW X4 F26", description: "Ремонт BMW X4 F26 - стильный кроссовер-купе с агрессивным дизайном" },
  "bmw-x4-g02": { name: "BMW X4 G02", description: "Ремонт BMW X4 G02 - современный кроссовер-купе нового поколения" },
  "bmw-x4-m-f98": { name: "BMW X4 M F98", description: "Ремонт BMW X4 M F98 - спортивная версия X4 с максимальной производительностью" },
  // X5 Series
  "bmw-x5": { name: "BMW X5", description: "Ремонт BMW X5 - авторизованный сервис с оригинальными запчастями для BMW X5" },
  "bmw-x5-m-e70": { name: "BMW X5 M E70", description: "Ремонт BMW X5 M E70 - первое поколение высокопроизводительного X5" },
  "bmw-x5-m-f85": { name: "BMW X5 M F85", description: "Ремонт BMW X5 M F85 - мощный внедорожник с V8" },
  "bmw-x5-m-f95": { name: "BMW X5 M F95", description: "Ремонт BMW X5 M F95 - современный X5 M с гибридными технологиями" },
  // X6 Series
  "bmw-x6": { name: "BMW X6", description: "Ремонт BMW X6 - профессиональный ремонт премиального кроссовера BMW X6" },
  "bmw-x6-m-e71": { name: "BMW X6 M E71", description: "Ремонт BMW X6 M E71 - легендарный спортивный кроссовер-купе" },
  "bmw-x6-m-f86": { name: "BMW X6 M F86", description: "Ремонт BMW X6 M F86 - мощный X6 M второго поколения" },
  "bmw-x6-m-f96": { name: "BMW X6 M F96", description: "Ремонт BMW X6 M F96 - новое поколение X6 M с инновациями" },
  // X7 Series
  "bmw-x7-g07": { name: "BMW X7 G07", description: "Ремонт BMW X7 G07 - флагманский семиместный премиальный кроссовер" },
  // XM Series
  "bmw-xm-g09": { name: "BMW XM G09", description: "Ремонт BMW XM G09 - новый премиальный гибридный спортивный кроссовер" },
  // M2 Series
  "bmw-m2-f87": { name: "BMW M2 F87", description: "Ремонт BMW M2 F87 - компактный спортивный седан с V6" },
  "bmw-m2-f87-comp": { name: "BMW M2 F87 Competition", description: "Ремонт BMW M2 Competition - улучшенная версия M2 с большей мощностью" },
  "bmw-m2-f87-cs": { name: "BMW M2 F87 CS", description: "Ремонт BMW M2 CS - экстремальная версия M2 на трассу" },
  "bmw-m2-g87": { name: "BMW M2 G87", description: "Ремонт BMW M2 G87 - новое поколение компактного M с электроникой" },
  // M3 Series
  "bmw-m3-e46": { name: "BMW M3 E46", description: "Ремонт BMW M3 E46 - классический M3 с историческим значением" },
  "bmw-m3-e90": { name: "BMW M3 E90", description: "Ремонт BMW M3 E90 Sedan - спортивный седан четвёртого поколения" },
  "bmw-m3-e92": { name: "BMW M3 E92", description: "Ремонт BMW M3 E92 Coupe - легендарный M3 купе с V8" },
  "bmw-m3-f80": { name: "BMW M3 F80", description: "Ремонт BMW M3 F80 - современный M3 с инновационным двигателем" },
  "bmw-m3-g80": { name: "BMW M3 G80", description: "Ремонт BMW M3 G80 - новейший M3 с гибридными системами" },
  "bmw-m3-g81": { name: "BMW M3 G81", description: "Ремонт BMW M3 G81 Touring - универсал высокого класса" },
  // M4 Series
  "bmw-m4-f82": { name: "BMW M4 F82", description: "Ремонт BMW M4 F82 Coupe - мощный спортивный купе" },
  "bmw-m4-f83": { name: "BMW M4 F83", description: "Ремонт BMW M4 F83 Convertible - кабриолет с крышей M Performance" },
  "bmw-m4-g82": { name: "BMW M4 G82", description: "Ремонт BMW M4 G82 Coupe - современный M4 с новейшими технологиями" },
  "bmw-m4-g83": { name: "BMW M4 G83", description: "Ремонт BMW M4 G83 Convertible - премиальный кабриолет M" },
  // M5 Series
  "bmw-m5": { name: "BMW M5", description: "Ремонт BMW M5 - специализированный сервис для спортивной М-серии BMW" },
  // M8 Series
  "bmw-m8-f91": { name: "BMW M8 F91", description: "Ремонт BMW M8 F91 Convertible - кабриолет с V12" },
  "bmw-m8-f92": { name: "BMW M8 F92", description: "Ремонт BMW M8 F92 Coupe - высокопроизводительный купе M" },
  "bmw-m8-f93": { name: "BMW M8 F93", description: "Ремонт BMW M8 F93 Gran Coupe - люксовый четырёхдверный M купе" },
  // i3 Series
  "bmw-i3": { name: "BMW i3", description: "Ремонт BMW i3 - электрический городской автомобиль с инновационным дизайном" },
  // i4 Series
  "bmw-i4": { name: "BMW i4", description: "Ремонт BMW i4 - электрический спортивный седан нового поколения" },
  // i7 Series
  "bmw-i7": { name: "BMW i7", description: "Ремонт BMW i7 - люксовый электрический седан с максимальным комфортом" },
  // i8 Series
  "bmw-i8": { name: "BMW i8", description: "Ремонт BMW i8 - гибридный суперкар с электрическим двигателем" },
  // iX Series
  "bmw-ix": { name: "BMW iX", description: "Ремонт BMW iX - премиальный электрический кроссовер будущего" },
  // iX2 Series
  "bmw-ix2-u10": { name: "BMW iX2 U10", description: "Ремонт BMW iX2 U10 - компактный электрический кроссовер" },
  // iX3 Series
  "bmw-ix3-g08": { name: "BMW iX3 G08", description: "Ремонт BMW iX3 G08 - электрический кроссовер с удлинённым дизайном" },
  // iX5 Series
  "bmw-ix5-hydrogen": { name: "BMW iX5 Hydrogen", description: "Ремонт BMW iX5 Hydrogen - экспериментальный водородный кроссовер" },
  // Z1 Series
  "bmw-z1": { name: "BMW Z1", description: "Ремонт BMW Z1 Roadster - первый спортивный родстер BMW" },
  // Z3 Series
  "bmw-z3-roadster": { name: "BMW Z3 Roadster", description: "Ремонт BMW Z3 Roadster - классический спортивный родстер" },
  "bmw-z3-coupe": { name: "BMW Z3 Coupe", description: "Ремонт BMW Z3 Coupe - компактный спортивный купе" },
  "bmw-z3-m-roadster": { name: "BMW Z3 M Roadster", description: "Ремонт BMW Z3 M Roadster - спортивная версия с V6" },
  "bmw-z3-m-coupe": { name: "BMW Z3 M Coupe", description: "Ремонт BMW Z3 M Coupe - агрессивный M спортивный купе" },
  // Z4 Series
  "bmw-z4-e85": { name: "BMW Z4 E85", description: "Ремонт BMW Z4 E85 Roadster - современный спортивный родстер" },
  "bmw-z4-e86": { name: "BMW Z4 E86", description: "Ремонт BMW Z4 E86 Coupe - закрытое спортивное купе" },
  "bmw-z4-e89": { name: "BMW Z4 E89", description: "Ремонт BMW Z4 E89 Roadster - кабриолет с электрической крышей" },
  "bmw-z4-g29": { name: "BMW Z4 G29", description: "Ремонт BMW Z4 G29 Roadster - новейший спортивный родстер" },
  "bmw-z4-m-roadster": { name: "BMW Z4 M Roadster", description: "Ремонт BMW Z4 M Roadster - мощный спортивный родстер" },
  "bmw-z4-m-coupe": { name: "BMW Z4 M Coupe", description: "Ремонт BMW Z4 M Coupe - экстремальный M спортивный купе" },
  // Z8 Series
  "bmw-z8": { name: "BMW Z8", description: "Ремонт BMW Z8 Roadster - легендарный спортивный суперкар" },
  // Other
  "rolls-royce": { name: "Rolls-Royce", description: "Ремонт Rolls-Royce в Москве - люксовый техцентр для британских автомобилей" },
  "mini-cooper": { name: "MINI Cooper", description: "Ремонт MINI Cooper в Москве - техническое обслуживание и диагностика MINI Cooper" },
};

export async function generateMetadata({ params }): Promise<Metadata> {
  const { model } = await params;
  const modelInfo = modelsMap[model] || { name: "BMW", description: "Ремонт BMW" };

  return {
    title: `Ремонт ${modelInfo.name} в Москве | Диагностика и обслуживание | YANIS GREK`,
    description: modelInfo.description,
    keywords: `ремонт ${modelInfo.name}, диагностика ${modelInfo.name}, техническое обслуживание ${modelInfo.name}, АКПП, ДВС`,
    openGraph: {
      title: `Ремонт ${modelInfo.name} в YANIS GREK - Москва`,
      description: modelInfo.description,
      url: `https://yanisgrek.ru/cars/${model}`,
      type: "website",
    },
    alternates: {
      canonical: `https://yanisgrek.ru/cars/${model}`,
    },
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src', 'data', 'cars');
  const files = await fs.readdir(dir);
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => ({ model: f.replace(/\.json$/, '') }));
}

export default async function CarPage({ params }) {
  const { model } = await params;
  const propModel = modelsMap[model]?.name;

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
          <p>✓ Гарантия на ремонт до 2-х лет</p>
          <p>✓ Мастера по АКПП с опытом более 15 лет</p>
          <div className="buttons">
            <a href='#Calculator' className='count' title="Рассчитать стоимость ремонта">Рассчитать стоимость</a>
            <a href='#Form' className='goform' title="Записаться на приём">Записаться в автосервис</a>
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
              <h3 className="title">{carInfo[`problem${i}_title`]}</h3>
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
