// Día 5: la función de puntaje es pura y no toca el DOM — se prueba directo.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

describe('calcularPuntaje (variante A — incidentes)', () => {
  test('impacto=1, urgencia=1 → severidad baja', async () => {
    const { calcularPuntaje } = await import('../src/variantes/a-incidentes/riesgo.js');
    expect(calcularPuntaje({ impacto: 1, urgencia: 1 }).severidad).toBe('baja');
  });

  test('impacto=3, urgencia=1 → severidad media (caso frontera, producto=3)', async () => {
    const { calcularPuntaje } = await import('../src/variantes/a-incidentes/riesgo.js');
    expect(calcularPuntaje({ impacto: 3, urgencia: 1 }).severidad).toBe('media');
  });

  test('impacto=2, urgencia=3 → severidad alta (caso frontera, producto=6)', async () => {
    const { calcularPuntaje } = await import('../src/variantes/a-incidentes/riesgo.js');
    expect(calcularPuntaje({ impacto: 2, urgencia: 3 }).severidad).toBe('alta');
  });

  test('impacto=3, urgencia=3 → severidad critica', async () => {
    const { calcularPuntaje } = await import('../src/variantes/a-incidentes/riesgo.js');
    expect(calcularPuntaje({ impacto: 3, urgencia: 3 }).severidad).toBe('critica');
  });
});
