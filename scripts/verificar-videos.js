// Comprueba que los videos del curso sigan disponibles y que sus títulos coincidan. Uso: npm run verificar-videos
// Con --registrar (solo si todo está bien) anota la fecha de hoy y regenera documentos/videos.md.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const fs = require('fs');
const { leerFichas, generar, DIAS, RUTA_SALIDA, RUTA_VERIFICACION } = require('./generar-indice-videos');

const LISTA = 'https://www.youtube.com/playlist?list=PLBN8bJQ3f4w4';
const CABECERAS = { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'es' };

// Todos los videos de los README de los días: [{ tipo, titulo, url, ficha }]
function videosDelCurso() {
  return DIAS.flatMap(([carpeta]) => leerFichas(carpeta).flatMap((f) => f.filas.map(([tipo, titulo, url]) => ({ tipo, titulo, url, ficha: f.cabecera }))));
}

const normalizar = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
function coincidenciaDeTitulos(escrito, real) {
  const a = new Set(normalizar(escrito).split(' ')); const b = new Set(normalizar(real).split(' '));
  return [...a].filter((p) => b.has(p)).length / Math.max(a.size, 1);
}
const decodificar = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

async function pedir(fetchFn, url, ms, metodo = 'GET') {
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), ms);
  try { return await fetchFn(url, { method: metodo, headers: CABECERAS, signal: control.signal }); } finally { clearTimeout(reloj); }
}

const idDeVideo = (url) => /(?:[?&]v=|shorts\/)([\w-]{11})/.exec(url)?.[1];

