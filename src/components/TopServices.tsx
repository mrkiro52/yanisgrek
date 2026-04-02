export default function TopServices() {
  const mainServices = [
    {
      id: 1,
      title: 'Ремонт коробки передач',
      description: 'АКПП, МКПП, вариаторы, роботизированные коробки DCT, CVT и электрические трансмиссии EV',
      link: '/services/remont-korobki-peredach'
    },
    {
      id: 2,
      title: 'Ремонт двигателя',
      description: 'Бензиновые, дизельные, гибридные и электрические двигатели всех типов и модификаций',
      link: '/services/remont-dvigatelya'
    }
  ];

  const topServices = [
    {
      number: '01',
      title: 'Замена масла в АКПП',
      description: 'Профессиональная замена масла в автоматической коробке передач',
      link: '/services/zamena-masla-v-akpp'
    },
    {
      number: '02',
      title: 'Диагностика АКПП',
      description: 'Комплексная диагностика автоматической коробки передач',
      link: '/services/diagnostika-akpp'
    },
    {
      number: '03',
      title: 'Компьютерная диагностика',
      description: 'Компьютерная диагностика всех систем BMW',
      link: '/services/kompyuternaya-diagnostika'
    }
  ];

  return (
    <div className="TopServices">
      <h2 className="top-services-title">Наши топ услуги</h2>
      
      <div className="main-services">
        {mainServices.map(service => (
          <a 
            key={service.id} 
            href={service.link}
            className="main-service-card"
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </a>
        ))}
      </div>

      <div className="top-services-grid">
        {topServices.map(service => (
          <a 
            key={service.number} 
            href={service.link}
            className="top-service-card"
          >
            <div className="service-number">{service.number}</div>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </a>
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
