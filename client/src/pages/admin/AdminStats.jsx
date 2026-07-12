import React from 'react';
import { useUser } from '../../context/UserContext';
import { useAppContext } from '../../context/AppContext';

const AdminStats = () => {
  const { orders } = useUser();
  const { products, reviews } = useAppContext();

  const totalRevenue = orders.reduce((acc, order) => {
    return order.status !== 'Отменен' ? acc + order.total : acc;
  }, 0);

  const completedOrders = orders.filter(o => o.status === 'Доставлен').length;

  return (
    <div>
      <h1 className="admin-page-title">Статистика продаж</h1>
      
      <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
        <div className="admin-stat-card">
          <h3>Выручка</h3>
          <p className="stat-number">{totalRevenue} ₽</p>
        </div>
        <div className="admin-stat-card">
          <h3>Всего заказов</h3>
          <p className="stat-number">{orders.length}</p>
        </div>
        <div className="admin-stat-card">
          <h3>Успешных заказов</h3>
          <p className="stat-number">{completedOrders}</p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="admin-card">
          <h3>Товары в базе</h3>
          <p style={{fontSize: '3rem', fontWeight: 'bold'}}>{products.length}</p>
        </div>
        <div className="admin-card">
          <h3>Отзывы (Одобренные)</h3>
          <p style={{fontSize: '3rem', fontWeight: 'bold'}}>
            {reviews.filter(r => r.status === 'approved').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
