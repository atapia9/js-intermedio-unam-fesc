# Día 1 — Contexto de ejecución, Hoisting, Scope, Closures y `this`

Esta primera sesión sienta las bases teóricas del curso: cómo ejecuta JavaScript el código internamente, por qué `var`, `let` y `const` se comportan de forma distinta, qué son los closures y cómo se resuelve el valor de `this` en distintos contextos.

## Agenda de la sesión

1. Contexto de ejecución: Call Stack y Event Loop
2. Hoisting y Scope (`var` vs `let` vs `const`)
3. Closures
4. El keyword `this`

## 1.1 Contexto de Ejecución: Call Stack y Event Loop

JavaScript es de un solo hilo (single-threaded). Para manejar operaciones lentas (temporizadores, peticiones de red) sin bloquear la interfaz, se apoya en:

- **Call Stack**: pila LIFO de contextos de ejecución.
- **Heap**: memoria donde se almacenan los objetos.
- **Web APIs**: temporizadores, HTTP, eventos DOM — gestionados por el navegador/Node, no por el motor de JS.
- **Callback Queue**: cola de macrotareas (`setTimeout`, eventos).
- **Microtask Queue**: cola de mayor prioridad (`.then`, `.catch`, `.finally`, `queueMicrotask`).
- **Event Loop**: revisa si la Call Stack está vacía; si lo está, vacía primero toda la Microtask Queue y luego toma la siguiente tarea de la Callback Queue.

Ver [`ejemplos/01-event-loop.js`](ejemplos/01-event-loop.js).

## 1.2 Hoisting y Scope

El **hoisting** es la elevación conceptual de declaraciones al inicio de su contexto de ejecución, antes de ejecutar línea por línea.

| | `var` | `let` | `const` |
|---|---|---|---|
| Scope | función | bloque | bloque |
| Hoisting | sí, inicializa `undefined` | sí, queda en TDZ | sí, queda en TDZ |
| Redeclaración | sí | no | no |
| Reasignación | sí | sí | no (el binding; el contenido sí puede mutar) |

Tipos de scope: **global**, **local/función**, **bloque**.

Ver [`ejemplos/02-hoisting-scope.js`](ejemplos/02-hoisting-scope.js).

## 1.3 Closures

Un closure se forma cuando una función interna "recuerda" el entorno léxico de la función externa, incluso después de que esta terminó de ejecutarse.

Casos de uso: encapsulamiento de estado privado, fábricas de funciones, memoización, manejadores de eventos que "recuerdan" un valor.

Ver [`ejemplos/03-closures.js`](ejemplos/03-closures.js).

## 1.4 El keyword `this`

El valor de `this` depende de **cómo se invoca** la función, no de dónde se define:

- Contexto global (navegador, no estricto): `this` → `window`.
- Método de un objeto: `this` → el objeto que llama (`obj.metodo()`).
- Función suelta: `undefined` (modo estricto) o el objeto global.
- Arrow functions: no tienen `this` propio; heredan el `this` léxico.
- `call`, `apply`, `bind`: fijan `this` explícitamente.

Ver [`ejemplos/04-this.js`](ejemplos/04-this.js).

## Cierre de la sesión 1

El event loop determina el orden real de ejecución cuando hay asincronía de por medio; `let`/`const` con scope de bloque previenen errores comunes de `var`; los closures permiten encapsular estado; y el valor de `this` depende siempre de cómo se llama la función, no de dónde se escribió.

## Ejercicios

1. [`ejercicios/01-orden-ejecucion.js`](ejercicios/01-orden-ejecucion.js) — predecir el orden de ejecución con `setTimeout` y promesas.
2. [`ejercicios/02-contador-privado.js`](ejercicios/02-contador-privado.js) — construir un contador con estado privado usando closures.
3. [`ejercicios/03-this-practico.js`](ejercicios/03-this-practico.js) — corregir el valor de `this` en distintos contextos.
