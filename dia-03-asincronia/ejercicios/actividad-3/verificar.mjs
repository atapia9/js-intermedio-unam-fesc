// Verificador local de la Actividad 3. Ejecuta: node verificar.mjs   (Node.js 18+, sin internet)
// Comprueba el flujo de usuarios en sus tres versiones y el cliente listarUsuarios contra un servidor HTTP de prueba propio.
// No juzga la calidad de tus comentarios ni de tu justificación escrita: eso lo valora el instructor.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { ErrorRed, ErrorHTTP, ErrorJSON } from './errores.js';

const aqui = dirname(fileURLToPath(import.meta.url));
const archivo = join(aqui, 'actividad3.js');
const fuente = readFileSync(archivo, 'utf8');
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const conTimeout = (p, ms = 4000) => Promise.race([p, espera(ms).then(() => { throw new Error('la promesa nunca se resolvió'); })]);
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
async function capturar(fn) {
  const logs = [], tiempos = [], errores = [], original = { log: console.log, error: console.error };
  console.log = (...a) => { logs.push(a.map(String).join(' ')); tiempos.push(performance.now()); };
  console.error = (...a) => errores.push(a.map(String).join(' '));
  try { return { valor: await fn(), logs, tiempos, errores }; } finally { console.log = original.log; console.error = original.error; }
}
async function rechazo(fn) { try { await fn(); } catch (e) { return e; } return null; }

const partes = fuente.split(/^\/\/ =+ Bloque (3\.[1-4])[^\n]*\n/m);
const bloques = {}; for (let i = 1; i < partes.length; i += 2) bloques[partes[i]] = partes[i + 1];
const codigo = (id) => sinComentarios(bloques[id] ?? '');
function cuerpo(id, nombre) {
  const c = codigo(id); const i = c.indexOf(`function ${nombre}(`); if (i < 0) return '';
  const j = c.indexOf('\nexport ', i + 1); return c.slice(i, j < 0 ? undefined : j);
}
function explicacion(texto, etiqueta) {
  const esc = etiqueta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const lineas = texto.split('\n'); const re = new RegExp(`^\\s*//\\s*${esc}:\\s*(.*)$`);
  const i = lineas.findIndex((l) => re.test(l)); if (i < 0) return null;
  let t = lineas[i].match(re)[1];
  for (let k = i + 1; k < lineas.length && /^\s*\/\/\s+\S/.test(lineas[k]) && !/^\s*\/\/\s*[^:]{2,70}:\s/.test(lineas[k]); k++) t += ' ' + lineas[k].replace(/^\s*\/\/\s*/, '');
  return t.trim();
}
const GENERALES = ['Qué hace', 'Por qué funciona', 'Concepto'];
const PROPIAS = { '3.1': ['Problema 1', 'Problema 2', 'Problema 3'], '3.2': [], '3.3': [], '3.4': [] };

