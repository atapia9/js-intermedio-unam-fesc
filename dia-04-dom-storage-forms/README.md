# Día 4 — DOM eficiente, Delegación de eventos, Web Storage y Formularios

Esta sesión regresa al navegador como entorno de ejecución: cómo interactuar de forma eficiente con la interfaz, optimizar el manejo de eventos mediante delegación, persistir datos en el cliente y procesar formularios de forma moderna.

## Agenda de la sesión

1. Interacción eficiente con la interfaz de usuario
2. Delegación de eventos
3. Web Storage: `localStorage` y `sessionStorage`
4. Formularios: validación avanzada y `FormData`

## 4.1 Interacción eficiente con el DOM

Cada lectura/escritura sobre el árbol de elementos puede forzar reflow/repaint.

- Preferir `querySelector`/`querySelectorAll` sobre métodos legados.
- Agrupar cambios con `DocumentFragment` al insertar muchos elementos.
- Evitar intercalar lecturas y escrituras de layout dentro de un ciclo ("layout thrashing").

Abre [`ejemplos/01-dom-eficiente.html`](ejemplos/01-dom-eficiente.html) en el navegador.

## 4.2 Delegación de eventos

En vez de un listener por cada hijo, se aprovecha que los eventos "burbujean" (bubbling) hacia los padres, escuchando en un único contenedor.

Abre [`ejemplos/02-delegacion-eventos.html`](ejemplos/02-delegacion-eventos.html).

## 4.3 Web Storage

- `localStorage`: persiste indefinidamente hasta borrarse explícitamente.
- `sessionStorage`: persiste solo mientras dura la pestaña/sesión.
- Ambos solo guardan strings: usar `JSON.stringify()`/`JSON.parse()` para objetos/arreglos.

Abre [`ejemplos/03-web-storage.html`](ejemplos/03-web-storage.html).

## 4.4 Formularios y FormData

Validación programática más allá de `required`/`pattern`/`type="email"`, y recolección eficiente de valores con `FormData` (incluye archivos).

Abre [`ejemplos/04-formularios.html`](ejemplos/04-formularios.html).

## Ejercicios

1. [`ejercicios/01-lista-tareas-fragment.html`](ejercicios/01-lista-tareas-fragment.html) — insertar 100 elementos usando `DocumentFragment`.
2. [`ejercicios/02-delegacion-practica.html`](ejercicios/02-delegacion-practica.html) — lista dinámica con un solo listener delegado.
3. [`ejercicios/03-persistir-preferencias.html`](ejercicios/03-persistir-preferencias.html) — guardar preferencias de usuario en `localStorage`.
