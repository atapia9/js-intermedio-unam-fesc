// Ejercicio 2.1 — De función constructora a prototipo explícito
//
// Videos de apoyo (ficha 2.2 del README del día):
//   - Herencia prototípica en JavaScript (POO): https://www.youtube.com/watch?v=S_bDXnLnDs8
//   - Curso JavaScript: 23. Herencia prototípica – jonmircha: https://www.youtube.com/watch?v=1-m7xtwvH1E
//   - Prototypes a profundidad – herencia prototípica: https://www.youtube.com/watch?v=KrzlS0_HQuQ
//
// Enunciado (manual del curso):
//   1. Reescribe la función constructora Animal del ejemplo agregando un segundo método moverse en el prototipo.
//   2. Crea una función constructora Ave que 'herede' de Animal usando Object.create() sobre Animal.prototype.
//   3. Verifica con instanceof que un objeto Ave es también instancia de Animal.
//
// Ejecuta con: node ejercicio-2.1-funcion-constructora-a-prototipo.js
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

// Punto de partida: la función constructora Animal del ejemplo 2.2 del manual.
function Animal(nombre) {
  this.nombre = nombre;
}
Animal.prototype.hacerSonido = function () {
  console.log(`${this.nombre} hace un sonido`);
};

// TODO 1: agrega el método moverse en Animal.prototype.

// TODO 2: crea la función constructora Ave y haz que herede de Animal con Object.create(Animal.prototype).
//         Recuerda restaurar Ave.prototype.constructor.

// TODO 3: comprueba con instanceof que un objeto Ave también es instancia de Animal.
// const pajaro = new Ave('Tweety');
// console.log(pajaro instanceof Ave, pajaro instanceof Animal);

// ---------------------------------------------------------------------------
// Solución sugerida (inténtalo antes de leerla):
//
// Animal.prototype.moverse = function () {
//   console.log(`${this.nombre} se mueve`);
// };
//
// function Ave(nombre) {
//   Animal.call(this, nombre);         // reutiliza el constructor del padre
// }
// Ave.prototype = Object.create(Animal.prototype);
// Ave.prototype.constructor = Ave;
//
// const pajaro = new Ave('Tweety');
// console.log(pajaro instanceof Ave, pajaro instanceof Animal); // true true
// pajaro.hacerSonido();
// pajaro.moverse();
