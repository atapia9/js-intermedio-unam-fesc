// Verificador local de la Actividad 4. Ejecuta (una vez): npm install     y luego: node verificar.mjs
// Carga tu index.html en jsdom (un navegador simulado), ejecuta tu app.js y simula al usuario.
// Comprueba el contrato, no el diseño visual ni la calidad de tu código: eso lo valora el instructor.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

let JSDOM, ResourceLoader, VirtualConsole;
try { ({ JSDOM, ResourceLoader, VirtualConsole } = await import('jsdom')); }
catch { console.error('\nFalta jsdom. Ejecuta primero, en esta carpeta:\n\n  npm install\n'); process.exit(2); }

const aqui = dirname(fileURLToPath(import.meta.url));
const leer = (f) => readFileSync(join(aqui, f), 'utf8');
const sinComentarios = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/.*$/gm, '');
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let fallos = 0;
async function prueba(nombre, fn) {
  try { await fn(); console.log(`  ok    ${nombre}`); }
  catch (e) { fallos++; console.log(`  FALLA ${nombre}\n        ${String(e.message).split('\n')[0]}`); }
}

// Sirve tus archivos locales (app.js...) cuando la página pide http://localhost/<archivo>.
class CargadorLocal extends ResourceLoader {
  fetch(url) {
    const u = new URL(url);
    if (u.hostname !== 'localhost') return Promise.resolve(null);
    try { return Promise.resolve(readFileSync(join(aqui, decodeURIComponent(u.pathname)))); }
    catch { return Promise.reject(new Error(`no se encontró ${u.pathname}`)); }
  }
}
const erroresDelNavegador = [];

// Abre index.html con un localStorage inicial opcional y registra cada addEventListener.
async function abrir(seed = {}) {
  const listeners = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (e) => { erroresDelNavegador.push(String(e.detail?.message ?? e.message).split('\n')[0]); });
  const dom = new JSDOM(leer('index.html'), {
    runScripts: 'dangerously', resources: new CargadorLocal(), url: 'http://localhost/', pretendToBeVisual: true, virtualConsole,
    beforeParse(window) {
      window.Date.now = () => 1700000000000; // reloj congelado: los ids basados en la hora chocarían
      window.alertLlamado = false;
      window.alert = () => { window.alertLlamado = true; };
      const original = window.EventTarget.prototype.addEventListener;
      window.EventTarget.prototype.addEventListener = function (tipo, ...resto) {
        listeners.push({ el: this, tipo });
        return original.call(this, tipo, ...resto);
      };
      for (const [k, v] of Object.entries(seed)) window.localStorage.setItem(k, v);
    },
  });
  const { document } = dom.window;
  if (document.readyState !== 'complete') await new Promise((r) => dom.window.addEventListener('load', r));
  await espera(20);
  return { dom, w: dom.window, d: document, listeners };
}
const $ = (d, s) => d.querySelector(s);
const enviar = (w, d, { titulo = '', categoria = '' } = {}) => {
  const f = $(d, '#form-tarea'); f.elements.titulo.value = titulo; f.elements.categoria.value = categoria;
  f.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
};
const guardadas = (w) => { const c = w.localStorage.getItem('tareas'); return c ? JSON.parse(c) : []; };
const clic = (w, el) => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));

