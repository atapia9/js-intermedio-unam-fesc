# Día 3 — Callbacks, Promesas, Async/Await y Fetch API

La asincronía es, para muchos participantes, el tema más retador del curso. Esta sesión construye el conocimiento de forma progresiva: primero se entiende por qué se necesita, luego se recorre su evolución histórica (callbacks → promesas → async/await) y finalmente se aplica al consumo real de APIs con Fetch.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Agenda de la sesión

1. Gestión de operaciones que no bloquean el hilo principal
2. Callbacks: el origen y el "Callback Hell"
3. Promesas: creación, consumo y encadenamiento
4. Async/Await: sintaxis moderna para manejo de asincronía
5. Consumo de APIs: Fetch API y manejo de errores con try/catch

## 3.2 Callbacks y el "Callback Hell"

Un callback es una función pasada como argumento a otra, para ser invocada cuando cierta operación termina. Cuando varias operaciones dependen entre sí, el anidamiento de callbacks crece en profundidad ("pyramid of doom"), dificultando la lectura y el manejo de errores.

Ver [`ejemplos/01-callbacks.js`](ejemplos/01-callbacks.js).

## 3.3 Promesas

Una `Promise` representa el resultado eventual de una operación asíncrona. Estados: `pending`, `fulfilled`, `rejected`.

- `.then()` procesa el valor resuelto (encadenable).
- `.catch()` captura cualquier error en la cadena.
- `.finally()` se ejecuta siempre (limpieza).
- `Promise.all()` espera a que todas terminen; `Promise.race()` resuelve con la primera.

Ver [`ejemplos/02-promesas.js`](ejemplos/02-promesas.js).

## 3.4 Async/Await

Azúcar sintáctico sobre las promesas: código asíncrono con apariencia secuencial. Una función `async` siempre devuelve una promesa; `await` pausa esa función (sin bloquear el hilo) hasta que la promesa se resuelva.

Ver [`ejemplos/03-async-await.js`](ejemplos/03-async-await.js).

## 3.5 Fetch API

Interfaz estándar para peticiones HTTP. Devuelve una promesa resuelta con un `Response`. **Ojo**: `fetch()` solo rechaza ante errores de red; un 404/500 se considera respuesta "exitosa" a nivel de red — siempre verificar `response.ok`.

Ver [`ejemplos/04-fetch.js`](ejemplos/04-fetch.js).

## Videos de apoyo

Hoy la pregunta clave es: ¿cuándo empieza esta operación, cuándo termina y qué pasa si falla? Antes de ver cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso y responde la pregunta. Los videos marcados como opcional (inglés) se pueden ver con subtítulos. Fuente: [Anexo de videos de apoyo](../documentos/Anexo_Videos_JS_Intermedio.pdf) (sesión 3, 30 de septiembre de 2026).

### 3.1 · Operaciones no bloqueantes

*Idea clave:* JavaScript puede iniciar algo que termina después y seguir trabajando mientras tanto.

