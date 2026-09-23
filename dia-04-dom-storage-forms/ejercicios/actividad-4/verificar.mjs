// Verificador local de la Actividad 4. Ejecuta (una vez): npm install     y luego: node verificar.mjs
// Carga tu index.html en jsdom (un navegador simulado), ejecuta tu app.js y simula al usuario.
// Comprueba el contrato, no el diseño visual ni la calidad de tu código: eso lo valora el instructor.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
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

// Abre index.html con un localStorage inicial opcional; registra cada addEventListener y cada console.log de la página.
async function abrir(seed = {}) {
  const listeners = [], consola = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (e) => { erroresDelNavegador.push(String(e.detail?.message ?? e.message).split('\n')[0]); });
  const dom = new JSDOM(leer('index.html'), {
    runScripts: 'dangerously', resources: new CargadorLocal(), url: 'http://localhost/', pretendToBeVisual: true, virtualConsole,
    beforeParse(window) {
      window.alertLlamado = false; window.alert = () => { window.alertLlamado = true; };
      window.console.log = (...a) => consola.push(a); window.console.error = () => {}; window.console.warn = () => {};
      // Registra a qué formularios se les pasa FormData, para comprobar que el de contacto se lee con FormData.
      const FormDataOriginal = window.FormData; window.formulariosConFormData = [];
      window.FormData = function (form, ...resto) { window.formulariosConFormData.push(form); return new FormDataOriginal(form, ...resto); };
      window.FormData.prototype = FormDataOriginal.prototype;
      const original = window.EventTarget.prototype.addEventListener;
      window.EventTarget.prototype.addEventListener = function (tipo, ...resto) { listeners.push({ el: this, tipo }); return original.call(this, tipo, ...resto); };
      for (const [k, v] of Object.entries(seed)) window.localStorage.setItem(k, v);
    },
  });
  const { document } = dom.window;
  if (document.readyState !== 'complete') await new Promise((r) => dom.window.addEventListener('load', r));
  await espera(20);
  return { dom, w: dom.window, d: document, listeners, consola };
}
const $ = (d, s) => d.querySelector(s);
const enviar = (w, form) => form.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
const clic = (w, el) => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
const agregarTarea = (s, texto) => { const f = $(s.d, '#form-tarea'); f.elements.texto.value = texto; enviar(s.w, f); };
const guardadas = (w) => { const c = w.localStorage.getItem('tareas'); return c ? JSON.parse(c) : []; };
const items = (s) => s.d.querySelectorAll('#lista-tareas li');
const llenar = (s, valores) => { const f = $(s.d, '#form-contacto'); for (const [k, v] of Object.entries({ nombre: '', correo: '', telefono: '', mensaje: '', ...valores })) f.elements[k].value = v; enviar(s.w, f); };
const error = (s, campo) => ($(s.d, `[data-error="${campo}"]`)?.textContent ?? '').trim();

