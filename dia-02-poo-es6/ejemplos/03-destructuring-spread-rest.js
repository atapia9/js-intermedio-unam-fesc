// Día 2 — Ejemplo: destructuring, spread y rest
// Ejecuta con: node 03-destructuring-spread-rest.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

// Destructuring de objetos (con alias y valor por defecto)
const curso = { titulo: 'JavaScript Intermedio', horas: 20, sede: 'FESC' };
const { titulo: nombreCurso, horas, modalidad = 'presencial' } = curso;
console.log(nombreCurso, horas, modalidad);

// Destructuring de arreglos
const coordenadas = [19.4326, -99.1332];
const [latitud, longitud] = coordenadas;
console.log('Lat:', latitud, 'Lng:', longitud);

// Destructuring anidado en parámetros de función
function mostrarParticipante({ nombre, contacto: { correo } }) {
  console.log(`${nombre} <${correo}>`);
}
mostrarParticipante({ nombre: 'Ana', contacto: { correo: 'ana@ejemplo.com' } });

// Spread: clonar y combinar
const sesion1 = { dia: 1, tema: 'Fundamentos' };
const sesion1Extendida = { ...sesion1, duracionHoras: 4 };
console.log(sesion1Extendida);

const numerosA = [1, 2, 3];
const numerosB = [4, 5, 6];
const combinados = [...numerosA, ...numerosB];
console.log(combinados);

// Spread al invocar funciones
function sumarTres(a, b, c) {
  return a + b + c;
}
console.log(sumarTres(...numerosA));

// Rest: agrupar argumentos restantes
function resumenCurso(titulo, ...temas) {
  console.log(`${titulo} cubre: ${temas.join(', ')}`);
}
resumenCurso('JS Intermedio', 'Fundamentos', 'POO', 'Asincronía', 'DOM', 'Testing');

// Rest en destructuring
const { dia, ...restoDeSesion } = sesion1Extendida;
console.log('Día:', dia, 'Resto:', restoDeSesion);
