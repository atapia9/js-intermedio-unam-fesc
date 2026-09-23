// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

const { sumar } = require('./01-suma');

// describe() agrupa pruebas relacionadas
describe('sumar', () => {
  // test()/it() define un caso individual
  test('suma dos números positivos', () => {
    expect(sumar(2, 3)).toBe(5); // toBe: igualdad estricta (===)
  });

  test('suma con negativos', () => {
    expect(sumar(-2, 5)).toBe(3);
  });

  test('suma con cero', () => {
    expect(sumar(0, 0)).toBe(0);
  });

  test('el resultado es del tipo number', () => {
    expect(typeof sumar(1, 1)).toBe('number');
  });
});

// Ejecuta con: npx jest dia-05-testing-debug-patrones/ejemplos/01-suma.test.js
// o simplemente: npm test (desde la raíz del repo, corre todas las pruebas)
