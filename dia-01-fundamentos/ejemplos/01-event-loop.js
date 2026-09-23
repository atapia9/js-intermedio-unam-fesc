// Día 1 — Ejemplo: Call Stack, Microtask Queue y Callback Queue
// Ejecuta con: node 01-event-loop.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

console.log('1: síncrono (call stack)');

setTimeout(() => {
  console.log('4: setTimeout (callback queue / macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: promesa resuelta (microtask queue)');
});

console.log('2: síncrono (call stack)');

// Orden real de salida: 1, 2, 3, 4
// La call stack se vacía primero (1, 2). Luego el event loop drena
// TODA la microtask queue (3) antes de tomar la siguiente macrotask (4),
// aunque el setTimeout tenga delay 0.
