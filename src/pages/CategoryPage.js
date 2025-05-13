import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookList from '../components/BookList';
import logoImage from '../img/logo-(2)-2.png';
import { categoryApi } from '../services/api';

import '../components/common.css';
import '../components/NavStyles.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar detalles de la categoría
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        setLoading(true);
        const response = await categoryApi.getCategoryDetails(categoryId);
        if (response.success) {
          setCategoryDetails(response.data);
        } else {
          setError('No se pudieron cargar los detalles de la categoría');
        }
      } catch (err) {
        console.error('Error al cargar los detalles de la categoría:', err);
        setError('Error al cargar los detalles de la categoría');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);
  
  // Obtener el nombre de la categoría
  const getCategoryName = (id) => {
    // Si tenemos los detalles de la categoría, usamos el nombre de ahí
    if (categoryDetails) {
      return categoryDetails.name;
    }
    
    // Si no, usamos un mapeo estático como fallback
    const categories = {
      'arabic': 'اللغة العربية',
      'novels': 'الروايات',
      'sufism': 'التصوف',
      'aqeedah': 'عقيدة',
      'hadith': 'حديث',
      'old-books': 'كتب قديمة',
      'islamic': 'الاسلاميات',
      'history': 'التاريخ',
      'quran': 'علوم القران',
      'fiqh': 'الفقه'
    };
    
    return categories[id] || 'فئة غير معروفة';
  };

  return (
    <div className="au-page-container">
      {/* SVG Definitions */}
      <div className="svg-defs">
        <svg width="107" height="4" viewBox="-1 -1 107 4" fill="none" id="svg12209414_184">
          <line x1="0.00476169" y1="0.500023" x2="105.005" y2="1.50002" stroke="black"></line>
        </svg>
        <svg width="486" height="79" viewBox="0 0 486 79" fill="none" id="svg583741960_4160">
          <path d="M71.5 55.49V65.24C71.5037 66.1451 71.3183 67.0411 70.9557 67.8704C70.5931 68.6997 70.0613 69.4442 69.3943 70.0561C68.7273 70.668 67.9399 71.1338 67.0825 71.4238C66.225 71.7138 65.3165 71.8215 64.415 71.74C54.4142 70.6533 44.8078 67.236 36.3675 61.7625C28.515 56.7727 21.8574 50.1151 16.8675 42.2625C11.375 33.7839 7.95682 24.1307 6.89003 14.085C6.80881 13.1863 6.91562 12.2805 7.20365 11.4253C7.49169 10.5701 7.95463 9.78424 8.56302 9.11777C9.1714 8.4513 9.91189 7.91881 10.7373 7.5542C11.5628 7.18959 12.4551 7.00085 13.3575 7H23.1075C24.6848 6.98448 26.2139 7.54301 27.4098 8.57148C28.6057 9.59996 29.3868 11.0282 29.6075 12.59C30.0191 15.7102 30.7822 18.7739 31.8825 21.7225C32.3198 22.8858 32.4144 24.15 32.1552 25.3654C31.896 26.5808 31.2938 27.6964 30.42 28.58L26.2925 32.7075C30.9191 40.844 37.656 47.581 45.7925 52.2075L49.92 48.08C50.8037 47.2062 51.9193 46.604 53.1347 46.3448C54.3501 46.0856 55.6143 46.1802 56.7775 46.6175C59.7262 47.7178 62.7898 48.481 65.91 48.8925C67.4888 49.1152 68.9306 49.9104 69.9613 51.1269C70.9919 52.3433 71.5396 53.8961 71.5 55.49Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M157.25 7H124.75C115.775 7 108.5 14.2754 108.5 23.25V55.75C108.5 64.7246 115.775 72 124.75 72H157.25C166.225 72 173.5 64.7246 173.5 55.75V23.25C173.5 14.2754 166.225 7 157.25 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M154 37.4525C154.401 40.1573 153.939 42.9197 152.68 45.3468C151.42 47.7739 149.428 49.7421 146.985 50.9714C144.543 52.2008 141.775 52.6287 139.075 52.1943C136.376 51.7599 133.882 50.4853 131.948 48.5518C130.015 46.6183 128.74 44.1243 128.306 41.4247C127.871 38.725 128.299 35.9572 129.529 33.5147C130.758 31.0723 132.726 29.0797 135.153 27.8203C137.58 26.5609 140.343 26.0989 143.048 26.5C145.807 26.9091 148.361 28.1948 150.333 30.167C152.305 32.1392 153.591 34.6935 154 37.4525Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M158.875 21.625H158.901" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M277.255 21.365C276.869 19.8226 276.083 18.4094 274.976 17.2681C273.869 16.1268 272.48 15.2979 270.95 14.865C265.36 13.5 243 13.5 243 13.5C243 13.5 220.64 13.5 215.05 14.995C213.52 15.4278 212.131 16.2568 211.024 17.3981C209.917 18.5394 209.131 19.9526 208.745 21.495C207.722 27.1681 207.222 32.923 207.25 38.6875C207.214 44.4954 207.714 50.2942 208.745 56.01C209.171 57.5045 209.975 58.864 211.079 59.9571C212.183 61.0501 213.551 61.8399 215.05 62.25C220.64 63.745 243 63.745 243 63.745C243 63.745 265.36 63.745 270.95 62.25C272.48 61.8171 273.869 60.9882 274.976 59.8469C276.083 58.7056 276.869 57.2924 277.255 55.75C278.27 50.1197 278.771 44.4086 278.75 38.6875C278.786 32.8796 278.286 27.0808 277.255 21.365Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M235.688 49.315L254.375 38.6875L235.688 28.06V49.315Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M364.5 7H354.75C350.44 7 346.307 8.71205 343.26 11.7595C340.212 14.807 338.5 18.9402 338.5 23.25V33H328.75V46H338.5V72H351.5V46H361.25L364.5 33H351.5V23.25C351.5 22.388 351.842 21.5614 352.452 20.9519C353.061 20.3424 353.888 20 354.75 20H364.5V7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M482.75 10.25C479.638 12.4453 476.192 14.1244 472.545 15.2225C470.588 12.9719 467.986 11.3768 465.093 10.6528C462.199 9.92878 459.153 10.1109 456.367 11.1745C453.58 12.2381 451.187 14.1318 449.512 16.5996C447.837 19.0674 446.96 21.9901 447 24.9725V28.2225C441.289 28.3706 435.629 27.1039 430.526 24.5352C425.422 21.9665 421.034 18.1756 417.75 13.5C417.75 13.5 404.75 42.75 434 55.75C427.307 60.2934 419.333 62.5715 411.25 62.25C440.5 78.5 476.25 62.25 476.25 24.875C476.247 23.9697 476.16 23.0667 475.99 22.1775C479.307 18.9064 481.648 14.7763 482.75 10.25Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className='hea'>
          <div className="header-container">
            <div className="framer-1qxm1ov header-logo">
              <Link to="/" title="الصفحة الرئيسية">
                <img src={logoImage} alt="Albeyruti Logo" style={{ maxWidth: '120px', height: 'auto' }} />
              </Link>
            </div>
            <div className="framer-1xms9oe social-media">
              <div className="svgContainer">
                <svg viewBox="0 0 486 79" preserveAspectRatio="none">
                  <use href="#svg583741960_4160"></use>
                </svg>
              </div>
              <div className="social-links">
                <button onClick={() => window.open('https://facebook.com', '_blank')} className="social-link" title="Facebook"><i className="social-icon facebook"></i></button>
                <button onClick={() => window.open('https://twitter.com', '_blank')} className="social-link" title="Twitter"><i className="social-icon twitter"></i></button>
                <button onClick={() => window.open('https://instagram.com', '_blank')} className="social-link" title="Instagram"><i className="social-icon instagram"></i></button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="main-navigation">
        <div className="framer-11nv3oa nav-container">
          <div className="framer-1rtpr7q nav-items">
            <Link to="/publications" className="framer-1b8pa00 nav-item">
              <p className="framer-text" lang="ar">منشورات الدار</p>
            </Link>
            <Link to="/sold-publications" className="framer-11kpfkt nav-item">
              <p className="framer-text" lang="ar">منشورات تبيعها الدار</p>
            </Link>
            <Link to="/old-publications" className="framer-hlg0pk nav-item">
              <p className="framer-text" lang="ar">منشورات قديمة</p>
            </Link>
          </div>
        </div>
        <div className="framer-11nv3oa nav-container">
          <div className="framer-1rtpr7q nav-items" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/category/arabic" className="framer-1x0zdf2 nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/arabic" className="framer-text" lang="ar">اللغة العربية</a>
            </Link>
            <Link to="/category/novels" className="framer-1b8pa00 nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/novels" className="framer-text" lang="ar">الروايات</a>
            </Link>
            <Link to="/category/sufism" className="framer-11kpfkt nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/sufism" className="framer-text" lang="ar">التصوف</a>
            </Link>
            <Link to="/category/aqeedah" className="framer-hlg0pk nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/aqeedah" className="framer-text" lang="ar">عقيدة</a>
            </Link>
            <Link to="/category/hadith" className="framer-1qnmv2x nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/hadith" className="framer-text" lang="ar">حديث</a>
            </Link>
            <Link to="/category/old-books" className="framer-1fke4dr nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/old-books" className="framer-text" lang="ar">كتب قديمة</a>
            </Link>
            <Link to="/category/islamic" className="framer-opofth nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/islamic" className="framer-text" lang="ar">الاسلاميات</a>
            </Link>
            <Link to="/category/history" className="framer-1mbjlp3 nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/history" className="framer-text" lang="ar">التاريخ</a>
            </Link>
            <Link to="/category/quran" className="framer-18g7lo4 nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/quran" className="framer-text" lang="ar">علوم القران</a>
            </Link>
            <Link to="/category/fiqh" className="framer-absb43 nav-item" style={{ margin: '5px', padding: '5px' }}>
              <a href="/category/fiqh" className="framer-text" lang="ar">الفقه</a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div id="main" className="main-content">
        <div className="framer-hlvio framer-72rtr7">
          <div className="framer-a6ydxj" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Category Header */}
            <div className="framer-1a032it featured-publications">
              <h1 className="framer-text" lang="ar">{getCategoryName(categoryId)}</h1>
              {categoryDetails && categoryDetails.description && (
                <p className="category-description" style={{ marginTop: '10px', color: '#6b7280' }}>
                  {categoryDetails.description}
                </p>
              )}
            </div>
            
            {/* Books Section */}
            <BookList categoryId={categoryId} limit={12} />
          </div>
        </div>
      </div>
      
      {/* SVG Definitions */}
      
      
{/* footer*/}
    </div>
  );
};

export default CategoryPage;