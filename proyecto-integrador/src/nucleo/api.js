// Día 3: async/await + Fetch API. Valida el esquema de la respuesta antes de
// aceptarla y no expone detalles internos si algo falla (mensaje genérico).
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

export async function cargarFeedInicial(url, ClaseRegistro, esquemaValido, datosAlternativos) {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    if (!Array.isArray(datos) || !datos.every(esquemaValido)) {
      throw new Error('Esquema de respuesta inválido');
    }
    return datos.map((item) => ClaseRegistro.desdeAPI(item));
  } catch (err) {
    console.warn('No se pudo cargar el feed inicial, usando datos de ejemplo.');
    return datosAlternativos.map((item) => ClaseRegistro.desdeJSON(item));
  }
}
