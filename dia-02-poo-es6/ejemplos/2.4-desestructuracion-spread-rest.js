// Ejemplo del manual, ficha 2.4. Ejecuta con: node 2.4-desestructuracion-spread-rest.js
// Llamadas agregadas al final para ver la salida.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const usuario = { id: 1, nombre: 'Sara', rol: 'admin', activo: true };
const { nombre, rol: cargo, pais = 'MX' } = usuario;

const numeros = [10, 20, 30, 40];
const [primero, segundo, ...resto] = numeros;

const base = { a: 1, b: 2 };
const extendido = { ...base, c: 3 }; // clonación superficial + extensión

function sumarTodos(...valores) {
  return valores.reduce((acc, n) => acc + n, 0);
}
sumarTodos(1, 2, 3, 4); // 10

// --- llamadas agregadas ---
console.log({ nombre, cargo, pais });
console.log({ primero, segundo, resto });
console.log(extendido);
console.log(sumarTodos(1, 2, 3, 4));
