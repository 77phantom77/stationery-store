import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [promos, setPromos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState({});

  React.useEffect(() => {
    fetch('http://localhost:5000/api/categories').then(r => r.json()).then(setCategories);
    fetch('http://localhost:5000/api/products').then(r => r.json()).then(setProducts);
    fetch('http://localhost:5000/api/articles').then(r => r.json()).then(setArticles);
    fetch('http://localhost:5000/api/promos').then(r => r.json()).then(setPromos);
    fetch('http://localhost:5000/api/reviews').then(r => r.json()).then(setReviews);
    fetch('http://localhost:5000/api/settings').then(r => r.json()).then(data => setSettings(data || {}));
  }, []);

  // ======= ACTIONS =======
  const headers = { 'Content-Type': 'application/json' };

  // PRODUCTS
  const addProduct = async (p) => {
    const res = await fetch('http://localhost:5000/api/products', { method: 'POST', headers, body: JSON.stringify(p) });
    const doc = await res.json();
    setProducts([...products, doc]);
  };
  const updateProduct = async (id, data) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) });
    const doc = await res.json();
    setProducts(products.map(p => p._id === id ? doc : p));
  };
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p._id !== id));
  };

  // CATEGORIES
  const addCategory = async (name) => {
    const res = await fetch('http://localhost:5000/api/categories', { method: 'POST', headers, body: JSON.stringify({name}) });
    const catName = await res.json();
    setCategories([...categories, catName]);
  };
  const deleteCategory = async (name) => {
    await fetch(`http://localhost:5000/api/categories/${name}`, { method: 'DELETE' });
    setCategories(categories.filter(c => c !== name));
  };

  // ARTICLES
  const addArticle = async (a) => {
    const res = await fetch('http://localhost:5000/api/articles', { method: 'POST', headers, body: JSON.stringify(a) });
    const doc = await res.json();
    setArticles([...articles, doc]);
  };
  const updateArticle = async (id, data) => {
    const res = await fetch(`http://localhost:5000/api/articles/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) });
    const doc = await res.json();
    setArticles(articles.map(a => a._id === id ? doc : a));
  };
  const deleteArticle = async (id) => {
    await fetch(`http://localhost:5000/api/articles/${id}`, { method: 'DELETE' });
    setArticles(articles.filter(a => a._id !== id));
  };

  // PROMOS
  const addPromo = async (p) => {
    const res = await fetch('http://localhost:5000/api/promos', { method: 'POST', headers, body: JSON.stringify(p) });
    const doc = await res.json();
    setPromos([...promos, doc]);
  };
  const updatePromo = async (id, data) => {
    const res = await fetch(`http://localhost:5000/api/promos/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) });
    const doc = await res.json();
    setPromos(promos.map(p => p._id === id ? doc : p));
  };
  const deletePromo = async (id) => {
    await fetch(`http://localhost:5000/api/promos/${id}`, { method: 'DELETE' });
    setPromos(promos.filter(p => p._id !== id));
  };

  // REVIEWS
  const addReview = async (r) => {
    const res = await fetch('http://localhost:5000/api/reviews', { method: 'POST', headers, body: JSON.stringify({ ...r, status: 'approved' }) });
    const doc = await res.json();
    setReviews([doc, ...reviews]);
  };
  const approveReview = async (id) => {
    const res = await fetch(`http://localhost:5000/api/reviews/${id}`, { method: 'PUT', headers, body: JSON.stringify({ status: 'approved' }) });
    const doc = await res.json();
    setReviews(reviews.map(r => r._id === id ? doc : r));
  };
  const deleteReview = async (id) => {
    await fetch(`http://localhost:5000/api/reviews/${id}`, { method: 'DELETE' });
    setReviews(reviews.filter(r => r._id !== id));
  };

  // SETTINGS
  const updateSettings = async (newSettings) => {
    const res = await fetch('http://localhost:5000/api/settings', { method: 'PUT', headers, body: JSON.stringify(newSettings) });
    const doc = await res.json();
    setSettings(doc);
  };

  return (
    <AppContext.Provider value={{ 
      products, categories, articles, promos, reviews, settings,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory,
      addArticle, updateArticle, deleteArticle,
      addPromo, updatePromo, deletePromo,
      addReview, approveReview, deleteReview,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};
