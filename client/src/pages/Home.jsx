import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { addToCart } = useCart();
  const { products, reviews } = useAppContext();
  
  const popularProducts = products.slice(0, 3);

  return (
    <div className="home-page">

      {/* Главный баннер */}
      <section className="hero container">
        <h1 className="page-title">Всё для учебы и офиса</h1>
        <p className="page-subtitle">
          Широкий ассортимент качественных канцелярских товаров по выгодным ценам.
          От одной ручки до комплексного оснащения целого офиса.
        </p>
        <Link to="/catalog" className="btn btn-primary btn-large">Перейти в каталог</Link>
      </section>

      {/* Популярные товары */}
      <section className="container home-section">
        <h2 className="page-title">Популярные товары</h2>
        <div className="grid grid-cols-3">
          {popularProducts.map(p => (
            <div key={p._id} className="card">
              <div className="product-image-wrapper">
                <img src={p.image} alt={p.name} className="product-image" />
              </div>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-brand">{p.brand}</p>
              <div className="product-footer">
                <span className="product-price">{p.price} ₽</span>
                <button className="btn" onClick={() => addToCart(p)}>Купить</button>
              </div>
            </div>
          ))}
        </div>
        <div className="home-link-center">
          <Link to="/catalog" className="btn">Смотреть все товары</Link>
        </div>
      </section>

      {/* Спецпредложение с картинкой */}
      <section className="promo-banner">
        <div className="container grid promo-banner-grid">
          <div>
            <img src="/images/1521202051 (9).jpg" alt="Акция" className="promo-banner-image" />
          </div>
          <div className="promo-banner-text">
            <h2 className="page-title text-left">«Товар дня»</h2>
            <p className="promo-banner-desc">
              Каждый день мы выбираем один или несколько товаров со скидкой до 50%.
              Следите за обновлением на сайте и экономьте вместе с нами!
            </p>
            <Link to="/promos" className="btn">Все акции</Link>
          </div>
        </div>
      </section>

      {/* Отзывы на главной */}
      <section className="container home-section">
        <h2 className="page-title">Отзывы клиентов</h2>
        <div className="grid grid-cols-3">
          {reviews.filter(r => r.status === 'approved').slice(0, 3).map(review => (
            <div key={review._id} className="card">
              <p className="review-text">"{review.text}"</p>
              <h4 className="review-author">— {review.author}</h4>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
