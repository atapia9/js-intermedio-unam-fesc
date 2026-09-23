// Verificador local de la Actividad 1. Ejecuta: node verificar.mjs   (Node.js 18+, sin dependencias)
// Comprueba el contrato de las funciones, la técnica de cada bloque y que hayas escrito las explicaciones.
// No juzga si tus explicaciones son correctas ni claras: eso lo valora el instructor.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const archivo = join(aqui, 'actividad1.js');
const fuente = readFileSync(archivo, 'utf8');
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const conTimeout = (p, ms = 3000) => Promise.race([p, espera(ms).then(() => { throw new Error('la promesa nunca se resolvió'); })]);
const sinComentarios = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/.*$/gm, '');
let fallos = 0;
async function prueba(nombre, fn) {
  try { await fn(); console.log(`  ok    ${nombre}`); }
  catch (e) {
    fallos++;
    const pista = e instanceof TypeError && /undefined|not a function|null/.test(e.message) ? ' — ¿completaste esta función? Todavía devuelve undefined' : '';
    console.log(`  FALLA ${nombre}\n        ${String(e.message).split('\n')[0]}${pista}`);
  }
}

// Captura lo que la función imprime con console.log / console.error mientras se ejecuta.
async function capturar(fn) {
  const logs = [], tiempos = [], errores = [], original = { log: console.log, error: console.error };
  console.log = (...a) => { logs.push(a.map(String).join(' ')); tiempos.push(Date.now()); };
  console.error = (...a) => errores.push(a.map(String).join(' '));
  try { const valor = await fn(); return { valor, logs, tiempos, errores }; }
  finally { console.log = original.log; console.error = original.error; }
}

// Parte el archivo en bloques: [previo, id, texto, id, texto...]
const partes = fuente.split(/^\/\/ =+ Bloque (1\.[1-4])[^\n]*\n/m);
const bloques = {};
for (let i = 1; i < partes.length; i += 2) bloques[partes[i]] = partes[i + 1];
const codigo = (id) => sinComentarios(bloques[id] ?? '');
// Cuerpo (sin comentarios) de una función exportada dentro de un bloque.
function cuerpo(id, nombre) {
  const c = codigo(id); const i = c.indexOf(`function ${nombre}(`);
  if (i < 0) return '';
  const j = c.indexOf('\nexport function', i + 1);
  return c.slice(i, j < 0 ? undefined : j);
}

// Texto (con líneas de continuación) de un comentario etiquetado: "// Etiqueta: ..."
function explicacion(texto, etiqueta) {
  const esc = etiqueta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const lineas = texto.split('\n'); const re = new RegExp(`^\\s*//\\s*${esc}:\\s*(.*)$`);
  const i = lineas.findIndex((l) => re.test(l)); if (i < 0) return null;
  let t = lineas[i].match(re)[1];
  for (let k = i + 1; k < lineas.length && /^\s*\/\/\s+\S/.test(lineas[k]) && !/^\s*\/\/\s*[^:]{2,70}:\s/.test(lineas[k]); k++) t += ' ' + lineas[k].replace(/^\s*\/\/\s*/, '');
  return t.trim();
}

const GENERALES = ['Qué hace', 'Por qué funciona', 'Concepto'];
const PROPIAS = {
  '1.1': [['Predicción', 20], ['Diferencias con lo real', 6], ['Cuándo entra a la Call Stack el setTimeout de 100 ms', 20]],
  '1.2': [['Causa del bug', 20], ['Por qué basta con cambiar a let', 20], ['Justificación de const', 20]],
  '1.3': [],
  '1.4': [['Diagnóstico', 20], ['Comparación entre bind y arrow function', 20]],
};

console.log('\nEstructura y explicaciones');
await prueba('la primera línea es "// Responsabilidad: ..." sin TODO', () => {
  const primera = fuente.split('\n')[0];
  assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"');
  assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
});
for (const id of ['1.1', '1.2', '1.3', '1.4']) {
  await prueba(`bloque ${id}: existe y tiene todas sus explicaciones`, () => {
    assert.ok(bloques[id] !== undefined, `falta la línea "// ===== Bloque ${id} — ... ====="`);
    for (const [et, min] of [...GENERALES.map((e) => [e, 20]), ...PROPIAS[id]]) {
      const t = explicacion(bloques[id], et);
      assert.ok(t !== null, `falta el comentario "// ${et}:"`);
      assert.ok(!/TODO/.test(t) && t.length >= min, `"${et}" está vacío o muy corto: explícalo con tus palabras`);
    }
  });
}

