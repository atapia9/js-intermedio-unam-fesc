# Día 4 — Tema 4: Manipulación Avanzada del DOM y Eventos

**Jueves 1 de octubre de 2026 · 09:00 a 13:00 hrs. · 4 horas**

Con los fundamentos del lenguaje y la asincronía ya cubiertos, esta sesión regresa al navegador como entorno de ejecución: cómo interactuar de forma eficiente con la interfaz, optimizar el manejo de eventos mediante delegación, persistir datos en el cliente y procesar formularios de forma moderna.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Agenda de la sesión

| Horario | Actividad | Duración |
|---|---|---|
| 09:00 – 09:15 | Repaso de sesión 3 y contexto de la sesión | 15 min |
| 09:15 – 09:45 | 4.1 Interacción eficiente con la interfaz de usuario | 30 min |
| 09:45 – 10:35 | 4.2 Delegación de eventos | 50 min |
| 10:35 – 10:45 | Receso | 10 min |
| 10:45 – 11:35 | 4.3 Web Storage: localStorage y sessionStorage | 50 min |
| 11:35 – 12:45 | 4.4 Formularios: validación avanzada y FormData | 70 min |
| 12:45 – 13:00 | Cierre y asignación de práctica | 15 min |

## 4.1 Interacción eficiente con la interfaz de usuario

Manipular el DOM tiene un costo de rendimiento: cada lectura o escritura sobre el árbol de elementos puede forzar al navegador a recalcular estilos y volver a pintar la pantalla (reflow/repaint). Un código intermedio no solo debe 'funcionar', sino evitar manipulaciones innecesarias o repetidas.

- Preferir document.querySelector / querySelectorAll sobre los métodos legados (getElementById, getElementsByClassName) por su flexibilidad de selectores CSS.
- Agrupar cambios al DOM usando fragmentos (DocumentFragment) quilos cuando se insertan muchos elementos, en lugar de insertar uno por uno.
- Evitar leer y escribir propiedades de layout de forma intercalada dentro de un ciclo (provoca 'layout thrashing').

```js
const lista = document.querySelector('#lista-productos');
const fragmento = document.createDocumentFragment();

productos.forEach((prod) => {
  const li = document.createElement('li');
  li.textContent = `${prod.nombre} — $${prod.precio}`;
  fragmento.appendChild(li);
});

lista.appendChild(fragmento); // una sola inserción real al DOM
```

Ejemplo ejecutable: [`ejemplos/4.1-document-fragment.html`](ejemplos/4.1-document-fragment.html).

## 4.2 Delegación de Eventos: optimización de manejadores de eventos

En lugar de asignar un event listener a cada uno de muchos elementos hijos (lo cual consume memoria y falla con elementos agregados dinámicamente), la delegación de eventos aprovecha que los eventos 'burbujean' (bubbling) hacia los elementos padre, permitiendo escuchar en un único contenedor.

```js
const lista = document.querySelector('#lista-productos');

lista.addEventListener('click', (evento) => {
  const item = evento.target.closest('li');
  if (!item) return; // el clic no fue sobre un <li>
  console.log('Producto seleccionado:', item.textContent);
  item.classList.toggle('seleccionado');
});

// Este único listener funciona incluso con <li> agregados después,
// sin necesidad de volver a registrar manejadores.
```

Ejemplo ejecutable: [`ejemplos/4.2-delegacion-de-eventos.html`](ejemplos/4.2-delegacion-de-eventos.html).

**Ejercicio 4.1 — Lista dinámica con delegación**

1. Construye una lista de tareas (to-do list) donde se puedan agregar elementos dinámicamente con un formulario.
2. Implementa, con un único listener delegado en el contenedor <ul>, la posibilidad de marcar una tarea como completada (clic sobre el texto) y eliminarla (clic sobre un botón ✕).
3. Verifica que las tareas agregadas después de cargar la página también respondan a ambas acciones sin registrar nuevos listeners.

