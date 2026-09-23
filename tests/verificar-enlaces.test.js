// Pruebas de la lógica de "npm run verificar-enlaces" (videos y bibliografía) con respuestas simuladas (no usan internet).
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { comprobar, verificarTodos, coincidenciaDeTitulos, registrarFecha, fechaDeHoy, extraerEnlaces, enlacesDeBibliografia, comprobarEnlace, verificarBibliografia } = require('../scripts/verificar-enlaces');
const { formatearFecha, RUTA_VERIFICACION } = require('../scripts/generar-indice-videos');

const respuesta = (status, { json, texto } = {}) => ({ status, json: async () => json, text: async () => texto ?? '' });
const PAGINA_REPRODUCIBLE = '<title>Mi video &amp; m&#39;s - YouTube</title>..."playabilityStatus":{"status":"OK","playableInEmbed":false}';
const PAGINA_PRIVADA = '<title>YouTube</title>..."playabilityStatus":{"status":"LOGIN_REQUIRED"}';
const V = (n) => `https://www.youtube.com/watch?v=vid${String(n).padStart(8, '0')}`; // 11 caracteres, como un id real

// fetch simulado: responde según la URL que se le pide
const simulado = (reglas) => async (url) => {
  const clave = Object.keys(reglas).find((k) => url.includes(k));
  if (!clave) throw new Error(`sin regla para ${url}`);
  const r = reglas[clave];
  if (r instanceof Error) throw r;
  return r;
};

describe('comprobar(url)', () => {
  test('200 en oEmbed: el video funciona y trae su título real', async () => {
    const r = await comprobar(V(1), simulado({ oembed: respuesta(200, { json: { title: 'Closures explicados' } }) }));
    expect(r).toMatchObject({ estado: 'ok', tituloReal: 'Closures explicados' });
  });

  test('401 pero la página del video es reproducible: cuenta como funcionando, sin inserción', async () => {
    const r = await comprobar(V(2), simulado({ oembed: respuesta(401), 'watch?v=vid00000002': respuesta(200, { texto: PAGINA_REPRODUCIBLE }) }));
    expect(r.estado).toBe('ok-sin-insercion');
    expect(r.tituloReal).toBe("Mi video & m's");
  });

  test('401, la página pide iniciar sesión (LOGIN_REQUIRED) y la miniatura no existe: es un problema', async () => {
    const r = await comprobar(V(3), simulado({ oembed: respuesta(401), 'watch?v=vid00000003': respuesta(200, { texto: PAGINA_PRIVADA }), 'i.ytimg.com': respuesta(404) }));
    expect(r.estado).toBe('problema');
    expect(r.detalle).toMatch(/401.*LOGIN_REQUIRED.*miniatura/);
  });

  test('401 y la página no dice nada útil (muro de consentimiento) pero la miniatura existe: se acepta', async () => {
    const r = await comprobar(V(7), simulado({ oembed: respuesta(401), 'watch?v=vid00000007': respuesta(200, { texto: '<title>Antes de ir a YouTube</title>' }), 'i.ytimg.com': respuesta(200) }));
    expect(r).toMatchObject({ estado: 'ok-sin-insercion', nota: 'el video existe (confirmado por la miniatura)' });
  });

  test('401, la página no dice nada útil y la miniatura no existe: es un problema con el título de la página como pista', async () => {
    const r = await comprobar(V(8), simulado({ oembed: respuesta(401), 'watch?v=vid00000008': respuesta(200, { texto: '<title>Antes de ir a YouTube</title>' }), 'i.ytimg.com': respuesta(404) }));
    expect(r.estado).toBe('problema');
    expect(r.detalle).toMatch(/Antes de ir a YouTube/);
  });

  test('401 y YouTube dice explícitamente que no se reproduce (ERROR): es un problema aunque haya miniatura', async () => {
    const r = await comprobar(V(9), simulado({ oembed: respuesta(401), 'watch?v=vid00000009': respuesta(200, { texto: '"playabilityStatus":{"status":"ERROR"}' }), 'i.ytimg.com': respuesta(200) }));
    expect(r.estado).toBe('problema');
    expect(r.detalle).toMatch(/ERROR/);
  });

  test('401 y LOGIN_REQUIRED pero la miniatura existe (así responde YouTube a los servidores de GitHub): se acepta con aviso, no como fallo', async () => {
    const r = await comprobar(V(10), simulado({ oembed: respuesta(401), 'watch?v=vid00000010': respuesta(200, { texto: PAGINA_PRIVADA }), 'i.ytimg.com': respuesta(200) }));
    expect(r.estado).toBe('ok-sin-insercion');
    expect(r.nota).toMatch(/pidió iniciar sesión \(LOGIN_REQUIRED\)/);
  });

  test('404: el video no existe', async () => {
    const r = await comprobar(V(4), simulado({ oembed: respuesta(404) }));
    expect(r).toMatchObject({ estado: 'problema' });
    expect(r.detalle).toMatch(/404/);
  });

  test('sin conexión: es un problema marcado como falta de red', async () => {
    const r = await comprobar(V(5), simulado({ oembed: new Error('getaddrinfo ENOTFOUND') }));
    expect(r).toMatchObject({ estado: 'problema', sinRed: true });
  });

  test('si la petición se cuelga, se corta por tiempo agotado', async () => {
    const colgado = (url, { signal }) => new Promise((_, rechazar) => signal.addEventListener('abort', () => rechazar(Object.assign(new Error('abortado'), { name: 'AbortError' }))));
    const r = await comprobar(V(6), colgado, { ms: 20 });
    expect(r.estado).toBe('problema');
    expect(r.detalle).toMatch(/tiempo agotado/);
  });
});

