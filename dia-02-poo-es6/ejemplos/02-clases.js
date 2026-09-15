// Día 2 — Ejemplo: clases ES6, herencia, getters/setters, static
// Ejecuta con: node 02-clases.js

class Animal {
  #energia = 100; // campo privado (moderno)

  constructor(nombre) {
    this.nombre = nombre;
  }

  hacerSonido() {
    console.log(`${this.nombre} hace un sonido genérico`);
  }

  get energia() {
    return this.#energia;
  }

  set energia(valor) {
    this.#energia = Math.max(0, Math.min(100, valor));
  }

  static crearAnonimo() {
    return new Animal('Anónimo');
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre); // llama al constructor de Animal
    this.raza = raza;
  }

  ladrar() {
    console.log(`${this.nombre} (${this.raza}) dice: ¡Guau!`);
  }

  // sobrescribe el método del padre
  hacerSonido() {
    super.hacerSonido(); // también podemos invocar la versión del padre
    this.ladrar();
  }
}

const firulais = new Perro('Firulais', 'Labrador');
firulais.hacerSonido();

firulais.energia = 150; // el setter lo limita a 100
console.log('Energía:', firulais.energia);

const animalGenerico = Animal.crearAnonimo();
console.log(animalGenerico.nombre);

console.log('firulais instanceof Animal:', firulais instanceof Animal); // true
