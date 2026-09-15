// Ejercicio 2 — Contador con estado privado
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
