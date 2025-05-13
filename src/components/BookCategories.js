import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookCategories.css';
import { homeApi } from '../services/api';

const BookCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await homeApi.getCategories();
        if (response.success) {
          setCategories(response.data);
        } else {
          setError('No se pudieron cargar las categorías');
        }
      } catch (err) {
        console.error('Error al cargar las categorías:', err);
        setError('Error al cargar las categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-header">
            <h2>تصفح الكتب حسب التصنيف</h2>
            <p>اكتشف مجموعة متنوعة من الكتب في مختلف المجالات</p>
          </div>
          <div style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>جاري تحميل التصنيفات...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-header">
            <h2>تصفح الكتب حسب التصنيف</h2>
            <p>اكتشف مجموعة متنوعة من الكتب في مختلف المجالات</p>
          </div>
          <div style={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <h2>تصفح الكتب حسب التصنيف</h2>
          <p>اكتشف مجموعة متنوعة من الكتب في مختلف المجالات</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} className="category-card" key={category.id}>
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay" style={{ backgroundColor: category.color + '20' }}></div>
              </div>
              
              <div className="category-content">
                <div className="category-icon" style={{ backgroundColor: category.color + '20', color: category.color }}>
                  <span>{category.icon}</span>
                </div>
                
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                
                <div className="category-footer">
                  <span className="category-count">{category.count} كتاب</span>
                  <span className="category-link">تصفح الكتب</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="categories-cta">
          <Link to="/publications" className="view-all-btn">
            عرض جميع التصنيفات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookCategories;