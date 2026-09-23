// Ejercicio 5.1 — Suite de pruebas para el carrito de compras
//
// Videos de apoyo (ficha 5.2 del README del día):
//   - Jest JS tutorial en español para principiantes – Curso de Testing: https://www.youtube.com/watch?v=tgWBQZNCOT0
//   - Introducción al Testing desde cero con Jest: https://www.youtube.com/watch?v=_DzBez4qMi0
//   - ¿Cómo se escribe una buena prueba unitaria en JavaScript? 10 buenas prácticas: https://www.youtube.com/watch?v=Rqyg8kjpzX0
//
// Enunciado (manual del curso):
//   1. Retoma el módulo carrito.js de la sesión 2 (agregarProducto, eliminarProducto, calcularTotal).
//   2. Escribe al menos 5 pruebas unitarias con Jest cubriendo: carrito vacío, agregar un producto, eliminar un producto inexistente, cálculo correcto del total y manejo de cantidades negativas.
//   3. Ejecuta la suite y confirma que todas las pruebas pasan (en verde); si alguna falla, corrige el código fuente, no la prueba, salvo que la prueba esté mal planteada.
//
// Cómo empezar: copia tu `carrito.js` de la Actividad 2 (o impórtalo desde `../../../dia-02-poo-es6/ejercicios/actividad-2/tienda/carrito.js`)
// y reemplaza cada test.todo por una prueba real. Se ejecuta con: npm test (desde la raíz del repositorio).
//
// Como `carrito.js` es un módulo ES y este archivo es CommonJS, impórtalo con import() dentro de cada prueba:
//   const { agregarProducto, eliminarProducto, calcularTotal } = await import('../../../dia-02-poo-es6/ejercicios/actividad-2/tienda/carrito.js');
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

describe('carrito de compras', () => {
  test.todo('carrito vacío: calcularTotal devuelve 0');
  test.todo('agregar un producto: aparece en el carrito y suma al total');
  test.todo('eliminar un producto inexistente: no rompe ni cambia el carrito');
  test.todo('cálculo correcto del total con varios productos y cantidades');
  test.todo('manejo de cantidades negativas: se rechazan');
});
