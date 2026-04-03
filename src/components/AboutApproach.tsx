export default function AboutApproach() {
  return (
    <div className="about-approach">
      <div className="about-approach__container">
        <div className="about-approach__content">
          <h2 className="about-approach__title">Не просто ремонт, а отношения с клиентом</h2>
          
          <div className="about-approach__blocks">
            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Работа без излишнего пафоса</h3>
              <p>Мы не просто ремонтируем автомобили — мы строим долгосрочные отношения с каждым клиентом. Нам важна обратная связь, ведь именно она помогает нам становиться лучше.</p>
            </div>

            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Человеческий подход</h3>
              <p>Для нашей компании приоритетом являются не автомобили, а люди — клиенты, обращающиеся к нам за обслуживанием. Мы ценим каждого, кто приезжает в наш сервис.</p>
            </div>

            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Постоянное развитие</h3>
              <p>Мы не претендуем на статус «супермастеров». Мы выполняем свою работу профессионально, изучаем новейшие технологии и методики, чтобы оставаться в курсе трендов.</p>
            </div>

            <div className="about-approach__block">
              <h3 className="about-approach__block-title">Качество и честность</h3>
              <p>Наша главная задача — обеспечить максимально высокий уровень удовлетворённости клиентов и качеством выполненных работ, и уровнем сервиса.</p>
            </div>
          </div>
        </div>

        <div className="about-approach__image">
          <img 
            src="/images/workerpc.webp" 
            alt="Работа за компьютером" 
            style={{ maxWidth: '500px', width: '100%', aspectRatio: '1', objectFit: 'cover', background: '#d0d0d0' }}
          />
        </div>
      </div>

      <div className="about-approach__quote">
        <p>С уважением,</p>
        <p className="about-approach__quote-author">Янис Грек, владелец мастерской</p>
      </div>
    </div>
  );
}
