/**
 * API para operaciones relacionadas con autores
 */
import http from '../apiConfig';
import { mockBooks } from '../../mockData';

// Creamos una lista de autores a partir de los libros simulados
const generateMockAuthors = () => {
  const authorsMap = {};
  
  mockBooks.forEach(book => {
    if (!authorsMap[book.author]) {
      authorsMap[book.author] = {
        id: book.author.toLowerCase().replace(/\s+/g, '-'),
        name: book.author,
        books: [],
        bio: `نبذة عن المؤلف ${book.author}...`,
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
      };
    }
    
    authorsMap[book.author].books.push({
      id: book.id,
      title: book.title,
      image: book.image,
      price: book.price
    });
  });
  
  return Object.values(authorsMap);
};

const mockAuthors = generateMockAuthors();

/**
 * Obtener todos los autores
 * @param {Object} params - Parámetros de consulta (paginación, filtros, etc.)
 * @returns {Promise} - Promesa con los autores
 */
export const getAuthors = async (params = {}) => {
  try {
    const { page = 1, limit = 12, sort = 'name', ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getAuthors');
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedAuthors = mockAuthors.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              authors: paginatedAuthors,
              pagination: {
                total: mockAuthors.length,
                page,
                limit,
                totalPages: Math.ceil(mockAuthors.length / limit)
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
    return await http.get(`/authors?${queryParams.toString()}`);
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

/**
 * Obtener detalles de un autor específico
 * @param {string} authorId - ID del autor
 * @returns {Promise} - Promesa con los detalles del autor
 */
export const getAuthorDetails = async (authorId) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getAuthorDetails: ${authorId}`);
      
      // Simulamos la búsqueda del autor
      const author = mockAuthors.find(author => 
        author.id.toLowerCase() === authorId.toLowerCase()
      );
      
      return new Promise((resolve) => {
        setTimeout(() => {
          if (author) {
            resolve({ 
              success: true, 
              data: author
            });
          } else {
            resolve({
              success: false,
              error: 'Author not found'
            });
          }
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get(`/authors/${authorId}`);
  } catch (error) {
    console.error(`Error fetching author details for ${authorId}:`, error);
    throw error;
  }
};

/**
 * Obtener libros de un autor específico
 * @param {string} authorId - ID del autor
 * @param {Object} params - Parámetros adicionales (paginación, filtros, etc.)
 * @returns {Promise} - Promesa con los libros del autor
 */
export const getBooksByAuthor = async (authorId, params = {}) => {
  try {
    const { page = 1, limit = 12, sort = 'newest', ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getBooksByAuthor: ${authorId}`);
      
      // Buscamos el autor
      const author = mockAuthors.find(author => 
        author.id.toLowerCase() === authorId.toLowerCase()
      );
      
      if (!author) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: false,
              error: 'Author not found'
            });
          }, 300);
        });
      }
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = author.books.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              books: paginatedBooks,
              pagination: {
                total: author.books.length,
                page,
                limit,
                totalPages: Math.ceil(author.books.length / limit)
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
    return await http.get(`/authors/${authorId}/books?${queryParams.toString()}`);
  } catch (error) {
    console.error(`Error fetching books for author ${authorId}:`, error);
    throw error;
  }
};

export default {
  getAuthors,
  getAuthorDetails,
  getBooksByAuthor
};