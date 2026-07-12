import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const AdminSettings = () => {
  const { settings, updateSettings } = useAppContext();
  const [formData, setFormData] = useState({
    phone: settings.phone || '',
    email: settings.email || '',
    address: settings.address || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Настройки успешно обновлены! (включая виджет звонка на сайте)');
  };

  return (
    <div>
      <h1 className="admin-page-title">Настройки контактов</h1>
      
      <div className="admin-card" style={{ maxWidth: '600px' }}>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Телефон для связи и виджета "Позвонить"</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Email магазина</label>
            <input 
              type="email" 
              className="form-control" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Адрес магазина</label>
            <textarea 
              className="form-control" 
              rows="3"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Сохранить настройки</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
