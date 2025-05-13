import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // محاكاة قائمة الكتب للبحث
  const mockBooks = [
    { id: 1, title: 'رحلة إلى قلب الإنسان', author: 'د. أحمد الشقيري', category: 'تطوير الذات' },
    { id: 2, title: 'فن اللامبالاة', author: 'مارك مانسون', category: 'تطوير الذات' },
    { id: 3, title: 'العادات الذرية', author: 'جيمس كلير', category: 'تطوير الذات' },
    { id: 4, title: 'قوة العادات', author: 'تشارلز دويج', category: 'تطوير الذات' },
    { id: 5, title: 'عقل بلا حدود', author: 'د. جو ديسبينزا', category: 'علم النفس' },
    { id: 6, title: 'أربعون', author: 'أحمد الشقيري', category: 'تطوير الذات' },
    { id: 7, title: 'كتاب الفقه الإسلامي', author: 'د. وهبة الزحيلي', category: 'الفقه' },
    { id: 8, title: 'صحيح البخاري', author: 'الإمام البخاري', category: 'حديث' },
    { id: 9, title: 'رياض الصالحين', author: 'الإمام النووي', category: 'حديث' },
    { id: 10, title: 'تفسير القرآن العظيم', author: 'ابن كثير', category: 'علوم القرآن' },
  ];

  // استرجاع عمليات البحث السابقة من التخزين المحلي
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // إغلاق البحث عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // البحث في قائمة الكتب
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // حفظ البحث في التخزين المحلي
      const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      // التوجيه إلى صفحة نتائج البحث (يمكن تعديلها حسب هيكل التطبيق)
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsExpanded(false);
    }
  };

  // البحث أثناء الكتابة للاقتراحات
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 1) {
      setLoading(true);
      
      // محاكاة تأخير طلب البحث
      setTimeout(() => {
        const results = mockBooks.filter(book => 
          book.title.includes(query) || 
          book.author.includes(query) || 
          book.category.includes(query)
        ).slice(0, 5);
        
        setSuggestions(results);
        setLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  // استخدام اقتراح البحث
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    navigate(`/book/${suggestion.id}`);
    setIsExpanded(false);
  };

  // استخدام بحث سابق
  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setIsExpanded(false);
  };

  // مسح البحث
  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-container">
          <input
            type="text"
            className={`search-input ${isExpanded ? 'expanded' : ''}`}
            placeholder="ابحث عن كتاب، مؤلف، أو تصنيف..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsExpanded(true)}
          />
          
          {searchQuery && (
            <button 
              type="button" 
              className="clear-search-button"
              onClick={clearSearch}
            >
              ×
            </button>
          )}
          
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        {isExpanded && (
          <div className="search-dropdown">
            {loading ? (
              <div className="search-loading">
                <div className="search-spinner"></div>
                <span>جاري البحث...</span>
              </div>
            ) : (
              <>
                {suggestions.length > 0 && (
                  <div className="search-suggestions">
                    <h3>اقتراحات البحث</h3>
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                          <div className="suggestion-icon">📖</div>
                          <div className="suggestion-content">
                            <div className="suggestion-title">{suggestion.title}</div>
                            <div className="suggestion-details">
                              {suggestion.author} • {suggestion.category}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {recentSearches.length > 0 && !searchQuery && (
                  <div className="recent-searches">
                    <h3>عمليات البحث الأخيرة</h3>
                    <ul>
                      {recentSearches.map((search, index) => (
                        <li key={index} onClick={() => handleRecentSearchClick(search)}>
                          <div className="recent-search-icon">⏱️</div>
                          <div className="recent-search-text">{search}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {!suggestions.length && searchQuery && !loading && (
                  <div className="no-results">
                    <p>لا توجد نتائج مطابقة لـ "{searchQuery}"</p>
                    <button onClick={handleSearch} className="view-all-button">
                      عرض جميع النتائج
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;