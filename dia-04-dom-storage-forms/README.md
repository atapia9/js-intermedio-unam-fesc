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

**Actividad 4:** (individual) lista de tareas con un solo listener delegado, persistencia en `localStorage` (guardar, cargar y limpiar) y un formulario validado con `FormData`, mostrando los errores en la interfaz (sin `alert`).

## Ejercicios

1. [`ejercicios/01-lista-tareas-fragment.html`](ejercicios/01-lista-tareas-fragment.html) — insertar 100 elementos usando `DocumentFragment`.
2. [`ejercicios/02-delegacion-practica.html`](ejercicios/02-delegacion-practica.html) — lista dinámica con un solo listener delegado.
3. [`ejercicios/03-persistir-preferencias.html`](ejercicios/03-persistir-preferencias.html) — guardar preferencias de usuario en `localStorage`.

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
