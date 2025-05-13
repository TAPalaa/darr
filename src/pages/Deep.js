// import React, { useState } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom';
// import logoImage from '../logo-(2)-2.png'; // تم تصحيح مسار الصورة

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       // يمكنك تغيير '/search' إلى المسار الذي تريد التوجيه إليه
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery('');
//     }

// export default Header;
//   };

//   return (
// <header className="site-header">
//   <div className='hea'>
//     <div className="header-container">
//       <div className="framer-1qxm1ov header-logo">
//         <NavLink to="/" title="الصفحة الرئيسية">
//           <img src={logoImage} alt="Albeyruti Logo" style={{ maxWidth: '120px', height: 'auto' }} />
//         </NavLink>
//       </div>
      
//       {/* Search Box - Added in the middle */}

      
//       <div className="framer-1xms9oe social-media">
//         <div className="svgContainer">
//           <svg viewBox="0 0 486 79" preserveAspectRatio="none">
//             <use href="#svg583741960_4160"></use>
//           </svg>
//         </div>
//         <div className="social-NavLinks">
//           <button onClick={() => window.open('https://facebook.com', '_blank')} className="social-NavLink" title="Facebook"><i className="social-icon facebook"></i></button>
//           <button onClick={() => window.open('https://twitter.com', '_blank')} className="social-NavLink" title="Twitter"><i className="social-icon twitter"></i></button>
//           <button onClick={() => window.open('https://instagram.com', '_blank')} className="social-NavLink" title="Instagram"><i className="social-icon instagram"></i></button>
//         </div>
//       </div>
//     </div>
//   </div>
// </header>
//   );}
