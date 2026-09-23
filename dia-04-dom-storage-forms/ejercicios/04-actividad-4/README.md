# Actividad 4 (individual) — Lista de tareas con delegación, localStorage y formulario validado

Actividad de la Sesión 4 (según el [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf)):

> Lista de tareas con un solo listener delegado, persistencia en `localStorage` (guardar, cargar y limpiar) y un formulario validado con `FormData`, mostrando los errores en la interfaz (sin `alert`).

Esta actividad es **individual** y se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

## Qué debes entregar

```
04-actividad-4/
├── index.html      la página ya está armada (formulario, listas y botón); no necesitas cambiarla
├── app.js          TU código: es lo que completas
├── verificar.mjs   comprobación local: abre tu página en un navegador simulado y simula al usuario
└── package.json    solo instala jsdom para el verificador
```

## Contrato

**Formulario (`#form-tarea`)** — tiene `novalidate`, así que la validación la haces tú en JavaScript, leyendo los datos con `new FormData(form)`:

| Campo | Regla |
|---|---|
| `titulo` | obligatorio; entre 3 y 60 caracteres **después de quitar espacios** en los extremos |
| `categoria` | obligatoria; una de `trabajo`, `estudio`, `personal` |

- Los errores se muestran en `#errores` como elementos `<li>`, **todos a la vez** (si el título y la categoría están mal, aparecen dos). Nunca con `alert()`.
- Si todo es válido: se agrega la tarea, `#errores` queda vacío y el formulario se limpia.

**Lista (`#lista-tareas`)** — cada tarea es un `<li>` con:

- un elemento `data-accion="alternar"` (al hacer clic marca o desmarca la tarea; el `<li>` lleva la clase `completada`),
- un `<button data-accion="eliminar">` (quita la tarea).

**Un solo listener delegado:** no se registra ningún listener sobre los `<li>`, `<span>` ni `<button>` de la lista; hay **uno** de `click` en `#lista-tareas` (o en un ancestro) que atiende todo, incluso las tareas agregadas después de cargar la página.

**Persistencia (`localStorage`, clave `tareas`)** — un arreglo JSON de objetos `{ id, titulo, categoria, completada }`:

- **guardar:** después de cada cambio (agregar, alternar, eliminar);
- **cargar:** al abrir la página se pintan las tareas guardadas;
- **limpiar:** el botón `#btn-limpiar` vacía la lista y deja `tareas` vacío en `localStorage` (`null` o `[]`).

Los `id` de las tareas no deben repetirse, aunque se agreguen varias muy seguidas.

**Seguridad:** el título que escribe el usuario se muestra como **texto**, nunca como HTML (un título como `<img src=x onerror=...>` no debe crear una imagen). Recuerda el contraste `textContent` / `innerHTML` del README del día.

## Cómo verificar

Necesitas Node.js 18+. Desde esta carpeta:

```bash
npm install        # solo la primera vez: instala jsdom
node verificar.mjs
```

El verificador carga `index.html` en jsdom (un navegador simulado), ejecuta tu `app.js`, escribe en el formulario, hace clic y revisa el resultado. Cada comprobación sale como `ok` o `FALLA` con el motivo. Al final hay *sugerencias* (`DocumentFragment`, `FormData`, `closest`) que no cambian el resultado.

Como el verificador usa un navegador simulado, mantén `app.js` como **script clásico** (`<script src="app.js" defer>`), sin `type="module"`. Para revisar cómo se ve de verdad, abre `index.html` en tu navegador.

## Qué se evalúa

- Que el verificador quede en verde (funcionalidad y contrato).
- **Que cada archivo deje ver su responsabilidad:** la primera línea de `app.js` es `// Responsabilidad: ...` con una frase real (no el `TODO` inicial).
- El uso adecuado de lo visto en la sesión: pintar con `DocumentFragment`, delegación de eventos, `FormData`, `JSON.stringify`/`JSON.parse` y `textContent` en lugar de `innerHTML` con datos del usuario.

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
