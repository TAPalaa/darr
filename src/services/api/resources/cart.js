/**
 * API para operaciones relacionadas con el carrito de compras
 */
import http from '../apiConfig';
import { mockBooks } from '../../mockData';

// Simulamos un carrito de compras para desarrollo
let mockCart = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  total: 0
};

// Función para recalcular totales del carrito
const recalculateCart = () => {
  mockCart.totalItems = mockCart.items.reduce((sum, item) => sum + item.quantity, 0);
  mockCart.subtotal = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  mockCart.total = mockCart.subtotal + mockCart.shipping;
  return mockCart;
};

/**
 * Obtener el contenido del carrito
 * @returns {Promise} - Promesa con el contenido del carrito
 */
export const getCart = async () => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getCart');
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockCart
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get('/cart');
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

/**
 * Añadir un producto al carrito
 * @param {Object} item - Producto a añadir
 * @param {number|string} item.bookId - ID del libro
 * @param {number} item.quantity - Cantidad a añadir
 * @returns {Promise} - Promesa con el carrito actualizado
 */
export const addToCart = async (item) => {
  try {
    const { bookId, quantity = 1 } = item;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] addToCart: ${bookId}, quantity: ${quantity}`);
      
      // Buscamos el libro en los datos simulados
      const book = mockBooks.find(b => b.id.toString() === bookId.toString());
      
      if (!book) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: false,
              error: 'Book not found'
            });
          }, 300);
        });
      }
      
      // Verificamos si el producto ya está en el carrito
      const existingItemIndex = mockCart.items.findIndex(i => i.bookId.toString() === bookId.toString());
      
      if (existingItemIndex >= 0) {
        // Actualizamos la cantidad
        mockCart.items[existingItemIndex].quantity += quantity;
      } else {
        // Añadimos el nuevo producto
        mockCart.items.push({
          bookId,
          title: book.title,
          author: book.author,
          image: book.image,
          price: parseInt(book.price),
          quantity
        });
      }
      
      // Recalculamos totales
      recalculateCart();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockCart
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.post('/cart/items', item);
  } catch (error) {
    console.error(`Error adding item ${item.bookId} to cart:`, error);
    throw error;
  }
};

/**
 * Actualizar la cantidad de un producto en el carrito
 * @param {string|number} bookId - ID del libro
 * @param {number} quantity - Nueva cantidad
 * @returns {Promise} - Promesa con el carrito actualizado
 */
export const updateCartItem = async (bookId, quantity) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] updateCartItem: ${bookId}, quantity: ${quantity}`);
      
      // Buscamos el producto en el carrito
      const itemIndex = mockCart.items.findIndex(item => item.bookId.toString() === bookId.toString());
      
      if (itemIndex === -1) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: false,
              error: 'Item not found in cart'
            });
          }, 300);
        });
      }
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o negativa, eliminamos el producto
        mockCart.items.splice(itemIndex, 1);
      } else {
        // Actualizamos la cantidad
        mockCart.items[itemIndex].quantity = quantity;
      }
      
      // Recalculamos totales
      recalculateCart();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockCart
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.put(`/cart/items/${bookId}`, { quantity });
  } catch (error) {
    console.error(`Error updating cart item ${bookId}:`, error);
    throw error;
  }
};

/**
 * Eliminar un producto del carrito
 * @param {string|number} bookId - ID del libro a eliminar
 * @returns {Promise} - Promesa con el carrito actualizado
 */
export const removeFromCart = async (bookId) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] removeFromCart: ${bookId}`);
      
      // Eliminamos el producto del carrito
      mockCart.items = mockCart.items.filter(item => item.bookId.toString() !== bookId.toString());
      
      // Recalculamos totales
      recalculateCart();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockCart
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.delete(`/cart/items/${bookId}`);
  } catch (error) {
    console.error(`Error removing item ${bookId} from cart:`, error);
    throw error;
  }
};

/**
 * Vaciar el carrito
 * @returns {Promise} - Promesa con el resultado
 */
export const clearCart = async () => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] clearCart');
      
      // Vaciamos el carrito
      mockCart.items = [];
      
      // Recalculamos totales
      recalculateCart();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockCart
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.delete('/cart/items');
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};