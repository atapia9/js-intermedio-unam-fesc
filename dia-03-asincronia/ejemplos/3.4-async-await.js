// Ejemplo del manual, ficha 3.4. Ejecuta con: node 3.4-async-await.js
// Adaptación: se copia al inicio `obtenerUsuarioProm`, definida en el ejemplo 3.3, para que este archivo se ejecute solo.
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

async function flujoUsuarios() {
  try {
    const u1 = await obtenerUsuarioProm(1);
    const u2 = await obtenerUsuarioProm(u1.id + 1);
    const u3 = await obtenerUsuarioProm(u2.id + 1);
    console.log('Resultado final:', u3);
  } catch (error) {
    console.error('Error capturado:', error.message);
  } finally {
    console.log('Flujo terminado');
  }
}

flujoUsuarios();
