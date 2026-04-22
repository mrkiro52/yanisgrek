import { Package, Wrench, Award, DollarSign, ShieldCheck, Calendar } from 'lucide-react';

export default function WhyUs() {
  const advantages = [
    {
      type: 'content',
      icon: Package,
      title: 'Запчасти и оборудование',
      description: 'Только оригинальные BMW детали и сертифицированные аналоги. Современное диагностическое оборудование.'
    },
    {
      type: 'placeholder',
      image: 'https://s3.regru.cloud/yanis-grek/auto-service/why1.png'
    },
    {
      type: 'content',
      icon: Award,
      title: 'Опыт и честная цена',
      description: 'Наши мастера специализируются на BMW более 10 лет. Прозрачное ценообразование без скрытых платежей.'
    },
    {
      type: 'placeholder',
      image: 'https://s3.regru.cloud/yanis-grek/auto-service/why2.png'
    },
    {
      type: 'content',
      icon: ShieldCheck,
      title: 'Гарантия и быстрая запись',
      description: 'Предоставляем гарантию на все виды работ и запчасти. Онлайн-запись 24/7, удобное время обслуживания.'
    },
    {
      type: 'placeholder',
      image: 'https://s3.regru.cloud/yanis-grek/auto-service/why3.png'
    }
  ];

  return (
    <div className="WhyUs">
      <h2 className="whyus-title">Почему стоит делать у нас?</h2>
      <p className="whyus-subtitle">
        Принимаем без долгих ожиданий, работаем быстро и аккуратно. Заботимся о вашем BMW на каждом этапе обслуживания.
      </p>
      
      <div className="advantages-grid">
        {advantages.map((advantage, index) => {
          if (advantage.type === 'placeholder') {
            return (
              <div key={index} className="advantage-card advantage-placeholder">
                <img 
                  src={(advantage as any).image} 
                  alt={`Преимущество ${index + 1}`}
                  className="placeholder-image" 
                  loading="lazy"
                />
              </div>
            );
          }
          
          const Icon = advantage.icon as any;
          return (
            <div key={index} className="advantage-card">
              <div className="advantage-icon">
                {Icon && <Icon size={40} strokeWidth={1.5} />}
              </div>
              <h3 className="advantage-title">{advantage.title}</h3>
              <p className="advantage-description">{advantage.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
