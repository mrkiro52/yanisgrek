import { Image } from 'astro:assets';
import preim1 from '../assets/images/preim/preim1.webp';
import preim2 from '../assets/images/preim/preim2.webp';
import preim3 from '../assets/images/preim/preim3.webp';
import preim4 from '../assets/images/preim/preim4.webp';

export default function Advantages() {
  const advantages = [
    {
      image: preim1,
      text: 'Честная диагностика, прозрачные цены, никаких скрытых услуг.'
    },
    {
      image: preim2,
      text: 'Всегда на связи, всегда готовы объяснить и пойти навстречу.'
    },
    {
      image: preim3,
      text: '14 лет стабильной работы одной и той же командой.'
    },
    {
      image: preim4,
      text: 'Уважение к каждому клиенту, даже в форс-мажорных ситуациях.'
    }
  ];

  return (
    <div className="Advantages">
      <div className="advantages-list">
        {advantages.map((advantage, index) => (
          <div key={index} className="advantage-item">
            <div className="advantage-image">
              <img src={advantage.image.src} alt={`Преимущество ${index + 1}`} />
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
