// Ejemplo del manual, ficha 5.2. Se ejecuta con: npm test (desde la raíz del repositorio)
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

import { sumar, dividir } from './matematicas.js';

test('sumar 2 + 3 debe ser 5', () => {
  expect(sumar(2, 3)).toBe(5);
});

test('dividir entre cero debe lanzar un error', () => {
  expect(() => dividir(10, 0)).toThrow('No se puede dividir entre cero');
});

describe('función sumar', () => {
  test('con números negativos', () => {
    expect(sumar(-2, -3)).toBe(-5);
  });
});
