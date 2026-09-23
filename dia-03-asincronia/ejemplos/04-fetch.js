// Día 3 — Ejemplo: Fetch API y manejo correcto de errores HTTP
// Ejecuta con: node 04-fetch.js  (Node 18+ trae fetch nativo)
// Usa la API pública gratuita JSONPlaceholder para pruebas.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

async function obtenerUsuario(id) {
  const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  // IMPORTANTE: fetch() solo rechaza la promesa ante errores de red.
  // Un 404/500 se considera "éxito" a nivel de red, hay que revisar response.ok
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}: ${respuesta.statusText}`);
  }

  return respuesta.json();
}

async function main() {
  try {
    const usuario = await obtenerUsuario(1);
    console.log('Usuario obtenido:', usuario.name, usuario.email);
  } catch (err) {
    console.error('No se pudo obtener el usuario:', err.message);
  }

  try {
    // ID que no existe: dispara nuestro chequeo de response.ok
    await obtenerUsuario(99999);
  } catch (err) {
    console.error('Error esperado (404):', err.message);
  }
}

main();
