// Verificador local de la Actividad 3. Ejecuta: node verificar.mjs   (Node.js 18+, sin internet)
// Levanta un servidor HTTP de prueba y comprueba las TRES versiones del cliente contra el mismo contrato.
// Comprueba el contrato, no la calidad de tus comentarios ni de tu explicación: eso lo valora el instructor.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

import assert from 'node:assert/strict';
import http from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ErrorRed, ErrorHTTP } from './cliente/errores.js';

const aqui = dirname(fileURLToPath(import.meta.url));
const archivos = ['errores.js', 'transporte.js', 'callbacks.js', 'promesas.js', 'async-await.js'];
let fallos = 0;

async function prueba(nombre, fn) {
  try { await fn(); console.log(`  ok    ${nombre}`); }
  catch (e) { fallos++; console.log(`  FALLA ${nombre}\n        ${String(e.message).split('\n')[0]}`); }
}
const leer = (f) => readFileSync(join(aqui, 'cliente', f), 'utf8');
const sinComentarios = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/.*$/gm, '');
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- servidor de prueba --------------------------------------------------
const USUARIO = { id: 1, nombre: 'Ana' };
const POSTS = [{ id: 10, titulo: 'Hola' }, { id: 11, titulo: 'Adiós' }];
const servidor = http.createServer((req, res) => {
  const json = (status, cuerpo) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(cuerpo)); };
  if (req.url === '/usuarios/1') return json(200, USUARIO);
  if (req.url === '/usuarios/1/posts') return json(200, POSTS);
  if (req.url === '/usuarios/404' || req.url === '/usuarios/404/posts') return json(404, { error: 'no existe' });
  if (req.url === '/usuarios/500') return json(500, { error: 'falla del servidor' });
  return json(404, { error: 'ruta desconocida' });
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${servidor.address().port}`;
const cerrado = http.createServer(); await new Promise((r) => cerrado.listen(0, '127.0.0.1', r));
const BASE_CAIDA = `http://127.0.0.1:${cerrado.address().port}`; await new Promise((r) => cerrado.close(r));

// ---- adaptadores: misma prueba para callbacks y para promesas -------------
async function viaCallbacks(fn, ...args) {
  let llamadas = 0, salida;
  fn(...args, (err, val) => { llamadas++; if (llamadas === 1) salida = { err, val }; });
  const t0 = Date.now();
  while (!salida && Date.now() - t0 < 2000) await espera(10);
  if (!salida) throw new Error('el callback nunca se llamó (¿olvidaste invocarlo en algún camino?)');
  await espera(80);
  if (llamadas > 1) throw new Error(`el callback se llamó ${llamadas} veces; debe llamarse una sola vez`);
  if (salida.err) throw salida.err;
  return salida.val;
}
async function viaPromesa(fn, ...args) {
  const p = fn(...args);
  assert.ok(p instanceof Promise, 'la función debe devolver una Promise');
  return Promise.race([p, espera(2000).then(() => { throw new Error('la promesa nunca se resolvió'); })]);
}
const versiones = [['callbacks', viaCallbacks], ['promesas', viaPromesa], ['async-await', viaPromesa]];

console.log('\nEstructura y responsabilidad');
for (const f of archivos) {
  await prueba(`${f}: la primera línea es "// Responsabilidad: ..." sin TODO`, () => {
    const primera = leer(f).split('\n')[0];
    assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"');
    assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
  });
}

