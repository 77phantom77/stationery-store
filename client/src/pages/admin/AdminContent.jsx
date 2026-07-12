import React from 'react';
import { useAppContext } from '../../context/AppContext';

const AdminContent = () => {
  const { articles, updateArticle, deleteArticle, promos, updatePromo, deletePromo } = useAppContext();

  const handleToggleStatus = (type, item) => {
    const newStatus = item.status === 'published' ? 'archived' : 'published';
    if (type === 'article') {
      updateArticle(item._id, { status: newStatus });
    } else {
      updatePromo(item._id, { status: newStatus });
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Статьи и Акции</h1>
      
      <h2>Статьи</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(a => (
            <tr key={a._id} className={a.status === 'archived' ? 'archived-row' : ''}>
              <td>{a.title}</td>
              <td>{a.status === 'published' ? 'Опубликовано' : 'В архиве'}</td>
              <td>
                <button className="btn-small" onClick={() => handleToggleStatus('article', a)}>
                  {a.status === 'published' ? 'В архив' : 'Опубликовать'}
                </button>
                <button className="btn-small btn-danger" onClick={() => deleteArticle(a._id)}>Удал.</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{marginTop: '3rem'}}>Акции</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {promos.map(p => (
            <tr key={p._id} className={p.status === 'archived' ? 'archived-row' : ''}>
              <td>{p.title}</td>
              <td>{p.status === 'published' ? 'Опубликовано' : 'В архиве'}</td>
              <td>
                <button className="btn-small" onClick={() => handleToggleStatus('promo', p)}>
                  {p.status === 'published' ? 'В архив' : 'Опубликовать'}
                </button>
                <button className="btn-small btn-danger" onClick={() => deletePromo(p._id)}>Удал.</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContent;
