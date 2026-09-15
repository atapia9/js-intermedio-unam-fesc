// Día 1 — Ejemplo: Hoisting y diferencias var / let / const
// Ejecuta con: node 02-hoisting-scope.js

function demoVar() {
  console.log(mensaje); // undefined (hoisted e inicializado)
  var mensaje = 'hola desde var';
  console.log(mensaje);
}
demoVar();

function demoLet() {
  try {
    console.log(mensaje); // ReferenceError: zona muerta temporal (TDZ)
  } catch (err) {
    console.log('Error esperado:', err.message);
  }
  let mensaje = 'hola desde let';
  console.log(mensaje);
}
demoLet();

// Scope de bloque vs scope de función
function demoScope() {
  if (true) {
    var varDeFuncion = 'soy visible fuera del if';
    let letDeBloque = 'solo visible dentro del if';
    console.log(letDeBloque);
  }
  console.log(varDeFuncion); // funciona: var no respeta bloques
  try {
    console.log(letDeBloque); // ReferenceError: no existe fuera del bloque
  } catch (err) {
    console.log('Error esperado:', err.message);
  }
}
demoScope();

// const no permite reasignar el binding, pero sí mutar el contenido
const persona = { nombre: 'Ada' };
persona.nombre = 'Ada Lovelace'; // permitido: se muta el objeto
console.log(persona);

try {
  persona = {}; // TypeError: Assignment to constant variable
} catch (err) {
  console.log('Error esperado:', err.message);
}
