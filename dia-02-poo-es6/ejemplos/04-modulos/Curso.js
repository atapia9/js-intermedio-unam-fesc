// Módulo con export default: uno solo por archivo
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

export default class Curso {
  constructor(titulo, horas) {
    this.titulo = titulo;
    this.horas = horas;
  }

  describir() {
    return `${this.titulo} (${this.horas} horas)`;
  }
}
