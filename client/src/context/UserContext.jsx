import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Состояние пользователя
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('stationery_user');
    return saved ? JSON.parse(saved) : {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      phone: '+7 999 123-45-67',
      isAuthenticated: false
    };
  });

  const [addresses, setAddresses] = useState([
    { id: 1, address: 'г. Москва, ул. Ленина, д. 10, кв. 42', isDefault: true },
    { id: 2, address: 'г. Москва, пр-кт Мира, д. 105, оф. 12', isDefault: false },
  ]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    localStorage.setItem('stationery_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders').then(r => r.json()).then(data => {
      // Server returns orders from oldest to newest (default Mongo), let's reverse them or keep as is.
      setOrders(data.reverse());
    });
  }, []);

  const updateProfile = (newData) => {
    setUser({ ...user, ...newData });
  };

  const loginUser = (data) => {
    setUser({ ...user, ...data, isAuthenticated: true });
  };

  const logoutUser = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  const addAddress = (newAddressStr) => {
    const newAddress = { id: Date.now(), address: newAddressStr, isDefault: false };
    setAddresses([...addresses, newAddress]);
  };

  const placeOrder = async (cartItems, total) => {
    const itemsNames = cartItems.map(item => `${item.name} (${item.quantity}шт)`).join(', ');
    const newOrder = {
      date: new Date().toLocaleDateString(),
      total: total,
      status: 'Принят в обработку',
      items: itemsNames
    };
    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
    const doc = await res.json();
    setOrders([doc, ...orders]);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const doc = await res.json();
    setOrders(orders.map(o => o._id === orderId ? doc : o));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      orders, 
      addresses, 
      updateProfile, 
      loginUser,
      logoutUser,
      addAddress,
      placeOrder,
      updateOrderStatus
    }}>
      {children}
    </UserContext.Provider>
  );
};
