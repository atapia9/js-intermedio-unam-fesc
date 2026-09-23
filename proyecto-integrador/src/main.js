// Punto de entrada de la app: conecta el núcleo con la variante activa
// (hoy: a-incidentes). Cambiar de variante = cambiar src/variante.js.
import { ClaseRegistro, calcularPuntaje, campos, mockInicial } from './variante.js';
import { crearAlmacenamiento } from './nucleo/almacenamiento.js';
import { cargarFeedInicial } from './nucleo/api.js';
import { iniciarApp } from './nucleo/app.js';

const almacenamiento = crearAlmacenamiento('bis.registros', ClaseRegistro);

function esquemaValido(item) {
  return typeof item === 'object' && item !== null && 'title' in item;
}

iniciarApp({
  ClaseRegistro,
  almacenamiento,
  campos,
  calcularPuntaje,
  cargarInicial: () =>
    cargarFeedInicial(
      'https://jsonplaceholder.typicode.com/todos?_limit=5',
      ClaseRegistro,
      esquemaValido,
      mockInicial
    ),
});