Se trabaja en: [Actividad 4](ejercicios/actividad-4/) (lista de tareas).

## 4.3 Web Storage: localStorage y sessionStorage

El navegador ofrece dos mecanismos de almacenamiento clave-valor en el lado del cliente, sin necesidad de servidor ni bases de datos externas.

- localStorage: persiste los datos indefinidamente en el dispositivo, incluso al cerrar el navegador, hasta que se borren explícitamente.
- sessionStorage: persiste los datos solo mientras dura la pestaña/sesión del navegador; se pierde al cerrarla.
- Ambos solo almacenan cadenas de texto; para guardar objetos o arreglos se deben serializar con JSON.stringify() y recuperar con JSON.parse().

```js
function guardarTareas(tareas) {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
  const datos = localStorage.getItem('tareas');
  return datos ? JSON.parse(datos) : [];
}

let tareas = cargarTareas();
tareas.push({ texto: 'Estudiar Web Storage', completada: false });
guardarTareas(tareas);
```

Ejemplo ejecutable: [`ejemplos/4.3-web-storage.html`](ejemplos/4.3-web-storage.html).

**Ejercicio 4.2 — Persistencia de la lista de tareas**

1. Extiende la lista de tareas del ejercicio 4.1 para que su estado se guarde automáticamente en localStorage cada vez que se agrega, completa o elimina una tarea.
2. Al cargar la página, la lista debe reconstruirse a partir de lo almacenado, sin perder tareas previas.
3. Agrega un botón 'Limpiar todo' que use localStorage.removeItem() y vacíe también la lista en pantalla.

Se trabaja en: [Actividad 4](ejercicios/actividad-4/) (persistencia).

## 4.4 Formularios: validación avanzada y manejo de datos mediante FormData

Más allá de la validación nativa de HTML5 (required, pattern, type="email"), en aplicaciones reales se necesita validación programática en JavaScript, junto con una forma eficiente de recolectar todos los valores de un formulario, incluso con archivos adjuntos.

```js
const formulario = document.querySelector('#form-registro');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const objeto = Object.fromEntries(datos.entries());

  const errores = [];
  if (!objeto.nombre || objeto.nombre.trim().length < 2) {
    errores.push('El nombre debe tener al menos 2 caracteres.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(objeto.correo)) {
    errores.push('El correo no tiene un formato válido.');
  }

  if (errores.length > 0) {
    console.error('Errores de validación:', errores);
    return;
  }

  console.log('Formulario válido, listo para enviar:', objeto);
});
```

Ejemplo ejecutable: [`ejemplos/4.4-formularios.html`](ejemplos/4.4-formularios.html).

**Ejercicio 4.3 — Formulario de contacto validado**

1. Construye un formulario de contacto con campos nombre, correo, teléfono (opcional) y mensaje.
2. Implementa validación programática con al menos 3 reglas (longitud mínima, formato de correo, mensaje no vacío) y muestra los errores junto a cada campo, sin usar alert().
3. Al validar correctamente, usa FormData para armar un objeto con los datos y muéstralo en consola simulando un envío a un servidor.

Se trabaja en: [Actividad 4](ejercicios/actividad-4/) (formulario de contacto).

## Cierre de la sesión 4

**Actividad de aprendizaje 4 (evaluable)**

- Entrega individual: lista de tareas con delegación de eventos y persistencia en localStorage (ejercicios 4.1 y 4.2), más el formulario validado (ejercicio 4.3).
- Se evaluará: uso correcto de delegación (un único listener), persistencia funcional y validación robusta sin recargar la página.

Enunciado, esqueleto y verificador: [`ejercicios/actividad-4/`](ejercicios/actividad-4/README.md).

## Ejercicios y actividad

