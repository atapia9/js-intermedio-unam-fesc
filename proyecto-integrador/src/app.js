import Tarea from './Tarea.js';
import { cargarTareas, guardarTareas } from './almacenamiento.js';
import { cargarTareasIniciales } from './api.js';

const lista = document.querySelector('#lista-tareas');
const form = document.querySelector('#form-nueva-tarea');
const input = document.querySelector('#input-nueva-tarea');

let tareas = [];

function render() {
  // Día 4: reconstruir con DocumentFragment evita reflows repetidos
  const fragment = document.createDocumentFragment();
  for (const tarea of tareas) {
    const li = document.createElement('li');
    li.dataset.id = tarea.id;
    li.className = tarea.completada ? 'completada' : '';
    li.innerHTML = `
      <span data-accion="alternar">${tarea.titulo}</span>
      <button data-accion="eliminar">Eliminar</button>
    `;
    fragment.appendChild(li);
  }
  lista.innerHTML = '';
  lista.appendChild(fragment);
}

// Día 4: delegación de eventos — un único listener para toda la lista
lista.addEventListener('click', (evento) => {
  const li = evento.target.closest('li');
  if (!li) return;
  const id = li.dataset.id; // los ids pueden ser numéricos (API) o "local-N" (creados aquí)

  if (evento.target.dataset.accion === 'eliminar') {
    tareas = tareas.filter((t) => String(t.id) !== id);
  } else if (evento.target.dataset.accion === 'alternar') {
    const tarea = tareas.find((t) => String(t.id) === id);
    tarea.alternarCompletada();
  } else {
    return;
  }

  guardarTareas(tareas);
  render();
});

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) return;
  tareas.push(new Tarea(titulo));
  guardarTareas(tareas);
  input.value = '';
  render();
});

// Día 3: inicialización asíncrona
async function iniciar() {
  const guardadas = cargarTareas();
  if (guardadas.length > 0) {
    tareas = guardadas;
  } else {
    tareas = await cargarTareasIniciales();
    guardarTareas(tareas);
  }
  render();
}

iniciar();
