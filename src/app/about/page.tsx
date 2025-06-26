"use client";
import "./about.scss";
import EmblaCarousel from "@/components/embla/EmblaCarousel";

const images: string[] = [
  "/images/alexandr_director.jpg",
  "/images/alexandr_master.jpg",
  "/images/maksim_master.jpg",
  "/images/vitaly.jpg",
  "/images/murad.jpg",
  "/images/dmitry.jpg",
];
const projectImages = [
  "/images/car_slide_1.jpg",
  "/images/car_slide_1.jpg",
  "/images/car_slide_1.jpg",
  "/images/car_slide_1.jpg",
  "/images/car_slide_1.jpg",
];

export default function AboutPage() {
  return (
    <div className="About">
      <div className="Startscreen">
        <div className="startscreen_text">
          <h1 className="about_title">О НАС</h1>
          <div className="block_title">
            <h1 className="title">Опыт сквозь года</h1>
            <p className="subtitle">
              8 лет вместе: история сервиса, который понимает
            </p>
          </div>
          <div className="slider">
            <EmblaCarousel
              slides={projectImages}
              options={{
                loop: true,
                align: "start",
              }}
            />
          </div>
        </div>
      </div>
      <div className="block_about">
        <div className="block_about_photo_text">
          <div className="text_block_about">
            <h1 className="title_block_about">
              О нас — автосервис в Москве
              <br /> с человеческим подходом
            </h1>
            <p className="description_block_about">
              Мы — не просто техцентр в Москве, как их привыкли видеть. Наш
              автосервис открылся 8 лет назад с простой, но сильной идеей:
            </p>
            <div className="citation_block_about">
              <p>"Первый сервис с человеческим подходом."</p>
            </div>
            <p className="description_block_about">
              С тех пор мы не изменили принципам. Мы действительно верим, что
              обслуживание автомобиля может быть честным, понятным и основанным
              на доверии. Мы не стремимся «выделиться ради эффекта» — мы просто
              делаем свою работу по-человечески.
            </p>
          </div>
          <img src="/images/photo_block_about.jpg" alt="" />
        </div>
      </div>
      <div className="block_assets_about">
        <div className="asset">
          <img src="/images/photo1.jpg" alt="" />
          <p>8 лет стабильной работы одной и той же командой.</p>
        </div>
        <div className="asset">
          <img src="/images/photo1.jpg" alt="" />
          <p>Честная диагностика, прозрачные цены, никаких скрытых услуг.</p>
        </div>
        <div className="asset">
          <img src="/images/photo1.jpg" alt="" />
          <p>Всегда на связи, всегда готовы объяснить и пойти навстречу.</p>
        </div>
        <div className="asset">
          <img src="/images/photo1.jpg" alt="" />
          <p>Уважение к каждому клиенту, даже в форс-мажорных ситуациях.</p>
        </div>
      </div>
      <div className="block_box_citation">
        <div className="block_title_assets_about">
          <h1 className="title_block2">
            Не просто ремонт,
            <br /> а отношения с клиентом
          </h1>
          <p className="subtitle_block2">
            Мы не просто ремонтируем автомобили — мы строим долгосрочные
            отношения с клиентами. Да, мы не идеальны. Но мы открыты к обратной
            связи, умеем признавать ошибки и всегда стремимся их исправить.
          </p>
        </div>
      </div>
      <div className="block_about_from_founder">
        <h1 className="hero_title">
          Сервис <span className="hero_title_small">без</span> понтов. <br />{" "}
          Просто по-человечески
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
        <p className="signature">
          С уважением и без лишнего пафоса,Янис Грек, владелец мастерской
        </p>
      </div>
      <div className="team">
        <h2 className="team_title">Наша команда</h2>
        <div className="slider2">
          <EmblaCarousel
            slides={images}
            options={{
              loop: true,
              align: "start",
            }}
          />
        </div>
        {/* <div className="team_container">
          <div className="team_arrows">
            <img src="/images/team_arrow_left.svg" alt="" />
            <img src="/images/team_arrow_right.svg" alt="" />
          </div>
          <div className="team_slider">
            <div className="team_track">
              <div className="team_slide">
                <img src="/images/alexandr_director.jpg" alt="" />
                <p className="team_name">Александр</p>
                <p className="team_position">Директор</p>
              </div>
              <div className="team_slide">
                <img src="/images/alexandr_master.jpg" alt="" />
                <p className="team_name">Александр</p>
                <p className="team_position">Мастер-приемщик</p>
              </div>
              <div className="team_slide">
                <img src="/images/maksim_master.jpg" alt="" />
                <p className="team_name">Максим</p>
                <p className="team_position">Мастер-приемщик</p>
              </div>
              <div className="team_slide">
                <img src="/images/maksim_master.jpg" alt="" />
                <p className="team_name">Максим</p>
                <p className="team_position">Мастер-приемщик</p>
              </div>
              <div className="team_slide">
                <img src="/images/maksim_master.jpg" alt="" />
                <p className="team_name">Максим</p>
                <p className="team_position">Мастер-приемщик</p>
              </div>
              <div className="team_slide">
                <img src="/images/maksim_master.jpg" alt="" />
                <p className="team_name">Максим</p>
                <p className="team_position">Мастер-приемщик</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div
        style={{ filter: "invert(0.9) hue-rotate(180deg)" }}
        className="yandex_map"
      >
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A9cd8128f022d9c52582359f6749d3206589822ddbb5c480e49a54483a2093b0d&amp;source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
