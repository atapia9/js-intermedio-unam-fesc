// Ejercicio 2.3 — Normalización de datos de API
//
// Videos de apoyo (ficha 2.4 del README del día):
//   - JavaScript moderno: Desestructuración y Operador Spread: https://www.youtube.com/watch?v=aBcYXgtlH4E
//   - Curso JavaScript Moderno (ES6) #16 – Destructuring: https://www.youtube.com/watch?v=PQinHHCFsVc
//   - Desestructuración avanzada en JavaScript: parámetros Rest: https://www.youtube.com/watch?v=8OmDRKk1PSE
//
// Enunciado (manual del curso):
//   1. Se entrega un arreglo de objetos 'crudo' proveniente de una API simulada, con campos anidados (dirección, contacto).
//   2. Usando desestructuración anidada, extrae en una sola línea el nombre, la ciudad y el teléfono de cada registro.
//   3. Usando spread, crea una copia del arreglo donde a cada usuario se le agregue un campo activo: true sin mutar el arreglo original.
//
// Ejecuta con: node ejercicio-2.3-normalizacion-de-datos.js
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

// Datos "crudos" de una API simulada, con campos anidados (dirección y contacto).
const usuariosCrudos = [
  { id: 1, nombre: 'Sara', direccion: { calle: 'Reforma 10', ciudad: 'Ciudad de México' }, contacto: { telefono: '55 1234 5678', correo: 'sara@ejemplo.com' } },
  { id: 2, nombre: 'Luis', direccion: { calle: 'Juárez 22', ciudad: 'Guadalajara' }, contacto: { telefono: '33 8765 4321', correo: 'luis@ejemplo.com' } },
  { id: 3, nombre: 'Marta', direccion: { calle: 'Hidalgo 5', ciudad: 'Monterrey' }, contacto: { telefono: '81 5555 0000', correo: 'marta@ejemplo.com' } },
];

// TODO 1: con desestructuración anidada, extrae en UNA sola línea el nombre, la ciudad y el teléfono de cada registro.
//         Pista: for (const { ... } of usuariosCrudos) { ... }

// TODO 2: con spread, crea una copia del arreglo donde cada usuario tenga además activo: true, SIN mutar el original.
//         Comprueba que usuariosCrudos no cambió.

// ---------------------------------------------------------------------------
// Solución sugerida (inténtalo antes de leerla):
//
// for (const { nombre, direccion: { ciudad }, contacto: { telefono } } of usuariosCrudos) {
//   console.log(nombre, ciudad, telefono);
// }
//
// const usuariosActivos = usuariosCrudos.map((usuario) => ({ ...usuario, activo: true }));
// console.log(usuariosActivos[0].activo, 'activo' in usuariosCrudos[0]); // true false
