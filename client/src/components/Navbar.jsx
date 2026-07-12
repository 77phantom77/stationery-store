import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">КАНЦМАГ</Link>
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/about" className="nav-link" onClick={closeMenu}>О нас</Link></li>
          <li><Link to="/contacts" className="nav-link" onClick={closeMenu}>Контакты</Link></li>
          <li><Link to="/catalog" className="nav-link" onClick={closeMenu}>Каталог</Link></li>
          <li><Link to="/articles" className="nav-link" onClick={closeMenu}>Полезные статьи</Link></li>
          <li><Link to="/promos" className="nav-link" onClick={closeMenu}>Акции</Link></li>
          <li><Link to="/reviews" className="nav-link" onClick={closeMenu}>Отзывы</Link></li>
          
          {user?.isAuthenticated && (
            <li>
              <Link to="/admin" className="nav-link admin-nav-badge" title="Админ-панель" onClick={closeMenu}>
                Админка
              </Link>
            </li>
          )}
          
          <li className="desktop-icons">
            <Link to="/login" className="nav-link nav-icon" title="Личный кабинет" onClick={closeMenu}>
              <FiUser />
            </Link>
          </li>
          <li className="desktop-icons">
            <Link to="/cart" className="nav-link nav-icon cart-icon-wrapper" title="Корзина" onClick={closeMenu}>
              <FiShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
        </ul>
        
        {/* Мобильные иконки профиля и корзины (всегда видимы) */}
        <div className="mobile-icons">
          <Link to="/login" className="nav-link nav-icon">
            <FiUser />
          </Link>
          <Link to="/cart" className="nav-link nav-icon cart-icon-wrapper">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
