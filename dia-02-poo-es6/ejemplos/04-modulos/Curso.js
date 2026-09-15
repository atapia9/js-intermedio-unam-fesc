// Módulo con export default: uno solo por archivo
export default class Curso {
  constructor(titulo, horas) {
    this.titulo = titulo;
    this.horas = horas;
  }

  describir() {
    return `${this.titulo} (${this.horas} horas)`;
  }
}
