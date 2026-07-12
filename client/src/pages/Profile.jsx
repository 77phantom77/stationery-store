import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { addToCart } = useCart();
  const { products } = useAppContext();
  const { user, orders, addresses, updateProfile, logoutUser, addAddress } = useUser();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('personal');
  
  // Локальное состояние формы редактирования
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || ''
  });

  // Синхронизация локального состояния если данные в контексте изменятся
  useEffect(() => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    });
  }, [user]);

  const handleRepeatOrder = (order) => {
    if (!order.items) return;

    let added = 0;
    order.items.split(', ').forEach((part) => {
      const match = part.match(/^(.+?) \((\d+)шт\)$/);
      if (!match) return;

      const name = match[1].trim();
      const quantity = parseInt(match[2], 10);
      const product = products.find((p) => p.name === name);

      if (product) {
        for (let i = 0; i < quantity; i++) {
          addToCart(product);
        }
        added += quantity;
      }
    });

    if (added > 0) {
      alert(`В корзину добавлено ${added} товар(ов) из заказа`);
    } else {
      alert('Не удалось найти товары из этого заказа в каталоге');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Ваши данные успешно сохранены!');
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const renderPersonal = () => (
    <div className="profile-section">
      <h2>Личные данные</h2>
      <form className="auth-form" onSubmit={handleSaveProfile}>
        <div className="form-group">
          <label>ФИО</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required
          />
        </div>
        <div className="form-group">
          <label>Телефон</label>
          <input 
            type="tel" 
            className="form-control" 
            value={formData.phone} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            required
          />
        </div>
        <div className="form-group">
          <label>Новый пароль (если хотите изменить)</label>
          <input type="password" className="form-control" placeholder="******" />
        </div>
        <button type="submit" className="btn btn-primary">Сохранить изменения</button>
      </form>
    </div>
  );

  const renderOrders = () => (
    <div className="profile-section">
      <h2>История заказов</h2>
      {orders.length === 0 ? (
        <p>У вас пока нет заказов.</p>
      ) : (
        <div className="orders-list">
          {orders.map(o => (
            <div key={o._id} className="order-card card">
              <div className="order-header">
                <span className="order-title">Заказ №{o._id.slice(-5)} от {o.date}</span>
                <span className={`order-status status-${o.status === 'Доставлен' ? 'done' : 'pending'}`}>
                  {o.status}
                </span>
              </div>
              <div className="order-body">
                <p><strong>Товары:</strong> {o.items}</p>
                <p><strong>Сумма:</strong> {o.total} ₽</p>
              </div>
              <div className="order-footer">
                <button className="btn" onClick={() => handleRepeatOrder(o)}>Повторить покупку</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="profile-section">
      <h2>Адреса доставки</h2>
      <div className="addresses-list">
        {addresses.map(a => (
          <div key={a.id} className="address-card card">
            <p>{a.address}</p>
            {a.isDefault && <span className="address-badge">Основной</span>}
          </div>
        ))}
        <button
          className="btn btn-primary btn-start"
          onClick={() => {
            const address = prompt('Введите адрес доставки:');
            if (address?.trim()) addAddress(address.trim());
          }}
        >
          + Добавить новый адрес
        </button>
      </div>
    </div>
  );

  return (
    <div className="container profile-page">
      <div className="page-header">
        <h1 className="page-title">Личный кабинет</h1>
        <p>Привет, {user.name}!</p>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <ul className="profile-nav">
            <li 
              className={activeTab === 'personal' ? 'active' : ''} 
              onClick={() => setActiveTab('personal')}
            >
              Личные данные
            </li>
            <li 
              className={activeTab === 'orders' ? 'active' : ''} 
              onClick={() => setActiveTab('orders')}
            >
              История заказов
            </li>
            <li 
              className={activeTab === 'addresses' ? 'active' : ''} 
              onClick={() => setActiveTab('addresses')}
            >
              Адреса доставки
            </li>
            <li className="logout-btn" onClick={handleLogout}>
              Выйти
            </li>
          </ul>
        </div>

        <div className="profile-content">
          {activeTab === 'personal' && renderPersonal()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'addresses' && renderAddresses()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
