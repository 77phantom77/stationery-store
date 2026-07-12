import React from 'react';
import { useAppContext } from '../context/AppContext';

const Contacts = () => {
  const { settings } = useAppContext();

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Контакты</h1>
        <p className="page-subtitle">
          Мы всегда рады помочь вам с выбором или ответить на вопросы.
        </p>
      </div>

      <div className="contacts-grid section-gap">
        <div className="contacts-info card">
          <h2>Наш адрес</h2>
          <p>{settings.address}</p>

          <h2 style={{ marginTop: '2rem' }}>Телефон</h2>
          <p><strong>{settings.phone}</strong></p>
          <p>Пн-Пт: с 9:00 до 20:00<br />Сб-Вс: с 10:00 до 18:00</p>

          <h2 style={{ marginTop: '2rem' }}>Email</h2>
          <p><strong>{settings.email}</strong></p>
        </div>

        <div className="contacts-map-container">
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A9c8a14b62dbb63d6b1d46e3d234a66e4e5cf4291811804f8664147743d9be5b9&amp;source=constructor" 
            width="100%" 
            height="400" 
            frameBorder="0"
            title="Карта проезда"
            className="contacts-map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
