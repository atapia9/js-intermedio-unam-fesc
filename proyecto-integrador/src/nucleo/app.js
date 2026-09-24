// Día 4: DOM + delegación de eventos. Arma la interfaz leyendo `campos.js`
// de la variante activa, con un único listener delegado por la lista.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

import { sanitizarTextoLibre } from './sanitizar.js';

export function iniciarApp({ almacenamiento, cargarInicial, campos, calcularPuntaje }) {
  const lista = document.querySelector('#lista-registros');
  const form = document.querySelector('#form-nuevo-registro');

  let registros = [];

  function render() {
    const fragment = document.createDocumentFragment();
    for (const registro of registros) {
      const li = document.createElement('li');
      li.dataset.id = registro.id;
      li.className = `estado-${registro.estado}`;

      const resumen = document.createElement('span');
      resumen.dataset.accion = 'ver';
      resumen.textContent = campos.resumen(registro);

      const puntaje = document.createElement('span');
      puntaje.className = 'puntaje';
      puntaje.textContent = calcularPuntaje(registro).etiqueta;

      const boton = document.createElement('button');
      boton.dataset.accion = 'avanzar';
      boton.textContent = 'Avanzar estado';

      li.append(resumen, puntaje, boton);
      fragment.appendChild(li);
    }
    lista.innerHTML = '';
    lista.appendChild(fragment);
  }

  lista.addEventListener('click', (evento) => {
    const li = evento.target.closest('li');
    if (!li) return;
    const id = li.dataset.id;
    const registro = registros.find((r) => String(r.id) === id);
    if (!registro) return;

    if (evento.target.dataset.accion !== 'avanzar') return;

    try {
      campos.avanzarEstado(registro);
    } catch (err) {
      console.warn(err.message);
      return;
    }

    almacenamiento.guardar(registros);
    render();
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = campos.leerFormulario(form);
    if (!datos) return;
    datos.descripcion = sanitizarTextoLibre(datos.descripcion);
    registros.push(campos.crearDesdeFormulario(datos));
    almacenamiento.guardar(registros);
    form.reset();
    render();
  });

  async function iniciar() {
    const guardados = almacenamiento.cargar();
    if (guardados.length > 0) {
      registros = guardados;
    } else {
      registros = await cargarInicial();
      almacenamiento.guardar(registros);
    }
    render();
  }

  iniciar();
}
