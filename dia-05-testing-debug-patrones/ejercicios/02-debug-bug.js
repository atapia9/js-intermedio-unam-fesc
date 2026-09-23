// Ejercicio 2 — Encuentra y corrige el bug usando el debugger
//
// Videos de apoyo (ficha 5.3 del README del día):
//   - Debugging como un profesional en JavaScript con DevTools del navegador – Programación en español: https://www.youtube.com/watch?v=ps1WhgelV_E
//   - Curso de JavaScript #10: Debug y DevTools: https://www.youtube.com/watch?v=Oz3InVBI_K4
//   - Depurar JavaScript con el navegador y con Visual Studio Code: https://www.youtube.com/watch?v=CRXMli2ZkS8
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
