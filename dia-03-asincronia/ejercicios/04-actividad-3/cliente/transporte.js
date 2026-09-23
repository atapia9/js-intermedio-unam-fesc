// Responsabilidad: hace una petición GET con callbacks (node:http); lo usa la versión de callbacks. Ya está completo.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

import http from 'node:http';

// peticion(url, callback)
//   fallo de red      -> callback(error)                       (no hubo respuesta)
//   hubo respuesta    -> callback(null, { status, cuerpo })    (cuerpo es un string; puede ser 404, 500...)
export function peticion(url, callback) {
  const req = http.get(url, (res) => {
    let cuerpo = '';
    res.setEncoding('utf8');
    res.on('data', (trozo) => { cuerpo += trozo; });
    res.on('end', () => callback(null, { status: res.statusCode, cuerpo }));
  });
  req.on('error', (err) => callback(err));
}
