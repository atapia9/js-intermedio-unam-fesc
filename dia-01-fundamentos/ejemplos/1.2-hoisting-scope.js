// Ejemplo del manual, ficha 1.2. Ejecuta con: node 1.2-hoisting-scope.js
// Adaptación: la lectura de `b` va dentro de try/catch para que el ejemplo siga ejecutándose; en el manual esa línea lanza el ReferenceError.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

console.log(a); // undefined (hoisting de var)
var a = 10;

try { console.log(b); } catch (e) { console.log(e.message); } // ReferenceError: Cannot access 'b' before initialization
let b = 20;

{
  let x = 'bloque';
  console.log(x); // 'bloque'
}
console.log(typeof x); // 'undefined', x no existe fuera del bloque
