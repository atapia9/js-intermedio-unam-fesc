// Genera documentos/videos.md a partir de los README de los días (fuente de los enlaces). Uso: npm run indice
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const RUTA_SALIDA = path.join(RAIZ, 'documentos', 'videos.md');
const RUTA_VERIFICACION = path.join(RAIZ, 'documentos', 'videos-verificacion.json');
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = [
  ['dia-01-fundamentos', 'Día 1 — Fundamentos avanzados', '28 de septiembre de 2026'],
  ['dia-02-poo-es6', 'Día 2 — POO y ES6+', '29 de septiembre de 2026'],
  ['dia-03-asincronia', 'Día 3 — Programación asíncrona', '30 de septiembre de 2026'],
  ['dia-04-dom-storage-forms', 'Día 4 — DOM, eventos, Web Storage y formularios', '1 de octubre de 2026'],
  ['dia-05-testing-debug-patrones', 'Día 5 — Testing, depuración y arquitectura', '2 de octubre de 2026'],
];
const LISTA = 'https://www.youtube.com/playlist?list=PLBN8bJQ3f4w4';
const FILA = /^\| ([^|]+?) \| \[(.+?)\]\((https[^)]+)\) \|$/gm;

const leer = (ruta) => fs.readFileSync(path.join(RAIZ, ruta), 'utf8');

// '2026-09-23' -> '23 de septiembre de 2026' (sin depender de ICU ni de la zona horaria)
function formatearFecha(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) throw new Error(`Fecha inválida: "${iso}" (se espera AAAA-MM-DD)`);
  return `${Number(m[3])} de ${MESES[Number(m[2]) - 1]} de ${m[1]}`;
}

// Cabecera y filas [tipo, título, url] de cada ficha de la sección "Videos de apoyo" de un README de día.
function leerFichas(carpeta) {
  const seccion = leer(`${carpeta}/README.md`).split('## Videos de apoyo')[1].split('\n## ')[0];
  return seccion.split('\n### ').slice(1).map((bloque) => ({
    cabecera: bloque.split('\n')[0],
    filas: [...bloque.matchAll(FILA)].map((m) => [m[1], m[2], m[3]]),
  }));
}

function archivosDeEjercicios(carpeta) {
  const salida = {};
  const recorrer = (dir) => {
    for (const nombre of fs.readdirSync(path.join(RAIZ, dir))) {
      if (nombre === 'node_modules') continue;
      const ruta = `${dir}/${nombre}`;
      if (fs.statSync(path.join(RAIZ, ruta)).isDirectory()) recorrer(ruta);
      else if (/\.(js|html|txt|md)$/.test(nombre)) salida[ruta] = leer(ruta);
    }
  };
  if (fs.existsSync(path.join(RAIZ, carpeta, 'ejercicios'))) recorrer(`${carpeta}/ejercicios`);
  return salida;
}

function etiqueta(ruta) {
  const act = ruta.match(/ejercicios\/actividad-(\d)\//);
  if (act) return [`Actividad ${act[1]}`, ruta.endsWith('README.md') ? `../${ruta}` : null];
  const ej = ruta.match(/ejercicios\/ejercicio-(\d\.\d)-/);
  return [ej ? `Ejercicio ${ej[1]}` : null, `../${ruta}`];
}

function anclaDe(titulo) {
  return titulo.toLowerCase().replace(/[^a-z0-9áéíóúñ ]/g, '').replace(/ /g, '-');
}

function generar() {
  const fechaVerificacion = formatearFecha(JSON.parse(fs.readFileSync(RUTA_VERIFICACION, 'utf8')).fecha);
  let total = 0;
  const secciones = [];
  for (const [carpeta, titulo, fecha] of DIAS) {
    const archivos = archivosDeEjercicios(carpeta);
    const L = [`## ${titulo}`, '', `Sesión del ${fecha}. Detalle, casos de uso y preguntas en el [README del día](../${carpeta}/README.md).`, ''];
    let nDia = 0;
    for (const { cabecera, filas } of leerFichas(carpeta)) {
      L.push(`### ${cabecera}`, '', '| Tipo | Video |', '|---|---|');
      for (const [tipo, t, u] of filas) L.push(`| ${tipo} | [${t}](${u}) |`);
      nDia += filas.length;
      const usos = new Map();
      for (const f of Object.keys(archivos).sort()) {
        if (f.endsWith('/README.md') && !f.includes('/actividad-')) continue;
        if (filas.some(([, , u]) => archivos[f].includes(u))) {
          const [et, ln] = etiqueta(f);
          if (et && !usos.has(et)) usos.set(et, ln);
        }
      }
      if (usos.size) L.push('', 'Se usa en: ' + [...usos].map(([e, ln]) => (ln ? `[${e}](${ln})` : e)).join(', ') + '.');
      L.push('');
    }
    total += nDia;
    secciones.push({ titulo, n: nDia, texto: L.join('\n') });
  }
  const tabla = secciones.map((s) => `| [${s.titulo}](#${anclaDe(s.titulo)}) | ${s.n} |`).join('\n');
  const doc = `# Índice de videos de apoyo

Los ${total} videos del [Anexo de videos de apoyo](Anexo_Videos_JS_Intermedio.pdf) del curso *JavaScript Intermedio* (REDEC-UNAM / FESC), organizados por día y por ficha. Cada video se marca como **Principal**, **Refuerzo** u otro tipo según el anexo; los marcados como *Opcional (inglés)* se pueden ver con subtítulos.

Todos están también en la [lista de reproducción del curso](${LISTA}).

Este índice se genera a partir de los README de los días con \`npm run indice\`; no lo edites a mano.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

| Día | Videos |
|---|---|
${tabla}
| **Total** | **${total}** |

Antes de cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso del README del día y responde la pregunta.

**Sobre los enlaces:** se verificaron el ${fechaVerificacion} y los ${total} funcionan. Pueden cambiar o dejar de estar disponibles con el tiempo, como advierte el anexo; conviene revisarlos antes de cada edición del curso con \`npm run verificar-videos\`. El video «JavaScript asíncrono: síncrono vs. asíncrono» (ficha 3.1) no permite insertarse en otros sitios, pero se abre con normalidad en YouTube.

` + secciones.map((s) => s.texto).join('\n');
  return doc.replace(/\n+$/, '') + '\n';
}

module.exports = { generar, leerFichas, formatearFecha, DIAS, RUTA_SALIDA, RUTA_VERIFICACION, RAIZ };

if (require.main === module) {
  fs.writeFileSync(RUTA_SALIDA, generar());
  console.log(`Índice actualizado: ${path.relative(RAIZ, RUTA_SALIDA)}`);
}
