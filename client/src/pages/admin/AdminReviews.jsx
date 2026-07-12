import React from 'react';
import { useAppContext } from '../../context/AppContext';

const AdminReviews = () => {
  const { reviews, approveReview, deleteReview } = useAppContext();

  return (
    <div>
      <h1 className="admin-page-title">Модерация отзывов</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Автор</th>
            <th>Текст отзыва</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(r => (
            <tr key={r._id} className={r.status === 'pending' ? 'pending-row' : ''}>
              <td>{r.author}</td>
              <td>{r.text}</td>
              <td>{r.status === 'approved' ? 'Опубликован' : 'На модерации'}</td>
              <td>
                {r.status === 'pending' && (
                  <button className="btn-small" style={{backgroundColor: 'green', color: 'white'}} onClick={() => approveReview(r._id)}>
                    Одобрить
                  </button>
                )}
                <button className="btn-small btn-danger" onClick={() => deleteReview(r._id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;
