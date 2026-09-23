// Responsabilidad: define los dos tipos de error que distingue el cliente (red y HTTP). Ya está completo.

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
