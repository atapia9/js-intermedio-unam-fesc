// Ejercicio 3 — Implementa un Singleton de conexión
//
// Enunciado:
// Implementa la clase `ConexionBD` como Singleton: sin importar cuántas
// veces se llame a `ConexionBD.obtenerInstancia()`, debe devolver siempre
// el mismo objeto. Agrega un método `consultar(sql)` que solo imprima
// `Ejecutando: ${sql}` y un contador `totalConsultas` que se comparta entre
// todas las "instancias" (porque en realidad es la misma).

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
