const { esCorreoValido, esPasswordSegura } = require('./01-pruebas-validaciones');

// Videos de apoyo (ficha 5.1 y 5.2 del README del día):
//   - Aprende en 3 minutos: pruebas unitarias y pruebas de integración: https://www.youtube.com/watch?v=UwoCR0eJNgo
//   - Pruebas unitarias y de integración – Curso de Tester de Software: https://www.youtube.com/watch?v=4Ulc8FcmfnQ
//   - Jest JS tutorial en español para principiantes – Curso de Testing: https://www.youtube.com/watch?v=tgWBQZNCOT0
//   - Introducción al Testing desde cero con Jest: https://www.youtube.com/watch?v=_DzBez4qMi0
//   - ¿Cómo se escribe una buena prueba unitaria en JavaScript? 10 buenas prácticas: https://www.youtube.com/watch?v=Rqyg8kjpzX0
//
// Enunciado:
// Completa los `test()` marcados con TODO para cubrir los casos indicados.
// Ejecuta con: npm test (desde la raíz del repo)

describe('esCorreoValido', () => {
  test('acepta un correo válido', () => {
    expect(esCorreoValido('ana@ejemplo.com')).toBe(true);
  });

  // TODO: agrega un test que verifique que 'sin-arroba.com' es inválido

  // TODO: agrega un test que verifique que '' (cadena vacía) es inválido
});

describe('esPasswordSegura', () => {
  test('acepta una contraseña con mayúscula, número y 8+ caracteres', () => {
    expect(esPasswordSegura('Segura123')).toBe(true);
  });

  // TODO: agrega un test que verifique que 'corta1A' (menos de 8) es inválida

  // TODO: agrega un test que verifique que 'todaminuscula1' (sin mayúscula) es inválida
});

// ---------------------------------------------------------------------------
// Solución sugerida para los TODO:
//
// test('rechaza correo sin arroba', () => {
//   expect(esCorreoValido('sin-arroba.com')).toBe(false);
// });
// test('rechaza cadena vacía', () => {
//   expect(esCorreoValido('')).toBe(false);
// });
// test('rechaza contraseña corta', () => {
//   expect(esPasswordSegura('corta1A')).toBe(false);
// });
// test('rechaza contraseña sin mayúscula', () => {
//   expect(esPasswordSegura('todaminuscula1')).toBe(false);
// });
