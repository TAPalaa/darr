/**
 * API para operaciones relacionadas con libros
 */
import http from '../apiConfig';
import { mockBooks, mockBookDetails } from '../../mockData';

/**
 * Obtener todos los libros con paginación y filtros
 * @param {Object} params - Parámetros de consulta (paginación, filtros, etc.)
 * @returns {Promise} - Promesa con los libros
 */
export const getBooks = async (params = {}) => {
  try {
    const { page = 1, limit = 12, sort = 'newest', ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getBooks');
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = mockBooks.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              books: paginatedBooks,
              pagination: {
                total: mockBooks.length,
                page,
                limit,
                totalPages: Math.ceil(mockBooks.length / limit)
              }
            }
          });
        }, 300);
      });
    }
    
    // Construimos los parámetros de consulta
    const queryParams = new URLSearchParams();
    queryParams.append('page', page);
    queryParams.append('limit', limit);
    queryParams.append('sort', sort);
    
    // Añadimos filtros adicionales
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    // En producción, hacemos la llamada real
    return await http.get(`/books?${queryParams.toString()}`);
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

/**
 * Obtener detalles de un libro específico
 * @param {string|number} bookId - ID del libro
 * @returns {Promise} - Promesa con los detalles del libro
 */
export const getBookDetails = async (bookId) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getBookDetails: ${bookId}`);
      
      // Simulamos la búsqueda del libro
      const bookDetail = mockBookDetails[bookId] || {
        ...mockBooks.find(book => book.id.toString() === bookId.toString()),
        // Añadimos detalles adicionales que no están en la lista general
        description: 'Descripción detallada del libro...',
        pages: Math.floor(Math.random() * 500) + 100,
        isbn: `978-9953-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9)}`,
        publishDate: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        language: 'العربية',
        publisher: 'دار البيروتي',
        dimensions: '17 × 24 سم',
        weight: `${Math.floor(Math.random() * 900) + 300} غرام`,
        coverType: Math.random() > 0.5 ? 'غلاف مقوى' : 'غلاف عادي',
        relatedBooks: mockBooks.slice(0, 4).map(book => ({
          id: book.id,
          title: book.title,
          image: book.image,
          price: book.price
        }))
      };
      
      return new Promise((resolve) => {
        setTimeout(() => {
          if (bookDetail) {
            resolve({ 
              success: true, 
              data: bookDetail
            });
          } else {
            resolve({
              success: false,
              error: 'Book not found'
            });
          }
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get(`/books/${bookId}`);
  } catch (error) {
    console.error(`Error fetching book details for ${bookId}:`, error);
    throw error;
  }
};

/**
 * Obtener libros destacados
 * @param {number} limit - Número de libros a obtener
 * @returns {Promise} - Promesa con los libros destacados
 */
export const getFeaturedBooks = async (limit = 8) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getFeaturedBooks');
      
      // Simulamos libros destacados
      const featuredBooks = mockBooks
        .sort(() => 0.5 - Math.random()) // Ordenamos aleatoriamente
        .slice(0, limit); // Tomamos solo la cantidad solicitada
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: featuredBooks
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get(`/books/featured?limit=${limit}`);
  } catch (error) {
    console.error('Error fetching featured books:', error);
    throw error;
  }
};

/**
 * Obtener el libro de la semana
 * @returns {Promise} - Promesa con el libro de la semana
 */
export const getBookOfTheWeek = async () => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getBookOfTheWeek');
      
      // Simulamos el libro de la semana
      const randomIndex = Math.floor(Math.random() * mockBooks.length);
      const bookOfTheWeek = {
        ...mockBooks[randomIndex],
        description: 'كتاب يأخذك في رحلة استكشافية إلى أعماق النفس البشرية، ويكشف عن أسرار السعادة الحقيقية والتوازن النفسي. يقدم الكاتب خلاصة تجاربه وتأملاته في الحياة بأسلوب سلس وعميق، مع نصائح عملية للتغلب على التحديات النفسية.',
        discountedPrice: parseInt(mockBooks[randomIndex].price) * 0.8,
        pages: Math.floor(Math.random() * 500) + 100,
        publishDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
      };
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: bookOfTheWeek
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get('/books/book-of-week');
  } catch (error) {
    console.error('Error fetching book of the week:', error);
    throw error;
  }
};

/**
 * Buscar libros
 * @param {string} query - Texto de búsqueda
 * @param {Object} params - Parámetros adicionales
 * @returns {Promise} - Promesa con los resultados de la búsqueda
 */
export const searchBooks = async (query, params = {}) => {
  try {
    const { page = 1, limit = 12, ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] searchBooks: ${query}`);
      
      // Simulamos la búsqueda
      const searchResults = mockBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
      );
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = searchResults.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              books: paginatedResults,
              pagination: {
                total: searchResults.length,
                page,
                limit,
                totalPages: Math.ceil(searchResults.length / limit)
              }
            }
          });
        }, 300);
      });
    }
    
    // Construimos los parámetros de consulta
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    queryParams.append('page', page);
    queryParams.append('limit', limit);
    
    // Añadimos filtros adicionales
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    // En producción, hacemos la llamada real
    return await http.get(`/books/search?${queryParams.toString()}`);
  } catch (error) {
    console.error(`Error searching books with query "${query}":`, error);
    throw error;
  }
};

export default {
  getBooks,
  getBookDetails,
  getFeaturedBooks,
  getBookOfTheWeek,
  searchBooks
};