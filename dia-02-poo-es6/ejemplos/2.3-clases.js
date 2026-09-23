// Ejemplo del manual, ficha 2.3. Ejecuta con: node 2.3-clases.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

class Vehiculo {
  #kilometraje = 0; // campo privado

  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }

  static compararAntiguedad(v1, v2) {
    return v1.kilometraje - v2.kilometraje;
  }

  get kilometraje() { return this.#kilometraje; }
  set kilometraje(valor) {
    if (valor < 0) throw new Error('Kilometraje inválido');
    this.#kilometraje = valor;
  }

  describir() {
    return `${this.marca} ${this.modelo} — ${this.#kilometraje} km`;
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, puertas) {
    super(marca, modelo);
    this.puertas = puertas;
  }
  describir() {
    return `${super.describir()} — ${this.puertas} puertas`;
  }
}

const miAuto = new Auto('Nissan', 'Versa', 4);
miAuto.kilometraje = 15000;
console.log(miAuto.describir());
