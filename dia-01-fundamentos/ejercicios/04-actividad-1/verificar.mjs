// Verificador local de la Actividad 1. Ejecuta: node verificar.mjs   (Node.js 18+, sin dependencias)
// Comprueba el contrato de las funciones, la técnica de cada bloque y que hayas escrito las tres explicaciones.
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
const conTimeout = (p, ms = 2000) => Promise.race([p, espera(ms).then(() => { throw new Error('la promesa nunca se resolvió'); })]);
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

// Parte el archivo en bloques: [previo, id, texto, id, texto...]
const partes = fuente.split(/^\/\/ =+ Bloque (1\.[1-4])[^\n]*\n/m);
const bloques = {};
for (let i = 1; i < partes.length; i += 2) bloques[partes[i]] = partes[i + 1];
const codigo = (id) => sinComentarios(bloques[id] ?? '');

// Devuelve el texto (con sus líneas de continuación) de un comentario etiquetado: "// Qué hace: ..."
function explicacion(texto, etiqueta) {
  const lineas = texto.split('\n'); const re = new RegExp(`^\\s*//\\s*${etiqueta}:\\s*(.*)$`);
  const i = lineas.findIndex((l) => re.test(l)); if (i < 0) return null;
  let t = lineas[i].match(re)[1];
  for (let k = i + 1; k < lineas.length && /^\s*\/\//.test(lineas[k]) && !/^\s*\/\/\s*(Qué hace|Por qué funciona|Concepto):/.test(lineas[k]); k++) t += ' ' + lineas[k].replace(/^\s*\/\/\s*/, '');
  return t.trim();
}

console.log('\nEstructura y explicaciones');
await prueba('la primera línea es "// Responsabilidad: ..." sin TODO', () => {
  const primera = fuente.split('\n')[0];
  assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"');
  assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
});
for (const id of ['1.1', '1.2', '1.3', '1.4']) {
  await prueba(`bloque ${id}: existe y tiene las tres explicaciones (Qué hace, Por qué funciona, Concepto)`, () => {
    assert.ok(bloques[id] !== undefined, `falta la línea "// ===== Bloque ${id} — ... ====="`);
    for (const et of ['Qué hace', 'Por qué funciona', 'Concepto']) {
      const t = explicacion(bloques[id], et);
      assert.ok(t !== null, `falta el comentario "// ${et}:"`);
      assert.ok(!/TODO/.test(t) && t.length >= 20, `"${et}" está vacío o muy corto: explícalo con tus palabras (al menos 20 caracteres)`);
    }
  });
}

let m;
try { m = await import(pathToFileURL(archivo).href); }
catch (e) { fallos++; console.log(`\n  FALLA no se pudo cargar actividad1.js: ${e.message}`); m = null; }

if (m) {
  console.log('\nBloque 1.1 — Call Stack y Event Loop');
  await prueba('usa setTimeout y una microtarea (Promise o queueMicrotask)', () => {
    const c = codigo('1.1'); assert.match(c, /setTimeout\s*\(/, 'falta setTimeout'); assert.match(c, /Promise|queueMicrotask/, 'falta una promesa o queueMicrotask');
  });
  await prueba('ordenDeEjecucion() devuelve una Promise con el orden real de los cuatro eventos', async () => {
    const p = m.ordenDeEjecucion(); assert.ok(p instanceof Promise, 'debe devolver una Promise');
    assert.deepEqual(await conTimeout(p), ['sincrono-1', 'sincrono-2', 'microtarea', 'macrotarea']);
  });

  console.log('\nBloque 1.2 — Hoisting y Scope');
  await prueba('botonesConVar reproduce el error clásico: todos los botones devuelven el último nombre', () => {
    const fs = m.botonesConVar(['a', 'b', 'c']); assert.ok(Array.isArray(fs) && fs.every((f) => typeof f === 'function'), 'debe devolver un arreglo de funciones');
    assert.deepEqual(fs.map((f) => f()), ['c', 'c', 'c']);
    assert.match(codigo('1.2'), /\bvar\b/, 'debe usar var en el ciclo');
  });
  await prueba('botonesConLet lo corrige: cada botón devuelve su propio nombre', () => {
    const fs = m.botonesConLet(['a', 'b', 'c']); assert.ok(Array.isArray(fs));
    assert.deepEqual(fs.map((f) => f()), ['a', 'b', 'c']);
    assert.match(codigo('1.2'), /\b(let|const)\b/, 'debe usar let o const');
  });
  await prueba('demostrarHoisting() muestra undefined con var y ReferenceError con let (TDZ)', () => {
    const r = m.demostrarHoisting(); assert.ok(r && 'conVar' in r, 'debe devolver { conVar, conLet }');
    assert.equal(r.conVar, undefined, 'leer una variable var antes de declararla da undefined');
    assert.equal(r.conLet, 'ReferenceError', 'leer una variable let antes de declararla lanza ReferenceError (nombre del error)');
    assert.match(codigo('1.2'), /\btry\b[\s\S]*\bcatch\b/, 'usa try/catch para capturar el error de la zona muerta temporal');
  });

  console.log('\nBloque 1.3 — Closures');
  await prueba('crearCuenta: depositar, retirar y saldo funcionan', () => {
    const c = m.crearCuenta(100);
    assert.equal(c.saldo(), 100); assert.equal(c.depositar(50), 150); assert.equal(c.retirar(30), 120); assert.equal(c.saldo(), 120);
    assert.equal(m.crearCuenta().saldo(), 0, 'el saldo inicial por defecto es 0');
  });
  await prueba('las cuentas de Ana y Luis no comparten saldo', () => {
    const ana = m.crearCuenta(100), luis = m.crearCuenta(10); ana.depositar(5);
    assert.equal(ana.saldo(), 105); assert.equal(luis.saldo(), 10);
  });
  await prueba('depositar un monto inválido lanza RangeError y retirar de más lanza error sin cambiar el saldo', () => {
    const c = m.crearCuenta(100);
    for (const x of [0, -5, NaN]) assert.throws(() => c.depositar(x), RangeError);
    assert.throws(() => c.retirar(1000), Error); assert.equal(c.saldo(), 100);
  });
  await prueba('el saldo es privado: el objeto solo expone depositar, retirar y saldo', () => {
    const c = m.crearCuenta(100);
    assert.deepEqual(Object.keys(c).sort(), ['depositar', 'retirar', 'saldo']);
    assert.ok(Object.values(c).every((v) => typeof v === 'function'), 'no guardes el saldo como propiedad del objeto: usa un closure');
    assert.ok(!/\bclass\b|\bthis\b/.test(codigo('1.3')), 'este bloque se resuelve con un closure, sin class ni this');
  });

  console.log('\nBloque 1.4 — this, call, apply y bind');
  await prueba('crearTemporizador().iniciar(pasos, ms) cuenta con setInterval y conserva this', async () => {
    const t = m.crearTemporizador(); assert.equal(t.segundos, 0);
    const p = t.iniciar(3, 5); assert.ok(p instanceof Promise, 'iniciar debe devolver una Promise');
    assert.equal(await conTimeout(p), 3); assert.equal(t.segundos, 3);
  });
  await prueba('el intervalo se detiene al terminar (clearInterval)', async () => {
    const t = m.crearTemporizador(); await conTimeout(t.iniciar(2, 5)); await espera(60);
    assert.equal(t.segundos, 2, 'el contador siguió avanzando: falta clearInterval');
    const c = codigo('1.4'); assert.match(c, /setInterval\s*\(/); assert.match(c, /clearInterval\s*\(/);
    assert.match(c, /\.bind\s*\(|=>/, 'conserva this con bind o con una arrow function');
  });
  await prueba('tic() usa this: al sacarlo del objeto pierde el contexto (TypeError)', () => {
    const t = m.crearTemporizador(); const suelto = t.tic;
    assert.throws(() => suelto(), TypeError, 'tic debe ser un método que use this.segundos');
    assert.equal(t.tic(), 1);
  });
  await prueba('demostrarThis() devuelve { suelto: "TypeError", conBind: 1, conFlecha: 1 }', () => {
    assert.deepEqual(m.demostrarThis(), { suelto: 'TypeError', conBind: 1, conFlecha: 1 });
  });
}

console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
