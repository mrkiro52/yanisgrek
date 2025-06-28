import React from "react";
import "./car.scss";
import EmblaCarousel from "@/components/embla/EmblaCarousel";

const problemsImages = [
  "/images/problems_slide1.jpg",
  "/images/problems_slide1.jpg",
  "/images/problems_slide1.jpg",
  "/images/problems_slide1.jpg",
  "/images/problems_slide1.jpg",
  "/images/problems_slide1.jpg",
];

export default function Car() {
  return (
    <div className="Car">
      <div className="Startscreen">
        <div className="startscreen_title">
          Сертифицированное оборудование, фирменный инструмент и опыт команды —
          для быстрого и качественного ремонта.
        </div>
      </div>
      <div className="problems_block">
        <h1 className="title_problem">
          Даже у самой надежной
          <br /> машины есть слабые места
        </h1>
        <div className="container_problems">
          <div className="block_title">
            <h1 className="title">Повышенный расход масла</h1>
            <p className="subtitle">
              Двигатель S63 может "жрать" масло, особенно при агрессивной езде.
            </p>
          </div>
          <div className="block_title">
            <h1 className="title">Перегрев и слабое охлаждение</h1>
            <p className="subtitle">
              Радиаторы и помпа могут не справляться при активной нагрузке.
            </p>
          </div>
          <div className="block_title">
            <h1 className="title">Проблемы с турбинами</h1>
            <p className="subtitle">
              Износ, течи масла, сбои актуаторов, особенно если не давать мотору
              остыть.
            </p>
          </div>
          <div className="block_title">
            <h1 className="title">Подвеска</h1>
            <p className="subtitle">
              Быстрый износ компонентов, стуки в передней части, особенно при
              плохих дорогах.
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
      <div className="calculator">
        <h2 className="title_calculator">
          Рассчитайте стоимость ремонта, не выходя из дома
        </h2>
        <div className="container_model_distance">
          <div className="car_title">
            <img src="/images/bmw_m5_f90_calculator.png" alt="" />
            <h3 className="title_car">BMW M5 Sedan</h3>
          </div>
          <div className="inputs">
            <div className="model-select">
              <label form="model" className="model-select__label">
                МОДЕЛЬ
              </label>
              <div className="model-select__control">
                <select
                  id="model"
                  name="model"
                  className="model-select__dropdown"
                >
                  <option value="">Выберите модель</option>
                  <option value="f90">F90 S63B44T M5</option>
                  <option value="f80">F80 M3</option>
                  <option value="x5">X5 M50i</option>
                  <option value="z4">Z4 M40i</option>
                </select>
                <svg
                  className="model-select__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="mileage-input">
              <label form="mileage" className="mileage-input__label">
                ПРОБЕГ
              </label>
              <div className="mileage-input__control">
                <input
                  id="mileage"
                  name="mileage"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="125 000"
                  className="mileage-input__field"
                />
                <span className="mileage-input__unit">км</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
