import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ name, email });
    alert('Регистрация прошла успешно!');
    navigate('/profile');
  };

  return (
    <div className="auth-container container">
      <div className="auth-card card">
        <h1 className="page-title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>ФИО</label>
            <input 
              type="text" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email или Телефон</label>
            <input 
              type="text" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Создать аккаунт</button>
        </form>

        <div className="auth-divider">
          <span>Или</span>
        </div>

        <button className="btn btn-full" onClick={() => {
          loginUser({ email: 'social_user@example.com', name: 'Пользователь из Соцсети' });
          alert('Вы успешно зарегистрировались через соцсети!');
          navigate('/profile');
        }}>
          Зарегистрироваться через соцсети
        </button>

        <p className="auth-footer">
          Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
