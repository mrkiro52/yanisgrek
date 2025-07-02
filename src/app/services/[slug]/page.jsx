import "./service.scss";
import Header from "../../../components/Header/Header";

export default function Service() {
  return (
    <div className="Service">
      <Header />
      <div className="Startscreen">
        <h2 className="title_startscreen">
          Замена масла
          <br /> в двигателе
          <span className="title_small"> BMW</span>
        </h2>

        <div className="images-wrapper">
          {/* небольшой «лево-верх» кадр */}
          <img
            src="/images/oil-pour.jpg"
            alt=""
            className="images-wrapper__img images-wrapper__img--small"
          />

          {/* большой «право-низ» кадр */}
          <img
            src="/images/mechanic.jpg"
            alt=""
            className="images-wrapper__img images-wrapper__img--large"
          />

          {/* подзаголовок справа от фото */}
          <div className="images-wrapper__subtitle">
            <p className="subtitle-top">ИСПОЛЬЗУЕМ ОРИГИНАЛЬНОЕ МАСЛО</p>
            <p className="subtitle-bottom">BMW LL04</p>
          </div>
          <div className="images-wrapper__subtitle_mobile">
            <p className="subtitle_mobile">
              ИСПОЛЬЗУЕМ ОРИГИНАЛЬНОЕ МАСЛО BMW LL04
            </p>
          </div>
        </div>
      </div>
      <div className="calculator">
        <h1 className="title_calculator">Здесь будет калькулятор</h1>
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
      </div>
    </div>
  );
}
