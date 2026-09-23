// Comprueba que documentos/videos.md está al día con los README de los días. Si falla, ejecuta: npm run indice
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const fs = require('fs');
const path = require('path');
const { generar, leerFichas, DIAS, RUTA_SALIDA, RAIZ } = require('../scripts/generar-indice-videos');

const urlsDeVideo = (texto) => [...texto.matchAll(/\((https:\/\/www\.youtube\.com\/(?:watch|shorts)[^)]*)\)/g)].map((m) => m[1]);
const indice = fs.readFileSync(RUTA_SALIDA, 'utf8');
const enIndice = urlsDeVideo(indice);
const enReadmes = DIAS.flatMap(([carpeta]) => leerFichas(carpeta).flatMap((f) => f.filas.map((fila) => fila[2])));

function textosDeLosDias(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'node_modules' ? [] : textosDeLosDias(ruta);
    return /\.(js|html|txt|md)$/.test(e.name) ? [[path.relative(RAIZ, ruta), fs.readFileSync(ruta, 'utf8')]] : [];
  });
}

describe('índice de videos (documentos/videos.md)', () => {
  test('incluye exactamente los mismos videos que los README de los días', () => {
    const faltan = enReadmes.filter((u) => !enIndice.includes(u));
    const sobran = enIndice.filter((u) => !enReadmes.includes(u));
    expect({ faltan, sobran }).toEqual({ faltan: [], sobran: [] });
    expect(enIndice.length).toBe(new Set(enIndice).size);
  });

  test('todo video enlazado en los días, ejercicios o actividades está en el índice', () => {
    const sinIndice = [];
    for (const [carpeta] of DIAS) {
      for (const [ruta, texto] of textosDeLosDias(path.join(RAIZ, carpeta))) {
        for (const u of urlsDeVideo(texto)) if (!enIndice.includes(u)) sinIndice.push(`${ruta}: ${u}`);
      }
    }
    expect(sinIndice).toEqual([]);
  });

  test('las cifras del índice coinciden con el número real de videos', () => {
    const total = enReadmes.length;
    expect(indice).toContain(`Los ${total} videos`);
    expect(indice).toContain(`| **Total** | **${total}** |`);
  });

  test('los enlaces relativos del índice apuntan a archivos que existen', () => {
    const rotos = [...indice.matchAll(/\]\((?!https?:|#)([^)]+)\)/g)]
      .map((m) => m[1])
      .filter((ruta) => !fs.existsSync(path.join(path.dirname(RUTA_SALIDA), ruta)));
    expect(rotos).toEqual([]);
  });

  test('está al día: coincide con lo que genera "npm run indice"', () => {
    if (indice !== generar()) {
      throw new Error('documentos/videos.md no está al día con los README de los días. Ejecuta "npm run indice" y sube el cambio.');
    }
  });
});
