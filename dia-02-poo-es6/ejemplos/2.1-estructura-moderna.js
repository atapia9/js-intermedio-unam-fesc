// Ejemplo del manual, ficha 2.1. Ejecuta con: node 2.1-estructura-moderna.js
// Llamadas agregadas al final para ver la salida.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

// Template literals
const nombre = 'Luis';
const saludo = `Hola, ${nombre}. Hoy es ${new Date().toLocaleDateString()}`;

// Arrow functions con retorno implícito
const doble = (n) => n * 2;

// Parámetros por defecto
function crearUsuario(nombre, rol = 'invitado') { return { nombre, rol }; }

// --- llamadas agregadas ---
console.log(saludo);
console.log(doble(4));
console.log(crearUsuario('Ana'), crearUsuario('Luis', 'admin'));
