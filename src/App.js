import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BookDetailPage from './pages/BookDetailPage';
import PublicationsPage from './pages/PublicationsPage';
import BestSellers from './pages/BestSellers';
import SearchBar from './components/SearchBar';

import CategoryArabicPage from './pages/CategoryArabicPage';
import CategoryNovelsPage from './pages/CategoryNovelsPage';
import CategoryaqeedahPage from './pages/CategoryaqeedahPage';
import CategoryfiqhPage from './pages/CategoryfiqhPage';
import CategoryhadithPage from './pages/CategoryhadithPage';
import CategoryhistoryPage from './pages/CategoryhistoryPage';
import CategoryislamicPage from './pages/CategoryislamicPage';
import CategoryquranPage from './pages/CategoryquranPage';
import CategorysufismPage from './pages/CategorysufismPage';
import React from 'react';

import logoImage from './img/logo-(2)-2.png';

// Import Cairo font styles
import './styles/fonts.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">

        
        {/* Header */}
        <header className="site-header">
  <div className='hea'>
    <div className="header-container">
      <div className="framer-1qxm1ov header-logo">
        <NavLink to="/" title="الصفحة الرئيسية">
          <img src={logoImage} alt="Albeyruti Logo" style={{ maxWidth: '120px', height: 'auto' }} />
        </NavLink>
      </div>
      
      {/* Search Box - Added in the middle */}
      {/* <div className="search-container">
        <form className="search-form" onSubmit={(e) => handleSearch(e)}>
          <input
            type="text"
            className="search-input"
            placeholder="ابحث هنا..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <i className="search-icon">بحث</i>
          </button>
        </form>
      </div> */}
      
      {/* Search Box - Commented out but kept for future use
      <SearchBar />
      */}
      
      <div className="social-media">
        <div className="social-NavLinks">
          <button onClick={() => window.open('https://facebook.com', '_blank')} className="social-NavLink" title="Facebook"><i className="social-icon facebook"></i>F</button>
          <button onClick={() => window.open('https://whatsapp.com', '_blank')} className="social-NavLink" title="whatsapp"><i className="social-icon twitter"></i>w</button>
          <button onClick={() => window.open('https://gmail.com', '_blank')} className="social-NavLink" title="Instagram"><i className="social-icon instagram"></i>G</button>
        </div>
      </div>
    </div>
  </div>
</header>

        {/* Navigation */}
        <nav>
          <div className="nav-container">
            <div className="nav-items" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <NavLink to="/bestsellers" className="nav-item bestsellers">
                <span className="framer-text" lang="ar">الكتب الأكثر مبيعًا</span>
              </NavLink>
              <NavLink to="/publications" className="nav-item">
                <span className="framer-text" lang="ar">منشورات الدار</span>
              </NavLink>
              <NavLink to="/category/arabic" className="nav-item">
                <span className="framer-text" lang="ar">اللغة العربية</span>
              </NavLink>
              <NavLink to="/category/novels" className="nav-item">
                <span className="framer-text" lang="ar">الروايات</span>
              </NavLink>
              <NavLink to="/category/sufism" className="nav-item">
                <span className="framer-text" lang="ar">التصوف</span>
              </NavLink>
              <NavLink to="/category/aqeedah" className="nav-item">
                <span className="framer-text" lang="ar">عقيدة</span>
              </NavLink>
              <NavLink to="/category/hadith" className="nav-item">
                <span className="framer-text" lang="ar">حديث</span>
              </NavLink>
              <NavLink to="/category/islamic" className="nav-item">
                <span className="framer-text" lang="ar">الاسلاميات</span>
              </NavLink>
              <NavLink to="/category/history" className="nav-item">
                <span className="framer-text" lang="ar">التاريخ</span>
              </NavLink>
              <NavLink to="/category/quran" className="nav-item">
                <span className="framer-text" lang="ar">علوم القران</span>
              </NavLink>
              <NavLink to="/category/fiqh" className="nav-item">
                <span className="framer-text" lang="ar">الفقه</span>
              </NavLink>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bestsellers" element={<BestSellers />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category/arabic" element={<CategoryArabicPage />} />
          <Route path="/category/novels" element={<CategoryNovelsPage />} />
          <Route path="/category/sufism" element={<CategorysufismPage />} />
          <Route path="/category/aqeedah" element={<CategoryaqeedahPage />} />
          <Route path="/category/hadith" element={<CategoryhadithPage />} />
          <Route path="/category/islamic" element={<CategoryislamicPage />} />
          <Route path="/category/history" element={<CategoryhistoryPage />} />
          <Route path="/category/quran" element={<CategoryquranPage />} />
          <Route path="/category/fiqh" element={<CategoryfiqhPage />} />
          <Route path="/book/:bookId" element={<BookDetailPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
        </Routes>
      </div>
      <footer className="site-footer">
<div className="footer-container">
  <div className="footer-info">
    <h3>تواصل معنا</h3>
    <p>العنوان: دمشق - سوريا</p>
    <p>الهاتف: 123-456-7890</p>
    <p>الارضي: 123-456-7890</p>
    <p>البريد الإلكتروني: info@albeyruti.com</p>
  </div>
  
  <div className="footer-form">
    <h3>اترك رسالة</h3>
    <form>
      <div className="form-group">
        <label htmlFor="name">الاسم</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="age">العمر</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="notes">ملاحظات</label>
        <textarea 
          id="notes" 
          name="notes" 
          rows="4"
        ></textarea>
      </div>
      
      <button type="submit" className="submit-button">إرسال</button>
    </form>
  </div>
</div>

<div className="copyright">
  <p>© 2023 مكتبة البيروتي. جميع الحقوق محفوظة.</p>
</div>
</footer>
    </Router>





  );
};

export default App;