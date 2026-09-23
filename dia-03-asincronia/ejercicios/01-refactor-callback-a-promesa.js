// Ejercicio 1 — De callbacks a promesas
//
// Videos de apoyo (ficha 3.2 y 3.3 del README del día):
//   - Asincronismo en JS: ¿qué es el Callback Hell? – JS desde cero #15: https://www.youtube.com/watch?v=iAq9SOEODvo
//   - Callbacks: ¿qué son y cómo utilizarlos? – Evitar callback hell: https://www.youtube.com/watch?v=WYVOvwTZ7Bo
//   - Qué es el antipatrón Callback Hell en JavaScript: https://www.youtube.com/watch?v=TcEjFk1cDzU
//   - Promesas: new Promise, resolve, reject, then, catch: https://www.youtube.com/watch?v=W-HPYsmHG6U
//   - Cómo usar promesas en JavaScript – JS en Español: https://www.youtube.com/watch?v=urapbZL9knY
//   - Promesas: métodos Promise.all y race en JavaScript: https://www.youtube.com/watch?v=-xhWDNm3XvY
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
