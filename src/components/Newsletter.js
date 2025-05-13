import React, { useState } from 'react';
import './Newsletter.css';
import { newsletterApi } from '../services/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من صحة البريد الإلكتروني
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // إرسال طلب الاشتراك إلى API
      const response = await newsletterApi.subscribeToNewsletter(email);
      
      if (response.success) {
        setSubscribed(true);
        setEmail('');
      } else {
        setError(response.error || 'حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.');
      }
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setError('حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <span>📚</span>
          </div>
          
          <div className="newsletter-text">
            <h2>اشترك في نشرتنا البريدية</h2>
            <p>احصل على آخر الإصدارات والعروض الحصرية مباشرة إلى بريدك الإلكتروني</p>
            
            {!subscribed ? (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="أدخل بريدك الإلكتروني" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? 'error' : ''}
                    disabled={loading}
                  />
                  {error && <p className="error-message">{error}</p>}
                </div>
                <button 
                  type="submit" 
                  className="subscribe-btn"
                  disabled={loading}
                >
                  {loading ? 'جاري الاشتراك...' : 'اشترك الآن'}
                </button>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>تم الاشتراك بنجاح! شكرًا لك.</p>
              </div>
            )}
          </div>
          
          <div className="newsletter-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">🔔</div>
              <div className="benefit-text">
                <h3>إشعارات فورية</h3>
                <p>كن أول من يعلم بالإصدارات الجديدة</p>
              </div>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">💰</div>
              <div className="benefit-text">
                <h3>عروض حصرية</h3>
                <p>احصل على خصومات خاصة للمشتركين</p>
              </div>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">🎁</div>
              <div className="benefit-text">
                <h3>هدايا مجانية</h3>
                <p>فرصة للفوز بكتب مجانية شهريًا</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;