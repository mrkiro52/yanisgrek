export default function Servicing() {
  const services = [
    {
      id: 1,
      image: '/src/assets/images/servicing1.webp',
      title: 'Оригинальные запчасти BMW',
      description: 'Мы используем только оригинальные комплектующие, одобренные производителем. Это гарантирует максимальную совместимость, надёжность и долговечность каждого узла вашего автомобиля.',
      imagePosition: 'left'
    },
    {
      id: 2,
      image: '/src/assets/images/servicing2.webp',
      title: 'Сертифицированные мастера',
      description: 'Наши специалисты прошли официальное обучение и сертификацию BMW. Они досконально знают особенности каждой модели и работают строго по регламентам завода-изготовителя.',
      imagePosition: 'right'
    },
    {
      id: 3,
      image: '/src/assets/images/servicing3.webp',
      title: 'Прозрачные цены и фотоотчёт',
      description: 'Перед началом работ вы получаете точную смету. В процессе — фотоотчёт с каждым этапом. Никаких скрытых платежей, только честный сервис и открытость.',
      imagePosition: 'left'
    }
  ];

  return (
    <div className="Servicing">
      <h2 className="servicing-title">
        Обслуживание BMW на уровне,<br />
        которому доверяют тысячи.
      </h2>
      
      <div className="servicing-content">
        {services.map(service => (
          <div 
            key={service.id} 
            className={`servicing-block ${service.imagePosition === 'right' ? 'reverse' : ''}`}
          >
            <div className="servicing-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="servicing-text">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
