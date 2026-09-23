// Ejercicio 2 — Refactoriza usando destructuring, spread y rest
//
// Videos de apoyo (ficha 2.4 del README del día):
//   - JavaScript moderno: Desestructuración y Operador Spread: https://www.youtube.com/watch?v=aBcYXgtlH4E
//   - Curso JavaScript Moderno (ES6) #16 – Destructuring: https://www.youtube.com/watch?v=PQinHHCFsVc
//   - Desestructuración avanzada en JavaScript: parámetros Rest: https://www.youtube.com/watch?v=8OmDRKk1PSE
//
// Enunciado:
// Refactoriza las tres funciones de abajo para que usen destructuring,
// spread y/o rest en vez de acceder a propiedades/índices manualmente.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

// Función 1: acceso manual a propiedades de objeto
function mostrarAlumno(alumno) {
  console.log(alumno.nombre + ' - ' + alumno.grupo);
}
// TODO: refactoriza usando destructuring en los parámetros

// Función 2: combinar dos arreglos de calificaciones sin duplicar código
function combinarCalificaciones(arr1, arr2) {
  const resultado = [];
  for (let i = 0; i < arr1.length; i++) resultado.push(arr1[i]);
  for (let i = 0; i < arr2.length; i++) resultado.push(arr2[i]);
  return resultado;
}
// TODO: refactoriza usando spread

// Función 3: sumar un número variable de argumentos
function sumarTodo() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) total += arguments[i];
  return total;
}
// TODO: refactoriza usando rest parameters

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// function mostrarAlumno({ nombre, grupo }) {
//   console.log(`${nombre} - ${grupo}`);
// }
//
// function combinarCalificaciones(arr1, arr2) {
//   return [...arr1, ...arr2];
// }
//
// function sumarTodo(...numeros) {
//   return numeros.reduce((total, n) => total + n, 0);
// }
