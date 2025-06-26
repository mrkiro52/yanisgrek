"use client";
import "./services.scss";
import { useState } from "react";

export default function ServicesPage() {
  const services: string[] = [
    "Все услуги",
    "Тех Обслуживание",
    "Обслуживание трансмиссии и АКПП",
    "Тормозная система",
    "Подвеска и рулевое управление",
    "Двигатель (ДВС)",
    "Электроника и чип-тюнинг",
    "Кондиционер и охлаждение",
    "Спец работы и тюнинг",
  ];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="Services">
      <div className="Startscreen">
        <h2 className="title">Услуги</h2>
        <div className="buttons">
          <button className="calculate_cost">Рассчитать стоимость</button>
          <button className="send_request">Оставить заявку</button>
        </div>
      </div>
      <div className="buttons_container">
        {services.map((label, index) => (
          <button
            key={index}
            type="button"
            className={
              activeIndex === index
                ? "button_menu button_menu_active"
                : "button_menu"
            }
            onClick={() => setActiveIndex(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="services_container">
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
        <div className="service">Замена масла АККП</div>
      </div>
      <div className="more_container">
        <button className="button_more">Посмотреть еще</button>
      </div>
      <div className="block_about_services">
        <h1 className="hero_title">
          Капитальный ремонт{" "}
          <span className="hero_title_small">
            BMW <br /> в
          </span>{" "}
          Москве лишних<span className="hero_title_small">— без</span> слов
        </h1>
        <div>
          <div className="row_1_description_photo">
            <p className="description_about_block_founder">
              Для нас самое важное — это не машины. Это люди. Вы — те, кто к нам
              приезжает. Те, кому мы чиним авто, с кем разговариваем на
              ресепшене, кому объясняем, что и зачем меняем. Наша главная цель —
              чтобы человек уехал довольный. И работой, и отношением. Это,
              честно говоря, не так просто. Все мы разные, у всех своё
              настроение, свои взгляды, своё понимание сервиса. Но мы стараемся.
              Каждый день.
            </p>
            <img src="/images/photo_office.jpg" alt="" />
          </div>
          <div className="row_2_description_photo">
            <img
              src="/images/photo_worker.jpg"
              alt=""
              className="photo_worker"
            />
            <p className="description_about_block_founder">
              Мы не позеры и не «супер-мастера», которые, подключив ноутбук с
              кабелем за 1500₽, начинают говорить с потолка. Нас самих такие
              бесят. Мы работаем руками и головой. Смотрим, разбираемся, чиним.
              И не косим под звёзд. Мы держим уровень: читаем, учимся, следим за
              новыми технологиями, чтобы быть в теме. Но при этом остаёмся
              собой. Живыми людьми, а не робо-механиками.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
