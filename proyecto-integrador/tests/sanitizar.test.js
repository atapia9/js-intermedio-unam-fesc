// Día 4: contraste textContent vs innerHTML — payload de prueba neutralizado.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

describe('sanitizar', () => {
  test('escaparHTML neutraliza un payload XSS tipo <img onerror>', async () => {
    const { escaparHTML } = await import('../src/nucleo/sanitizar.js');
    const payload = '<img src=x onerror="alert(1)">';
    const resultado = escaparHTML(payload);
    expect(resultado).not.toContain('<img');
    expect(resultado).toContain('&lt;img');
  });

  test('enmascararPII oculta un correo dentro de texto libre', async () => {
    const { enmascararPII } = await import('../src/nucleo/sanitizar.js');
    const resultado = enmascararPII('Contactar a juan.perez@empresa.com para seguimiento');
    expect(resultado).not.toContain('juan.perez@empresa.com');
    expect(resultado).toContain('j***@***');
  });

  test('enmascararPII oculta un teléfono dentro de texto libre', async () => {
    const { enmascararPII } = await import('../src/nucleo/sanitizar.js');
    const resultado = enmascararPII('Reportado al 55 1234 5678 por el usuario');
    expect(resultado).not.toContain('55 1234 5678');
    expect(resultado).toContain('***-***-****');
  });

  test('sanitizarTextoLibre combina escape y enmascarado', async () => {
    const { sanitizarTextoLibre } = await import('../src/nucleo/sanitizar.js');
    const resultado = sanitizarTextoLibre('<b>ana@empresa.com</b>');
    expect(resultado).not.toContain('<b>');
    expect(resultado).not.toContain('ana@empresa.com');
  });
});
