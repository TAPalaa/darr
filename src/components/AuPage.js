import React, { useState, useEffect, useRef } from 'react';
import './AuPage.css';
// Import local images
import bookImage from '../book-2.jpeg';
import logoImage from '../logo-(2)-2.png';
import picturesImage from '../pictures_1_4-1.jpeg';
import BookItem from './BookItem';

const AuPage = () => {
  // إضافة حالة لنموذج الاتصال
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    notes: ''
  });
  
  // حالة للتحقق من تمرير الصفحة
  const [isScrolled, setIsScrolled] = useState(false);
  
  // مرجع للهيدر
  const headerRef = useRef(null);
  
  // تأثير لمراقبة التمرير
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
        const header = document.querySelector('.site-header');
        if (header) header.classList.add('scrolled');
      } else {
        setIsScrolled(false);
        const header = document.querySelector('.site-header');
        if (header) header.classList.remove('scrolled');
      }
    };
    
    // إضافة مستمع الحدث
    window.addEventListener('scroll', handleScroll);
    
    // تنظيف المستمع عند إزالة المكون
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // تأثير للرسوم المتحركة عند التحميل
  useEffect(() => {
    // تطبيق تأثيرات الظهور التدريجي على العناصر
    const animateElements = () => {
      const elements = document.querySelectorAll('.book-item, .footer-info, .footer-form');
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    };
    
    // تأخير قصير قبل بدء الرسوم المتحركة
    setTimeout(animateElements, 500);
  }, []);

  // معالج تغيير الحقول
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // معالج إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('تم إرسال البيانات:', formData);
    
    // إنشاء عنصر رسالة النجاح
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'تم إرسال البيانات بنجاح!';
    successMessage.style.position = 'fixed';
    successMessage.style.top = '20px';
    successMessage.style.left = '50%';
    successMessage.style.transform = 'translateX(-50%)';
    successMessage.style.backgroundColor = '#4CAF50';
    successMessage.style.color = 'white';
    successMessage.style.padding = '15px 25px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    successMessage.style.zIndex = '9999';
    successMessage.style.opacity = '0';
    successMessage.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(successMessage);
    
    // ظهور الرسالة
    setTimeout(() => {
      successMessage.style.opacity = '1';
    }, 10);
    
    // إزالة الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
      successMessage.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 300);
    }, 3000);
    
    // إعادة تعيين النموذج
    setFormData({ name: '', age: '', notes: '' });
  };

  return (
    <div className="au-page-container">
 

      {/* Banner with Overlay */}
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
            {/* Featured Publications Header */}
            <div className="framer-1a032it featured-publications">
              <h1 className="framer-text" lang="ar">اصدارات مميزة</h1>
            </div>
            
            {/* Books Section */}
            <div className="framer-19uvm5q books-container">
              <BookItem 
                image={bookImage}
                title="تمام الرفعة في اجادة خط الرقعة"
                author="ادهم فادي الجعفري"
                price="5000$"
                discount="1000%"
                originalPrice="-5000$"
              />
              
              <BookItem 
                image={bookImage}
                title="تمام الرفعة في اجادة خط الرقعة"
                author="ادهم فادي الجعفري"
                price="5000$"
                discount="1000%"
                originalPrice="-5000$"
              />
              
              <BookItem 
                image={bookImage}
                title="تمام الرفعة في اجادة خط الرقعة"
                author="ادهم فادي الجعفري"
                price="5000$"
                discount="1000%"
                originalPrice="-5000$"
              />
              
              <BookItem 
                image={bookImage}
                title="تمام الرفعة في اجادة خط الرقعة"
                author="ادهم فادي الجعفري"
                price="5000$"
                discount="1000%"
                originalPrice="-5000$"
              />
              
              <BookItem 
                image={bookImage}
                title="تمام الرفعة في اجادة خط الرقعة"
                author="ادهم فادي الجعفري"
                price="5000$"
                discount="1000%"
                originalPrice="-5000$"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section with Contact Form */}
      <footer className="site-footer" style={{ backgroundColor: '#f8f8f8', padding: '30px 0', marginTop: '40px', borderTop: '1px solid #e0e0e0' }}>
        <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="footer-content" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            
            {/* Footer Info */}
            <div className="footer-info" style={{ flex: '1', minWidth: '300px', margin: '0 20px 20px 0' }}>
              <h3 className="footer-title" lang="ar" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>مكتبة البيروتي</h3>
              <p className="footer-description" lang="ar" style={{ lineHeight: '1.6', marginBottom: '15px' }}>
                منهل العالم والمتعلم، نقدم أفضل الكتب والمراجع في مختلف المجالات العلمية والأدبية والدينية.
              </p>
              <div className="footer-contact-info">
                <p lang="ar" style={{ margin: '5px 0' }}><strong>العنوان:</strong> دمشق، سوريا</p>
                <p lang="ar" style={{ margin: '5px 0' }}><strong>الهاتف:</strong> +963 11 123 4567</p>
                <p lang="ar" style={{ margin: '5px 0' }}><strong>البريد الإلكتروني:</strong> info@albeyruti.com</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="footer-form" style={{ flex: '1', minWidth: '300px' }}>
              <h3 className="form-title" lang="ar" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>تواصل معنا</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Name Field */}
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="name" lang="ar" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>الاسم</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      direction: 'rtl'
                    }}
                  />
                </div>
                
                {/* Age Field */}
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="age" lang="ar" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>العمر</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      direction: 'rtl'
                    }}
                  />
                </div>
                
                {/* Notes Field */}
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="notes" lang="ar" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>الملاحظات</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      resize: 'vertical',
                      direction: 'rtl'
                    }}
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  style={{ 
                    backgroundColor: '#4a6da7', 
                    color: 'white', 
                    border: 'none', 
                    padding: '12px 20px', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    alignSelf: 'flex-start'
                  }}
                >
                  <span lang="ar">إرسال</span>
                </button>
              </form>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="footer-copyright" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '20px', marginTop: '20px', textAlign: 'center' }}>
            <p lang="ar" style={{ margin: '0' }}>© 2023 مكتبة البيروتي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuPage;