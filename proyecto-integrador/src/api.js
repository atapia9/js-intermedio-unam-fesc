import Tarea from './Tarea.js';

// Día 3: async/await + Fetch API, con manejo correcto de response.ok
export async function cargarTareasIniciales() {
  try {
    const respuesta = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
    );
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos.map((item) => new Tarea(item.title, item.completed, item.id));
  } catch (err) {
    console.warn('No se pudo cargar desde la API, usando datos de ejemplo:', err.message);
    // Alternativa sin red, para que el proyecto funcione sin conexión:
    return [
      new Tarea('Repasar closures y scope', false, 1),
      new Tarea('Practicar async/await', false, 2),
      new Tarea('Escribir pruebas con Jest', false, 3),
    ];
  }
}
