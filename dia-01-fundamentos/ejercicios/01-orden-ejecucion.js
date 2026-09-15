// Ejercicio 1 — Orden de ejecución
//
// Enunciado:
// Antes de ejecutar este archivo, escribe en un papel (o comentario) el orden
// en que crees que se imprimirán los números. Luego ejecuta con:
//   node 01-orden-ejecucion.js
// y compara tu predicción contra la salida real.

console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
  .then(() => console.log('C'))
  .then(() => console.log('D'));

console.log('E');

setTimeout(() => console.log('F'), 0);

Promise.resolve().then(() => console.log('G'));

console.log('H');

// ---------------------------------------------------------------------------
// Solución sugerida (no la leas antes de intentarlo):
// Orden real: A, E, H, C, G, D, B, F
//
// Razonamiento:
// 1) Se ejecuta todo el código síncrono en orden: A, E, H.
// 2) Se vacía la microtask queue en orden de inserción: C (primer .then),
//    luego G (la otra promesa), y solo después D (el segundo .then, que se
//    encoló cuando se resolvió el primero).
// 3) Finalmente se procesan las macrotasks (setTimeout) en orden de
//    inserción: B, F.
