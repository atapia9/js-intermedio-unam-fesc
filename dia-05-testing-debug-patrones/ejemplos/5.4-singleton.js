// Ejemplo del manual, ficha 5.4. Ejecuta con: node 5.4-singleton.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

class ConexionAPI {
  static #instancia = null;

  constructor(baseUrl) {
    if (ConexionAPI.#instancia) {
      return ConexionAPI.#instancia;
    }
    this.baseUrl = baseUrl;
    ConexionAPI.#instancia = this;
  }
}

const conexionA = new ConexionAPI('https://api.ejemplo.com');
const conexionB = new ConexionAPI('https://otra-url.com');
console.log(conexionA === conexionB); // true — misma instancia
