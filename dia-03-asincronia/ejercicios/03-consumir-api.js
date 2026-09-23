// Ejercicio 3 — Consumir una API real con Fetch
//
// Videos de apoyo (ficha 3.4 y 3.5 del README del día):
//   - Promesas y async-await: then y catch – JS desde cero #16: https://www.youtube.com/watch?v=ksg6SDwllDs
//   - Callback, Promesas, Async Await y Try Catch | JavaScript: https://www.youtube.com/watch?v=p3Oq3AfuteA
//   - JavaScript asíncrono con Async Await: https://www.youtube.com/watch?v=za8Z6saKVdw
//   - Cómo consumir una API REST con Fetch + Promises con gestión de errores: https://www.youtube.com/watch?v=FJ-w0tf3d_w
//   - Curso de JavaScript: API fetch – manejo de errores: https://www.youtube.com/watch?v=U0Qoq3hYPZA
//   - Javascript Fetch API: qué es y cómo consumir un API: https://www.youtube.com/watch?v=lkMq_qzCV_M
//
// Enunciado:
// Escribe `obtenerPostsDeUsuario(usuarioId)` que consulte
// https://jsonplaceholder.typicode.com/posts?userId={usuarioId}
// y devuelva solo un arreglo con los títulos de los posts (usa .map).
// Maneja correctamente el caso en que response.ok sea false.
// Ejecuta con: node 03-consumir-api.js (Node 18+)
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

async function obtenerPostsDeUsuario(usuarioId) {
  // TODO
}

// ---- Prueba manual ----
// obtenerPostsDeUsuario(1).then((titulos) => console.log(titulos));

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// async function obtenerPostsDeUsuario(usuarioId) {
//   const respuesta = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?userId=${usuarioId}`
//   );
//   if (!respuesta.ok) {
//     throw new Error(`Error HTTP ${respuesta.status}`);
//   }
//   const posts = await respuesta.json();
//   return posts.map((post) => post.title);
// }
