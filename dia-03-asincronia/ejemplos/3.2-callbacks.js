// Ejemplo del manual, ficha 3.2. Ejecuta con: node 3.2-callbacks.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

function obtenerUsuario(id, callback) {
  setTimeout(() => {
    callback({ id, nombre: 'Cliente ' + id });
  }, 500);
}

obtenerUsuario(1, (usuario) => {
  obtenerUsuario(usuario.id + 1, (siguiente) => {
    obtenerUsuario(siguiente.id + 1, (otro) => {
      console.log('Callback Hell:', otro); // anidamiento creciente
    });
  });
});
