export default function AboutStory() {
  return (
    <div className="about-story">
      <div className="about-story__container">
        <img 
          src="/src/assets/images/yearthrow.webp"
          alt="14 лет опыта"
          className="about-story__img"
        />
        <div className="about-story__content">
          <h2 className="about-story__title">Опыт сквозь года</h2>
          <p className="about-story__subtitle">14 лет вместе: история сервиса, который понимает</p>
          
          <div className="about-story__text">
            <p>Наш автосервис открылся 14 лет назад с простой, но сильной идеей:</p>
            <p className="about-story__highlight">Первый сервис с человеческим подходом.</p>
            <p>С тех пор мы не изменили принципам. Мы действительно верим, что обслуживание автомобиля может быть честным, понятным и основанным на доверии. Мы не стремимся «выделиться ради эффекта» — мы просто делаем свою работу по-человечески и профессионально.</p>
          </div>
          
          <div className="about-story__year">
            <span className="about-story__year-number">14</span>
            <span className="about-story__year-text">лет опыта</span>
          </div>
        </div>
      </div>
    </div>
  );
}