- **Ejercicio 4.1 — Lista dinámica con delegación** — se trabaja en: [Actividad 4](ejercicios/actividad-4/) (lista de tareas).
  - Video: [Delegación de eventos en JavaScript con ejemplo práctico](https://www.youtube.com/watch?v=M48MZv60ZPs)
  - Video: [¿Cómo funciona el Event Bubbling? – JavaScript DOM](https://www.youtube.com/watch?v=xlci1S08Cww)
  - Video: [¿Qué es y para qué sirve la delegación de eventos en JavaScript?](https://www.youtube.com/watch?v=5MUHJNSCeGU)
- **Ejercicio 4.2 — Persistencia de la lista de tareas** — se trabaja en: [Actividad 4](ejercicios/actividad-4/) (persistencia).
  - Video: [LocalStorage y SessionStorage ¿cómo funcionan? – Curso JavaScript #48](https://www.youtube.com/watch?v=ZlpA2hez92Y)
  - Video: [Guarda objetos y arrays en LocalStorage como un PRO (JSON explicado fácil)](https://www.youtube.com/watch?v=EZWY9EOzzG4)
  - Video: [API localStorage – guardar y recuperar objetos con formato JSON](https://www.youtube.com/watch?v=sL0RHt_QK3I)
- **Ejercicio 4.3 — Formulario de contacto validado** — se trabaja en: [Actividad 4](ejercicios/actividad-4/) (formulario de contacto).
  - Video: [FormData en JavaScript: cómo, cuándo y por qué usarlo](https://www.youtube.com/watch?v=HSj1CRba8tg)
  - Video: [preventDefault en JavaScript: evitando el comportamiento por defecto](https://www.youtube.com/watch?v=i_7WLzT0oEY)
  - Video: [Aprende a validar formularios con JavaScript y expresiones regulares](https://www.youtube.com/watch?v=s3pC93LgP18)
- **Actividad de aprendizaje 4 (evaluable)** — [`ejercicios/actividad-4/`](ejercicios/actividad-4/README.md): entrega de la solución. Los videos de todas las fichas están en su README.

## Videos de apoyo

Idea del día: actualiza solo lo necesario, escucha desde el lugar adecuado, conserva el estado que corresponde y valida antes de enviar. Antes de ver cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso y responde la pregunta. Los videos marcados como opcional (inglés) se pueden ver con subtítulos. Fuente: [Anexo de videos de apoyo](../documentos/Anexo_Videos_JS_Intermedio.pdf) (sesión 4, 1 de octubre de 2026).

### 4.1 · Interacción eficiente: `DocumentFragment`

*Idea clave:* prepara todo en una «mesa de trabajo» y entrégalo al DOM de una sola vez.

| Tipo | Video |
|---|---|
| Principal | [DOM – Curso JavaScript Moderno #04: Fragment + createElement](https://www.youtube.com/watch?v=kUpx6ovPILc) |
| Breve | [DocumentFragment en JavaScript (short)](https://www.youtube.com/shorts/o21LBIEn8EA) |
| Opcional (inglés) | [What is reflow & repaint in the browser?](https://www.youtube.com/watch?v=PK4bzxWLOfo) |

*Caso de uso real:* mostrar un catálogo de 500 productos traídos de una API: se arma la lista completa en memoria y se inserta en la página en un solo paso.  
*Pregunta para pensar:* ¿qué parte del proceso ocurre fuera de lo que el usuario ve?

### 4.2 · Propagación y delegación de eventos

*Idea clave:* un solo listener en el contenedor atiende a todos los hijos, incluso a los que se agreguen después.

| Tipo | Video |
|---|---|
| Principal | [Delegación de eventos en JavaScript con ejemplo práctico](https://www.youtube.com/watch?v=M48MZv60ZPs) |
| Bubbling | [¿Cómo funciona el Event Bubbling? – JavaScript DOM](https://www.youtube.com/watch?v=xlci1S08Cww) |
| Refuerzo | [¿Qué es y para qué sirve la delegación de eventos en JavaScript?](https://www.youtube.com/watch?v=5MUHJNSCeGU) |

*Caso de uso real:* una lista de tareas donde cada una tiene botones «Completar» y «Eliminar»: la lista escucha los clics y `closest('li')` identifica qué tarea se tocó.  
*Pregunta para pensar:* si agrego una tarea nueva después, ¿en qué momento se registró su listener?

### 4.3 · Web Storage: `localStorage`, `sessionStorage` y JSON

*Idea clave:* una variable se pierde al recargar; Web Storage guarda texto, así que los objetos viajan con `JSON.stringify` y `JSON.parse`.

| Tipo | Video |
|---|---|
| Principal | [LocalStorage y SessionStorage ¿cómo funcionan? – Curso JavaScript #48](https://www.youtube.com/watch?v=ZlpA2hez92Y) |
| JSON | [Guarda objetos y arrays en LocalStorage como un PRO (JSON explicado fácil)](https://www.youtube.com/watch?v=EZWY9EOzzG4) |
| Refuerzo | [API localStorage – guardar y recuperar objetos con formato JSON](https://www.youtube.com/watch?v=sL0RHt_QK3I) |

*Caso de uso real:* tus tareas y el «modo oscuro» siguen ahí al presionar F5. Pero contraseñas o tokens nunca se guardan ahí: `localStorage` no es una caja fuerte.  
*Pregunta para pensar:* ¿qué pasa si guardas un arreglo en `localStorage` sin convertirlo a JSON?

### 4.4 · Formularios: `preventDefault`, `FormData` y validación

*Idea clave:* validar no es impedir: es ayudar al usuario a producir datos que la aplicación pueda usar.

| Tipo | Video |
|---|---|
| Principal | [FormData en JavaScript: cómo, cuándo y por qué usarlo](https://www.youtube.com/watch?v=HSj1CRba8tg) |
| preventDefault | [preventDefault en JavaScript: evitando el comportamiento por defecto](https://www.youtube.com/watch?v=i_7WLzT0oEY) |
| Validación | [Aprende a validar formularios con JavaScript y expresiones regulares](https://www.youtube.com/watch?v=s3pC93LgP18) |

*Caso de uso real:* un formulario de contacto que muestra todos los errores junto a cada campo (sin `alert`) y, si todo está bien, genera un objeto listo para enviar.  
*Pregunta para pensar:* ¿por qué conviene juntar todos los errores en un arreglo en lugar de detenerse en el primero?

### Cierre: ¿cómo se conecta todo?

Datos → `DocumentFragment` (pintado óptimo) → DOM → Delegación (escucha inteligente) → Estado ↔ Web Storage (persistencia). Y por otro lado: Formulario → `FormData` → Validación → datos listos.

**Actividad 4:** (individual) lista de tareas con un solo listener delegado, persistencia en `localStorage` (guardar, cargar y limpiar) y un formulario validado con `FormData`, mostrando los errores en la interfaz (sin `alert`). Enunciado, esqueleto y verificador en [`ejercicios/actividad-4`](ejercicios/actividad-4/README.md).

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/app.js`](../proyecto-integrador/src/nucleo/app.js) (delegación de eventos con un único listener) y en [`proyecto-integrador/src/nucleo/sanitizar.js`](../proyecto-integrador/src/nucleo/sanitizar.js), la capa de seguridad de este día.

**Contraste `textContent` vs `innerHTML`:** un incidente con descripción `<img src=x onerror="alert(1)">` se debe mostrar como texto plano, nunca ejecutarse. Compara:

```js
// Inseguro: si `descripcion` viene de un usuario, esto ejecuta el payload
elemento.innerHTML = descripcion;

// Seguro: el navegador nunca interpreta el contenido como HTML
elemento.textContent = descripcion;
```

`app.js` usa `textContent`/`createElement` para todo contenido dinámico del usuario. La prueba que verifica este payload específico está en [`proyecto-integrador/tests/sanitizar.test.js`](../proyecto-integrador/tests/sanitizar.test.js).
