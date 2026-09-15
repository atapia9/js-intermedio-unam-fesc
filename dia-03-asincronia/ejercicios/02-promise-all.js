// Ejercicio 2 — Cargar varios recursos en paralelo
//
// Enunciado:
// Dadas tres funciones que simulan cargar recursos con distintos tiempos,
// escribe `cargarTodo()` que use Promise.all para esperar a las tres y
// regrese un objeto { curso, instructor, sede }. Mide el tiempo total y
// verifica que sea aproximadamente el de la más lenta (no la suma de todas).

function cargarCurso() {
  return new Promise((resolve) => setTimeout(() => resolve('JS Intermedio'), 300));
}
function cargarInstructor() {
  return new Promise((resolve) => setTimeout(() => resolve('REDEC'), 500));
}
function cargarSede() {
  return new Promise((resolve) => setTimeout(() => resolve('FES Cuautitlán'), 200));
}

async function cargarTodo() {
  // TODO
}

// ---- Prueba manual ----
// (async () => {
//   const t0 = Date.now();
//   const datos = await cargarTodo();
//   console.log(datos, `(${Date.now() - t0}ms, debería ser ~500ms, no ~1000ms)`);
// })();

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// async function cargarTodo() {
//   const [curso, instructor, sede] = await Promise.all([
//     cargarCurso(),
//     cargarInstructor(),
//     cargarSede(),
//   ]);
//   return { curso, instructor, sede };
// }