console.log('\nEstructura y archivos');
await prueba('app.js: la primera línea es "// Responsabilidad: ..." sin TODO', () => {
  const primera = leer('app.js').split('\n')[0];
  assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"');
  assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
});
await prueba('app.js: no usa alert()', () => {
  assert.ok(!/\balert\s*\(/.test(sinComentarios(leer('app.js'))), 'muestra los errores en la interfaz (#errores), no con alert');
});
await prueba('index.html: script clásico (sin type="module") para que el verificador lo ejecute', () => {
  assert.ok(!/<script[^>]*type\s*=\s*["']module["']/.test(leer('index.html')), 'usa <script src="app.js" defer>');
});

let s = await abrir();
console.log('\nFormulario validado (FormData) y errores en la interfaz');
await prueba('existen #form-tarea, #lista-tareas, #errores y #btn-limpiar', () => {
  for (const id of ['#form-tarea', '#lista-tareas', '#errores', '#btn-limpiar']) assert.ok($(s.d, id), `falta ${id}`);
});
await prueba('formulario vacío: muestra TODOS los errores juntos (al menos 2) y no agrega nada', () => {
  enviar(s.w, s.d, {});
  const n = s.d.querySelectorAll('#errores li').length;
  assert.ok(n >= 2, `hay ${n} error(es) en #errores li; deben mostrarse título y categoría a la vez`);
  assert.equal(s.d.querySelectorAll('#lista-tareas li').length, 0);
  assert.equal(guardadas(s.w).length, 0);
});
await prueba('título de menos de 3 caracteres: error visible', () => {
  enviar(s.w, s.d, { titulo: 'ab', categoria: 'trabajo' });
  assert.ok(s.d.querySelectorAll('#errores li').length >= 1, 'debe mostrar un error');
  assert.equal(s.d.querySelectorAll('#lista-tareas li').length, 0);
});
await prueba('título de más de 60 caracteres: error visible', () => {
  enviar(s.w, s.d, { titulo: 'x'.repeat(61), categoria: 'trabajo' });
  assert.ok(s.d.querySelectorAll('#errores li').length >= 1, 'debe mostrar un error');
  assert.equal(s.d.querySelectorAll('#lista-tareas li').length, 0);
});
await prueba('envío válido: agrega la tarea, limpia los errores y guarda en localStorage', () => {
  enviar(s.w, s.d, { titulo: '  Estudiar closures  ', categoria: 'estudio' });
  const items = s.d.querySelectorAll('#lista-tareas li');
  assert.equal(items.length, 1);
  assert.match(items[0].textContent, /Estudiar closures/);
  assert.equal(s.d.querySelectorAll('#errores li').length, 0, '#errores debe quedar vacío');
  const [t] = guardadas(s.w);
  assert.equal(t.titulo, 'Estudiar closures', 'el título se guarda sin espacios sobrantes');
  assert.equal(t.categoria, 'estudio'); assert.equal(t.completada, false); assert.ok(t.id !== undefined, 'cada tarea lleva id');
});
await prueba('ids únicos aunque se agreguen tareas seguidas', () => {
  enviar(s.w, s.d, { titulo: 'Segunda tarea', categoria: 'trabajo' });
  enviar(s.w, s.d, { titulo: 'Tercera tarea', categoria: 'personal' });
  const ids = guardadas(s.w).map((t) => String(t.id));
  assert.equal(ids.length, 3); assert.equal(new Set(ids).size, 3, `ids repetidos (${ids.join(', ')}): no uses Date.now() como id; usa un contador o crypto.randomUUID()`);
});
await prueba('seguridad: un título con HTML se muestra como texto, no como elemento', () => {
  enviar(s.w, s.d, { titulo: '<img src=x onerror="window.pwned=1">', categoria: 'trabajo' });
  assert.equal(s.d.querySelectorAll('#lista-tareas img').length, 0, 'no debe crearse un <img>: usa textContent, no innerHTML');
  assert.match($(s.d, '#lista-tareas').textContent, /<img src=x/);
  assert.notEqual(s.w.pwned, 1);
});

console.log('\nUn solo listener delegado');
await prueba('ningún listener registrado sobre los elementos de la lista; sí uno de click en el contenedor', () => {
  const lista = $(s.d, '#lista-tareas');
  const dentro = s.listeners.filter((l) => l.el !== lista && l.el.nodeType === 1 && lista.contains(l.el));
  assert.equal(dentro.length, 0, `hay ${dentro.length} listener(s) sobre elementos hijos de la lista; usa delegación`);
  const enContenedor = s.listeners.some((l) => l.tipo === 'click' && l.el.nodeType !== undefined && (l.el === lista || l.el.contains?.(lista)));
  assert.ok(enContenedor, 'falta un listener de click en #lista-tareas (o en un ancestro)');
});
await prueba('las tareas agregadas DESPUÉS de cargar la página también responden (alternar)', () => {
  const segunda = () => s.d.querySelectorAll('#lista-tareas li')[1]; // se vuelve a consultar: tu render puede reemplazar los nodos
  assert.ok(segunda(), 'no hay una segunda tarea sobre la que hacer clic (corrige antes los pasos anteriores)');
  clic(s.w, segunda().querySelector('[data-accion="alternar"]'));
  assert.ok(segunda().classList.contains('completada'), 'el <li> debe llevar la clase "completada"');
  assert.equal(guardadas(s.w)[1].completada, true, 'el cambio se guarda');
  clic(s.w, segunda().querySelector('[data-accion="alternar"]'));
  assert.ok(!segunda().classList.contains('completada')); assert.equal(guardadas(s.w)[1].completada, false);
});
await prueba('eliminar quita el <li> y la tarea guardada', () => {
  const antes = s.d.querySelectorAll('#lista-tareas li').length;
  clic(s.w, s.d.querySelector('#lista-tareas [data-accion="eliminar"]'));
  assert.equal(s.d.querySelectorAll('#lista-tareas li').length, antes - 1);
  assert.equal(guardadas(s.w).length, antes - 1);
});

console.log('\nPersistencia: guardar, cargar y limpiar');
const guardado = s.w.localStorage.getItem('tareas'); const cuantas = guardadas(s.w).length;
await prueba('cargar: al abrir la página con datos guardados, se pintan las tareas', async () => {
  assert.ok(cuantas > 0, 'no había tareas guardadas con las que probar (corrige antes los pasos anteriores)');
  const s2 = await abrir({ tareas: guardado });
  assert.equal(s2.d.querySelectorAll('#lista-tareas li').length, cuantas);
  assert.equal(s2.w.alertLlamado, false);
});
await prueba('limpiar: vacía la lista y borra lo guardado', () => {
  assert.ok(s.d.querySelectorAll('#lista-tareas li').length > 0, 'no había tareas que limpiar (corrige antes los pasos anteriores)');
  clic(s.w, $(s.d, '#btn-limpiar'));
  assert.equal(s.d.querySelectorAll('#lista-tareas li').length, 0);
  const crudo = s.w.localStorage.getItem('tareas');
  assert.ok(crudo === null || crudo === '[]', `localStorage.tareas debe quedar vacío (null o "[]"), no ${crudo}`);
});
await prueba('nunca se llamó a alert() durante toda la prueba', () => {
  assert.ok(s.d.querySelectorAll('#errores').length === 1 && guardado !== null, 'la prueba anterior no llegó a ejecutarse con datos reales');
  assert.equal(s.w.alertLlamado, false);
});

console.log('\nSugerencias (no afectan el resultado)');
const js = sinComentarios(leer('app.js'));
console.log(/createDocumentFragment/.test(js) ? '  ok    usas DocumentFragment para pintar' : '  ojo   ¿pintar con DocumentFragment, como en la ficha 4.1?');
console.log(/new FormData\(/.test(js) ? '  ok    lees el formulario con FormData' : '  ojo   la actividad pide FormData (ficha 4.4)');
console.log(/\.closest\(/.test(js) ? '  ok    usas closest() para identificar la tarea' : '  ojo   closest() ayuda a encontrar el <li> desde el elemento clicado');

if (erroresDelNavegador.length) {
  console.log('\nErrores que lanzó tu código en el navegador simulado');
  for (const m of [...new Set(erroresDelNavegador)].slice(0, 3)) console.log(`  !     ${m}`);
}
s.dom.window.close();
console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
