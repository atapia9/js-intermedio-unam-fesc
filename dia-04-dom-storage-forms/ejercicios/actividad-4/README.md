# Actividad de aprendizaje 4 (evaluable, individual) — Tareas, persistencia y formulario validado

Consigna del [manual del curso](../../README.md), Sesión 4:

> **Entrega individual:** lista de tareas con delegación de eventos y persistencia en `localStorage` (ejercicios 4.1 y 4.2), más el formulario validado (ejercicio 4.3).
> **Se evaluará:** uso correcto de delegación (un único listener), persistencia funcional y validación robusta sin recargar la página.

El [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf) agrega: los errores se muestran en la interfaz, **sin `alert`**.

Esta actividad es **individual** y se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

## Qué debes entregar

```
actividad-4/
├── index.html      la página ya está armada (las dos secciones y sus formularios); no necesitas cambiarla
├── app.js          TU código: es lo que completas
├── verificar.mjs   comprobación local: abre tu página en un navegador simulado y simula al usuario
└── package.json    solo instala jsdom para el verificador
```

La primera línea de `app.js` es `// Responsabilidad: ...` con una frase real (no el `TODO` inicial).

## Ejercicios 4.1 y 4.2 — Lista de tareas con delegación y persistencia

**Ejercicio 4.1 — Lista dinámica con delegación**

1. Construye una lista de tareas (to-do list) donde se puedan agregar elementos dinámicamente con un formulario.
2. Implementa, con un único listener delegado en el contenedor `<ul>`, la posibilidad de marcar una tarea como completada (clic sobre el texto) y eliminarla (clic sobre un botón ✕).
3. Verifica que las tareas agregadas después de cargar la página también respondan a ambas acciones sin registrar nuevos listeners.

**Ejercicio 4.2 — Persistencia de la lista de tareas**

1. Extiende la lista de tareas del ejercicio 4.1 para que su estado se guarde automáticamente en `localStorage` cada vez que se agrega, completa o elimina una tarea.
2. Al cargar la página, la lista debe reconstruirse a partir de lo almacenado, sin perder tareas previas.
3. Agrega un botón 'Limpiar todo' que use `localStorage.removeItem()` y vacíe también la lista en pantalla.

Contrato (los elementos ya están en `index.html`):

- **Agregar:** el formulario `#form-tarea` tiene un campo `texto`. Cada tarea es un `<li>` con su texto dentro de un `<span>` y un `<button>` ✕. Un texto vacío (o solo espacios) no agrega nada.
- **Un solo listener delegado:** no se registra ningún listener sobre los `<li>`, `<span>` ni `<button>` de la lista; hay **uno** de `click` en `#lista-tareas` (o en un ancestro) que atiende todo, incluso las tareas agregadas después de cargar la página.
- **Completar y eliminar:** clic sobre el `<span>` marca o desmarca la tarea (el `<li>` lleva la clase `completada`); clic sobre el `<button>` la elimina.
- **Persistencia:** `localStorage`, clave `tareas`, un arreglo JSON de objetos `{ texto, completada }`, guardado después de cada cambio y leído al abrir la página. El botón `#btn-limpiar` vacía la lista y quita la clave con `localStorage.removeItem('tareas')`.
- **Seguridad:** el texto de una tarea se muestra como **texto**, nunca como HTML (una tarea `<img src=x onerror=...>` no debe crear una imagen). Recuerda el contraste `textContent` / `innerHTML` del README del día.

## Ejercicio 4.3 — Formulario de contacto validado

1. Construye un formulario de contacto con campos nombre, correo, teléfono (opcional) y mensaje.
2. Implementa validación programática con al menos 3 reglas (longitud mínima, formato de correo, mensaje no vacío) y muestra los errores junto a cada campo, sin usar `alert()`.
3. Al validar correctamente, usa `FormData` para armar un objeto con los datos y muéstralo en consola simulando un envío a un servidor.

Contrato (el formulario `#form-contacto` y un `<span data-error="campo">` junto a cada campo ya están en `index.html`, y tiene `novalidate`: la validación la haces tú):

| Campo | Regla |
|---|---|
| `nombre` | al menos 2 caracteres, sin contar los espacios de los extremos |
| `correo` | formato de correo válido (por ejemplo `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) |
| `telefono` | opcional: puede quedar vacío y no genera error |
| `mensaje` | no vacío (sin contar espacios) |

- Los errores se muestran **todos a la vez**, cada uno en el `[data-error="campo"]` de su campo; al corregirlos, esos elementos quedan vacíos. Nunca con `alert()`.
- Si todo es válido, se lee el formulario con `new FormData(formulario)`, se arma un objeto `{ nombre, correo, telefono, mensaje }` y se muestra con `console.log`.

## Cómo verificar

Necesitas Node.js 18+. Desde esta carpeta:

```bash
npm install        # solo la primera vez: instala jsdom
node verificar.mjs
```

El verificador carga `index.html` en jsdom (un navegador simulado), ejecuta tu `app.js`, escribe en los formularios, hace clic y revisa el resultado. Cada comprobación sale como `ok` o `FALLA` con el motivo. Al final hay *sugerencias* (`DocumentFragment`, `closest`, `Object.fromEntries`) que no cambian el resultado.

Como el verificador usa un navegador simulado, mantén `app.js` como **script clásico** (`<script src="app.js" defer>`), sin `type="module"`. Para ver cómo se ve de verdad, abre `index.html` en tu navegador.

## Qué se evalúa

- **Delegación correcta:** un único listener, que también atiende a las tareas agregadas después.
- **Persistencia funcional:** guardar, cargar y limpiar con `localStorage`.
- **Validación robusta sin recargar la página**, con errores en la interfaz.
- Que el verificador quede en verde y que `app.js` deje ver su responsabilidad (`// Responsabilidad: ...`).
- El uso adecuado de lo visto en la sesión: `DocumentFragment`, `FormData`, `JSON.stringify`/`JSON.parse` y `textContent` en lugar de `innerHTML` con datos del usuario.

## Videos de apoyo

- [DOM – Curso JavaScript Moderno #04: Fragment + createElement](https://www.youtube.com/watch?v=kUpx6ovPILc)
- [DocumentFragment en JavaScript (short)](https://www.youtube.com/shorts/o21LBIEn8EA)
- [Delegación de eventos en JavaScript con ejemplo práctico](https://www.youtube.com/watch?v=M48MZv60ZPs)
- [¿Cómo funciona el Event Bubbling? – JavaScript DOM](https://www.youtube.com/watch?v=xlci1S08Cww)
- [¿Qué es y para qué sirve la delegación de eventos en JavaScript?](https://www.youtube.com/watch?v=5MUHJNSCeGU)
- [LocalStorage y SessionStorage ¿cómo funcionan? – Curso JavaScript #48](https://www.youtube.com/watch?v=ZlpA2hez92Y)
- [Guarda objetos y arrays en LocalStorage como un PRO (JSON explicado fácil)](https://www.youtube.com/watch?v=EZWY9EOzzG4)
- [API localStorage – guardar y recuperar objetos con formato JSON](https://www.youtube.com/watch?v=sL0RHt_QK3I)
- [FormData en JavaScript: cómo, cuándo y por qué usarlo](https://www.youtube.com/watch?v=HSj1CRba8tg)
- [preventDefault en JavaScript: evitando el comportamiento por defecto](https://www.youtube.com/watch?v=i_7WLzT0oEY)
- [Aprende a validar formularios con JavaScript y expresiones regulares](https://www.youtube.com/watch?v=s3pC93LgP18)

## Nota de divulgación

Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
