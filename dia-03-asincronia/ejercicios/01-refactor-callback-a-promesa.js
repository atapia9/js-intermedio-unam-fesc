// Ejercicio 1 — De callbacks a promesas
//
// Enunciado:
// Convierte la función `leerConfiguracion(callback)` (estilo callback) en
// una función `leerConfiguracionPromesa()` que devuelva una Promise.
// Luego consúmela tanto con .then/.catch como con async/await.

function leerConfiguracion(callback) {
  setTimeout(() => {
    const exito = true; // cambia a false para probar el camino de error
    if (exito) callback(null, { tema: 'oscuro', idioma: 'es' });
    else callback(new Error('No se pudo leer la configuración'));
  }, 200);
}

// TODO: function leerConfiguracionPromesa() { ... }

// ---- Pruebas manuales ----
// leerConfiguracionPromesa()
//   .then((config) => console.log('Config (then):', config))
//   .catch((err) => console.error(err.message));
//
// async function probar() {
//   try {
//     const config = await leerConfiguracionPromesa();
//     console.log('Config (await):', config);
//   } catch (err) {
//     console.error(err.message);
//   }
// }
// probar();

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// function leerConfiguracionPromesa() {
//   return new Promise((resolve, reject) => {
//     leerConfiguracion((err, config) => {
//       if (err) reject(err);
//       else resolve(config);
//     });
//   });
// }
