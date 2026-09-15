// Día 2: clase ES6 exportada como módulo ESM
let siguienteIdAutogenerado = 1;

export default class Tarea {
  constructor(titulo, completada = false, id = `local-${siguienteIdAutogenerado++}`) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  alternarCompletada() {
    this.completada = !this.completada;
    return this.completada;
  }

  toJSON() {
    return { id: this.id, titulo: this.titulo, completada: this.completada };
  }

  static desdeJSON(obj) {
    return new Tarea(obj.titulo, obj.completada, obj.id);
  }
}
