# Día 3 — Callbacks, Promesas, Async/Await y Fetch API

La asincronía es, para muchos participantes, el tema más retador del curso. Esta sesión construye el conocimiento de forma progresiva: primero se entiende por qué se necesita, luego se recorre su evolución histórica (callbacks → promesas → async/await) y finalmente se aplica al consumo real de APIs con Fetch.

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

## Ejercicios

1. [`ejercicios/01-refactor-callback-a-promesa.js`](ejercicios/01-refactor-callback-a-promesa.js)
2. [`ejercicios/02-promise-all.js`](ejercicios/02-promise-all.js)
3. [`ejercicios/03-consumir-api.js`](ejercicios/03-consumir-api.js)

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/api.js`](../proyecto-integrador/src/nucleo/api.js): carga el feed inicial con `async/await` y **no confía en datos externos** — valida el esquema de la respuesta antes de aceptarla y cae a datos de ejemplo si algo falla, sin exponer el error original.