// estado: 'ok' | 'ok-sin-insercion' (se reproduce, pero el autor desactivó insertarlo) | 'problema'
async function comprobar(url, fetchFn = fetch, { ms = 15000 } = {}) {
  try {
    const r = await pedir(fetchFn, `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`, ms);
    if (r.status === 200) return { url, estado: 'ok', tituloReal: (await r.json()).title ?? '' };
    if (r.status === 401 || r.status === 403) {
      // 401 es ambiguo: video privado, o video público con la inserción desactivada. Se decide con la página del video.
      const pagina = await (await pedir(fetchFn, url, ms)).text();
      const estadoPagina = /"playabilityStatus":\{"status":"([A-Z_]+)"/.exec(pagina)?.[1];
      const titulo = decodificar(/<title>([^<]*)<\/title>/.exec(pagina)?.[1] ?? '').replace(/ - YouTube$/, '');
      if (estadoPagina === 'OK') return { url, estado: 'ok-sin-insercion', tituloReal: titulo };
      if (estadoPagina === 'ERROR') return { url, estado: 'problema', detalle: `HTTP ${r.status}: YouTube indica que el video no está disponible (ERROR)` };
      // Cualquier otro caso es ambiguo: desde un servidor YouTube pide iniciar sesión o mostrar un muro de consentimiento
      // (LOGIN_REQUIRED), y un video privado responde igual. Se confirma con la miniatura, que sale de un CDN sin esos
      // muros y no existe para videos borrados.
      const id = idDeVideo(url);
      if (id) {
        const m = await pedir(fetchFn, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, ms, 'HEAD');
        if (m.status === 200) {
          const nota = estadoPagina ? `YouTube pidió iniciar sesión (${estadoPagina}): el video existe, pero desde aquí no se pudo confirmar que se reproduzca` : 'el video existe (confirmado por la miniatura)';
          return { url, estado: 'ok-sin-insercion', tituloReal: '', nota };
        }
      }
      return { url, estado: 'problema', detalle: `HTTP ${r.status}${estadoPagina ? ` (${estadoPagina})` : ''} y no se encontró la miniatura: el video parece no existir o ser privado (título de la página: "${titulo || 'vacío'}")` };
    }
    return { url, estado: 'problema', detalle: `HTTP ${r.status}: el video no existe o no está disponible` };
  } catch (e) {
    return { url, estado: 'problema', detalle: `sin respuesta (${e.name === 'AbortError' ? 'tiempo agotado' : e.message})`, sinRed: true };
  }
}

// Comprueba todos los videos (y la lista de reproducción) con una cantidad limitada de peticiones a la vez.
async function verificarTodos(videos, fetchFn = fetch, { concurrencia = 6, ms = 15000, umbralTitulo = 0.75 } = {}) {
  const unicos = [...new Map(videos.map((v) => [v.url, v])).values()];
  const resultados = new Array(unicos.length); let siguiente = 0;
  await Promise.all(Array.from({ length: concurrencia }, async () => {
    while (siguiente < unicos.length) { const i = siguiente++; resultados[i] = { ...unicos[i], ...(await comprobar(unicos[i].url, fetchFn, { ms })) }; }
  }));
  const problemas = resultados.filter((r) => r.estado === 'problema');
  const sinInsercion = resultados.filter((r) => r.estado === 'ok-sin-insercion');
  const titulosDistintos = resultados.filter((r) => r.tituloReal && coincidenciaDeTitulos(r.titulo, r.tituloReal) < umbralTitulo);
  let lista;
  try { const r = await pedir(fetchFn, LISTA, ms); lista = r.status === 200 ? { estado: 'ok' } : { estado: 'problema', detalle: `HTTP ${r.status}` }; }
  catch (e) { lista = { estado: 'problema', detalle: `sin respuesta (${e.message})` }; }
  return { total: unicos.length, problemas, sinInsercion, titulosDistintos, lista, todoSinRed: problemas.length === unicos.length && problemas.every((p) => p.sinRed) };
}

function fechaDeHoy(ahora = new Date()) {
  const dos = (n) => String(n).padStart(2, '0');
  return `${ahora.getFullYear()}-${dos(ahora.getMonth() + 1)}-${dos(ahora.getDate())}`;
}

// Anota la fecha de la verificación (sin tocar el resto del archivo) y devuelve la fecha escrita.
function registrarFecha(ruta = RUTA_VERIFICACION, fecha = fechaDeHoy()) {
  const datos = JSON.parse(fs.readFileSync(ruta, 'utf8'));
  fs.writeFileSync(ruta, JSON.stringify({ ...datos, fecha }, null, 2) + '\n');
  return fecha;
}

async function principal(args = process.argv.slice(2)) {
  const registrar = args.includes('--registrar');
  const videos = videosDelCurso();
  console.log(`Verificando ${new Set(videos.map((v) => v.url)).size} videos y la lista de reproducción (necesita internet)...\n`);
  const r = await verificarTodos(videos);
  if (r.todoSinRed) { console.error('No se pudo conectar con YouTube en ningún caso: revisa tu conexión a internet e inténtalo de nuevo.'); return 2; }

  console.log(`Videos que responden: ${r.total - r.problemas.length} de ${r.total}`);
  for (const p of r.problemas) console.log(`  PROBLEMA  ${p.url}\n            ${p.ficha} — "${p.titulo}"\n            ${p.detalle}`);
  for (const v of r.sinInsercion) console.log(`  aviso     ${v.nota ?? 'se reproduce, pero el autor desactivó insertarlo en otros sitios'}: "${v.titulo}"`);
  for (const t of r.titulosDistintos) console.log(`  aviso     el título cambió: escrito "${t.titulo}"\n            real     "${t.tituloReal}"\n            ${t.url}`);
  console.log(`Lista de reproducción: ${r.lista.estado === 'ok' ? 'responde' : `PROBLEMA (${r.lista.detalle})`}`);

  const bien = r.problemas.length === 0 && r.lista.estado === 'ok';
  console.log(bien ? '\nTodos los enlaces funcionan.' : `\n${r.problemas.length + (r.lista.estado === 'ok' ? 0 : 1)} enlace(s) con problema: corrígelos en los README de los días y ejecuta "npm run indice".`);
  if (registrar) {
    if (!bien) { console.log('No se registró la fecha: hay enlaces con problema.'); return 1; }
    const fecha = registrarFecha();
    fs.writeFileSync(RUTA_SALIDA, generar());
    console.log(`Fecha de verificación registrada (${fecha}) y documentos/videos.md regenerado. Sube el cambio a git.`);
  } else if (bien) console.log('Para anotar la fecha en el índice: npm run verificar-videos -- --registrar');
  return bien ? 0 : 1;
}

module.exports = { comprobar, verificarTodos, coincidenciaDeTitulos, registrarFecha, fechaDeHoy, videosDelCurso };

if (require.main === module) principal().then((c) => process.exit(c), (e) => { console.error(e); process.exit(2); });
