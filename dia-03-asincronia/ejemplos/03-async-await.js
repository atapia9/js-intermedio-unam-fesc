// Día 3 — Ejemplo: async/await, equivalente secuencial a las promesas
// Ejecuta con: node 03-async-await.js
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

async function flujoSecuencial() {
  console.log('Inicio del flujo');
  const primero = await esperar(200, 'primer valor');
  console.log('Recibido:', primero);
  const segundo = await esperar(200, 'segundo valor');
  console.log('Recibido:', segundo);
  return 'flujo completo';
}

async function manejarErrores() {
  try {
    await esperar(100, null, true);
  } catch (err) {
    console.log('Error controlado con try/catch:', err.message);
  }
}

async function ejecucionEnParalelo() {
  // await secuencial (más lento: suma los tiempos)
  const t0 = Date.now();
  const a = await esperar(150, 'A');
  const b = await esperar(150, 'B');
  console.log('Secuencial:', a, b, `(${Date.now() - t0}ms)`);

  // Ejecutar en paralelo con Promise.all + await (más rápido)
  const t1 = Date.now();
  const [c, d] = await Promise.all([esperar(150, 'C'), esperar(150, 'D')]);
  console.log('Paralelo:', c, d, `(${Date.now() - t1}ms)`);
}

async function main() {
  const resultado = await flujoSecuencial();
  console.log(resultado);
  await manejarErrores();
  await ejecucionEnParalelo();
}

main();
