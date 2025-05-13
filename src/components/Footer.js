import React, { useState } from 'react';
import './common.css';

const Footer = () => {
  // إضافة حالة لنموذج الاتصال
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    notes: ''
  });

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
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>تواصل معنا</h3>
          <p>العنوان: دمشق - سوريا</p>
          <p>الهاتف: 123-456-7890</p>
          <p>البريد الإلكتروني: info@albeyruti.com</p>
        </div>
        
        <div className="footer-form">
          <h3>اترك رسالة</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">الاسم</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="age">العمر</label>
              <input 
                type="number" 
                id="age" 
                name="age" 
                value={formData.age} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">ملاحظات</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleInputChange} 
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
  );
};

export default Footer;