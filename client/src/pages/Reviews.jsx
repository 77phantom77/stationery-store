import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Reviews = () => {
  const { reviews, addReview } = useAppContext();
  const publishedReviews = reviews.filter(r => r.status === 'approved');

  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReviewText.trim() && newReviewAuthor.trim()) {
      addReview({
        text: newReviewText,
        author: newReviewAuthor
      });
      setNewReviewText('');
      setNewReviewAuthor('');
      alert('Ваш отзыв успешно добавлен!');
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Отзывы</h1>
        <p className="page-subtitle">Что говорят о нас наши клиенты</p>
      </div>

      <div className="grid grid-cols-3 section-gap">
        {publishedReviews.map(review => (
          <div key={review._id} className="card">
            <p className="review-text">"{review.text}"</p>
            <h4 className="review-author">— {review.author}</h4>
          </div>
        ))}
      </div>

      <div className="add-review-section">
        <h2 className="page-title">Оставить отзыв</h2>
        <form className="auth-form add-review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ваше имя</label>
            <input 
              type="text" 
              className="form-control" 
              value={newReviewAuthor}
              onChange={(e) => setNewReviewAuthor(e.target.value)}
              required
              placeholder="Как к вам обращаться?"
            />
          </div>
          <div className="form-group">
            <label>Ваш отзыв</label>
            <textarea 
              className="form-control" 
              rows="5" 
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              required
              placeholder="Напишите пару слов о нашем магазине..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-start">Опубликовать отзыв</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
