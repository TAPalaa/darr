/**
 * API para operaciones relacionadas con usuarios
 */
import http from '../apiConfig';

// Usuario simulado para desarrollo
const mockUser = {
  id: 'usr-123',
  name: 'محمد أحمد',
  email: 'mohammed@example.com',
  phone: '+961 1 234 567',
  addresses: [
    {
      id: 'addr-1',
      name: 'محمد أحمد',
      street: 'شارع الحمراء',
      city: 'بيروت',
      country: 'لبنان',
      postalCode: '1107',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'محمد أحمد',
      street: 'شارع المنارة',
      city: 'طرابلس',
      country: 'لبنان',
      postalCode: '1300',
      isDefault: false
    }
  ],
  wishlist: [1, 8, 11, 17], // IDs de libros en la lista de deseos
  preferences: {
    newsletter: true,
    language: 'ar',
    notifications: {
      email: true,
      sms: false
    }
  }
};

/**
 * Obtener perfil del usuario
 * @returns {Promise} - Promesa con los datos del perfil
 */
export const getUserProfile = async () => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getUserProfile');
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockUser
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get('/user/profile');
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Actualizar perfil del usuario
 * @param {Object} profileData - Datos del perfil a actualizar
 * @returns {Promise} - Promesa con el resultado
 */
export const updateUserProfile = async (profileData) => {
  try {
    // En desarrollo, simulamos la actualización del perfil
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] updateUserProfile', profileData);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              ...mockUser,
              ...profileData,
              message: 'Profile updated successfully'
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.put('/user/profile', profileData);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Obtener direcciones del usuario
 * @returns {Promise} - Promesa con las direcciones
 */
export const getUserAddresses = async () => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getUserAddresses');
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: mockUser.addresses
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get('/user/addresses');
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    throw error;
  }
};

/**
 * Añadir una nueva dirección
 * @param {Object} addressData - Datos de la dirección
 * @returns {Promise} - Promesa con el resultado
 */
export const addUserAddress = async (addressData) => {
  try {
    // En desarrollo, simulamos la adición de una dirección
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] addUserAddress', addressData);
      
      // Generamos un ID único para la dirección
      const addressId = `addr-${Math.floor(Math.random() * 1000)}`;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              id: addressId,
              ...addressData,
              message: 'Address added successfully'
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.post('/user/addresses', addressData);
  } catch (error) {
    console.error('Error adding user address:', error);
    throw error;
  }
};

/**
 * Actualizar una dirección existente
 * @param {string} addressId - ID de la dirección
 * @param {Object} addressData - Datos actualizados de la dirección
 * @returns {Promise} - Promesa con el resultado
 */
export const updateUserAddress = async (addressId, addressData) => {
  try {
    // En desarrollo, simulamos la actualización de una dirección
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] updateUserAddress: ${addressId}`, addressData);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              id: addressId,
              ...addressData,
              message: 'Address updated successfully'
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.put(`/user/addresses/${addressId}`, addressData);
  } catch (error) {
    console.error(`Error updating address ${addressId}:`, error);
    throw error;
  }
};

/**
 * Eliminar una dirección
 * @param {string} addressId - ID de la dirección
 * @returns {Promise} - Promesa con el resultado
 */
export const deleteUserAddress = async (addressId) => {
  try {
    // En desarrollo, simulamos la eliminación de una dirección
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] deleteUserAddress: ${addressId}`);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              message: 'Address deleted successfully'
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.delete(`/user/addresses/${addressId}`);
  } catch (error) {
    console.error(`Error deleting address ${addressId}:`, error);
    throw error;
  }
};

/**
 * Obtener lista de deseos del usuario
 * @returns {Promise} - Promesa con la lista de deseos
 */
export const getUserWishlist = async () => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getUserWishlist');
      
      // Simulamos la obtención de detalles de los libros en la lista de deseos
      const { mockBooks } = await import('../../mockData');
      const wishlistBooks = mockUser.wishlist.map(bookId => 
        mockBooks.find(book => book.id === bookId)
      ).filter(Boolean);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: wishlistBooks
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get('/user/wishlist');
  } catch (error) {
    console.error('Error fetching user wishlist:', error);
    throw error;
  }
};

/**
 * Añadir un libro a la lista de deseos
 * @param {string|number} bookId - ID del libro
 * @returns {Promise} - Promesa con el resultado
 */
export const addToWishlist = async (bookId) => {
  try {
    // En desarrollo, simulamos la adición a la lista de deseos
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] addToWishlist: ${bookId}`);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              message: 'Book added to wishlist',
              bookId
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.post('/user/wishlist', { bookId });
  } catch (error) {
    console.error(`Error adding book ${bookId} to wishlist:`, error);
    throw error;
  }
};

/**
 * Eliminar un libro de la lista de deseos
 * @param {string|number} bookId - ID del libro
 * @returns {Promise} - Promesa con el resultado
 */
export const removeFromWishlist = async (bookId) => {
  try {
    // En desarrollo, simulamos la eliminación de la lista de deseos
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] removeFromWishlist: ${bookId}`);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              message: 'Book removed from wishlist',
              bookId
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.delete(`/user/wishlist/${bookId}`);
  } catch (error) {
    console.error(`Error removing book ${bookId} from wishlist:`, error);
    throw error;
  }
};

/**
 * Actualizar preferencias del usuario
 * @param {Object} preferences - Preferencias a actualizar
 * @returns {Promise} - Promesa con el resultado
 */
export const updateUserPreferences = async (preferences) => {
  try {
    // En desarrollo, simulamos la actualización de preferencias
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] updateUserPreferences', preferences);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              message: 'Preferences updated successfully',
              preferences: {
                ...mockUser.preferences,
                ...preferences
              }
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.put('/user/preferences', preferences);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

export default {
  getUserProfile,
  updateUserProfile,
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  updateUserPreferences
};