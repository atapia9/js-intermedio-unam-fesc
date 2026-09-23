// Responsabilidad: TODO — describe en una frase qué hace este archivo.
//
// Contrato (exports nombrados). El carrito es un arreglo de { ...producto, cantidad } y las funciones NO lo modifican: devuelven uno nuevo.
//   agregarProducto(carrito, producto, cantidad = 1)   -> nuevo carrito; si el producto ya estaba, suma las cantidades;
//                                                         RangeError si la cantidad no es un entero mayor que 0
//   eliminarProducto(carrito, id)                      -> nuevo carrito sin ese producto; si no existía, devuelve un carrito igual (sin error)
//   calcularTotal(carrito)                             -> suma de precio * cantidad (0 si el carrito está vacío)
//
// Ejercicio 2.4 — videos de apoyo (ficha 2.5 del README del día):
//   - Import y Export en JavaScript (ES Modules) – Explicación: https://www.youtube.com/watch?v=0t-Le4kdaMg
//   - Javascript #14: Módulos (export, export default, import): https://www.youtube.com/watch?v=ATBCZz7eWU0
//   - Curso JavaScript: 33. Módulos (import / export) – jonmircha: https://www.youtube.com/watch?v=0GEUyQXe3NI
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

// TODO
