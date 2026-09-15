// Ejercicio 3 — Consumir una API real con Fetch
//
// Enunciado:
// Escribe `obtenerPostsDeUsuario(usuarioId)` que consulte
// https://jsonplaceholder.typicode.com/posts?userId={usuarioId}
// y devuelva solo un arreglo con los títulos de los posts (usa .map).
// Maneja correctamente el caso en que response.ok sea false.
// Ejecuta con: node 03-consumir-api.js (Node 18+)

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
