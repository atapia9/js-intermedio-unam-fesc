// Día 1 — Ejemplo: Closures
// Ejecuta con: node 03-closures.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

// 1. Encapsulamiento de estado privado
function crearContador(inicial = 0) {
  let conteo = inicial; // "privado": solo accesible vía las funciones devueltas
  return {
    incrementar: () => ++conteo,
    decrementar: () => --conteo,
    valor: () => conteo,
  };
}

const contador = crearContador();
contador.incrementar();
contador.incrementar();
contador.decrementar();
console.log('Contador:', contador.valor()); // 1

// 2. Fábrica de funciones
function crearMultiplicador(factor) {
  return function (numero) {
    return numero * factor;
  };
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);
console.log('Duplicar 5:', duplicar(5)); // 10
console.log('Triplicar 5:', triplicar(5)); // 15

// 3. Memoización con closures
function memoizar(fn) {
  const cache = new Map();
  return function (...args) {
    const clave = JSON.stringify(args);
    if (cache.has(clave)) {
      console.log('(desde cache)');
      return cache.get(clave);
    }
    const resultado = fn(...args);
    cache.set(clave, resultado);
    return resultado;
  };
}

const sumaLenta = (a, b) => {
  for (let i = 0; i < 1e7; i++); // simula trabajo costoso
  return a + b;
};
const sumaMemoizada = memoizar(sumaLenta);
console.log('Suma:', sumaMemoizada(2, 3));
console.log('Suma (cacheada):', sumaMemoizada(2, 3));
