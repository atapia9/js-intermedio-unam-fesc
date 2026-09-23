// Responsabilidad: define los tres tipos de error que distingue listarUsuarios (red, HTTP y JSON). Ya está completo.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

// No hubo respuesta: servidor caído, sin conexión, puerto cerrado.
export class ErrorRed extends Error {
  constructor(mensaje, causa) {
    super(mensaje);
    this.name = 'ErrorRed';
    this.causa = causa;
  }
}

// Sí hubo respuesta, pero con un código que no es 2xx (404, 500...).
export class ErrorHTTP extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.name = 'ErrorHTTP';
    this.status = status;
  }
}

// La respuesta llegó bien, pero su cuerpo no es un JSON válido.
export class ErrorJSON extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'ErrorJSON';
  }
}
