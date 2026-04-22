export default function TopServices() {
  const topServices = [
    {
      id: 1,
      title: 'Ремонт Акпп',
      description: 'Профессиональный ремонт и восстановление автоматической коробки передач BMW. Полная диагностика электромагнитных клапанов, соленоидов и гидробака. Замена масла ATF, фильтров и уплотнений. Восстановление внутренних компонентов трансмиссии. Гарантия на выполненные работы 12 месяцев.',
      priceFrom: 5000,
      link: '/services/remont-korobki-peredach',
      mobile: true,
      image: 'https://s3.regru.cloud/yanis-grek/services/remontAkpp%201.png'
    },
    {
      id: 2,
      title: 'Ремонт Двс',
      description: 'Полный спектр услуг по ремонту двигателя BMW. Компьютерная диагностика всех систем. Замена поршней, гильз, клапанов, прокладок и сальников. Восстановление головки блока цилиндров. Регулировка зазоров, настройка инжектора. Комплексное тестирование перед выдачей.',
      priceFrom: 6000,
      link: '/services/remont-dvigatelya',
      mobile: true,
      image: 'https://s3.regru.cloud/yanis-grek/services/remontDvs%201.png'
    },
    {
      id: 3,
      title: 'Замена тормозных колодок',
      description: 'Качественная замена передних и задних тормозных колодок на оригинальные BMW или проверенные аналоги. Полная проверка тормозных дисков, суппортов и тормозной жидкости. Проверка работы тормозных датчиков и АБС.',
      priceFrom: 3500,
      link: '/services/zamena-tormoznye-kolodki',
      image: 'https://s3.regru.cloud/yanis-grek/services/zamena-tormoznye-kolodki%201.png'
    },
    {
      id: 4,
      title: 'Компьютерная диагностика',
      description: 'Полная компьютерная диагностика всех электронных систем автомобиля. Выявление ошибок двигателя, коробки, подвески, тормозов. Расшифровка кодов неисправностей и подробный отчёт с рекомендациями по устранению проблем.',
      priceFrom: 1500,
      link: '/services/kompyuternaya-diagnostika',
      mobile: true,
      image: 'https://s3.regru.cloud/yanis-grek/services/kompyuternaya-diagnostika%201.png'
    },
    {
      id: 5,
      title: 'Замена стоек стабилизатора',
      description: 'Профессиональная замена стоек и тяг стабилизатора передней и задней подвески. Значительное улучшение управляемости автомобиля. Снижение крена кузова при поворотах. Установка оригинальных деталей BMW с гарантией.',
      priceFrom: 2800,
      link: '/services/zamena-stojki-stabilizator',
      image: 'https://s3.regru.cloud/yanis-grek/services/zamena-stojki-stabilizator%201.png'
    },
    {
      id: 6,
      title: 'Замена ступичных подшипников',
      description: 'Профессиональная замена ступичных подшипников передних и задних колёс. Полное устранение шума и вибрации при вождении. Восстановление плавности движения. Использование оригинальных и надёжных аналогов с гарантией.',
      priceFrom: 3200,
      link: '/services/zamena-stupichnye-podshipniki',
      image: 'https://s3.regru.cloud/yanis-grek/services/zamena-stupichnye-podshipniki%201.png'
    }
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  const visibleServices = isMobile
    ? topServices.slice(0, 3)
    : topServices; // На ПК (>1024px) показываем все 6 карточек

  return (
    <div className="TopServices">
      <h2 className="top-services-title">Наши топ услуги</h2>
      
      <div className="top-services-grid">
        {visibleServices.map(service => (
          <div key={service.id} className="top-service-card">
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-footer">
                <span className="price-from">От {service.priceFrom.toLocaleString()} ₽</span>
                <a href={service.link} className="service-details-btn">Подробнее</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="services-button-wrapper">
        <a href="/services" className="services-button">
          Перейти ко всем услугам
        </a>
      </div>
    </div>
  );
}
