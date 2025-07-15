// app/cars/[model]/ClientCar.jsx (Client Component)
'use client';
import React from 'react';
import EmblaCarousel from '@/components/embla/EmblaCarousel';
import CalculatorServer from '@/components/Calculator/CalculatorServer';
import Contacts from '@/app/contacts/page';
import './car.scss';

export default function ClientCar({ model, carInfo, data, services, problemsImages }) {
  return (
    <div className="Car">
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
