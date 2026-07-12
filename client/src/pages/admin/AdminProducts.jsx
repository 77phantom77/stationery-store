import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const AdminProducts = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', category: '', image: '', packSize: '', density: '', color: ''
  });

  const handleEdit = (p) => {
    setIsEditing(true);
    setCurrentId(p._id);
    setFormData({
      name: p.name || '', brand: p.brand || '', price: p.price || '', category: p.category || '', 
      image: p.image || '', packSize: p.packSize || '', density: p.density || '', color: p.color || ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(currentId, formData);
    } else {
      addProduct(formData);
    }
    setFormData({name: '', brand: '', price: '', category: '', image: '', packSize: '', density: '', color: ''});
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="admin-page-title">Управление товарами</h1>
      
      <div className="admin-card">
        <h3>{isEditing ? 'Редактировать товар' : 'Добавить товар'}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input type="text" placeholder="Название" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input type="text" placeholder="Бренд" className="form-control" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
            <input type="number" placeholder="Цена" className="form-control" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <select className="form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
              <option value="">Выберите категорию</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="URL картинки (/images/...)" className="form-control" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
            
            <input type="text" placeholder="Кол-во в упаковке (напр. 500 шт)" className="form-control" value={formData.packSize} onChange={e => setFormData({...formData, packSize: e.target.value})} />
            <input type="text" placeholder="Плотность (для бумаги)" className="form-control" value={formData.density} onChange={e => setFormData({...formData, density: e.target.value})} />
            <input type="text" placeholder="Цвет чернил" className="form-control" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
          </div>
          <div className="admin-actions">
            <button type="submit" className="btn btn-primary">{isEditing ? 'Сохранить' : 'Добавить'}</button>
            {isEditing && <button type="button" className="btn" onClick={() => setIsEditing(false)}>Отмена</button>}
          </div>
        </form>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p._id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price} ₽</td>
              <td>
                <button className="btn-small" onClick={() => handleEdit(p)}>Ред.</button>
                <button className="btn-small btn-danger" onClick={() => deleteProduct(p._id)}>Удал.</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
