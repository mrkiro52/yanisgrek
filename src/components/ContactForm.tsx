import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { sendToTelegram } from '../utils/telegram';
import SuccessPopup from './SuccessPopup';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vin: '',
    datetime: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    datetime: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, '');
    setFormData({ ...formData, name: value });
    setErrors({ ...errors, name: '' });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, '');
    
    if (value.startsWith('+')) {
      if (value.length > 12) value = value.slice(0, 12);
    } else {
      if (value.length > 11) value = value.slice(0, 11);
    }
    
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: '',
      phone: '',
      datetime: ''
    };

    if (!formData.name) {
      newErrors.name = 'Введите имя';
    }

    if (!formData.phone) {
      newErrors.phone = 'Введите телефон';
    } else {
      const phoneLength = formData.phone.startsWith('+') ? 12 : 11;
      if (formData.phone.length !== phoneLength) {
        newErrors.phone = 'Неверный формат телефона';
      }
    }

    if (!formData.datetime) {
      newErrors.datetime = 'Выберите дату и время';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.phone && !newErrors.datetime) {
      const datetime = new Date(formData.datetime);
      const formattedDateTime = datetime.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const success = await sendToTelegram({
        type: 'contact-form',
        data: {
          name: formData.name,
          phone: formData.phone,
          vin: formData.vin || 'Не указан',
          datetime: formattedDateTime
        },
        url: window.location.href
      });

      if (success) {
        setShowSuccessPopup(true);
        setFormData({ name: '', phone: '', vin: '', datetime: '' });
      } else {
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
      }
    }
  };

  return (
    <div 
      className="ContactForm"
      style={{
        backgroundImage: `url('/images/formbg.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="contact-content">
        <div className="contact-left">
          <h2 className="contact-title">
            Оставьте заявку,<br />выбрав день и время
          </h2>

          <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label" htmlFor="contact-name">Ваше имя</label>
            <div className="form-input-wrapper">
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={handleNameChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="contact-phone">Ваш телефон</label>
            <div className="form-input-wrapper">
              <input
                id="contact-phone"
                name="phone"
                type="text"
                autoComplete="tel"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="+7 XXX XXX XX XX"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="contact-vin">Ваш VIN-номер*</label>
            <div className="form-input-wrapper">
              <input
                id="contact-vin"
                name="vin"
                type="text"
                autoComplete="off"
                className="form-input"
                placeholder="Необязательное поле"
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                maxLength={17}
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="contact-datetime">Дата и время</label>
            <div className="form-input-wrapper datetime-wrapper">
              <input
                id="contact-datetime"
                name="datetime"
                type="datetime-local"
                autoComplete="off"
                className={`form-input ${errors.datetime ? 'error' : ''}`}
                value={formData.datetime}
                onChange={(e) => {
                  setFormData({ ...formData, datetime: e.target.value });
                  setErrors({ ...errors, datetime: '' });
                }}
              />
              <Calendar className="calendar-icon" size={20} />
            </div>
          </div>

          <button type="submit" className="form-submit">
            Записаться
          </button>
        </form>

        <div className="contact-info">
          <div className="info-card">
            <h3>Адрес</h3>
            <p>г. Москва</p>
            <p>Высоковольтный проезд, д. 1, стр. 29</p>
          </div>

          <div className="info-card">
            <h3>Режим работы</h3>
            <p>Пн–Пт: 10:00–20:00</p>
            <p>Сб: 11:00–20:00</p>
            <p>Вс: 11:00–18:00</p>
          </div>

          <div className="info-card">
            <h3>Телефоны</h3>
            <p>+7 495 76 76 500</p>
            <p>Запишитесь по телефону</p>
          </div>
        </div>
        </div>
      </div>

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </div>
  );
}
