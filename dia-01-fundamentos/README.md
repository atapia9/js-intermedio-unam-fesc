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

## Videos de apoyo

Antes de ver cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso y responde la pregunta. Los videos marcados como opcional (inglés) se pueden ver con subtítulos. Fuente: [Anexo de videos de apoyo](../documentos/Anexo_Videos_JS_Intermedio.pdf) (sesión 1, 28 de septiembre de 2026).

### 1.1 · Call Stack y Event Loop

*Idea clave:* JavaScript hace una cosa a la vez; el navegador espera por él.

| Tipo | Video |
|---|---|
| Principal | [La pila de ejecución (Call Stack) – JS en Español](https://www.youtube.com/watch?v=ygA5U7Wgsg8) |
| Principal | [Entiende el Event Loop de JavaScript en 10 minutos](https://www.youtube.com/watch?v=XdzDDRF8_mY) |
| Refuerzo | [Qué es el Event Loop en JavaScript – paso a paso](https://www.youtube.com/watch?v=rvzItyLuh28) |
| Opcional (inglés) | [What the heck is the event loop anyway? – Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ) |

*Caso de uso real:* un botón de «Descargar reporte» sigue respondiendo mientras llegan los datos del servidor: la página no se congela.  
*Pregunta para pensar:* ¿por qué `setTimeout(fn, 0)` no se ejecuta «inmediatamente»?

### 1.2 · Hoisting y Scope: `var`, `let`, `const`

*Idea clave:* ¿dónde «vive» cada variable y desde cuándo existe?

| Tipo | Video |
|---|---|
| Principal | [VAR, LET o CONST: ¿cuál debería usar? – JS en Español](https://www.youtube.com/watch?v=bvkY9ey83yY) |
| Refuerzo | [Diferencia entre var, let y const – Curso JS desde cero #4](https://www.youtube.com/watch?v=a8SJJPvkGIE) |
| Opcional (inglés) | [Scope vs Closure vs Hoisting](https://www.youtube.com/watch?v=sDmn6p4lRHk) |

*Caso de uso real:* una lista de productos con botón «Agregar»: con `var` todos los botones agregan el mismo producto.  
*Pregunta para pensar:* ¿por qué cambiar `var` por `let` en el ciclo corrige el error?

### 1.3 · Closures

*Idea clave:* una función puede «recordar» el lugar donde nació.

| Tipo | Video |
|---|---|
| Principal | [Closures en JavaScript: qué son y cómo funcionan](https://www.youtube.com/watch?v=xa8lhVwQBw4) |
| Casos reales | [3 ejemplos REALES de Closures en JavaScript](https://www.youtube.com/watch?v=ubS-ejTrSRc) |
| Refuerzo | [¿Qué son los Closures y por qué dan tanto miedo?](https://www.youtube.com/watch?v=bPZpjI2tzRo) |

*Caso de uso real:* el saldo de una cuenta bancaria que solo cambia con `depositar()` y `retirar()`, nunca «desde afuera».  
*Pregunta para pensar:* ¿por qué la cuenta de Ana y la de Luis no comparten saldo?

### 1.4 · `this`, `call`, `apply` y `bind`

*Idea clave:* `this` depende de quién llama a la función, no de dónde se escribió.

| Tipo | Video |
|---|---|
| Principal | [This en JavaScript (bind, call, apply y más)](https://www.youtube.com/watch?v=bS71_W_BDFE) |
| Práctico | [¿Para qué sirve call(), bind() y apply()?](https://www.youtube.com/watch?v=OZ02GSH9QkY) |
| Refuerzo | [¿Cómo usar call, apply y bind? This a profundidad](https://www.youtube.com/watch?v=j1Zs_o32uo4) |

*Caso de uso real:* un temporizador que «olvida» a qué objeto pertenece cuando se pasa como callback a `setInterval`.  
*Pregunta para pensar:* ¿cuándo usarías `bind` y cuándo una arrow function para conservar el contexto?

### Cierre: ¿cómo se conecta todo?

Tiempo (Event Loop) · Espacio (Scope) · Contexto (`this`) → los closures son la memoria que une estos tres.

**Actividad 1:** entrega un archivo `.js` con los ejercicios 1.1 a 1.4. Cada bloque debe incluir comentarios que expliquen qué hace, por qué funciona y qué concepto demuestra. Entrégalo antes de la Sesión 2.

## Ejercicios

1. [`ejercicios/01-orden-ejecucion.js`](ejercicios/01-orden-ejecucion.js) — predecir el orden de ejecución con `setTimeout` y promesas.
2. [`ejercicios/02-contador-privado.js`](ejercicios/02-contador-privado.js) — construir un contador con estado privado usando closures.
3. [`ejercicios/03-this-practico.js`](ejercicios/03-this-practico.js) — corregir el valor de `this` en distintos contextos.

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/almacenamiento.js`](../proyecto-integrador/src/nucleo/almacenamiento.js): la clave de `localStorage` queda encapsulada en un closure, y solo se exponen `cargar()`/`guardar()` — mínimo privilegio aplicado a código real.
