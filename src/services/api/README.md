# Estructura de la API

Este directorio contiene todos los servicios de API para la aplicación. La estructura está organizada de la siguiente manera:

## Archivos principales

- `apiConfig.js`: Configuración base para todas las llamadas API, incluyendo la URL base, encabezados predeterminados y funciones de utilidad para realizar solicitudes HTTP.
- `index.js`: Punto de entrada principal que exporta todos los servicios API.

## Recursos

Todos los recursos de la API están organizados en la carpeta `resources`, con un archivo separado para cada tipo de recurso:

- `books.js`: Operaciones relacionadas con libros (obtener libros, detalles de libros, búsqueda, etc.).
- `categories.js`: Operaciones relacionadas con categorías de libros.
- `authors.js`: Operaciones relacionadas con autores.
- `publishers.js`: Operaciones relacionadas con editoriales.
- `cart.js`: Operaciones relacionadas con el carrito de compras.
- `orders.js`: Operaciones relacionadas con pedidos.
- `user.js`: Operaciones relacionadas con el perfil de usuario, direcciones, lista de deseos, etc.
- `newsletter.js`: Operaciones relacionadas con la suscripción a la newsletter.

## Uso

Para usar estos servicios en los componentes, puedes importarlos de la siguiente manera:

```javascript
// Importar un servicio específico
import { booksApi } from '../services/api';

// Usar el servicio
const fetchBooks = async () => {
  try {
    const response = await booksApi.getBooks({ limit: 10 });
    if (response.success) {
      setBooks(response.data.books);
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};
```

O puedes importar el objeto API completo:

```javascript
// Importar el objeto API completo
import api from '../services/api';

// Usar los servicios
const fetchCategoryBooks = async (categoryId) => {
  try {
    const response = await api.categories.getBooksByCategory(categoryId);
    if (response.success) {
      setCategoryBooks(response.data.books);
    }
  } catch (error) {
    console.error('Error fetching category books:', error);
  }
};
```

## Simulación de API para desarrollo

En el entorno de desarrollo, todas las llamadas API son simuladas para facilitar el desarrollo sin depender de un backend real. Esto se controla mediante la variable de entorno `REACT_APP_MOCK_API` en el archivo `.env.development`.

Los datos simulados se encuentran en el archivo `../mockData.js`.