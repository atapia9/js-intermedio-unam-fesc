// Ejercicio 2 — Encuentra y corrige el bug usando el debugger
//
// Enunciado:
// La función `calcularPromedio` debería devolver el promedio de un arreglo
// de calificaciones, pero tiene un bug. Usa `debugger;` (ejecutando este
// archivo con `node inspect 02-debug-bug.js`, o pegando el código en
// DevTools) o simplemente añade console.log para encontrar el error.
// No mires la solución sugerida hasta intentarlo.

function calcularPromedio(calificaciones) {
  let suma = 0;
  for (let i = 0; i <= calificaciones.length; i++) {
    // BUG: <= en vez de < causa un acceso fuera de rango (undefined)
    suma += calificaciones[i];
  }
  return suma / calificaciones.length;
}

console.log('Promedio:', calcularPromedio([8, 9, 7, 10])); // debería ser 8.5, da NaN

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// function calcularPromedio(calificaciones) {
//   let suma = 0;
//   for (let i = 0; i < calificaciones.length; i++) { // corregido: < en vez de <=
//     suma += calificaciones[i];
//   }
//   return suma / calificaciones.length;
// }
