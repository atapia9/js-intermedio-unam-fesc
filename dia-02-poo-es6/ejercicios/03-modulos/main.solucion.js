// Ejecuta con: node main.solucion.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

import Formulario from './Formulario.solucion.js';

const f = new Formulario('ana@ejemplo.com', '5512345678');
console.log('¿Formulario válido?', f.esValido()); // true