describe('verificarTodos(videos)', () => {
  const video = (n, titulo) => ({ tipo: 'Principal', titulo, url: V(n), ficha: '1.1 · Prueba' });

  test('cuenta problemas, títulos que cambiaron y videos sin inserción; ignora URLs repetidas', async () => {
    const fetchFn = simulado({
      'vid00000001': respuesta(200, { json: { title: 'Event Loop en 10 minutos' } }),
      'vid00000002': respuesta(200, { json: { title: 'Un video totalmente distinto' } }),
      'vid00000003': respuesta(404),
      playlist: respuesta(200),
    });
    const r = await verificarTodos([video(1, 'Event Loop en 10 minutos'), video(2, 'Closures en JavaScript'), video(3, 'Video borrado'), video(1, 'Event Loop en 10 minutos')], fetchFn);
    expect(r.total).toBe(3);
    expect(r.problemas.map((p) => p.url)).toEqual([V(3)]);
    expect(r.titulosDistintos.map((t) => t.url)).toEqual([V(2)]);
    expect(r.lista.estado).toBe('ok');
    expect(r.todoSinRed).toBe(false);
  });

  test('marca un problema si la lista de reproducción no responde', async () => {
    const r = await verificarTodos([video(1, 'Event Loop')], simulado({ vid00000001: respuesta(200, { json: { title: 'Event Loop' } }), playlist: respuesta(404) }));
    expect(r.lista).toMatchObject({ estado: 'problema' });
  });

  test('si nada responde por falta de red, lo distingue de enlaces rotos', async () => {
    const sinRed = async () => { throw new Error('fetch failed'); };
    const r = await verificarTodos([video(1, 'A'), video(2, 'B')], sinRed);
    expect(r.todoSinRed).toBe(true);
  });
});

describe('títulos', () => {
  test('ignora mayúsculas, acentos y puntuación', () => {
    expect(coincidenciaDeTitulos('¿Qué es el Event Loop? – paso a paso', 'que es el event loop paso a paso')).toBe(1);
  });
  test('un título distinto queda por debajo del umbral', () => {
    expect(coincidenciaDeTitulos('Closures en JavaScript: qué son y cómo funcionan', 'Recetas de cocina fáciles')).toBeLessThan(0.75);
  });
});

describe('fecha de verificación', () => {
  test('registrarFecha actualiza la fecha y conserva el resto del archivo', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'verif-'));
    const ruta = path.join(dir, 'videos-verificacion.json');
    fs.writeFileSync(ruta, JSON.stringify({ '//': 'nota', fecha: '2026-01-01' }, null, 2) + '\n');
    expect(registrarFecha(ruta, '2026-10-05')).toBe('2026-10-05');
    const texto = fs.readFileSync(ruta, 'utf8');
    expect(JSON.parse(texto)).toEqual({ '//': 'nota', fecha: '2026-10-05' });
    expect(texto.endsWith('\n')).toBe(true);
  });

  test('fechaDeHoy y formatearFecha dan la fecha en el formato esperado', () => {
    expect(fechaDeHoy(new Date(2027, 0, 5))).toBe('2027-01-05');
    expect(formatearFecha('2027-01-05')).toBe('5 de enero de 2027');
    expect(() => formatearFecha('5/1/2027')).toThrow(/AAAA-MM-DD/);
  });

  test('el archivo documentos/videos-verificacion.json tiene una fecha válida', () => {
    const { fecha } = JSON.parse(fs.readFileSync(RUTA_VERIFICACION, 'utf8'));
    expect(fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(() => formatearFecha(fecha)).not.toThrow();
  });
});

