import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-navigation">
      <div className="framer-11nv3oa nav-container">
        <div className="framer-1rtpr7q nav-items">
          <NavLink to="/publications" className="framer-1b8pa00 nav-item">
            <p className="framer-text" lang="ar">منشورات الدار</p>
          </NavLink>
          <NavLink to="/sold-publications" className="framer-11kpfkt nav-item">
            <p className="framer-text" lang="ar">منشورات تبيعها الدار</p>
          </NavLink>
          <NavLink to="/old-publications" className="framer-hlg0pk nav-item">
            <p className="framer-text" lang="ar">منشورات قديمة</p>
          </NavLink>
        </div>
      </div>
      <div className="framer-11nv3oa nav-container">
        <div className="framer-1rtpr7q nav-items" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <NavLink to="/category/arabic" className="framer-1x0zdf2 nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">اللغة العربية</p>
          </NavLink>
          <NavLink to="/category/novels" className="framer-1b8pa00 nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">الروايات</p>
          </NavLink>
          <NavLink to="/category/sufism" className="framer-11kpfkt nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">التصوف</p>
          </NavLink>
          <NavLink to="/category/aqeedah" className="framer-hlg0pk nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">عقيدة</p>
          </NavLink>
          <NavLink to="/category/hadith" className="framer-1qnmv2x nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">حديث</p>
          </NavLink>
          <NavLink to="/category/old-books" className="framer-1fke4dr nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">كتب قديمة</p>
          </NavLink>
          <NavLink to="/category/islamic" className="framer-opofth nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">الاسلاميات</p>
          </NavLink>
          <NavLink to="/category/history" className="framer-1mbjlp3 nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">التاريخ</p>
          </NavLink>
          <NavLink to="/category/quran" className="framer-18g7lo4 nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">علوم القران</p>
          </NavLink>
          <NavLink to="/category/fiqh" className="framer-absb43 nav-item" style={{ margin: '5px', padding: '5px' }}>
            <p className="framer-text" lang="ar">الفقه</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;