| Tipo | Video |
|---|---|
| Principal | [¿Qué es código asíncrono y síncrono en JavaScript? (con ejemplos simples)](https://www.youtube.com/watch?v=Vt9MLvaG278) |
| Refuerzo | [¿Qué es la programación asíncrona en JavaScript? Explicación fácil](https://www.youtube.com/watch?v=Y4HYnHsOfvI) |
| Visual | [JavaScript asíncrono: síncrono vs. asíncrono – descripción gráfica](https://www.youtube.com/watch?v=UDk7QYO0ZpM) |

*Caso de uso real:* el mesero de un restaurante no se queda parado frente a la cocina: toma otras órdenes y regresa cuando el platillo está listo.  
*Pregunta para pensar:* ¿por qué «La aplicación continúa» aparece antes que «Operación terminada»?

### 3.2 · Callbacks y Callback Hell

*Idea clave:* un callback es «llámame cuando termines». Útil, pero anidado se vuelve una pirámide difícil de mantener.

| Tipo | Video |
|---|---|
| Principal | [Asincronismo en JS: ¿qué es el Callback Hell? – JS desde cero #15](https://www.youtube.com/watch?v=iAq9SOEODvo) |
| Refuerzo | [Callbacks: ¿qué son y cómo utilizarlos? – Evitar callback hell](https://www.youtube.com/watch?v=WYVOvwTZ7Bo) |
| Refuerzo | [Qué es el antipatrón Callback Hell en JavaScript](https://www.youtube.com/watch?v=TcEjFk1cDzU) |

*Caso de uso real:* procesar fotos: leer archivo → medir → redimensionar → guardar. Cada paso anidado dentro del anterior, con el manejo de errores repetido en cada nivel.  
*Pregunta para pensar:* ¿qué tan fácil sería agregar un quinto paso a esa pirámide?

### 3.3 · Promesas: `then`, `catch`, `finally`, `Promise.all` y `race`

*Idea clave:* una Promise es un «comprobante»: la gestión está pendiente y terminará una sola vez, con éxito o con error.

| Tipo | Video |
|---|---|
| Principal | [Promesas: new Promise, resolve, reject, then, catch](https://www.youtube.com/watch?v=W-HPYsmHG6U) |
| Refuerzo | [Cómo usar promesas en JavaScript – JS en Español](https://www.youtube.com/watch?v=urapbZL9knY) |
| Paralelo | [Promesas: métodos Promise.all y race en JavaScript](https://www.youtube.com/watch?v=-xhWDNm3XvY) |

*Caso de uso real:* un panel que carga usuario, productos y categorías a la vez con `Promise.all`: tarda lo que la más lenta, no la suma de las tres.  
*Pregunta para pensar:* ¿cuándo NO conviene usar `Promise.all`? (Pista: dependencias)

### 3.4 · Async / Await y `try` / `catch`

*Idea clave:* se lee de arriba hacia abajo, pero sigue siendo asíncrono: `await` pausa solo esa función, no toda la página.

| Tipo | Video |
|---|---|
| Principal | [Promesas y async-await: then y catch – JS desde cero #16](https://www.youtube.com/watch?v=ksg6SDwllDs) |
| Comparativo | [Callback, Promesas, Async Await y Try Catch | JavaScript](https://www.youtube.com/watch?v=p3Oq3AfuteA) |
| Refuerzo | [JavaScript asíncrono con Async Await](https://www.youtube.com/watch?v=za8Z6saKVdw) |

*Caso de uso real:* iniciar sesión: esperar la validación del usuario y después cargar su perfil, con un solo `try/catch` que avisa si algo falla.  
*Pregunta para pensar:* ¿qué cambió entre callback, Promise y async/await: la operación o la forma de escribir el flujo?

### 3.5 · Fetch API y manejo de errores

*Idea clave:* que el servidor conteste no significa que todo salió bien: siempre revisa `response.ok`.

| Tipo | Video |
|---|---|
| Principal | [Cómo consumir una API REST con Fetch + Promises con gestión de errores](https://www.youtube.com/watch?v=FJ-w0tf3d_w) |
| Errores | [Curso de JavaScript: API fetch – manejo de errores](https://www.youtube.com/watch?v=U0Qoq3hYPZA) |
| Refuerzo | [Javascript Fetch API: qué es y cómo consumir un API](https://www.youtube.com/watch?v=lkMq_qzCV_M) |

*Caso de uso real:* una lista de usuarios que muestra «Cargando…», enseña los datos o un mensaje claro si hay 404 o no hay conexión, y siempre quita el indicador al final (`finally`).  
*Pregunta para pensar:* si el servidor responde 404, ¿`fetch()` entra al `catch` por sí solo? ¿Por qué?

### Cierre: ¿cómo se conecta todo?

No bloquear → Callbacks (solución histórica) → Promesas (cadena plana, errores centralizados) → Async/Await (lectura secuencial) → Fetch (datos reales, validando HTTP). Conecta con la Sesión 1: microtareas antes que `setTimeout`.

**Actividad 3:** construye un cliente API en tres versiones comentadas: callbacks, Promises y async/await. Debe distinguir error de red y error HTTP, y explicar por qué la versión final es más legible y fácil de mantener.

## Ejercicios

1. [`ejercicios/01-refactor-callback-a-promesa.js`](ejercicios/01-refactor-callback-a-promesa.js)
   - Video: [Asincronismo en JS: ¿qué es el Callback Hell? – JS desde cero #15](https://www.youtube.com/watch?v=iAq9SOEODvo)
   - Video: [Callbacks: ¿qué son y cómo utilizarlos? – Evitar callback hell](https://www.youtube.com/watch?v=WYVOvwTZ7Bo)
   - Video: [Qué es el antipatrón Callback Hell en JavaScript](https://www.youtube.com/watch?v=TcEjFk1cDzU)
   - Video: [Promesas: new Promise, resolve, reject, then, catch](https://www.youtube.com/watch?v=W-HPYsmHG6U)
   - Video: [Cómo usar promesas en JavaScript – JS en Español](https://www.youtube.com/watch?v=urapbZL9knY)
   - Video: [Promesas: métodos Promise.all y race en JavaScript](https://www.youtube.com/watch?v=-xhWDNm3XvY)
2. [`ejercicios/02-promise-all.js`](ejercicios/02-promise-all.js)
   - Video: [Promesas: new Promise, resolve, reject, then, catch](https://www.youtube.com/watch?v=W-HPYsmHG6U)
   - Video: [Cómo usar promesas en JavaScript – JS en Español](https://www.youtube.com/watch?v=urapbZL9knY)
   - Video: [Promesas: métodos Promise.all y race en JavaScript](https://www.youtube.com/watch?v=-xhWDNm3XvY)
3. [`ejercicios/03-consumir-api.js`](ejercicios/03-consumir-api.js)
   - Video: [Promesas y async-await: then y catch – JS desde cero #16](https://www.youtube.com/watch?v=ksg6SDwllDs)
   - Video: [Callback, Promesas, Async Await y Try Catch | JavaScript](https://www.youtube.com/watch?v=p3Oq3AfuteA)
   - Video: [JavaScript asíncrono con Async Await](https://www.youtube.com/watch?v=za8Z6saKVdw)
   - Video: [Cómo consumir una API REST con Fetch + Promises con gestión de errores](https://www.youtube.com/watch?v=FJ-w0tf3d_w)
   - Video: [Curso de JavaScript: API fetch – manejo de errores](https://www.youtube.com/watch?v=U0Qoq3hYPZA)
   - Video: [Javascript Fetch API: qué es y cómo consumir un API](https://www.youtube.com/watch?v=lkMq_qzCV_M)

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/api.js`](../proyecto-integrador/src/nucleo/api.js): carga el feed inicial con `async/await` y **no confía en datos externos** — valida el esquema de la respuesta antes de aceptarla y cae a datos de ejemplo si algo falla, sin exponer el error original.