console.log('\nArchivos');
await prueba('app.js: la primera línea es "// Responsabilidad: ..." sin TODO', () => {
  const primera = leer('app.js').split('\n')[0];
  assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"'); assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
});
await prueba('app.js: no usa alert()', () => assert.ok(!/\balert\s*\(/.test(sinComentarios(leer('app.js'))), 'muestra los errores en la interfaz, no con alert'));
await prueba('index.html: script clásico (sin type="module") para que el verificador lo ejecute', () => assert.ok(!/<script[^>]*type\s*=\s*["']module["']/.test(leer('index.html')), 'usa <script src="app.js" defer>'));

let s = await abrir();
await prueba('la página tiene #form-tarea, #lista-tareas, #btn-limpiar, #form-contacto y un [data-error] por campo', () => {
  for (const id of ['#form-tarea', '#lista-tareas', '#btn-limpiar', '#form-contacto']) assert.ok($(s.d, id), `falta ${id}`);
  for (const c of ['nombre', 'correo', 'telefono', 'mensaje']) assert.ok($(s.d, `[data-error="${c}"]`), `falta [data-error="${c}"]`);
});

console.log('\nEjercicio 4.1 — Lista dinámica con delegación');
await prueba('el formulario agrega tareas dinámicamente: <li> con el texto en un <span> y un botón ✕; el texto vacío no agrega', () => {
  agregarTarea(s, 'Estudiar Web Storage'); agregarTarea(s, '   '); agregarTarea(s, 'Practicar delegación'); agregarTarea(s, 'Repasar closures');
  assert.equal(items(s).length, 3, `hay ${items(s).length} tarea(s); las vacías no deben agregarse`);
  const li = items(s)[0]; assert.match(li.querySelector('span')?.textContent ?? '', /Estudiar Web Storage/, 'el texto va dentro de un <span>'); assert.ok(li.querySelector('button'), 'cada tarea lleva un <button> ✕');
});
await prueba('seguridad: un texto con HTML se muestra como texto, no como elemento', () => {
  agregarTarea(s, '<img src=x onerror="window.pwned=1">');
  assert.equal(s.d.querySelectorAll('#lista-tareas img').length, 0, 'no debe crearse un <img>: usa textContent, no innerHTML'); assert.notEqual(s.w.pwned, 1);
  clic(s.w, [...items(s)].at(-1).querySelector('button'));
  assert.equal(items(s).length, 3);
});
await prueba('UN único listener delegado: ninguno sobre los elementos de la lista y uno de click en el contenedor', () => {
  const lista = $(s.d, '#lista-tareas');
  const dentro = s.listeners.filter((l) => l.el !== lista && l.el.nodeType === 1 && lista.contains(l.el));
  assert.equal(dentro.length, 0, `hay ${dentro.length} listener(s) sobre elementos hijos de la lista; usa delegación`);
  assert.ok(s.listeners.some((l) => l.tipo === 'click' && (l.el === lista || l.el.contains?.(lista))), 'falta un listener de click en #lista-tareas (o en un ancestro)');
});
await prueba('clic sobre el texto marca/desmarca la tarea como completada (clase "completada"), también las agregadas después de cargar', () => {
  const segunda = () => items(s)[1];
  clic(s.w, segunda().querySelector('span')); assert.ok(segunda().classList.contains('completada'), 'el <li> debe llevar la clase "completada"');
  clic(s.w, segunda().querySelector('span')); assert.ok(!segunda().classList.contains('completada'));
});
await prueba('clic sobre el botón ✕ elimina la tarea', () => {
  const antes = items(s).length; clic(s.w, items(s)[0].querySelector('button'));
  assert.equal(items(s).length, antes - 1);
});

console.log('\nEjercicio 4.2 — Persistencia de la lista de tareas');
await prueba('cada cambio se guarda en localStorage (clave "tareas", arreglo de { texto, completada })', () => {
  const g = guardadas(s.w); assert.equal(g.length, items(s).length, 'lo guardado debe coincidir con lo que se ve');
  assert.deepEqual(g.map((t) => t.texto), [...items(s)].map((li) => li.querySelector('span').textContent), 'texto de cada tarea');
  clic(s.w, items(s)[0].querySelector('span')); assert.equal(guardadas(s.w)[0].completada, true, 'completar una tarea se guarda');
  assert.equal(typeof guardadas(s.w)[0].texto, 'string');
});
const guardado = s.w.localStorage.getItem('tareas'); const cuantas = items(s).length;
await prueba('al cargar la página, la lista se reconstruye a partir de lo almacenado (con las completadas marcadas)', async () => {
  assert.ok(cuantas > 0, 'no había tareas guardadas con las que probar (corrige antes los pasos anteriores)');
  const s2 = await abrir({ tareas: guardado });
  assert.equal(s2.d.querySelectorAll('#lista-tareas li').length, cuantas);
  assert.ok(s2.d.querySelector('#lista-tareas li').classList.contains('completada'), 'la tarea completada debe verse completada al recargar');
});
await prueba('el botón "Limpiar todo" usa localStorage.removeItem y vacía la lista en pantalla', () => {
  assert.ok(items(s).length > 0, 'no había tareas que limpiar (corrige antes los pasos anteriores)');
  clic(s.w, $(s.d, '#btn-limpiar'));
  assert.equal(items(s).length, 0); assert.equal(s.w.localStorage.getItem('tareas'), null, 'debe quedar sin la clave "tareas" (removeItem)');
  assert.match(sinComentarios(leer('app.js')), /removeItem\s*\(/, 'usa localStorage.removeItem()');
});

console.log('\nEjercicio 4.3 — Formulario de contacto validado');
s = await abrir();
await prueba('formulario vacío: muestra el error junto a nombre, correo y mensaje a la vez (el teléfono es opcional) y no envía', () => {
  llenar(s, {});
  for (const c of ['nombre', 'correo', 'mensaje']) assert.ok(error(s, c).length > 0, `falta el mensaje de error junto a ${c}`);
  assert.equal(error(s, 'telefono'), '', 'el teléfono es opcional: no debe marcarse como error');
  assert.equal(s.consola.length, 0, 'no debe "enviarse" nada mientras haya errores');
});
await prueba('reglas: nombre de al menos 2 caracteres, correo con formato válido y mensaje no vacío', () => {
  llenar(s, { nombre: 'A', correo: 'a@b.com', mensaje: 'Hola' }); assert.ok(error(s, 'nombre'), 'un nombre de 1 carácter debe dar error'); assert.equal(error(s, 'correo'), ''); assert.equal(error(s, 'mensaje'), '');
  llenar(s, { nombre: 'Ana', correo: 'sin-arroba', mensaje: 'Hola' }); assert.ok(error(s, 'correo'), 'un correo sin formato válido debe dar error'); assert.equal(error(s, 'nombre'), '');
  llenar(s, { nombre: 'Ana', correo: 'ana@ejemplo.com', mensaje: '    ' }); assert.ok(error(s, 'mensaje'), 'un mensaje de solo espacios debe dar error');
});
await prueba('nunca se usa alert(): los errores se muestran en la interfaz', () => assert.equal(s.w.alertLlamado, false));
await prueba('datos válidos: se limpian los errores y, con FormData, se muestra en consola un objeto con los datos', () => {
  llenar(s, { nombre: 'Ana Pérez', correo: 'ana@ejemplo.com', telefono: '55 1234 5678', mensaje: 'Quiero más información' });
  for (const c of ['nombre', 'correo', 'telefono', 'mensaje']) assert.equal(error(s, c), '', `el error de ${c} debe quedar vacío`);
  const objeto = s.consola.flat().find((x) => x && typeof x === 'object' && 'nombre' in x && 'correo' in x);
  assert.ok(objeto, 'debe mostrar con console.log un objeto con los datos del formulario');
  assert.deepEqual({ nombre: objeto.nombre, correo: objeto.correo, telefono: objeto.telefono, mensaje: objeto.mensaje }, { nombre: 'Ana Pérez', correo: 'ana@ejemplo.com', telefono: '55 1234 5678', mensaje: 'Quiero más información' });
  assert.ok(s.w.formulariosConFormData.includes($(s.d, '#form-contacto')), 'el formulario de contacto debe leerse con new FormData(formulario)');
});
await prueba('el teléfono puede quedar vacío en un envío válido', () => {
  s.consola.length = 0; llenar(s, { nombre: 'Luis', correo: 'luis@ejemplo.com', mensaje: 'Hola' });
  assert.ok(s.consola.flat().some((x) => x && typeof x === 'object' && x.nombre === 'Luis'), 'un envío válido sin teléfono también debe mostrarse');
});
await prueba('nunca se llamó a alert() durante toda la prueba', () => assert.equal(s.w.alertLlamado, false));

console.log('\nSugerencias (no afectan el resultado)');
const js = sinComentarios(leer('app.js'));
console.log(/createDocumentFragment/.test(js) ? '  ok    usas DocumentFragment para pintar' : '  ojo   ¿pintar con DocumentFragment, como en la ficha 4.1?');
console.log(/\.closest\(/.test(js) ? '  ok    usas closest() para identificar la tarea' : '  ojo   closest() ayuda a encontrar el <li> desde el elemento clicado');
console.log(/Object\.fromEntries/.test(js) ? '  ok    usas Object.fromEntries con FormData' : '  ojo   Object.fromEntries(datos.entries()) arma el objeto de FormData en una línea');

if (erroresDelNavegador.length) { console.log('\nErrores que lanzó tu código en el navegador simulado'); for (const m of [...new Set(erroresDelNavegador)].slice(0, 3)) console.log(`  !     ${m}`); }
s.dom.window.close();
console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
