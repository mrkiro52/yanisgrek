'use client';
import './BtnGoCalc.scss';

export default function BtnGoCalc() {
  const scrollToCalculator = () => {
    if (typeof window !== 'undefined') {
      const target = document.getElementById('Calculator');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button className="calculate_cost" onClick={scrollToCalculator}>
      Рассчитать стоимость
    </button>
  );
}
