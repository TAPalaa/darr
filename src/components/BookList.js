import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import { homeApi } from '../services/api';

const BookList = ({ categoryId, limit = 8 }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let response;
        
        if (categoryId) {
          // Si se proporciona una categoría, obtenemos libros de esa categoría
          const { categoryApi } = await import('../services/api');
          response = await categoryApi.getBooksByCategory(categoryId, { limit });
        } else {
          // Si no, obtenemos los libros destacados
          response = await homeApi.getFeaturedBooks(limit);
        }
        
        if (response.success) {
          // Si la respuesta tiene una estructura de paginación
          const booksData = response.data.books || response.data;
          setBooks(booksData);
        } else {
          setError('No se pudieron cargar los libros');
        }
      } catch (err) {
        console.error('Error al cargar los libros:', err);
        setError('Error al cargar los libros');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId, limit]);

  if (loading) {
    return (
      <div className="framer-19uvm5q books-container" style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>جاري تحميل الكتب...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="framer-19uvm5q books-container" style={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="framer-19uvm5q books-container" style={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>لا توجد كتب متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="framer-19uvm5q books-container">
      {books.map(book => (
        <BookItem 
          key={book.id}
          id={book.id}
          image={book.image}
          title={book.title}
          author={book.author}
          price={book.price}
          discount={book.discount}
          originalPrice={book.originalPrice}
          category={book.category}
        />
      ))}
    </div>
  );
};

export default BookList;
