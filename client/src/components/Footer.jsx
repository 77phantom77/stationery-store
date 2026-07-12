import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const { settings } = useAppContext();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h4>О магазине</h4>
          <p>КАНЦМАГ — ваш надежный партнер в мире канцелярских товаров. Мы предлагаем качественную продукцию для офиса, школы и творчества.</p>
        </div>
        <div className="footer-section">
          <h4>Навигация</h4>
          <ul className="footer-nav">
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/promos">Акции</Link></li>
            <li><Link to="/articles">Статьи</Link></li>
            <li><Link to="/reviews">Отзывы</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>{settings.address}</p>
          <p className="footer-gap">Телефон: {settings.phone}</p>
          <p>Email: {settings.email}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} КАНЦМАГ. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
