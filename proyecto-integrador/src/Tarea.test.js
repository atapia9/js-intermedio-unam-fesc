// Día 5: pruebas unitarias con Jest sobre la lógica del proyecto integrador.
// `Tarea.js` es un módulo ESM (usado directamente por el navegador en index.html);
// se importa aquí con `import()` dinámico para no requerir un paso de build.

describe('Tarea', () => {
  test('se crea con completada=false por defecto', async () => {
    const { default: Tarea } = await import('./Tarea.js');
    const tarea = new Tarea('Repasar closures');
    expect(tarea.titulo).toBe('Repasar closures');
    expect(tarea.completada).toBe(false);
  });

  test('alternarCompletada cambia el estado', async () => {
    const { default: Tarea } = await import('./Tarea.js');
    const tarea = new Tarea('Practicar promesas');
    expect(tarea.alternarCompletada()).toBe(true);
    expect(tarea.alternarCompletada()).toBe(false);
  });

  test('toJSON produce un objeto plano serializable', async () => {
    const { default: Tarea } = await import('./Tarea.js');
    const tarea = new Tarea('Escribir pruebas', true, 42);
    expect(tarea.toJSON()).toEqual({ id: 42, titulo: 'Escribir pruebas', completada: true });
  });

  test('desdeJSON reconstruye una instancia de Tarea', async () => {
    const { default: Tarea } = await import('./Tarea.js');
    const tarea = Tarea.desdeJSON({ id: 1, titulo: 'Tarea guardada', completada: true });
    expect(tarea).toBeInstanceOf(Tarea);
    expect(tarea.completada).toBe(true);
  });
});