describe('bibliografía: extraerEnlaces', () => {
  test('toma solo los enlaces externos, sin repetidos', () => {
    const texto = '- [A](https://a.example/x) y [de nuevo](https://a.example/x)\n- [B](http://b.example)\n- [local](../otro.md) y [ancla](#seccion) y [correo](mailto:a@b.c)';
    expect(extraerEnlaces(texto)).toEqual([{ titulo: 'A', url: 'https://a.example/x' }, { titulo: 'B', url: 'http://b.example' }]);
  });

  test('el anexo real tiene enlaces válidos, incluidos los de los dos libros', () => {
    const enlaces = enlacesDeBibliografia();
    expect(enlaces.length).toBeGreaterThanOrEqual(8);
    for (const { url } of enlaces) expect(() => new URL(url)).not.toThrow();
    const urls = enlaces.map((e) => e.url).join(' ');
    expect(urls).toMatch(/eloquentjavascript\.net/);
    expect(urls).toMatch(/getify\/You-Dont-Know-JS/);
  });
});

describe('bibliografía: comprobarEnlace(url)', () => {
  const A = 'https://sitio.example/docs';
  const resp = (status, extra = {}) => ({ status, url: A, redirected: false, body: null, ...extra });

  test('2xx: funciona', async () => {
    expect(await comprobarEnlace(A, simulado({ sitio: resp(200) }))).toMatchObject({ estado: 'ok', destino: undefined });
  });

  test('redirige a otra dirección: funciona, pero avisa el destino', async () => {
    const r = await comprobarEnlace(A, simulado({ sitio: resp(200, { redirected: true, url: 'https://otro.example/nuevo' }) }));
    expect(r).toMatchObject({ estado: 'ok', destino: 'https://otro.example/nuevo' });
  });

  test('una redirección que solo agrega un parámetro de idioma, una barra final o un ancla no merece aviso', async () => {
    for (const destino of [`${A}?hl=es-419`, `${A}/`, `${A}#inicio`, 'HTTPS://SITIO.EXAMPLE/DOCS']) {
      const r = await comprobarEnlace(A, simulado({ sitio: resp(200, { redirected: true, url: destino }) }));
      expect(r.destino).toBeUndefined();
    }
  });

  test('401, 403 y 429: el sitio bloquea las comprobaciones automáticas, es un aviso y no un enlace roto', async () => {
    for (const status of [401, 403, 429]) {
      const r = await comprobarEnlace(A, simulado({ sitio: resp(status) }));
      expect(r.estado).toBe('no-verificable');
      expect(r.detalle).toMatch(new RegExp(String(status)));
    }
  });

  test('404 y 500 son problemas', async () => {
    for (const status of [404, 410, 500, 503]) expect((await comprobarEnlace(A, simulado({ sitio: resp(status) }))).estado).toBe('problema');
  });

  test('sin conexión o tiempo agotado: es un problema', async () => {
    expect(await comprobarEnlace(A, simulado({ sitio: new Error('ENOTFOUND') }))).toMatchObject({ estado: 'problema', sinRed: true });
    const colgado = (url, { signal }) => new Promise((_, rechazar) => signal.addEventListener('abort', () => rechazar(Object.assign(new Error('abortado'), { name: 'AbortError' }))));
    expect((await comprobarEnlace(A, colgado, { ms: 20 })).detalle).toMatch(/tiempo agotado/);
  });
});

describe('bibliografía: verificarBibliografia(enlaces)', () => {
  const e = (n, titulo = `Sitio ${n}`) => ({ titulo, url: `https://s${n}.example/` });
  const resp = (status, extra = {}) => ({ status, redirected: false, body: null, ...extra });

  test('cuenta problemas, enlaces que bloquean y redirecciones', async () => {
    const fetchFn = simulado({
      's1.example': resp(200),
      's2.example': resp(404),
      's3.example': resp(403),
      's4.example': resp(200, { redirected: true, url: 'https://nuevo.example/' }),
    });
    const r = await verificarBibliografia([e(1), e(2), e(3), e(4)], fetchFn);
    expect(r.total).toBe(4);
    expect(r.problemas.map((p) => p.url)).toEqual(['https://s2.example/']);
    expect(r.noVerificables.map((p) => p.url)).toEqual(['https://s3.example/']);
    expect(r.redirigen.map((p) => p.destino)).toEqual(['https://nuevo.example/']);
    expect(r.todoSinRed).toBe(false);
  });

  test('si nada responde por falta de red, lo distingue de enlaces rotos', async () => {
    const sinRed = async () => { throw new Error('fetch failed'); };
    expect((await verificarBibliografia([e(1), e(2)], sinRed)).todoSinRed).toBe(true);
  });
});
