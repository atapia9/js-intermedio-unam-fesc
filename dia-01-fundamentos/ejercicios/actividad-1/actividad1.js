// Responsabilidad: TODO — describe en una frase qué hace este archivo.
//
// Actividad de aprendizaje 1 — solución de los ejercicios 1.1 a 1.4 del manual, un bloque por ejercicio.
// El contrato de cada función está en el README de la actividad.
// En cada bloque completa las tres líneas "Qué hace", "Por qué funciona" y "Concepto" con tus palabras,
// y las líneas de explicación propias del ejercicio.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

// ===== Bloque 1.1 — Predicción de salida =====
// Videos de apoyo (ficha 1.1 del README del día):
//   - La pila de ejecución (Call Stack) – JS en Español: https://www.youtube.com/watch?v=ygA5U7Wgsg8
//   - Entiende el Event Loop de JavaScript en 10 minutos: https://www.youtube.com/watch?v=XdzDDRF8_mY
//   - Qué es el Event Loop en JavaScript – paso a paso: https://www.youtube.com/watch?v=rvzItyLuh28
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
// Predicción: TODO (el orden exacto en que crees que se imprimirán las 5 líneas, ANTES de ejecutar)
// Diferencias con lo real: TODO (o "ninguna")
// Cuándo entra a la Call Stack el setTimeout de 100 ms: TODO
export function ejercicio11() {
  // TODO
}

export function ejercicio11Modificado() {
  // TODO
}

// ===== Bloque 1.2 — Refactor de var a let/const =====
// Videos de apoyo (ficha 1.2 del README del día):
//   - VAR, LET o CONST: ¿cuál debería usar? – JS en Español: https://www.youtube.com/watch?v=bvkY9ey83yY
//   - Diferencia entre var, let y const – Curso JS desde cero #4: https://www.youtube.com/watch?v=a8SJJPvkGIE
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
// Causa del bug: TODO
// Por qué basta con cambiar a let: TODO
// Justificación de const: TODO

// Código legado (se entrega así, no lo modifiques): el bug clásico de closures con var.
export function crearManejadoresLegado(n) {
  var manejadores = [];
  for (var i = 0; i < n; i++) {
    manejadores.push(function () {
      return i; // todos los "botones" muestran el mismo índice
    });
  }
  return manejadores;
}

export function crearManejadoresConLet(n) {
  // TODO
}

export function crearManejadoresConConst(n) {
  // TODO
}

// ===== Bloque 1.3 — Módulo con estado privado =====
// Videos de apoyo (ficha 1.3 del README del día):
//   - Closures en JavaScript: qué son y cómo funcionan: https://www.youtube.com/watch?v=xa8lhVwQBw4
//   - 3 ejemplos REALES de Closures en JavaScript: https://www.youtube.com/watch?v=ubS-ejTrSRc
//   - ¿Qué son los Closures y por qué dan tanto miedo?: https://www.youtube.com/watch?v=bPZpjI2tzRo
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
export function crearCuentaBancaria(saldoInicial) {
  // TODO
}

// ===== Bloque 1.4 — Corrección de contexto perdido =====
// Videos de apoyo (ficha 1.4 del README del día):
//   - This en JavaScript (bind, call, apply y más): https://www.youtube.com/watch?v=bS71_W_BDFE
//   - ¿Para qué sirve call(), bind() y apply()?: https://www.youtube.com/watch?v=OZ02GSH9QkY
//   - ¿Cómo usar call, apply y bind? This a profundidad: https://www.youtube.com/watch?v=j1Zs_o32uo4
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
// Diagnóstico: TODO
// Comparación entre bind y arrow function: TODO

// Se entrega así (no lo modifiques): un contador que muestra su valor en `pantalla` (una variable del closure,
// no una propiedad, para que siga existiendo aunque el método pierda su `this`).
export function crearContador() {
  const pantalla = [];
  return {
    valor: 0,
    pantalla,
    incrementar() {
      this.valor = this.valor + 1;
      pantalla.push(this.valor);
    },
  };
}

// Código legado (se entrega así): pasa el método suelto como callback y pierde su `this`, así que se muestra NaN.
export function iniciarLegado(pasos, ms) {
  const contador = crearContador();
  return new Promise((resolve) => {
    let ticks = 0;
    const id = setInterval(contador.incrementar, ms); // <- el método suelto pierde su this
    const vigilante = setInterval(() => {
      if (++ticks >= pasos) { clearInterval(id); clearInterval(vigilante); resolve(contador.pantalla); }
    }, ms);
  });
}

export function iniciarConBind(pasos, ms) {
  // TODO
}

export function iniciarConFlecha(pasos, ms) {
  // TODO
}
