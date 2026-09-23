// Ejemplo del manual, ficha 1.4. Ejecuta con: node 1.4-this.js
// Llamadas agregadas al final para ver la salida (en Node, el `this` de una arrow function a nivel de módulo no es `persona`).
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const persona = {
  nombre: 'Ana',
  saludarNormal: function () {
    console.log(`Hola, soy ${this.nombre}`); // this = persona
  },
  saludarArrow: () => {
    console.log(`Hola, soy ${this.nombre}`); // this NO es persona
  },
};

function presentar(saludo) {
  console.log(`${saludo}, soy ${this.nombre}`);
}

presentar.call(persona, 'Hola');   // this = persona
presentar.apply(persona, ['Hola']); // igual, con arreglo de argumentos
const presentarAna = presentar.bind(persona);
presentarAna('Hola');               // this fijado permanentemente

// --- llamadas agregadas ---
persona.saludarNormal();
persona.saludarArrow();
