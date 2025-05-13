/**
 * API para operaciones relacionadas con pedidos
 */
import http from '../apiConfig';

// Simulamos algunos pedidos para desarrollo
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2023-10-15T10:30:00Z',
    status: 'completed',
    total: 12500,
    items: [
      { bookId: 1, title: 'تمام الرفعة في اجادة خط الرقعة', quantity: 1, price: 5000 },
      { bookId: 2, title: 'أساسيات الخط العربي', quantity: 2, price: 3500 }
    ],
    shipping: {
      method: 'standard',
      cost: 500,
      address: {
        name: 'محمد أحمد',
        street: 'شارع الحمراء',
        city: 'بيروت',
        country: 'لبنان',
        postalCode: '1107'
      }
    },
    payment: {
      method: 'credit_card',
      status: 'paid'
    }
  },
  {
    id: 'ORD-002',
    date: '2023-11-05T14:45:00Z',
    status: 'processing',
    total: 8700,
    items: [
      { bookId: 8, title: 'صحيح البخاري', quantity: 1, price: 6500 },
      { bookId: 10, title: 'سنن أبي داود', quantity: 1, price: 1700 }
    ],
    shipping: {
      method: 'express',
      cost: 500,
      address: {
        name: 'محمد أحمد',
        street: 'شارع الحمراء',
        city: 'بيروت',
        country: 'لبنان',
        postalCode: '1107'
      }
    },
    payment: {
      method: 'paypal',
      status: 'paid'
    }
  },
  {
    id: 'ORD-003',
    date: '2023-12-01T09:15:00Z',
    status: 'shipped',
    total: 4500,
    items: [
      { bookId: 5, title: 'جماليات الخط العربي', quantity: 1, price: 4500 }
    ],
    shipping: {
      method: 'standard',
      cost: 0, // Envío gratuito
      address: {
        name: 'محمد أحمد',
        street: 'شارع الحمراء',
        city: 'بيروت',
        country: 'لبنان',
        postalCode: '1107'
      }
    },
    payment: {
      method: 'credit_card',
      status: 'paid'
    }
  }
];

/**
 * Obtener todos los pedidos del usuario
 * @param {Object} params - Parámetros de consulta (paginación, filtros, etc.)
 * @returns {Promise} - Promesa con los pedidos
 */
export const getOrders = async (params = {}) => {
  try {
    const { page = 1, limit = 10, status, ...filters } = params;
    
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] getOrders');
      
      // Filtramos por estado si se proporciona
      let filteredOrders = mockOrders;
      if (status) {
        filteredOrders = mockOrders.filter(order => order.status === status);
      }
      
      // Simulamos paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              orders: paginatedOrders,
              pagination: {
                total: filteredOrders.length,
                page,
                limit,
                totalPages: Math.ceil(filteredOrders.length / limit)
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
    if (status) queryParams.append('status', status);
    
    // Añadimos filtros adicionales
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    // En producción, hacemos la llamada real
    return await http.get(`/orders?${queryParams.toString()}`);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Obtener detalles de un pedido específico
 * @param {string} orderId - ID del pedido
 * @returns {Promise} - Promesa con los detalles del pedido
 */
export const getOrderDetails = async (orderId) => {
  try {
    // En desarrollo, usamos datos simulados
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] getOrderDetails: ${orderId}`);
      
      // Simulamos la búsqueda del pedido
      const order = mockOrders.find(order => order.id === orderId);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          if (order) {
            resolve({ 
              success: true, 
              data: order
            });
          } else {
            resolve({
              success: false,
              error: 'Order not found'
            });
          }
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.get(`/orders/${orderId}`);
  } catch (error) {
    console.error(`Error fetching order details for ${orderId}:`, error);
    throw error;
  }
};

/**
 * Crear un nuevo pedido
 * @param {Object} orderData - Datos del pedido
 * @returns {Promise} - Promesa con el resultado
 */
export const createOrder = async (orderData) => {
  try {
    // En desarrollo, simulamos la creación de un pedido
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Mock] createOrder', orderData);
      
      // Generamos un ID único para el pedido
      const orderId = `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      // Simulamos el nuevo pedido
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        status: 'pending',
        ...orderData
      };
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              orderId,
              message: 'Order created successfully',
              order: newOrder
            }
          });
        }, 500);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.post('/orders', orderData);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Cancelar un pedido
 * @param {string} orderId - ID del pedido
 * @param {Object} cancelData - Datos de cancelación (motivo, etc.)
 * @returns {Promise} - Promesa con el resultado
 */
export const cancelOrder = async (orderId, cancelData = {}) => {
  try {
    // En desarrollo, simulamos la cancelación de un pedido
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Mock] cancelOrder: ${orderId}`, cancelData);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: {
              orderId,
              message: 'Order cancelled successfully',
              status: 'cancelled'
            }
          });
        }, 300);
      });
    }
    
    // En producción, hacemos la llamada real
    return await http.post(`/orders/${orderId}/cancel`, cancelData);
  } catch (error) {
    console.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
};

export default {
  getOrders,
  getOrderDetails,
  createOrder,
  cancelOrder
};