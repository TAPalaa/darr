import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BookList from '../components/BookList';
import logoImage from '../img/logo-(2)-2.png';

import '../components/common.css';
import '../components/NavStyles.css';

const PublicationsPage = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // محاكاة جلب البيانات من API
  useEffect(() => {
    // في التطبيق الحقيقي، هنا ستقوم بطلب API
    setTimeout(() => {
      setFeaturedBooks([1, 2, 3, 4, 5]); // أرقام وهمية للكتب
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="au-page-container">
      {/* del Content */}
      {/* Main Content */}
      <div id="main" className="main-content">
        <div className="framer-hlvio framer-72rtr7">
          <div className="framer-a6ydxj" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Page Header */}
            <div className="framer-1a032it featured-publications">
              <h1 className="framer-text" lang="ar"> الكتب الاكثر مبيعا</h1>
            </div>
            
            {/* Page Description */}


            {/* Featured Section */}
            <div className="featured-section" style={{ marginBottom: '60px' }}>
              <h2 lang="ar" style={{ 
                fontSize: '1.8rem', 
                color: 'var(--primary-color)', 
                marginBottom: '30px',
                textAlign: 'center',
                position: 'relative'
              }}>أحدث الإصدارات</h2>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p>جاري تحميل الكتب...</p>
                </div>
              ) : (
                <BookList />
              )}
            </div>

            {/* Special Collections */}
            <div className="special-collections" style={{ marginBottom: '60px' }}>
              <h2 lang="ar" style={{ 
                fontSize: '1.8rem', 
                color: 'var(--primary-color)', 
                marginBottom: '30px',
                textAlign: 'center',
                position: 'relative'
              }}>مجموعات خاصة</h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '30px',
                marginTop: '40px'
              }}>
                <div className="collection-card" style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-elegant)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  padding: '30px 20px'
                }}>
                  <h3 lang="ar" style={{ fontSize: '1.4rem', marginBottom: '15px', color: 'var(--primary-color)' }}>
                    الأدب العربي المعاصر
                  </h3>
                  <p lang="ar" style={{ marginBottom: '20px', color: 'var(--text-medium)' }}>
                    مجموعة مختارة من أفضل الأعمال الأدبية العربية المعاصرة
                  </p>
                  <NavLink to="/category/novels" className="view-more" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: 'var(--border-radius-sm)',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}>
                    <span lang="ar">عرض المجموعة</span>
                  </NavLink>
                </div>
                
                <div className="collection-card" style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-elegant)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  padding: '30px 20px'
                }}>
                  <h3 lang="ar" style={{ fontSize: '1.4rem', marginBottom: '15px', color: 'var(--primary-color)' }}>
                    التراث الإسلامي
                  </h3>
                  <p lang="ar" style={{ marginBottom: '20px', color: 'var(--text-medium)' }}>
                    كتب قيمة في التراث الإسلامي والفكر الديني
                  </p>
                  <NavLink to="/category/islamic" className="view-more" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: 'var(--border-radius-sm)',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}>
                    <span lang="ar">عرض المجموعة</span>
                  </NavLink>
                </div>
                
                <div className="collection-card" style={{
                  background: 'var(--bg-light)',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-elegant)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  padding: '30px 20px'
                }}>
                  <h3 lang="ar" style={{ fontSize: '1.4rem', marginBottom: '15px', color: 'var(--primary-color)' }}>
                    كتب اللغة والأدب
                  </h3>
                  <p lang="ar" style={{ marginBottom: '20px', color: 'var(--text-medium)' }}>
                    مراجع وكتب متخصصة في اللغة العربية وآدابها
                  </p>
                  <NavLink to="/category/arabic" className="view-more" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: 'var(--border-radius-sm)',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}>
                    <span lang="ar">عرض المجموعة</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SVG Definitions */}
      
      
{/* footer*/}
    </div>
  );
};

export default PublicationsPage;