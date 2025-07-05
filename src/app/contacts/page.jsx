"use client";
import "./contacts.scss";
import Header from '../../components/Header/Header';
import { forwardRef } from 'react';

const Contacts = forwardRef((props, ref) => (
  <div className="Contacts" ref={ref}>
    <Header/>
    <img src="/images/contacts_green_car.jpg" alt="bg" className="bg-image" />
    <div className="right-blur-overlay"></div>
    <div className="ContactFormSection">
      <h2>
        Запишитесь на диагностику, <br />
        Выбрав день и время
      </h2>

      <form className="form">
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Иванов Иван"
          />
        </div>

        <div className="form-row">
          <label htmlFor="phone" className="form-label">
            Ваш телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="+7 (9xx) xxx xx xx"
          />
        </div>

        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Ваша почта
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="yanis_grek@gmail.com"
          />
        </div>

        <div className="form-row">
          <label htmlFor="date" className="form-label-1">
            Дата
          </label>
          <div className="form-datetime">
            <input type="date" id="date" name="date" className="form-input" />
            <input type="time" id="time" name="time" className="form-input" />
          </div>
        </div>

        <button type="submit" className="form-button">
          Записаться
        </button>
      </form>

      {/* Контактная информация */}
      <div className="contacts-info">
        <div className="contacts-info-block">
          <h2 className="title-contacts-info">Адрес</h2>
          <p>
            г.Москва <br />
            Высоковольтный проезд, дом 1 стр. 29
          </p>
        </div>
        <div className="contacts-info-block">
          <h2 className="title-contacts-info">Режим работы:</h2>
          <p>
            пн.- пт. с 10:00 до 20:00 <br />
            сб. с 11:00 до 20:00 <br />
            вс. с 11:00 до 18:00 <br />
          </p>
        </div>
        <div className="contacts-info-block">
          <h2 className="title-contacts-info">Телефоны:</h2>
          <p>+7 (495) 76-76-500</p>
        </div>
      </div>
    </div>
  </div>
));

export default Contacts;