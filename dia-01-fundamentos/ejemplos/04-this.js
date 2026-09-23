// Día 1 — Ejemplo: el valor de `this` según cómo se invoca la función
// Ejecuta con: node 04-this.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const persona = {
  nombre: 'Marina',
  saludar() {
    console.log(`Hola, soy ${this.nombre}`); // this === persona
  },
};
persona.saludar();

function saludarSuelto() {
  console.log(this); // undefined en modo estricto de módulos; objeto global si no
}
saludarSuelto();

// Arrow function: no tiene this propio, hereda el del contexto léxico
const equipo = {
  nombre: 'Backend',
  miembros: ['Ana', 'Luis'],
  listar() {
    // Si usáramos function() aquí, this ya NO sería `equipo` dentro del callback
    this.miembros.forEach((miembro) => {
      console.log(`${miembro} pertenece al equipo ${this.nombre}`);
    });
  },
};
equipo.listar();

// call, apply, bind
function presentarse(saludo) {
  console.log(`${saludo}, soy ${this.nombre}`);
}

const usuario1 = { nombre: 'Carlos' };
presentarse.call(usuario1, 'Hola'); // this fijado explícitamente
presentarse.apply(usuario1, ['Buenas']); // igual que call, pero args en arreglo

const presentacionFija = presentarse.bind(usuario1);
presentacionFija('Saludos'); // this queda fijo para siempre
