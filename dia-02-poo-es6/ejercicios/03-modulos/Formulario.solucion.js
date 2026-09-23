// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

import { esCorreoValido, esTelefonoValido } from './validaciones.solucion.js';

export default class Formulario {
  constructor(correo, telefono) {
    this.correo = correo;
    this.telefono = telefono;
  }

  esValido() {
    return esCorreoValido(this.correo) && esTelefonoValido(this.telefono);
  }
}