console.log('\nEstructura y explicaciones');
await prueba('la primera línea es "// Responsabilidad: ..." sin TODO', () => {
  const primera = fuente.split('\n')[0];
  assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"'); assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
});
for (const id of ['3.1', '3.2', '3.3', '3.4']) {
  await prueba(`bloque ${id}: existe y tiene todas sus explicaciones`, () => {
    assert.ok(bloques[id] !== undefined, `falta la línea "// ===== Bloque ${id} — ... ====="`);
    for (const et of [...GENERALES, ...PROPIAS[id]]) {
      const t = explicacion(bloques[id], et);
      assert.ok(t !== null, `falta el comentario "// ${et}:"`); assert.ok(!/TODO/.test(t) && t.length >= 20, `"${et}" está vacío o muy corto: explícalo con tus palabras`);
    }
  });
}
await prueba('EXPLICACION.md: justificación escrita con tus palabras (sin TODO, al menos 80 palabras)', () => {
  const t = readFileSync(join(aqui, 'EXPLICACION.md'), 'utf8');
  assert.ok(!/TODO/.test(t), 'quita el TODO y escribe tu justificación');
  const palabras = t.split('\n').filter((l) => !/^\s*(#|>|\d+\.|La consigna)/.test(l)).join(' ').split(/\s+/).filter(Boolean).length;
  assert.ok(palabras >= 80, `tiene ${palabras} palabras; desarrolla un poco más`);
});

// ---- servidor de prueba para listarUsuarios -------------------------------------------------
const USUARIOS = [{ id: 1, name: 'Ana', email: 'ana@ejemplo.com', phone: '555-1' }, { id: 2, name: 'Luis', email: 'luis@ejemplo.com', phone: '555-2' }];
const peticiones = []; // instante en que llegó cada petición al servidor
const servidor = http.createServer((req, res) => {
  peticiones.push(performance.now());
  const enviar = (status, cuerpo, tipo = 'application/json') => { res.writeHead(status, { 'Content-Type': tipo }); res.end(cuerpo); };
  if (req.url === '/users') return enviar(200, JSON.stringify(USUARIOS));
  if (req.url === '/malformado') return enviar(200, '{esto no es json');
  if (req.url === '/falla') return enviar(500, JSON.stringify({ error: 'falla del servidor' }));
  return enviar(404, JSON.stringify({ error: 'no existe' }));
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${servidor.address().port}`;
const cerrado = http.createServer(); await new Promise((r) => cerrado.listen(0, '127.0.0.1', r));
const BASE_CAIDA = `http://127.0.0.1:${cerrado.address().port}`; await new Promise((r) => cerrado.close(r));

let m;
try { m = await import(pathToFileURL(archivo).href); m.config.retardoMs = 40; }
catch (e) { fallos++; console.log(`\n  FALLA no se pudo cargar actividad3.js: ${e.message}`); m = null; }

if (m) {
  const U3 = { id: 3, nombre: 'Cliente 3' };
  console.log('\nBloque 3.1 — Identificar el problema');
  await prueba('el fragmento entregado sigue igual (procesarArchivos con tres lecturas anidadas)', async () => {
    const r = await new Promise((res) => m.procesarArchivos((err, v) => res(v)));
    assert.equal(r, 'contenido de a.txt | contenido de b.txt | contenido de c.txt', 'no modifiques leerArchivo ni procesarArchivos');
  });

  console.log('\nBloque 3.2 — Migración de callbacks a promesas');
  await prueba('la versión con callbacks se conserva: flujoUsuariosCallbacks encadena tres llamadas', async () => {
    assert.deepEqual(await conTimeout(new Promise((res) => m.flujoUsuariosCallbacks(res))), U3, 'no modifiques obtenerUsuario ni flujoUsuariosCallbacks');
  });
  await prueba('obtenerUsuarioProm(id) devuelve una Promise; con id inválido rechaza con Error("id inválido")', async () => {
    const p = m.obtenerUsuarioProm(1); assert.ok(p instanceof Promise, 'debe devolver una Promise');
    assert.deepEqual(await conTimeout(p), { id: 1, nombre: 'Cliente 1' });
    const e = await rechazo(() => m.obtenerUsuarioProm(0)); assert.ok(e instanceof Error && /id inválido/.test(e.message), 'con id <= 0 debe rechazar con Error("id inválido")');
  });
  await prueba('flujoUsuariosPromesas encadena con .then, un único .catch y .finally', async () => {
    assert.deepEqual(await conTimeout(m.flujoUsuariosPromesas()), U3);
    const c = cuerpo('3.2', 'flujoUsuariosPromesas');
    assert.ok((c.match(/\.then\s*\(/g) ?? []).length >= 2, 'encadena con .then()'); assert.equal((c.match(/\.catch\s*\(/g) ?? []).length, 1, 'debe haber un único .catch() al final');
    assert.match(c, /\.finally\s*\(/, 'falta .finally()'); assert.ok(!/\basync\b|\bawait\b/.test(c), 'esta versión no usa async/await');
  });
  await prueba('un id inválido provoca un rechazo que el .catch() captura: se registra el error y el flujo devuelve null', async () => {
    const { valor, errores, logs } = await capturar(() => conTimeout(m.flujoUsuariosPromesas(0)));
    assert.equal(valor, null, 'cuando el .catch() captura el error, el flujo devuelve null'); assert.ok(errores.length >= 1, 'registra el error con console.error');
    assert.ok(logs.some((l) => /terminado/i.test(l)), 'el .finally() imprime "Proceso terminado"');
  });

  console.log('\nBloque 3.3 — Reescritura con async/await');
  await prueba('flujoUsuariosAsync usa async/await con try/catch/finally', async () => {
    assert.deepEqual(await conTimeout(m.flujoUsuariosAsync()), U3);
    const c = cuerpo('3.3', 'flujoUsuariosAsync');
    assert.ok((c.match(/\bawait\b/g) ?? []).length >= 3, 'usa await en las tres llamadas'); for (const k of ['try', 'catch', 'finally']) assert.match(c, new RegExp(`\\b${k}\\b`), `falta ${k}`);
    assert.ok(!/\.then\s*\(/.test(c), 'no encadenes .then');
  });
  await prueba('un id inválido lo captura el catch: registra el error, devuelve null y el finally imprime "Flujo terminado"', async () => {
    const { valor, errores, logs } = await capturar(() => conTimeout(m.flujoUsuariosAsync(0)));
    assert.equal(valor, null); assert.ok(errores.length >= 1, 'registra el error con console.error'); assert.ok(logs.some((l) => /terminado/i.test(l)), 'el finally imprime "Flujo terminado"');
  });
  await prueba('flujoUsuariosParalelo usa Promise.all y mide con console.time: tarda como una llamada, no como tres', async () => {
    const t0 = Date.now(); const { valor } = await capturar(() => conTimeout(m.flujoUsuariosParalelo())); const t = Date.now() - t0;
    assert.deepEqual(valor?.map((u) => u.id), [1, 2, 3], 'devuelve los tres usuarios (ids 1, 2 y 3)');
    assert.ok(t < 100, `tardó ${t} ms; en paralelo debería tardar cerca de 40 ms, no cerca de 120`);
    const c = cuerpo('3.3', 'flujoUsuariosParalelo'); assert.match(c, /Promise\.all\s*\(/); assert.match(c, /console\.time\s*\(/); assert.match(c, /console\.timeEnd\s*\(/);
  });

  console.log('\nBloque 3.4 — Cliente de API con manejo de errores');
  await prueba('listarUsuarios devuelve [{ nombre, correo }], muestra "Cargando..." antes y "Carga terminada" al final', async () => {
    const antes = peticiones.length;
    const { valor, logs, tiempos } = await capturar(() => conTimeout(m.listarUsuarios(BASE)));
    assert.deepEqual(valor, [{ nombre: 'Ana', correo: 'ana@ejemplo.com' }, { nombre: 'Luis', correo: 'luis@ejemplo.com' }]);
    assert.match(logs[0] ?? '', /Cargando/, 'lo primero que se muestra es "Cargando..."');
    assert.ok(peticiones.length > antes && tiempos[0] <= peticiones[antes], '"Cargando..." debe mostrarse ANTES de hacer la petición, no después');
    assert.ok(logs.some((l) => l.includes('Ana') && l.includes('ana@ejemplo.com')), 'muestra el nombre y el correo de cada usuario');
    assert.match(logs.at(-1) ?? '', /Carga terminada/, 'lo último que se muestra es "Carga terminada" (en el bloque finally)');
  });
  const casos = [['estado HTTP distinto de 2xx (500)', () => m.listarUsuarios(BASE, '/falla'), ErrorHTTP], ['JSON malformado', () => m.listarUsuarios(BASE, '/malformado'), ErrorJSON], ['falla de red (servidor caído)', () => m.listarUsuarios(BASE_CAIDA), ErrorRed]];
  for (const [nombre, llamar, Tipo] of casos) {
    await prueba(`${nombre}: lanza ${Tipo.name}, y el indicador de carga se retira igual (finally)`, async () => {
      const { valor: e, logs } = await capturar(() => conTimeout(rechazo(llamar)));
      assert.ok(e, 'debería fallar'); assert.ok(e instanceof Tipo, `esperaba ${Tipo.name} y llegó ${e.name ?? e}`);
      if (Tipo === ErrorHTTP) assert.equal(e.status, 500);
      assert.match(logs.at(-1) ?? '', /Carga terminada/, 'también con error debe mostrarse "Carga terminada" (bloque finally)');
    });
  }
  await prueba('listarUsuarios usa fetch, verifica response.ok y tiene bloque finally', () => {
    const c = cuerpo('3.4', 'listarUsuarios'); assert.match(c, /\bfetch\s*\(/); assert.match(c, /\.ok\b/, 'fetch no rechaza ante 404/500: revisa response.ok'); assert.match(c, /\bfinally\b/);
  });
}

servidor.close(); servidor.closeAllConnections?.();
console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
