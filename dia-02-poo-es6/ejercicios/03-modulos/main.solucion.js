// Ejecuta con: node main.solucion.js
import Formulario from './Formulario.solucion.js';

const f = new Formulario('ana@ejemplo.com', '5512345678');
console.log('¿Formulario válido?', f.esValido()); // true
