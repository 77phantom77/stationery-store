import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAppContext } from '../context/AppContext';

const Catalog = () => {
  const { addToCart } = useCart();
  const { products, categories } = useAppContext();

  const [activeCategory, setActiveCategory] = useState('Все');

  const filteredProducts = activeCategory === 'Все'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="catalog-wrapper container">
      <h1 className="page-title">Каталог</h1>

      <div className="catalog-layout">

        {/* Боковая панель фильтров */}
        <div className="catalog-sidebar">
          <h3 className="catalog-sidebar-title">Категории</h3>
          <ul className="catalog-filter-list">
            {categories.map(cat => (
              <li
                key={cat}
                className={`catalog-filter-item${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Сетка товаров */}
        <div className="catalog-products grid grid-cols-3">
          {filteredProducts.map(p => (
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

      </div>
    </div>
  );
};

export default Catalog;
