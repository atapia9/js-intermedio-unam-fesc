describe('Incidente', () => {
  test('se crea en estado "nuevo" por defecto', async () => {
    const { default: Incidente } = await import('../src/variantes/a-incidentes/Incidente.js');
    const incidente = new Incidente({ categoria: 'phishing', descripcion: 'Correo sospechoso', reportantePseudonimo: 'r-1', impacto: 2, urgencia: 2 });
    expect(incidente.estado).toBe('nuevo');
  });

  test('avanzar() sigue el flujo nuevo → en-triage → contenido → cerrado', async () => {
    const { default: Incidente } = await import('../src/variantes/a-incidentes/Incidente.js');
    const incidente = new Incidente({ categoria: 'malware', descripcion: 'Equipo infectado', reportantePseudonimo: 'r-2', impacto: 3, urgencia: 3 });
    incidente.avanzar();
    expect(incidente.estado).toBe('en-triage');
    incidente.avanzar();
    expect(incidente.estado).toBe('contenido');
    incidente.avanzar();
    expect(incidente.estado).toBe('cerrado');
  });

  test('avanzar() lanza error si ya no hay siguiente estado', async () => {
    const { default: Incidente } = await import('../src/variantes/a-incidentes/Incidente.js');
    const incidente = new Incidente({ categoria: 'otro', descripcion: 'x', reportantePseudonimo: 'r-3', impacto: 1, urgencia: 1, estado: 'cerrado' });
    expect(() => incidente.avanzar()).toThrow();
  });

  test('toJSON/desdeJSON conservan los campos del contrato', async () => {
    const { default: Incidente } = await import('../src/variantes/a-incidentes/Incidente.js');
    const original = new Incidente({ categoria: 'phishing', descripcion: 'x', reportantePseudonimo: 'r-4', impacto: 2, urgencia: 1 });
    const reconstruido = Incidente.desdeJSON(original.toJSON());
    expect(reconstruido).toBeInstanceOf(Incidente);
    expect(reconstruido.categoria).toBe('phishing');
  });
});
