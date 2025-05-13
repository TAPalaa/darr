/**
 * Configuración base para las llamadas API
 */

// URL base para todas las llamadas API
export const API_BASE_URL = 'https://api.albeyruti.com/v1';

// Tiempo de espera predeterminado para las solicitudes (en milisegundos)
export const API_TIMEOUT = 10000;

// Encabezados predeterminados para todas las solicitudes
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/**
 * Función para realizar solicitudes HTTP
 * @param {string} endpoint - Punto final de la API
 * @param {Object} options - Opciones de la solicitud
 * @returns {Promise} - Promesa con la respuesta
 */
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: DEFAULT_HEADERS,
    timeout: API_TIMEOUT,
  };
  
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    // En un entorno de desarrollo, podemos simular las respuestas
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
      console.log(`[API Mock] ${options.method || 'GET'} ${url}`);
      // Aquí podríamos implementar un sistema de simulación
      return mockApiResponse(endpoint, options);
    }

    const response = await fetch(url, fetchOptions);
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    // Parsear la respuesta como JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Función para simular respuestas API en desarrollo
 * @param {string} endpoint - Punto final de la API
 * @param {Object} options - Opciones de la solicitud
 * @returns {Promise} - Promesa con la respuesta simulada
 */
const mockApiResponse = (endpoint, options) => {
  // Simulamos un retraso de red
  return new Promise((resolve) => {
    setTimeout(() => {
      // Aquí podríamos tener una lógica más compleja para diferentes endpoints
      // Por ahora, simplemente devolvemos datos de ejemplo
      resolve({ success: true, message: 'Datos simulados', data: {} });
    }, 300);
  });
};

/**
 * Métodos HTTP comunes
 */
export const http = {
  get: (endpoint, options = {}) => fetchApi(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => fetchApi(endpoint, { 
    ...options, 
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint, data, options = {}) => fetchApi(endpoint, { 
    ...options, 
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint, options = {}) => fetchApi(endpoint, { ...options, method: 'DELETE' }),
};

export default http;