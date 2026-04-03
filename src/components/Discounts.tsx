import { useState } from 'react';
import { sendToTelegram } from '../utils/telegram';
import SuccessPopup from './SuccessPopup';

interface Discount {
  id: number;
  image: string;
  title: string;
  description: string;
}

const discounts: Discount[] = [
  {
    id: 1,
    image: '/images/discounts/banner1.webp',
    title: 'Чистка/Мойка впускного коллектора',
    description: 'Специальное предложение на чистку и мойку впускного коллектора. Улучшите работу двигателя и снизьте расход топлива.'
  },
  {
    id: 2,
    image: '/images/discounts/banner2.webp',
    title: 'Мойка радиаторов системы охлаждения',
    description: 'Профессиональная мойка радиаторов системы охлаждения. Предотвратите перегрев двигателя и продлите срок службы системы.'
  }
];

export default function Discounts() {
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await sendToTelegram({
      type: 'discount',
      data: {
        discount: selectedDiscount?.title || '',
        name: name,
        phone: phone
      },
      url: window.location.href
    });

    if (success) {
      setShowSuccessPopup(true);
      handleClose();
    } else {
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
    }
  };

  const handleClose = () => {
    setSelectedDiscount(null);
    setName('');
    setPhone('');
  };

  return (
    <>
      <div className="Discounts">
        <h2 className="discounts-title">Акции</h2>
        
        <div className="discounts-grid">
          {discounts.map(discount => (
            <div
              key={discount.id}
              className="discount-card"
              onClick={() => setSelectedDiscount(discount)}
            >
              <img src={discount.image} alt={discount.title} />
            </div>
          ))}
        </div>
      </div>

      {selectedDiscount && (
        <div className="discount-overlay" onClick={handleClose}>
          <div className="discount-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>×</button>
            
            <h3 className="modal-title">{selectedDiscount.title}</h3>
            <p className="modal-description">{selectedDiscount.description}</p>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                id="discount-name"
                name="name"
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, '');
                  setName(value);
                }}
                required
              />
              <input
                id="discount-phone"
                name="phone"
                type="tel"
                placeholder="Ваш телефон"
                value={phone}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d+]/g, '');
                  // Разрешаем + только в начале
                  if (value.includes('+')) {
                    const digits = value.replace(/\+/g, '');
                    value = '+' + digits.slice(0, 11);
                  } else {
                    value = value.slice(0, 11);
                  }
                  setPhone(value);
                }}
                maxLength={12}
                required
              />
              <button type="submit" className="btn-submit">
                Записаться
              </button>
            </form>
          </div>
        </div>
      )}

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </>
  );
}
