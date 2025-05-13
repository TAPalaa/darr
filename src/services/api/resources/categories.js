/**
 * API para operaciones relacionadas con categorías
 */
import http from '../apiConfig';
import { mockCategories, mockBooks } from '../../mockData';

/**
 * Obtener todas las categorías
 * @returns {Promise} - Promesa con todas las categorías
 */
export const getAllCategories = async () => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getAllCategories');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockCategories 
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get('/categories');
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error;
  }
};

/**
 * Obtener categorías destacadas para la página de inicio
 * @param {number} limit - Número de categorías a obtener
 * @returns {Promise} - Promesa con las categorías destacadas
 */
export const getFeaturedCategories = async (limit = 6) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getFeaturedCategories');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockCategories.slice(0, limit) 
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get(`/categories/featured?limit=${limit}`);
  } catch (error) {
    console.error('Error fetching featured categories:', error);
    throw error;
  }
};

/**
 * Obtener detalles de una categoría
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise} - Promesa con los detalles de la categoría
 */
export const getCategoryDetails = async (categoryId) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getCategoryDetails: ${categoryId}`);
      
      const category = mockCategories.find(cat => 
        cat.id.toLowerCase() === categoryId.toLowerCase()
      );
      
      return new Promise((resolve) => {
        setTimeout(() => {
          if (category) {
            resolve({ 
              success: true, 
              data: category
            });
          } else {
            resolve({
              success: false,
              error: 'Category not found'
            });
          }
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get(`/categories/${categoryId}`);
  } catch (error) {
    console.error(`Error fetching category details for ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Obtener libros por categoría
 * @param {string} categoryId - ID de la categoría
 * @param {Object} params - Parámetros adicionales (paginación, filtros, etc.)
 * @returns {Promise} - Promesa con los libros de la categoría
 */
export const getBooksByCategory = async (categoryId, params = {}) => {
  try {
    const { page = 1, limit = 12, sort = 'newest', ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getBooksByCategory: ${categoryId}`);
      
      // Simulamos filtrado por categoría
      const filteredBooks = mockBooks.filter(book => 
        book.category.toLowerCase() === categoryId.toLowerCase() ||
        book.categories?.includes(categoryId.toLowerCase())
      );
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              books: paginatedBooks,
              pagination: {
                total: filteredBooks.length,
                page,
                limit,
                totalPages: Math.ceil(filteredBooks.length / limit)
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
    return await http.get(`/categories/${categoryId}/books?${queryParams.toString()}`);
  } catch (error) {
    console.error(`Error fetching books for category ${categoryId}:`, error);
    throw error;
  }
};

export default {
  getAllCategories,
  getFeaturedCategories,
  getCategoryDetails,
  getBooksByCategory
};