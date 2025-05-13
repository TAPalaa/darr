import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookOfTheWeek.css';
import { homeApi } from '../services/api';

const BookOfTheWeek = () => {
  const [featuredBook, setFeaturedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 18,
    minutes: 45
  });

  // Cargar el libro de la semana
  useEffect(() => {
    const fetchBookOfTheWeek = async () => {
      try {
        setLoading(true);
        const response = await homeApi.getBookOfTheWeek();
        if (response.success) {
          setFeaturedBook(response.data);
        } else {
          setError('No se pudo cargar el libro de la semana');
        }
      } catch (err) {
        console.error('Error al cargar el libro de la semana:', err);
        setError('Error al cargar el libro de la semana');
      } finally {
        setLoading(false);
      }
    };

    fetchBookOfTheWeek();
  }, []);

  // Actualizar el contador cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        let { days, hours, minutes } = prevCountdown;
        
        minutes -= 1;
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
          if (hours < 0) {
            hours = 23;
            days -= 1;
            if (days < 0) {
              // El contador ha terminado
              clearInterval(timer);
              return { days: 0, hours: 0, minutes: 0 };
            }
          }
        }
        
        return { days, hours, minutes };
      });
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(timer);
  }, []);

  // Formatear el tiempo con ceros a la izquierda
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  if (loading) {
    return (
      <section className="book-of-week-section">
        <div className="book-of-week-container">
          <div className="book-of-week-badge">
            <span>كتاب الأسبوع</span>
          </div>
          <div className="book-of-week-content" style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>جاري تحميل كتاب الأسبوع...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !featuredBook) {
    return (
      <section className="book-of-week-section">
        <div className="book-of-week-container">
          <div className="book-of-week-badge">
            <span>كتاب الأسبوع</span>
          </div>
          <div className="book-of-week-content" style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>{error || 'لا يوجد كتاب للعرض حالياً'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="book-of-week-section">
      <div className="book-of-week-container">
        <div className="book-of-week-badge">
          <span>كتاب الأسبوع</span>
        </div>
        
        <div className="book-of-week-content">
          <div className="book-of-week-image">
            <div className="image-container">
              <img src={featuredBook.image} alt={featuredBook.title} />
              <div className="image-overlay"></div>
            </div>
            <div className="book-discount-badge">
              <span>خصم {featuredBook.discount}%</span>
            </div>
          </div>
          
          <div className="book-of-week-details">
            <h2>{featuredBook.title}</h2>
            <p className="book-author">{featuredBook.author}</p>
            
            <div className="book-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(featuredBook.rating) ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <span className="rating-value">{featuredBook.rating}</span>
              <span className="review-count">({featuredBook.reviewCount} تقييم)</span>
            </div>
            
            <p className="book-description">{featuredBook.description}</p>
            
            <div className="book-meta">
              <div className="meta-item">
                <span className="meta-label">عدد الصفحات:</span>
                <span className="meta-value">{featuredBook.pages}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">تاريخ النشر:</span>
                <span className="meta-value">{formatDate(featuredBook.publishDate)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">التصنيف:</span>
                <span className="meta-value">{featuredBook.category}</span>
              </div>
            </div>
            
            <div className="book-price-section">
              <div className="price-container">
                <span className="current-price">{featuredBook.discountedPrice} ر.س</span>
                {featuredBook.discount > 0 && (
                  <span className="original-price">{featuredBook.price} ر.س</span>
                )}
              </div>
              
              <div className="book-actions">
                <Link to={`/book/${featuredBook.id}`} className="view-details-btn">
                  عرض التفاصيل
                </Link>
                <button className="add-to-cart-btn">
                  <span className="cart-icon">🛒</span>
                  <span>أضف إلى السلة</span>
                </button>
              </div>
            </div>
            
            <div className="countdown-timer">
              <p>ينتهي العرض خلال:</p>
              <div className="timer-units">
                <div className="timer-unit">
                  <span className="time-value">{formatTime(countdown.days)}</span>
                  <span className="time-label">يوم</span>
                </div>
                <div className="timer-unit">
                  <span className="time-value">{formatTime(countdown.hours)}</span>
                  <span className="time-label">ساعة</span>
                </div>
                <div className="timer-unit">
                  <span className="time-value">{formatTime(countdown.minutes)}</span>
                  <span className="time-label">دقيقة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOfTheWeek;