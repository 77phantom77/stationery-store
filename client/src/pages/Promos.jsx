import React from 'react';
import { useAppContext } from '../context/AppContext';

const Promos = () => {
  const { promos } = useAppContext();
  const publishedPromos = promos.filter(p => p.status === 'published');

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Текущие акции</h1>
      </div>

      <div className="promos-content">
        <div className="grid grid-cols-2">
          {publishedPromos.map(promo => (
            <div key={promo._id} className="card">
              <h3>{promo.title}</h3>
              <p>{promo.desc}</p>
            </div>
          ))}
        </div>
        
        <h2 className="promo-subheading">Постоянные предложения:</h2>
        <ul className="promo-list">
          <li>Бесплатная доставка при заказе от 5000 рублей.</li>
          <li>Скидка 10% для оптовых покупателей (при сумме заказа от 15 000 рублей).</li>
        </ul>
      </div>
    </div>
  );
};

export default Promos;
