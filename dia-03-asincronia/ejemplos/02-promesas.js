// Día 3 — Ejemplo: creación, encadenamiento y combinación de promesas
// Ejecuta con: node 02-promesas.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

function esperar(ms, valor, fallar = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fallar) reject(new Error(`Fallo simulado tras ${ms}ms`));
      else resolve(valor);
    }, ms);
  });
}

// Encadenamiento con .then / .catch / .finally
esperar(200, 'primer valor')
  .then((valor) => {
    console.log('Recibido:', valor);
    return esperar(200, 'segundo valor'); // se puede devolver otra promesa
  })
  .then((valor) => console.log('Recibido:', valor))
  .catch((err) => console.error('Error en la cadena:', err.message))
  .finally(() => console.log('Cadena terminada (con o sin error)'));

// Promise.all: espera a que TODAS terminen (o falla si alguna rechaza)
Promise.all([esperar(100, 'A'), esperar(150, 'B'), esperar(50, 'C')]).then(
  (resultados) => console.log('Promise.all resultados:', resultados)
);

// Promise.race: resuelve/rechaza con la primera que termine
Promise.race([esperar(300, 'lenta'), esperar(50, 'rápida')]).then((ganadora) =>
  console.log('Promise.race ganadora:', ganadora)
);

// Manejo de errores con .catch
esperar(100, null, true).catch((err) =>
  console.log('Error controlado:', err.message)
);
