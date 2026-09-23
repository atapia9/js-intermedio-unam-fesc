// Ejemplo del manual, ficha 2.2. Ejecuta con: node 2.2-prototipos.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

function Animal(nombre) {
  this.nombre = nombre;
}
Animal.prototype.hacerSonido = function () {
  console.log(`${this.nombre} hace un sonido`);
};

const perro = new Animal('Rex');
perro.hacerSonido(); // 'Rex hace un sonido'

console.log(Object.getPrototypeOf(perro) === Animal.prototype); // true
