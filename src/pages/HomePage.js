import React from 'react';
import BookList from '../components/BookList';
import BookOfTheWeek from '../components/BookOfTheWeek';
import BookCategories from '../components/BookCategories';
import Newsletter from '../components/Newsletter';
import { NavLink } from 'react-router-dom';
import logoImage from '../img/logo-(2)-2.png';
import picturesImage from '../img/pictures_1_4-1.jpeg';

import '../components/common.css';
import '../components/NavStyles.css';

const HomePage = () => {
  return (
    <div className="au-page-container">
     

      {/* Banner */}
      <div className="framer-olx6ou banner">
        <div className="framer-10vp1u9 banner-image">
          <img src={picturesImage} alt="Banner" />
          <div className="framer-1s6ci35 banner-overlay"></div>
        </div>

        <div className="framer-q6elkp banner-text">
          <p className="framer-text" lang="ar">مكتبة البيروتي</p>
          <p className="framer-text" lang="ar">منهل العالم و المتعلم</p>
        </div>
      </div>

      {/* Main Content */}
      <div id="main" className="main-content">
        <div className="framer-hlvio framer-72rtr7">
          <div className="framer-a6ydxj" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            
            {/* كتاب الأسبوع */}
            {/* <BookOfTheWeek /> */}
            
            {/* Featured Publications Header */}
            <div className="framer-1a032it featured-publications">
              <h1 className="framer-text" lang="ar">اصدارات مميزة</h1>
            </div>
            
            {/* Books Section */}
            <BookList />
            
{/* 
            <BookCategories />
            

            <Newsletter />   */}
          </div>
        </div>
      </div>
      
{/* footer*/}
    </div>
  );
};

export default HomePage;