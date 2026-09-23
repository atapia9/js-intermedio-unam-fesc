// Ejercicio 3 — Implementa un Singleton de conexión
//
// Videos de apoyo (ficha 5.4 del README del día):
//   - Patrón Singleton – Patrones de diseño – Programación en español: https://www.youtube.com/watch?v=YRLvJfItAT4
//   - #1 Singleton – Patrones de diseño con JavaScript: https://www.youtube.com/watch?v=OuKl1HwD1x8
//   - Patrón Module en JavaScript: ejemplo paso a paso: https://www.youtube.com/watch?v=uNBZ8ohLnxM
//
// Enunciado:
// Implementa la clase `ConexionBD` como Singleton: sin importar cuántas
// veces se llame a `ConexionBD.obtenerInstancia()`, debe devolver siempre
// el mismo objeto. Agrega un método `consultar(sql)` que solo imprima
// `Ejecutando: ${sql}` y un contador `totalConsultas` que se comparta entre
// todas las "instancias" (porque en realidad es la misma).
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

class ConexionBD {
  // TODO
}

// ---- Pruebas manuales ----
// const conexionA = ConexionBD.obtenerInstancia();
// const conexionB = ConexionBD.obtenerInstancia();
// conexionA.consultar('SELECT * FROM alumnos');
// conexionB.consultar('SELECT * FROM cursos');
// console.log(conexionA === conexionB); // true
// console.log(conexionA.totalConsultas); // 2

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// class ConexionBD {
//   static #instancia;
//   totalConsultas = 0;
//
//   static obtenerInstancia() {
//     if (!ConexionBD.#instancia) {
//       ConexionBD.#instancia = new ConexionBD();
//     }
//     return ConexionBD.#instancia;
//   }
//
//   consultar(sql) {
//     this.totalConsultas++;
//     console.log(`Ejecutando: ${sql}`);
//   }
// }
