import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const AdminCategories = () => {
  const { categories, addCategory, deleteCategory } = useAppContext();
  const [newCat, setNewCat] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newCat.trim()) {
      addCategory(newCat);
      setNewCat('');
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Управление категориями</h1>
      
      <div className="admin-card" style={{ maxWidth: '500px', marginBottom: '2rem' }}>
        <h3>Добавить категорию</h3>
        <form className="admin-form" onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" className="form-control" value={newCat} onChange={e => setNewCat(e.target.value)} required />
          <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
      </div>

      <ul className="admin-list" style={{ maxWidth: '500px' }}>
        {categories.map(c => (
          <li key={c} className="admin-list-item">
            <span>{c}</span>
            <button className="btn-small btn-danger" onClick={() => deleteCategory(c)}>Удал.</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategories;
