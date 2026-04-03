export default function Advantages() {
  const advantages = [
    {
      image: '/images/preim/preim1.webp',
      text: 'Честная диагностика, прозрачные цены, никаких скрытых услуг.'
    },
    {
      image: '/images/preim/preim2.webp',
      text: 'Всегда на связи, всегда готовы объяснить и пойти навстречу.'
    },
    {
      image: '/images/preim/preim3.webp',
      text: '14 лет стабильной работы одной и той же командой.'
    },
    {
      image: '/images/preim/preim4.webp',
      text: 'Уважение к каждому клиенту, даже в форс-мажорных ситуациях.'
    }
  ];

  return (
    <div className="Advantages">
      <div className="advantages-list">
        {advantages.map((advantage, index) => (
          <div key={index} className="advantage-item">
            <div className="advantage-image">
              <img src={advantage.image} alt={`Преимущество ${index + 1}`} />
            </div>
            <div className="advantage-text">
              <p>{advantage.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
