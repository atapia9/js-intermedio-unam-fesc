// Ejemplo del manual, ficha 3.3. Ejecuta con: node 3.3-promesas.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

function obtenerUsuarioProm(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id inválido'));
      resolve({ id, nombre: 'Cliente ' + id });
    }, 500);
  });
}

obtenerUsuarioProm(1)
  .then((usuario) => obtenerUsuarioProm(usuario.id + 1))
  .then((siguiente) => obtenerUsuarioProm(siguiente.id + 1))
  .then((resultado) => console.log('Encadenado:', resultado))
  .catch((error) => console.error('Error en la cadena:', error.message))
  .finally(() => console.log('Proceso terminado'));
