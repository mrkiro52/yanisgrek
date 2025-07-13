import React from "react";
import "./car.scss";
import EmblaCarousel from "@/components/embla/EmblaCarousel";
import Contacts from "../../contacts/page";
import Header from '../../../components/Header/Header';
import fs from 'fs/promises'
import path from 'path'
import Calculator from '../../../components/Calculator/Calculator';




const problemsImages = [
  { src: "/images/car_slides/car_slide_1.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_2.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_3.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_4.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_5.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_6.jpg", caption: "" },
];


export default async function Car({ params }) {

  /* 1. Загружаем всё, что нужно на сервере  */
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

  /* 2. Склеиваем вложенную иерархию для калькулятора  */
  const data = models.map(model => {
    const subs = submodels
      .filter(sm => sm.model.id === model.id)
      .map(sm => ({
        ...sm,
        series: series.filter(s => s.submodel.id === sm.id),
      }));
    return { ...model, submodels: subs };
  });

  const model = params.model;

  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'cars',
    `${model}.json`
  )

  const json = await fs.readFile(filePath, 'utf-8');
  const carInfo = JSON.parse(json);


  return (
    <div className="Car">
      <Header/>
      <div 
        className="Startscreen" 
        style={{
          background: `url(/images/carsbg/${params.model}.jpg) center / cover no-repeat`
        }}
      >
          <h1>{carInfo.title}</h1>
          <div className="startscreen_title">
            {carInfo.subtitle}
          </div>
      </div>
      <div className="problems_block">
        <div className="problems_block_top">
          <h1 className="title_problem">
            Даже у самой надежной
            <br /> машины есть слабые места
          </h1>
          <h2>
            YANIS GREK
          </h2>
        </div>
        <div className="container_problems">
          <div className="block_title">
            <h1 className="title">{carInfo.problem1_title}</h1>
            <p className="subtitle">
              {carInfo.problem1_text}
            </p>
          </div>
          <div className="block_title">
            <h1 className="title">{carInfo.problem2_title}</h1>
            <p className="subtitle">
              {carInfo.problem2_text}
            </p>
          </div>
          <div className="block_title">
            <h1 className="title">{carInfo.problem3_title}</h1>
            <p className="subtitle">
              {carInfo.problem3_text}
            </p>
          </div>
          <div className="block_title">
            <h1 className="title">{carInfo.problem4_title}</h1>
            <p className="subtitle">
              {carInfo.problem4_text}
            </p>
          </div>
        </div>
      </div>
      <div className="slider">
        <EmblaCarousel
          slides={problemsImages}
          options={{
            loop: true,
            align: "start",
          }}
        />
      </div>
      <Calculator data={data} services={services} />
      <Contacts/>
    </div>
  );
}
