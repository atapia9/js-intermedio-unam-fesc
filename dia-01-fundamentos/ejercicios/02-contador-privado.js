// Ejercicio 2 — Contador con estado privado
//
// Videos de apoyo (ficha 1.3 del README del día):
//   - Closures en JavaScript: qué son y cómo funcionan: https://www.youtube.com/watch?v=xa8lhVwQBw4
//   - 3 ejemplos REALES de Closures en JavaScript: https://www.youtube.com/watch?v=ubS-ejTrSRc
//   - ¿Qué son los Closures y por qué dan tanto miedo?: https://www.youtube.com/watch?v=bPZpjI2tzRo
//
// Enunciado:
// Implementa la función `crearContadorRango(min, max)` que devuelva un
// objeto con los métodos:
//   - incrementar(): sube el contador en 1, sin pasar de `max`.
//   - decrementar(): baja el contador en 1, sin bajar de `min`.
//   - valor(): devuelve el valor actual.
// El valor interno del contador debe ser inaccesible desde fuera (usa un
// closure, no una propiedad pública del objeto).
//
// Ejemplo de uso esperado:
//   const c = crearContadorRango(0, 3);
//   c.incrementar(); c.incrementar(); c.incrementar(); c.incrementar();
//   c.valor(); // 3 (no pasa de max)
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

function crearContadorRango(min, max) {
  // TODO: implementa aquí usando un closure
}

// ---- Pruebas manuales ----
const contador = crearContadorRango(0, 3);
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar(); // no debe pasar de 3
console.log('Valor esperado 3, obtenido:', contador.valor());
contador.decrementar();
contador.decrementar();
contador.decrementar();
contador.decrementar(); // no debe bajar de 0
console.log('Valor esperado 0, obtenido:', contador.valor());

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// function crearContadorRango(min, max) {
//   let valorActual = min;
//   return {
//     incrementar() {
//       if (valorActual < max) valorActual++;
//       return valorActual;
//     },
//     decrementar() {
//       if (valorActual > min) valorActual--;
//       return valorActual;
//     },
//     valor() {
//       return valorActual;
//     },
//   };
// }
