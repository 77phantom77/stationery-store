import React from 'react';
import { useUser } from '../../context/UserContext';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useUser();

  const handleStatusChange = (id, e) => {
    updateOrderStatus(id, e.target.value);
  };

  return (
    <div>
      <h1 className="admin-page-title">Управление заказами</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>№ Заказа</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Товары</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id.slice(-5)}</td>
              <td>{o.date}</td>
              <td>{o.total} ₽</td>
              <td>{o.items}</td>
              <td>
                <select className="form-control" value={o.status} onChange={(e) => handleStatusChange(o._id, e)}>
                  <option value="Принят в обработку">Принят в обработку</option>
                  <option value="Передан в службу доставки">Передан в службу доставки</option>
                  <option value="Доставлен">Доставлен</option>
                  <option value="Отменен">Отменен</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
