// Día 2 — Ejemplo: herencia prototípica "manual" (sin class)
// Ejecuta con: node 01-prototipos.js

function Animal(nombre) {
  this.nombre = nombre;
}

Animal.prototype.hacerSonido = function () {
  console.log(`${this.nombre} hace un sonido genérico`);
};

function Perro(nombre, raza) {
  Animal.call(this, nombre); // "super()" manual
  this.raza = raza;
}

// Conectar el prototipo de Perro con el de Animal
Perro.prototype = Object.create(Animal.prototype);
Perro.prototype.constructor = Perro;

Perro.prototype.ladrar = function () {
  console.log(`${this.nombre} dice: ¡Guau!`);
};

const firulais = new Perro('Firulais', 'Labrador');
firulais.hacerSonido(); // heredado de Animal.prototype
firulais.ladrar(); // propio de Perro.prototype

console.log('¿Firulais es instancia de Animal?', firulais instanceof Animal); // true
console.log(
  'Prototipo de firulais === Perro.prototype:',
  Object.getPrototypeOf(firulais) === Perro.prototype
);
