import Tarea from './Tarea.js';

// Día 1 (closures) + Día 5 (patrón Módulo): la CLAVE queda encapsulada,
// solo se expone la API pública (cargar/guardar).
const CLAVE = 'taskManager.tareas';

export function cargarTareas() {
  const crudo = localStorage.getItem(CLAVE);
  if (!crudo) return [];
  try {
    const arreglo = JSON.parse(crudo);
    return arreglo.map(Tarea.desdeJSON);
  } catch {
    return [];
  }
}

export function guardarTareas(tareas) {
  localStorage.setItem(CLAVE, JSON.stringify(tareas.map((t) => t.toJSON())));
}
