// Verificador local de la Actividad 5 (proyecto integrador). Ejecuta: node verificar.mjs [ruta-al-proyecto] [--sin-pruebas]
// Sin argumentos revisa ../../../proyecto-integrador. Node.js 18+, sin dependencias propias.
// Audita de forma ESTÁTICA los criterios del anexo (Temas 1 a 5) y además EJECUTA `npm test` (necesita `npm install` previo;
// con --sin-pruebas solo hace la auditoría estática). No sustituye tu exposición ni la revisión del instructor.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, relative } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const sinPruebas = args.includes('--sin-pruebas');
const raiz = resolve(args.find((a) => !a.startsWith('--')) ?? join(aqui, '../../../proyecto-integrador'));
if (!existsSync(join(raiz, 'src'))) { console.error(`\nNo encuentro una carpeta src/ en ${raiz}\nUso: node verificar.mjs [ruta-al-proyecto] [--sin-pruebas]\n`); process.exit(2); }

const listar = (dir, ext) => readdirSync(dir).flatMap((n) => {
  if (n === 'node_modules' || n.startsWith('.')) return [];
  const p = join(dir, n); return statSync(p).isDirectory() ? listar(p, ext) : ext.test(n) ? [p] : [];
});
const sinComentarios = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/.*$/gm, '');
const src = listar(join(raiz, 'src'), /\.js$/).filter((f) => !/\.test\.js$/.test(f)).map((f) => ({ f: relative(raiz, f), crudo: readFileSync(f, 'utf8') })).map((x) => ({ ...x, c: sinComentarios(x.crudo) }));
const pruebas = listar(raiz, /\.test\.js$/).map((f) => ({ f: relative(raiz, f), c: sinComentarios(readFileSync(f, 'utf8')) }));
const donde = (re) => src.filter((x) => re.test(x.c)).map((x) => x.f);

let fallos = 0;
const ok = (n, extra = '') => console.log(`  ok    ${n}${extra ? `  (${extra})` : ''}`);
const mal = (n, motivo) => { fallos++; console.log(`  FALLA ${n}\n        ${motivo}`); };
const revisa = (n, cond, motivo, extra) => (cond ? ok(n, extra) : mal(n, motivo));
console.log(`\nProyecto revisado: ${raiz}\n`);

