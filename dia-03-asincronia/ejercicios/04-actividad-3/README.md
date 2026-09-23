# Actividad 3 — Cliente API en tres versiones

Actividad de la Sesión 3 (según el [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf)):

> Construye un cliente API en tres versiones comentadas: callbacks, Promises y async/await. Debe distinguir error de red y error HTTP, y explicar por qué la versión final es más legible y fácil de mantener.

Esta actividad se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

## Qué debes entregar

```
04-actividad-3/
├── cliente/
│   ├── errores.js        ErrorRed y ErrorHTTP (ya está completo)
│   ├── transporte.js     petición con callbacks sobre node:http (ya está completo)
│   ├── callbacks.js      versión 1: callbacks
│   ├── promesas.js       versión 2: Promises con fetch y .then/.catch
│   └── async-await.js    versión 3 (final): async/await con fetch y try/catch
├── EXPLICACION.md        por qué la versión final es más legible y fácil de mantener
└── verificar.mjs         comprobación local del contrato
```

Completa `callbacks.js`, `promesas.js`, `async-await.js` y `EXPLICACION.md`.

## Contrato (las tres versiones lo cumplen igual)

| Función | Qué hace |
|---|---|
| `obtenerUsuario(baseUrl, id)` | `GET {baseUrl}/usuarios/{id}` y devuelve el usuario ya convertido desde JSON |
| `obtenerUsuarioConPosts(baseUrl, id)` | pide el usuario y **después** `GET {baseUrl}/usuarios/{id}/posts`; devuelve `{ ...usuario, posts }` |

- **Versión de callbacks:** cada función recibe un `callback(error, resultado)` como **último** parámetro y no devuelve nada. El callback debe llamarse **una sola vez** en cada camino. Usa `peticion()` de `transporte.js`.
- **Versiones de Promises y async/await:** devuelven una `Promise`. Usan `fetch`.
- **Los dos tipos de error** (de `errores.js`):
  - `ErrorRed`: no hubo respuesta (servidor caído, sin conexión).
  - `ErrorHTTP`: sí hubo respuesta, pero con un código que no es 200. Debe llevar el `status` (404, 500...).
  - Si el primer paso de `obtenerUsuarioConPosts` falla, ese error se propaga tal cual.

Ojo con el punto de la ficha 3.5: `fetch()` **no** rechaza la promesa cuando el servidor responde 404 o 500; hay que revisar `response.ok`.

Preguntas para pensar: ¿qué cambió entre callback, Promise y async/await: la operación o la forma de escribir el flujo? Si el servidor responde 404, ¿`fetch()` entra al `catch` por sí solo? ¿Por qué?

## Cómo verificar

Desde esta carpeta (Node.js 18+, **sin internet**: el verificador levanta su propio servidor de prueba):

```bash
node verificar.mjs
```

Cada comprobación aparece como `ok` o `FALLA` con el motivo. Prueba las tres versiones contra el mismo servidor (éxito, 404, 500 y un puerto cerrado para el error de red) y revisa que cada versión use la técnica que le corresponde. El verificador confirma el contrato; el instructor valora también la calidad de tus comentarios y de tu explicación.

## Qué se evalúa

- Que las tres versiones funcionen (el verificador en verde).
- Que **distingan error de red y error HTTP** en cada versión.
- Que cada versión esté **comentada**: qué hace cada paso y por qué (no solo qué línea sigue).
- Que `EXPLICACION.md` explique, con tus palabras, por qué la versión final es más legible y fácil de mantener, apoyándote en `obtenerUsuarioConPosts`.
- Que cada archivo deje ver su responsabilidad en la primera línea (`// Responsabilidad: ...`), igual que en la Actividad 2.

## Videos de apoyo

- [¿Qué es código asíncrono y síncrono en JavaScript? (con ejemplos simples)](https://www.youtube.com/watch?v=Vt9MLvaG278)
- [¿Qué es la programación asíncrona en JavaScript? Explicación fácil](https://www.youtube.com/watch?v=Y4HYnHsOfvI)
- [JavaScript asíncrono: síncrono vs. asíncrono – descripción gráfica](https://www.youtube.com/watch?v=UDk7QYO0ZpM)
- [Asincronismo en JS: ¿qué es el Callback Hell? – JS desde cero #15](https://www.youtube.com/watch?v=iAq9SOEODvo)
- [Callbacks: ¿qué son y cómo utilizarlos? – Evitar callback hell](https://www.youtube.com/watch?v=WYVOvwTZ7Bo)
- [Qué es el antipatrón Callback Hell en JavaScript](https://www.youtube.com/watch?v=TcEjFk1cDzU)
- [Promesas: new Promise, resolve, reject, then, catch](https://www.youtube.com/watch?v=W-HPYsmHG6U)
- [Cómo usar promesas en JavaScript – JS en Español](https://www.youtube.com/watch?v=urapbZL9knY)
- [Promesas: métodos Promise.all y race en JavaScript](https://www.youtube.com/watch?v=-xhWDNm3XvY)
- [Promesas y async-await: then y catch – JS desde cero #16](https://www.youtube.com/watch?v=ksg6SDwllDs)
- [Callback, Promesas, Async Await y Try Catch | JavaScript](https://www.youtube.com/watch?v=p3Oq3AfuteA)
- [JavaScript asíncrono con Async Await](https://www.youtube.com/watch?v=za8Z6saKVdw)
- [Cómo consumir una API REST con Fetch + Promises con gestión de errores](https://www.youtube.com/watch?v=FJ-w0tf3d_w)
- [Curso de JavaScript: API fetch – manejo de errores](https://www.youtube.com/watch?v=U0Qoq3hYPZA)
- [Javascript Fetch API: qué es y cómo consumir un API](https://www.youtube.com/watch?v=lkMq_qzCV_M)

## Nota de divulgación

Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
