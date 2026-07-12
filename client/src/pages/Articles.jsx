import React from 'react';
import { useAppContext } from '../context/AppContext';

const Articles = () => {
  const { articles } = useAppContext();
  const publishedArticles = articles.filter(a => a.status === 'published');

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Полезные статьи</h1>
        <p className="page-subtitle">Советы по выбору канцтоваров, обзоры новинок и лайфхаки для офиса и учебы</p>
      </div>

      <div className="grid grid-cols-3 section-gap">
        {publishedArticles.map(article => (
          <div key={article._id} className="card">
            <img src={article.image} alt={article.title} className="article-image" />
            <h3>{article.title}</h3>
            <p className="article-desc">{article.desc}</p>
            <button className="btn btn-primary btn-start">Читать</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
