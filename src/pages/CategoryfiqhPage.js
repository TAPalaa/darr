import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BookList from '../components/BookList';
import logoImage from '../img/logo-(2)-2.png';

import '../components/common.css';
import '../components/NavStyles.css';

const CategoryfiqhPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // محاكاة جلب البيانات من API
  useEffect(() => {
    // في التطبيق الحقيقي، هنا ستقوم بطلب API
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  
  // دالة معالجة البحث
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // يمكنك تغيير '/search' إلى المسار الذي تريد التوجيه إليه
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setSearchQuery('');
    }
  };

  return (
    <div className="au-page-container">
      {/* del Content */}
      <div id="main" className="main-content">
        <div className="framer-hlvio framer-72rtr7">
          <div className="framer-a6ydxj" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
    {/* الفقه */}

    <div className="framer-1a032it featured-publications">
      <h1 className="framer-text" lang="ar">الفقه</h1>
    </div>
    <div className="page-description" style={{ textAlign: 'center', marginBottom: '40px' }}>
      <p lang="ar" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-medium)' }}>
        كتب تعليم الفقه وقواعدها وآدابها للطلاب والمهتمين
      </p>
    </div>

            {/* Category Banner */}
            <div className="category-banner" style={{ 
              marginBottom: '50px',
              position: 'relative',
              borderRadius: 'var(--border-radius-md)',
              overflow: 'hidden',
              height: '250px'
            }}>
              <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
                opacity: 0.9
              }}></div>
              <div style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                width: '100%',
                padding: '0 20px',
                color: 'white'
              }}>
                <h2 lang="ar" style={{ 
                  fontSize: '2.5rem',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>الفقه</h2>
                <p lang="ar" style={{ 
                  fontSize: '1.2rem',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  الفقه من احد العلوم الدينية
                </p>
              </div>
            </div>

            {/* Books Section */}
            <div className="books-section" style={{ marginBottom: '60px' }}>
              <h2 lang="ar" style={{ 
                fontSize: '1.8rem', 
                color: 'var(--primary-color)', 
                marginBottom: '30px',
                textAlign: 'center',
                position: 'relative'
              }}>كتب الفقه</h2>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p>جاري تحميل الكتب...</p>
                </div>
              ) : (
                <BookList />
              )}
            </div>


          </div>
        </div>
      </div>
      
      {/* SVG Definitions */}
      
      
{/* footer*/}
    </div>
  );
};

export default CategoryfiqhPage;
