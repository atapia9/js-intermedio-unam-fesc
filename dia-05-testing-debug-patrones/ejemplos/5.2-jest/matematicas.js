// Ejemplo del manual, ficha 5.2. Se ejecuta con: npm test (desde la raíz del repositorio)
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

export function sumar(a, b) { return a + b; }
export function dividir(a, b) {
  if (b === 0) throw new Error('No se puede dividir entre cero');
  return a / b;
}
