import { Package, Wrench, Award, DollarSign, ShieldCheck, Calendar } from 'lucide-react';

export default function WhyUs() {
  const advantages = [
    {
      icon: Package,
      title: 'Запчасти',
      description: 'Только оригинальные BMW детали и сертифицированные аналоги.'
    },
    {
      icon: Wrench,
      title: 'Оборудование',
      description: 'Современное диагностическое оборудование и инструменты BMW.'
    },
    {
      icon: Award,
      title: 'Опыт',
      description: 'Наши мастера специализируются на BMW более 10 лет.'
    },
    {
      icon: DollarSign,
      title: 'Честная цена',
      description: 'Прозрачное ценообразование без скрытых платежей.'
    },
    {
      icon: ShieldCheck,
      title: 'Гарантия',
      description: 'Предоставляем гарантию на все виды работ и запчасти.'
    },
    {
      icon: Calendar,
      title: 'Быстрая запись',
      description: 'Онлайн-запись 24/7, удобное время обслуживания.'
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
          const Icon = advantage.icon;
          return (
            <div key={index} className="advantage-card">
              <div className="advantage-icon">
                <Icon size={40} strokeWidth={1.5} />
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