let m;
try { m = await import(pathToFileURL(archivo).href); }
catch (e) { fallos++; console.log(`\n  FALLA no se pudo cargar actividad1.js: ${e.message}`); m = null; }

if (m) {
  console.log('\nBloque 1.1 — Predicción de salida');
  const tipo = (l) => (/^sincrono/i.test(l) ? 'sincrono' : /^promesa/i.test(l) ? 'promesa' : /^timeout/i.test(l) ? 'timeout' : `?${l}`);
  await prueba('usa setTimeout y dos promesas encadenadas', () => {
    const c = codigo('1.1'); assert.match(c, /setTimeout\s*\(/, 'falta setTimeout'); assert.ok((c.match(/\.then\s*\(/g) ?? []).length >= 2, 'faltan dos promesas encadenadas (.then)');
  });
  await prueba('ejercicio11() imprime 5 líneas en el orden real: 2 sincronas, 2 promesas y el timeout', async () => {
    const { logs } = await capturar(() => conTimeout(m.ejercicio11()));
    assert.equal(logs.length, 5, `imprimió ${logs.length} línea(s) y deben ser 5 (cada línea empieza con "sincrono", "promesa" o "timeout")`);
    assert.deepEqual(logs.map(tipo), ['sincrono', 'sincrono', 'promesa', 'promesa', 'timeout'], `orden impreso: ${logs.map(tipo).join(', ')}`);
  });
  await prueba('ejercicio11Modificado() agrega un segundo setTimeout de 100 ms, que se imprime al final', async () => {
    const { logs, tiempos } = await capturar(() => conTimeout(m.ejercicio11Modificado()));
    assert.equal(logs.length, 6, `imprimió ${logs.length} línea(s) y deben ser 6`);
    assert.deepEqual(logs.map(tipo), ['sincrono', 'sincrono', 'promesa', 'promesa', 'timeout', 'timeout']);
    assert.ok(tiempos[5] - tiempos[4] >= 80, `la última línea debe salir unos 100 ms después de la del timeout de 0 ms (salió ${tiempos[5] - tiempos[4]} ms después)`);
    assert.ok((codigo('1.1').match(/setTimeout\s*\(/g) ?? []).length >= 2, 'faltan dos setTimeout (uno de 0 ms y otro de 100 ms)');
  });

  console.log('\nBloque 1.2 — Refactor de var a let/const');
  await prueba('el código legado se conserva: con var todos los manejadores devuelven el mismo índice', () => {
    assert.deepEqual(m.crearManejadoresLegado(3).map((f) => f()), [3, 3, 3], 'no modifiques crearManejadoresLegado');
    assert.match(cuerpo('1.2', 'crearManejadoresLegado'), /\bvar\b/);
  });
  await prueba('crearManejadoresConLet(n) devuelve un manejador por índice', () => {
    for (const n of [3, 5]) assert.deepEqual(m.crearManejadoresConLet(n).map((f) => f()), Array.from({ length: n }, (_, i) => i));
    const c = cuerpo('1.2', 'crearManejadoresConLet'); assert.match(c, /\blet\b/, 'debe usar let'); assert.ok(!/\bvar\b/.test(c), 'ya no debe usar var');
  });
  await prueba('crearManejadoresConConst(n) usa const donde es posible (y let solo donde hay reasignación)', () => {
    assert.deepEqual(m.crearManejadoresConConst(4).map((f) => f()), [0, 1, 2, 3]);
    const c = cuerpo('1.2', 'crearManejadoresConConst'); assert.match(c, /\bconst\b/, 'debe usar const'); assert.ok(!/\bvar\b/.test(c), 'no debe usar var');
  });

  console.log('\nBloque 1.3 — Módulo con estado privado');
  await prueba('crearCuentaBancaria: depositar, retirar y consultarSaldo funcionan', async () => {
    const { valor: c } = await capturar(() => m.crearCuentaBancaria(100));
    assert.equal(c.consultarSaldo(), 100); assert.equal(c.depositar(50), true); assert.equal(c.consultarSaldo(), 150);
    assert.equal(c.retirar(30), true); assert.equal(c.consultarSaldo(), 120);
    assert.equal(m.crearCuentaBancaria().consultarSaldo(), 0, 'sin saldo inicial, la cuenta empieza en 0');
  });
  await prueba('retirar más del saldo no permite saldo negativo: registra un mensaje de error controlado y no lanza excepción', async () => {
    const c = m.crearCuentaBancaria(100);
    const { valor, errores } = await capturar(() => c.retirar(500));
    assert.equal(valor, false, 'retirar debe devolver false cuando no puede retirar');
    assert.ok(errores.length >= 1 && errores[0].length > 5, 'debe registrar un mensaje con console.error');
    assert.equal(c.consultarSaldo(), 100, 'el saldo no debe cambiar');
  });
  await prueba('montos inválidos (0, negativos, NaN) se rechazan con mensaje y sin cambiar el saldo', async () => {
    const c = m.crearCuentaBancaria(100);
    for (const x of [0, -5, NaN]) {
      const d = await capturar(() => c.depositar(x)); assert.equal(d.valor, false, `depositar(${x}) debe devolver false`); assert.ok(d.errores.length >= 1, `depositar(${x}) debe registrar un error`);
      const r = await capturar(() => c.retirar(x)); assert.equal(r.valor, false, `retirar(${x}) debe devolver false`); assert.ok(r.errores.length >= 1);
    }
    assert.equal(c.consultarSaldo(), 100);
  });
  await prueba('dos cuentas distintas tienen saldos independientes', () => {
    const a = m.crearCuentaBancaria(100), b = m.crearCuentaBancaria(10); a.depositar(5);
    assert.equal(a.consultarSaldo(), 105); assert.equal(b.consultarSaldo(), 10);
  });
  await prueba('el saldo es privado: solo se exponen depositar, retirar y consultarSaldo (closure, sin class ni this)', () => {
    const c = m.crearCuentaBancaria(100);
    assert.deepEqual(Object.keys(c).sort(), ['consultarSaldo', 'depositar', 'retirar']);
    assert.ok(Object.values(c).every((v) => typeof v === 'function'), 'no guardes el saldo como propiedad del objeto');
    assert.ok(!/\bclass\b|\bthis\b/.test(codigo('1.3')), 'este bloque se resuelve con un closure, sin class ni this');
  });
  await prueba('el bloque demuestra dos cuentas distintas (al menos dos llamadas a crearCuentaBancaria)', () => {
    const llamadas = (codigo('1.3').match(/crearCuentaBancaria\s*\(/g) ?? []).length - 1;
    assert.ok(llamadas >= 2, `hay ${llamadas} llamada(s); crea dos cuentas y demuestra que sus saldos son independientes`);
  });

  console.log('\nBloque 1.4 — Corrección de contexto perdido');
  await prueba('el código legado se conserva: al perder su this se muestra NaN', async () => {
    const pantalla = await conTimeout(m.iniciarLegado(3, 5));
    assert.equal(pantalla.length, 3); assert.ok(pantalla.every(Number.isNaN), 'no modifiques crearContador ni iniciarLegado');
  });
  for (const [nombre, tecnica, re] of [['iniciarConBind', 'bind()', /\.bind\s*\(/], ['iniciarConFlecha', 'una arrow function', /=>/]]) {
    await prueba(`${nombre}(pasos, ms) cuenta 1, 2, 3... usando ${tecnica} y detiene el intervalo`, async () => {
      const p = m[nombre](3, 5); assert.ok(p instanceof Promise, 'debe devolver una Promise');
      const pantalla = await conTimeout(p); assert.deepEqual([...pantalla], [1, 2, 3]);
      await espera(60); assert.equal(pantalla.length, 3, 'el contador siguió avanzando: falta clearInterval');
      const c = cuerpo('1.4', nombre); assert.match(c, re, `debe usar ${tecnica}`); assert.match(c, /clearInterval\s*\(/, 'falta clearInterval');
    });
  }
}

console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
