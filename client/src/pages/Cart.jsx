import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useUser();
  const navigate = useNavigate();

  const handleCheckout = () => {
    placeOrder(cartItems, cartTotal);
    alert('Заказ успешно оформлен! Наш менеджер свяжется с вами.');
    clearCart();
    navigate('/profile');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Корзина</h1>
        </div>
        <div className="cart-empty">
          <p>Ваша корзина пока пуста.</p>
          <Link to="/catalog" className="btn btn-primary">Перейти в каталог</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <div className="page-header">
        <h1 className="page-title">Корзина</h1>
      </div>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item card">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-brand">{item.brand || 'КАНЦМАГ'}</p>
              </div>
              <div className="cart-item-controls">
                <button className="qty-btn" onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span className="qty-display">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
              <div className="cart-item-price">
                {item.price * item.quantity} ₽
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary card">
          <h2>Сумма заказа</h2>
          <div className="summary-row">
            <span>Товары ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
            <span>{cartTotal} ₽</span>
          </div>
          <div className="summary-row">
            <span>Скидка</span>
            <span>0 ₽</span>
          </div>
          <div className="summary-row total-row">
            <span>Итого</span>
            <span>{cartTotal} ₽</span>
          </div>
          <button className="btn btn-primary btn-full" onClick={handleCheckout}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
