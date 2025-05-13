/**
 * API para operaciones relacionadas con editoriales
 */
import http from '../apiConfig';
import { mockBooks } from '../../mockData';

// Creamos una lista de editoriales a partir de los libros simulados
const generateMockPublishers = () => {
  const publishers = [
    {
      id: 'dar-albeyruti',
      name: 'دار البيروتي',
      description: 'دار نشر متخصصة في الكتب العربية والإسلامية',
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      foundedYear: 1980,
      location: 'بيروت، لبنان',
      website: 'https://albeyruti.com',
      books: []
    },
    {
      id: 'dar-alkitab-alarabi',
      name: 'دار الكتاب العربي',
      description: 'من أقدم دور النشر العربية المتخصصة في التراث والأدب',
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      foundedYear: 1950,
      location: 'القاهرة، مصر',
      website: 'https://example.com',
      books: []
    },
    {
      id: 'dar-alshuruq',
      name: 'دار الشروق',
      description: 'دار نشر رائدة في مجال الأدب والفكر والثقافة',
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      foundedYear: 1968,
      location: 'القاهرة، مصر',
      website: 'https://example.com',
      books: []
    }
  ];
  
  // Distribuimos los libros entre las editoriales
  mockBooks.forEach((book, index) => {
    const publisherIndex = index % publishers.length;
    publishers[publisherIndex].books.push({
      id: book.id,
      title: book.title,
      image: book.image,
      price: book.price,
      author: book.author
    });
  });
  
  return publishers;
};

const mockPublishers = generateMockPublishers();

/**
 * Obtener todas las editoriales
 * @param {Object} params - Parámetros de consulta (paginación, filtros, etc.)
 * @returns {Promise} - Promesa con las editoriales
 */
export const getPublishers = async (params = {}) => {
  try {
    const { page = 1, limit = 12, sort = 'name', ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getPublishers');
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPublishers = mockPublishers.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              publishers: paginatedPublishers,
              pagination: {
                total: mockPublishers.length,
                page,
                limit,
                totalPages: Math.ceil(mockPublishers.length / limit)
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
    return await http.get(`/publishers?${queryParams.toString()}`);
  } catch (error) {
    console.error('Error fetching publishers:', error);
    throw error;
  }
};

/**
 * Obtener detalles de una editorial específica
 * @param {string} publisherId - ID de la editorial
 * @returns {Promise} - Promesa con los detalles de la editorial
 */
export const getPublisherDetails = async (publisherId) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getPublisherDetails: ${publisherId}`);
      
      // Simulamos la búsqueda de la editorial
      const publisher = mockPublishers.find(publisher => 
        publisher.id.toLowerCase() === publisherId.toLowerCase()
      );
      
      return new Promise((resolve) => {
        setTimeout(() => {
          if (publisher) {
            resolve({ 
              success: true, 
              data: publisher
            });
          } else {
            resolve({
              success: false,
              error: 'Publisher not found'
            });
          }
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get(`/publishers/${publisherId}`);
  } catch (error) {
    console.error(`Error fetching publisher details for ${publisherId}:`, error);
    throw error;
  }
};

/**
 * Obtener libros de una editorial específica
 * @param {string} publisherId - ID de la editorial
 * @param {Object} params - Parámetros adicionales (paginación, filtros, etc.)
 * @returns {Promise} - Promesa con los libros de la editorial
 */
export const getBooksByPublisher = async (publisherId, params = {}) => {
  try {
    const { page = 1, limit = 12, sort = 'newest', ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getBooksByPublisher: ${publisherId}`);
      
      // Buscamos la editorial
      const publisher = mockPublishers.find(publisher => 
        publisher.id.toLowerCase() === publisherId.toLowerCase()
      );
      
      if (!publisher) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: false,
              error: 'Publisher not found'
            });
          }, 300);
        });
      }
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = publisher.books.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              books: paginatedBooks,
              pagination: {
                total: publisher.books.length,
                page,
                limit,
                totalPages: Math.ceil(publisher.books.length / limit)
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
    return await http.get(`/publishers/${publisherId}/books?${queryParams.toString()}`);
  } catch (error) {
    console.error(`Error fetching books for publisher ${publisherId}:`, error);
    throw error;
  }
};

export default {
  getPublishers,
  getPublisherDetails,
  getBooksByPublisher
};