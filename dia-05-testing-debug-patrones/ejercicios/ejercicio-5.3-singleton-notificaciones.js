// Ejercicio 5.3 — Aplicar Singleton
//
// Videos de apoyo (ficha 5.4 del README del día):
//   - Patrón Singleton – Patrones de diseño – Programación en español: https://www.youtube.com/watch?v=YRLvJfItAT4
//   - #1 Singleton – Patrones de diseño con JavaScript: https://www.youtube.com/watch?v=OuKl1HwD1x8
//   - Patrón Module en JavaScript: ejemplo paso a paso: https://www.youtube.com/watch?v=uNBZ8ohLnxM
//
// Enunciado (manual del curso):
//   1. Implementa un Singleton GestorDeNotificaciones que mantenga una lista interna de mensajes y exponga notificar(mensaje) y obtenerHistorial().
//   2. Demuestra, creando dos instancias 'distintas', que ambas comparten el mismo historial interno.
//
// Ejecuta con: node ejercicio-5.3-singleton-notificaciones.js
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

class GestorDeNotificaciones {
  // TODO: implementa el Singleton. Debe mantener una lista interna de mensajes y exponer
  //       notificar(mensaje) y obtenerHistorial().
}

// Demostración pedida: con dos instancias "distintas", ambas comparten el mismo historial.
// const a = new GestorDeNotificaciones();
// const b = new GestorDeNotificaciones();
// a.notificar('Hola');
// b.notificar('Adiós');
// console.log(a === b, a.obtenerHistorial(), b.obtenerHistorial());

// ---------------------------------------------------------------------------
// Solución sugerida (inténtalo antes de leerla): sigue el patrón de ConexionAPI del manual (ejemplo 5.4).
//
// class GestorDeNotificaciones {
//   static #instancia = null;
//   #historial = [];
//
//   constructor() {
//     if (GestorDeNotificaciones.#instancia) return GestorDeNotificaciones.#instancia;
//     GestorDeNotificaciones.#instancia = this;
//   }
//   notificar(mensaje) { this.#historial.push(mensaje); }
//   obtenerHistorial() { return [...this.#historial]; }
// }
