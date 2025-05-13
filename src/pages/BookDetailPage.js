import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate , Link } from 'react-router-dom';
import bookImage from '../img/book-2.jpeg';
import logoImage from '../img/logo-(2)-2.png';

import '../components/common.css';
import '../components/NavStyles.css';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState([]);
  
  // في التطبيق الحقيقي، يمكنك استخدام معرف الكتاب للحصول على تفاصيل الكتاب من API
  // هنا نستخدم بيانات ثابتة للتوضيح
  const book = {
    id: bookId,
    image: bookImage,
    title: "تمام الرفعة في اجادة خط الرقعة",
    author: "ادهم فادي الجعفري",
    price: "5000$",
    discount: "1000%",
    originalPrice: "-5000$",
    description: "هذا الكتاب يتناول فن الخط العربي وتحديداً خط الرقعة، ويشرح أصوله وقواعده وكيفية إتقانه. يعتبر مرجعاً مهماً لمن يرغب في تعلم هذا الفن الجميل وإتقانه.",
    pages: 250,
    publishYear: 2022,
    isbn: "978-9953-87-614-5",
    language: "العربية",
    publisher: "دار البيروتي للنشر والتوزيع",
    category: "اللغة العربية"
  };
  
  // محاكاة جلب الكتب المتعلقة
  useEffect(() => {
    const fetchRelatedBooks = async () => {
      setLoading(true);
      try {
        // في التطبيق الحقيقي، هنا ستقوم بطلب API للحصول على الكتب المتعلقة
        // نحن نستخدم بيانات وهمية للتوضيح
        setTimeout(() => {
          const dummyRelatedBooks = [
            {
              id: 101,
              image: bookImage,
              title: "أساسيات الخط العربي",
              author: "محمد سعيد الصكار",
              price: "3500$",
              category: "اللغة العربية"
            },
            {
              id: 102,
              image: bookImage,
              title: "فن الخط الديواني",
              author: "أحمد فارس",
              price: "4200$",
              category: "اللغة العربية"
            },
            {
              id: 103,
              image: bookImage,
              title: "الخط الكوفي",
              author: "سمير الشريف",
              price: "3800$",
              category: "اللغة العربية"
            }
          ];
          setRelatedBooks(dummyRelatedBooks);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching related books:", error);
        setLoading(false);
      }
    };
    
    fetchRelatedBooks();
  }, [bookId]);

  return (
    <div className="au-page-container">

      {/* Main Content */}
      <div id="main" className="main-content">
        <div className="framer-hlvio framer-72rtr7">
          <div className="framer-a6ydxj" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb" style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
              <NavLink to="/" style={{ color: 'var(--text-medium)', textDecoration: 'none' }}>الرئيسية</NavLink>
              <span style={{ margin: '0 10px', color: 'var(--text-light)' }}>/</span>
              <span style={{ color: 'var(--primary-color)' }}>{book.title}</span>
            </div>
            
            {/* Book Detail Section */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row-reverse', 
              gap: '30px',
              flexWrap: 'wrap',
              backgroundColor: 'var(--bg-light)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '30px',
              boxShadow: 'var(--shadow-elegant)'
            }}>
              {/* Book Image */}
              <div style={{ 
                flex: '0 0 300px',
                animation: 'fadeIn 1s ease-in-out'
              }}>
                <div style={{ 
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  height: '400px'
                }}>
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </div>
                
                {/* Price Information */}
                <div style={{ 
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div className="price-container">
                    <div className="framer-1yph79f book-price">
                      <p className="framer-text">{book.price}</p>
                    </div>
                    {book.discount && (
                      <div className="framer-1dzdger discount-percentage">
                        <p className="framer-text">{book.discount}</p>
                      </div>
                    )}
                  </div>
                  
                  {book.originalPrice && (
                    <div className="framer-1jx8gd4 discounted-price">
                      <p className="framer-text">{book.originalPrice}</p>
                    </div>
                  )}
                  

                </div>
              </div>
              
              {/* Book Details */}
              <div style={{ 
                flex: '1 1 500px',
                animation: 'fadeIn 1.2s ease-in-out'
              }}>
                <h1 style={{ 
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: 'var(--primary-color)'
                }} lang="ar">{book.title}</h1>
                
                <h2 style={{ 
                  fontSize: '1.4rem',
                  fontWeight: '500',
                  marginBottom: '20px',
                  color: 'var(--text-medium)'
                }} lang="ar">{book.author}</h2>
                
                <div className="separator-line" style={{ margin: '20px 0' }}></div>
                
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '15px',
                    color: 'var(--primary-color)'
                  }} lang="ar">وصف الكتاب</h3>
                  
                  <p style={{ 
                    lineHeight: '1.8',
                    color: 'var(--text-dark)',
                    textAlign: 'justify'
                  }} lang="ar">{book.description}</p>
                </div>
                
                <div className="separator-line" style={{ margin: '20px 0' }}></div>
                
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '15px',
                    color: 'var(--primary-color)'
                  }} lang="ar">تفاصيل الكتاب</h3>
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '15px'
                  }}>
                    <div>
                      <p style={{ fontWeight: '700', color: 'var(--text-medium)' }} lang="ar">عدد الصفحات</p>
                      <p lang="ar">{book.pages}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: '700', color: 'var(--text-medium)' }} lang="ar">سنة النشر</p>
                      <p lang="ar">{book.publishYear}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: '700', color: 'var(--text-medium)' }} lang="ar">الرقم الدولي</p>
                      <p lang="ar">{book.isbn}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: '700', color: 'var(--text-medium)' }} lang="ar">اللغة</p>
                      <p lang="ar">{book.language}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: '700', color: 'var(--text-medium)' }} lang="ar">الناشر</p>
                      <p lang="ar">{book.publisher}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Books Section */}
      <div className="related-books-section" style={{ 
        maxWidth: '1200px', 
        margin: '50px auto 0',
        padding: '0 20px'
      }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          color: 'var(--primary-color)', 
          textAlign: 'center',
          marginBottom: '30px',
          position: 'relative'
        }} lang="ar">كتب ذات صلة</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <p>جاري التحميل...</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            {relatedBooks.map(book => (
              <div key={book.id} className="related-book-card" style={{
                background: 'var(--bg-light)',
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-elegant)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onClick={() => navigate(`/book/${book.id}`)}>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </div>
                <div style={{ padding: '15px' }}>
                  <h3 style={{ 
                    fontSize: '1.1rem',
                    marginBottom: '5px',
                    color: 'var(--text-dark)'
                  }} lang="ar">{book.title}</h3>
                  <p style={{ 
                    fontSize: '0.9rem',
                    color: 'var(--text-medium)',
                    marginBottom: '10px'
                  }} lang="ar">{book.author}</p>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontWeight: 'bold',
                      color: 'var(--primary-color)'
                    }}>{book.price}</span>
                    <span style={{ 
                      fontSize: '0.8rem',
                      color: 'var(--accent-color)',
                      padding: '3px 8px',
                      borderRadius: 'var(--border-radius-sm)',
                      background: 'rgba(231, 76, 60, 0.1)'
                    }} lang="ar">{book.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* SVG Definitions */}
      
      
{/* footer*/}
    </div>
  );
};

export default BookDetailPage;