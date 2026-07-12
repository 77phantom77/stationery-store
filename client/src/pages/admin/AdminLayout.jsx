import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const AdminLayout = () => {
  const location = useLocation();
  const { user } = useUser();

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { path: '/admin', label: 'Товары' },
    { path: '/admin/categories', label: 'Категории' },
    { path: '/admin/orders', label: 'Заказы' },
    { path: '/admin/content', label: 'Статьи и Акции' },
    { path: '/admin/reviews', label: 'Отзывы' },
    { path: '/admin/settings', label: 'Настройки' },
    { path: '/admin/stats', label: 'Статистика' },
  ];

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2 className="admin-brand">АДМИН-ПАНЕЛЬ</h2>
        <ul className="admin-nav">
          {navItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`admin-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li><Link to="/" className="admin-nav-link" style={{color: 'red', marginTop: '2rem'}}>Вернуться на сайт</Link></li>
        </ul>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
