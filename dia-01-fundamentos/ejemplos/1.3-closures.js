// Ejemplo del manual, ficha 1.3. Ejecuta con: node 1.3-closures.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

function crearContador() {
  let contador = 0;
  return function incrementar() {
    contador++;
    return contador;
  };
}

const contadorA = crearContador();
console.log(contadorA()); // 1
console.log(contadorA()); // 2

const contadorB = crearContador();
console.log(contadorB()); // 1 (cuenta independiente)
