const { esCorreoValido, esPasswordSegura } = require('./01-pruebas-validaciones');

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
