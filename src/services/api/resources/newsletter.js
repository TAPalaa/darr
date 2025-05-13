/**
 * API para operaciones relacionadas con la newsletter
 */
import http from '../apiConfig';

/**
 * Suscribir un correo electrónico a la newsletter
 * @param {string} email - Correo electrónico para suscribir
 * @param {Object} additionalData - Datos adicionales (nombre, preferencias, etc.)
 * @returns {Promise} - Promesa con el resultado de la suscripción
 */
export const subscribeToNewsletter = async (email, additionalData = {}) => {
  try {
    // En desarrollo, simulamos una respuesta exitosa
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] subscribeToNewsletter: ${email}`);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulamos validación de correo electrónico
          if (!email || !email.includes('@') || !email.includes('.')) {
            resolve({
              success: false,
              error: 'Invalid email address'
            });
            return;
          }
          
          resolve({ 
            success: true, 
            data: {
              message: 'Subscription successful',
              email
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.post('/newsletter/subscribe', { 
      email, 
      ...additionalData 
    });
  } catch (error) {
    console.error(`Error subscribing email ${email} to newsletter:`, error);
    throw error;
  }
};

/**
 * Cancelar la suscripción de un correo electrónico
 * @param {string} email - Correo electrónico para cancelar
 * @param {string} token - Token de verificación
 * @returns {Promise} - Promesa con el resultado de la cancelación
 */
export const unsubscribeFromNewsletter = async (email, token) => {
  try {
    // En desarrollo, simulamos una respuesta exitosa
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] unsubscribeFromNewsletter: ${email}`);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              message: 'Unsubscription successful',
              email
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.post('/newsletter/unsubscribe', { email, token });
  } catch (error) {
    console.error(`Error unsubscribing email ${email} from newsletter:`, error);
    throw error;
  }
};

export default {
  subscribeToNewsletter,
  unsubscribeFromNewsletter
};