console.log('\nCada versión usa la técnica que le corresponde');
await prueba('callbacks.js: sin Promises, then ni async/await', () => {
  const c = sinComentarios(leer('callbacks.js'));
  assert.ok(!/\.then\(|\bawait\b|\basync\b|\bPromise\b|\bfetch\(/.test(c), 'esta versión debe usar solo callbacks (con peticion() de transporte.js)');
  assert.match(c, /peticion\(/, 'debe usar peticion() de transporte.js');
});
await prueba('promesas.js: usa fetch con .then y .catch, sin async/await', () => {
  const c = sinComentarios(leer('promesas.js'));
  assert.match(c, /\bfetch\(/); assert.match(c, /\.then\(/); assert.match(c, /\.catch\(/);
  assert.ok(!/\bawait\b|\basync\b/.test(c), 'esta versión no debe usar async/await');
});
await prueba('async-await.js: usa fetch con async, await y try/catch, sin .then', () => {
  const c = sinComentarios(leer('async-await.js'));
  assert.match(c, /\bfetch\(/); assert.match(c, /\basync\b/); assert.match(c, /\bawait\b/);
  assert.match(c, /\btry\b/); assert.match(c, /\bcatch\b/);
  assert.ok(!/\.then\(/.test(c), 'esta versión no debe encadenar .then');
});
for (const f of ['callbacks.js', 'promesas.js', 'async-await.js']) {
  await prueba(`${f}: está comentada (al menos 6 líneas de comentario reales)`, () => {
    const n = leer(f).split('\n').filter((l) => /^\s*\/\//.test(l) && l.trim().length > 12 && !/TODO|Nota de divulgación/.test(l)).length;
    assert.ok(n >= 6, `tiene ${n}; explica qué hace cada paso y por qué`);
  });
}

for (const [nombre, via] of versiones) {
  console.log(`\nComportamiento — ${nombre}`);
  let m;
  try { m = await import(`./cliente/${nombre}.js`); } catch (e) { fallos++; console.log(`  FALLA no se pudo importar: ${e.message}`); continue; }
  await prueba('obtenerUsuario devuelve el usuario (200)', async () => {
    assert.deepEqual(await via(m.obtenerUsuario, BASE, 1), USUARIO);
  });
  await prueba('404 lanza ErrorHTTP con status 404 (no ErrorRed)', async () => {
    const e = await via(m.obtenerUsuario, BASE, 404).then(() => null, (x) => x);
    assert.ok(e, 'debería fallar'); assert.ok(e instanceof ErrorHTTP, `esperaba ErrorHTTP y llegó ${e.name ?? e}`); assert.equal(e.status, 404);
  });
  await prueba('500 lanza ErrorHTTP con status 500', async () => {
    const e = await via(m.obtenerUsuario, BASE, 500).then(() => null, (x) => x);
    assert.ok(e instanceof ErrorHTTP && e.status === 500, 'esperaba ErrorHTTP con status 500');
  });
  await prueba('servidor caído lanza ErrorRed (no ErrorHTTP)', async () => {
    const e = await via(m.obtenerUsuario, BASE_CAIDA, 1).then(() => null, (x) => x);
    assert.ok(e, 'debería fallar'); assert.ok(e instanceof ErrorRed, `esperaba ErrorRed y llegó ${e.name ?? e}`);
  });
  await prueba('obtenerUsuarioConPosts junta usuario y posts (dos peticiones dependientes)', async () => {
    assert.deepEqual(await via(m.obtenerUsuarioConPosts, BASE, 1), { ...USUARIO, posts: POSTS });
  });
  await prueba('obtenerUsuarioConPosts propaga el error HTTP de la primera petición', async () => {
    const e = await via(m.obtenerUsuarioConPosts, BASE, 404).then(() => null, (x) => x);
    assert.ok(e instanceof ErrorHTTP && e.status === 404, 'esperaba ErrorHTTP 404');
  });
  await prueba('obtenerUsuarioConPosts con servidor caído lanza ErrorRed', async () => {
    const e = await via(m.obtenerUsuarioConPosts, BASE_CAIDA, 1).then(() => null, (x) => x);
    assert.ok(e instanceof ErrorRed, 'esperaba ErrorRed');
  });
}

console.log('\nExplicación');
await prueba('EXPLICACION.md: escrita con tus palabras (sin TODO, al menos 80 palabras)', () => {
  const t = readFileSync(join(aqui, 'EXPLICACION.md'), 'utf8');
  assert.ok(!/TODO/.test(t), 'quita el TODO y escribe tu explicación');
  const palabras = t.split('\n').filter((l) => !/^\s*(#|>|\d+\.)/.test(l)).join(' ').split(/\s+/).filter(Boolean).length;
  assert.ok(palabras >= 80, `tiene ${palabras} palabras; desarrolla un poco más`);
});

servidor.close(); servidor.closeAllConnections?.();
console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
