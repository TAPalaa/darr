import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './common.css';

const BookItem = ({ image, title, author, price, discount, originalPrice, id = 1, category }) => {
  const bookRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
              
              // Add 3D hover effect after animation
              const handleMouseMove = (e) => {
                const { left, top, width, height } = entry.target.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                entry.target.style.transform = `
                  perspective(1000px)
                  rotateY(${x * 10}deg)
                  rotateX(${y * -10}deg)
                  translateZ(40px) rotateX(10deg) rotateY(-5deg)
                `;
              };
              
              const handleMouseLeave = () => {
                entry.target.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
              };
              
              entry.target.addEventListener('mousemove', handleMouseMove);
              entry.target.addEventListener('mouseleave', handleMouseLeave);
            }, Math.random() * 400);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bookRef.current) {
      observer.observe(bookRef.current);
    }

    return () => {
      if (bookRef.current) {
        observer.unobserve(bookRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={bookRef} 
      className="framer-1d4gbhw book-item" 
      style={{ 
        opacity: '0', 
        transform: 'translateY(40px) rotateX(10deg) rotateY(-5deg)', 
        transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
    >
      {/* Book Image with NavLink */}
      <NavLink to={`/book/${id}`} className="framer-1v72701 book-image">
        <img src={image} alt={title} />
      </NavLink>
      
      {/* Book Title with NavLink */}
      <NavLink to={`/book/${id}`} className="framer-wpbw1t book-title" style={{ textDecoration: 'none' }}>
        <h2 className="framer-text" lang="ar">{title}</h2>
      </NavLink>
      
      {/* Author Name */}
      <div className="framer-e9qrh4 author-name">
        <p className="framer-text" lang="ar">{author}</p>
      </div>
      
      {/* Separator Line */}
      <div className="framer-9qbqab separator-line">
        <div className="svgContainer">
          <svg viewBox="0 0 107 4" preserveAspectRatio="none">
            <line x1="0.00476169" y1="0.500023" x2="105.005" y2="1.50002" stroke="black"></line>
          </svg>
        </div>
      </div>
      
      {/* Price Information */}
      <div className="price-container">
        <div className="framer-1yph79f book-price">
          <p className="framer-text">{price}</p>
        </div>
        {discount && (
          <div className="framer-1dzdger discount-percentage">
            <p className="framer-text">{discount}</p>
          </div>
        )}
      </div>
      
      {originalPrice && (
        <div className="framer-1jx8gd4 discounted-price">
          <p className="framer-text">{originalPrice}</p>
        </div>
      )}
      
      {/* Buy Button */}
      <NavLink to={`/book/${id}`} className="framer-djq6w3 buy-button" style={{ textDecoration: 'none' }}>
        <div className="framer-1qr9prv">
          <p className="framer-text" lang="ar">شراء</p>
        </div>
      </NavLink>
    </div>
  );
};

export default BookItem;