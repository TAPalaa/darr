/**
 * Punto de entrada principal para todos los servicios API
 */

// Importamos la configuración HTTP
import http from './apiConfig';

// Importamos todos los recursos de la API
import booksApi from './resources/books';
import categoriesApi from './resources/categories';
import cartApi from './resources/cart';
import newsletterApi from './resources/newsletter';
import authorsApi from './resources/authors';
import publishersApi from './resources/publishers';
import ordersApi from './resources/orders';
import userApi from './resources/user';

// Exportamos todos los servicios API individualmente
export {
  booksApi,
  categoriesApi,
  cartApi,
  newsletterApi,
  authorsApi,
  publishersApi,
  ordersApi,
  userApi,
  http,
};

// Para mantener compatibilidad con el código existente
export const bookApi = booksApi;
export const categoryApi = categoriesApi;
export const homeApi = {
  getFeaturedBooks: booksApi.getFeaturedBooks,
  getBookOfTheWeek: booksApi.getBookOfTheWeek,
  getCategories: categoriesApi.getFeaturedCategories
};

// Exportamos un objeto con todos los servicios para facilitar el uso
const api = {
  books: booksApi,
  categories: categoriesApi,
  cart: cartApi,
  newsletter: newsletterApi,
  authors: authorsApi,
  publishers: publishersApi,
  orders: ordersApi,
  user: userApi,
  
  // Para mantener compatibilidad con el código existente
  book: booksApi,
  category: categoriesApi,
  home: homeApi,
  
  http,
};

export default api;