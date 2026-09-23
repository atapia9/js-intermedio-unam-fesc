// Ejemplo del manual, ficha 1.1. Ejecuta con: node 1.1-event-loop.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

console.log('1: inicio');

setTimeout(() => console.log('2: setTimeout'), 0);

Promise.resolve().then(() => console.log('3: promesa'));

console.log('4: fin');

// Orden real de salida: 1, 4, 3, 2
// Las microtareas (promesas) siempre se resuelven antes
// que las macrotareas (setTimeout), aunque el timeout sea 0.