console.log('Tema 1 — IDs únicos con closures');
{
  const malId = src.filter((x) => /\bid\w*\s*[:=][^;\n]*(Date\.now|Math\.random)|(Date\.now|Math\.random)\(\)[^;\n]*\bid\b/i.test(x.c)).map((x) => x.f);
  revisa('los ids no se generan con Date.now() ni Math.random()', malId.length === 0,
    `en ${malId.join(', ')}: dos elementos creados en el mismo milisegundo compartirían id (le pasó al Task Manager original)`);
  const fabrica = src.find((x) => /let\s+(\w+)\s*=\s*\d+\s*;[\s\S]{0,240}return\s*(?:\(\s*\)\s*=>|function)[\s\S]{0,120}(?:\1\s*\+\+|\+\+\s*\1)/.test(x.c));
  const contador = src.find((x) => /(?:let|var)\s+\w*id\w*\s*=\s*\d+/i.test(x.c) && /\+\+/.test(x.c));
  const uuid = donde(/randomUUID\s*\(/).length > 0;
  revisa('hay un generador de ids (contador encapsulado o randomUUID)', fabrica || contador || uuid,
    'crea un generador: una función que guarde un contador y devuelva una función que lo incremente (closure)',
    fabrica ? `fábrica con closure en ${fabrica.f}` : contador ? `contador en el ámbito del módulo, ${contador.f}` : 'crypto.randomUUID');
  if (!fabrica) console.log('  ojo   ¿una fábrica explícita (crearGeneradorDeIds) haría visible el closure en tu exposición?');
}

console.log('\nTema 2 — clases, campos privados y módulos ESM');
{
  revisa('hay al menos una clase ES6', donde(/\bclass\s+\w+/).length > 0, 'modela la entidad de dominio con class');
  revisa('la entidad extiende a otra clase (extends)', donde(/\bclass\s+\w+\s+extends\s+\w+/).length > 0, 'la entidad debe extender a Registro con extends/super');
  const priv = donde(/(?:^|[\s;{])#[A-Za-z_]\w*\s*(?:=|;)|this\.#[A-Za-z_]\w*/m);
  revisa('la clase usa campos privados (#campo)', priv.length > 0,
    'ninguna clase declara campos privados: protege al menos un dato (p. ej. #estado con getter y un método para cambiarlo)', priv.join(', '));
  const esm = src.filter((x) => /^\s*export\s/m.test(x.c));
  revisa('el proyecto se divide en al menos 3 módulos ESM que exportan', esm.length >= 3, `solo ${esm.length} archivo(s) usan export`, `${esm.length} módulos`);
  revisa('los módulos se conectan con import', src.filter((x) => /^\s*import\s/m.test(x.c)).length >= 2, 'los módulos deben importarse entre sí');
}

console.log('\nTema 3 — API con fetch, async/await y try/catch');
{
  const api = src.find((x) => /\bfetch\s*\(/.test(x.c));
  revisa('usa fetch', !!api, 'carga el feed inicial con fetch', api?.f);
  if (api) {
    revisa('la función que hace fetch es async y usa await', /\basync\b/.test(api.c) && /\bawait\b/.test(api.c), 'usa async/await, no solo .then');
    revisa('maneja errores con try/catch', /\btry\b/.test(api.c) && /\bcatch\b/.test(api.c), 'envuelve la petición en try/catch');
    revisa('revisa response.ok (o status): un 404 no lanza error por sí solo', /\.ok\b|\.status\b/.test(api.c), 'fetch no rechaza ante 404/500: revisa respuesta.ok');
  }
}

console.log('\nTema 4 — delegación de eventos y localStorage');
{
  const dom = src.filter((x) => /addEventListener\s*\(/.test(x.c));
  revisa('hay un listener de click sobre un contenedor', dom.some((x) => /addEventListener\s*\(\s*['"]click['"]/.test(x.c)), 'registra un único listener de click en la lista');
  const enBucle = dom.filter((x) => /(?:forEach|\.map|\bfor\s*\(|\bwhile\s*\()[^}]{0,400}addEventListener/.test(x.c)).map((x) => x.f);
  revisa('no se registran listeners dentro de bucles (uno por elemento)', enBucle.length === 0, `revisa ${enBucle.join(', ')}: usa delegación en vez de un listener por elemento`);
  revisa('persiste con localStorage (getItem y setItem)', donde(/localStorage\.getItem/).length > 0 && donde(/localStorage\.setItem/).length > 0, 'guarda y carga los registros con localStorage');
  revisa('serializa con JSON.stringify/JSON.parse', donde(/JSON\.stringify/).length > 0 && donde(/JSON\.parse/).length > 0, 'localStorage solo guarda texto');
  // innerHTML = '' (vaciar) es seguro; se marca solo cuando se asigna contenido, o insertAdjacentHTML
  const inseguros = src.filter((x) => /\.innerHTML\s*\+?=(?!\s*(?:''|""|``)\s*;?\s*$)/m.test(x.c) || /insertAdjacentHTML\s*\(/.test(x.c)).map((x) => x.f);
  revisa('no inserta contenido con innerHTML/insertAdjacentHTML', inseguros.length === 0, `revisa ${inseguros.join(', ')}: usa textContent/createElement con datos del usuario`);
  revisa('sanitiza el texto libre (escape de HTML y enmascarado de datos personales)', donde(/export\s+(?:default\s+)?function\s+\w*[sS]anitiz|export\s+const\s+\w*[sS]anitiz/).length > 0, 'exporta una función de sanitización');
}

console.log('\nTema 5 — pruebas con Jest');
{
  const n = pruebas.reduce((t, x) => t + (x.c.match(/\b(?:test|it)\s*\(/g) ?? []).length, 0);
  revisa('al menos 4 pruebas con Jest', n >= 4, `hay ${n}; el anexo pide como mínimo 4`, `${n} pruebas en ${pruebas.length} archivo(s)`);
  const conDom = pruebas.filter((x) => /\bdocument\.|\bwindow\.|querySelector/.test(x.c)).map((x) => x.f);
  revisa('las pruebas no dependen del DOM', conDom.length === 0, `revisa ${conDom.join(', ')}: prueba la lógica, no la interfaz`);
  revisa('hay una prueba de seguridad con un payload tipo XSS', pruebas.some((x) => /<script|onerror|<img/i.test(x.c)), 'prueba la sanitización con un payload como <img src=x onerror=...>');
  revisa('hay pruebas de casos frontera del puntaje', pruebas.some((x) => /puntaje|riesgo|score/i.test(x.f + x.c)), 'prueba la función de puntaje con valores límite');
}

console.log('\nEjecución de las pruebas (npm test)');
if (sinPruebas) console.log('  omitido  (--sin-pruebas)');
else {
  // El script "test" puede vivir en el proyecto o en una carpeta superior (en este repositorio, la raíz).
  let dir = raiz, raizPruebas = null;
  for (let i = 0; i < 4 && !raizPruebas; i++) {
    const pj = join(dir, 'package.json');
    if (existsSync(pj)) { try { if (JSON.parse(readFileSync(pj, 'utf8')).scripts?.test) raizPruebas = dir; } catch { /* package.json ilegible */ } }
    const arriba = dirname(dir); if (arriba === dir) break; dir = arriba;
  }
  if (!raizPruebas) mal('npm test en verde', 'no encontré un package.json con el script "test" (busqué desde el proyecto hacia arriba)');
  else if (!existsSync(join(raizPruebas, 'node_modules'))) mal('npm test en verde', `faltan las dependencias: ejecuta "npm install" en ${raizPruebas} y vuelve a correr el verificador`);
  else {
    const filtro = raizPruebas === raiz ? [] : ['--', relative(raizPruebas, raiz)];
    console.log(`  ...   ejecutando npm test en ${raizPruebas}${filtro.length ? ` (solo ${filtro[1]})` : ''}`);
    const r = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test', ...filtro], {
      cwd: raizPruebas, encoding: 'utf8', timeout: 180000, shell: process.platform === 'win32',
      env: { ...process.env, CI: 'true', FORCE_COLOR: '0', NO_COLOR: '1' },
    });
    const salida = `${r.stdout ?? ''}\n${r.stderr ?? ''}`;
    const resumen = salida.match(/^Tests:\s+(.+)$/m)?.[1];
    if (r.error?.code === 'ETIMEDOUT') mal('npm test en verde', 'las pruebas tardaron más de 3 minutos: revisa que no haya un bucle infinito o una prueba que espere sin fin');
    else if (r.error) mal('npm test en verde', `no se pudo ejecutar npm: ${r.error.message}`);
    else if (r.status === 0) ok('npm test en verde', resumen);
    else {
      const claves = salida.split('\n').filter((l) => /^\s*(FAIL|●)|^Tests:|No tests found/.test(l)).slice(0, 6).map((l) => `        ${l.trim()}`);
      mal('npm test en verde', `las pruebas terminaron con errores (código ${r.status}); ejecuta "npm test" tú mismo para ver el detalle\n${claves.join('\n')}`);
    }
  }
}

console.log('\nRevisión manual (el verificador no puede comprobarlo)');
const entrega = ['docs/entrega.md'].find((f) => existsSync(join(raiz, f)));
console.log(`  ver   docs/entrega.md: ${entrega ? 'encontrado, revisa que lo hayas completado' : 'no existe todavía (copia docs/plantilla-entrega.md como docs/entrega.md y complétalo)'}`);
console.log('  ver   depuración con DevTools: prepara una demostración (breakpoint, panel Scope o Network) con un bug real que encontraste');
console.log('  ver   CI en verde en el último Pull Request');
console.log('  ver   presentación de 5 minutos con defensa técnica (guion en la plantilla de entrega)');

console.log(fallos === 0 ? '\nTodos los criterios comprobables se cumplen.\n' : `\n${fallos} criterio(s) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
