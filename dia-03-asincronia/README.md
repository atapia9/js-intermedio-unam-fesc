# Día 3 — Tema 3: Programación Asíncrona

**Miércoles 30 de septiembre de 2026 · 09:00 a 13:00 hrs. · 4 horas**

La asincronía es, para muchos participantes, el tema más retador del curso. Esta sesión construye el conocimiento de forma progresiva: primero se entiende por qué se necesita, luego se recorre su evolución histórica (callbacks → promesas → async/await) y finalmente se aplica al consumo real de APIs con Fetch.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Agenda de la sesión

| Horario | Actividad | Duración |
|---|---|---|
| 09:00 – 09:15 | Repaso de sesión 2 y contexto de la sesión | 15 min |
| 09:15 – 09:45 | 3.1 Operaciones no bloqueantes: por qué importan | 30 min |
| 09:45 – 10:25 | 3.2 Callbacks y el Callback Hell | 40 min |
| 10:25 – 10:35 | Receso | 10 min |
| 10:35 – 11:35 | 3.3 Promesas: creación, consumo y encadenamiento | 60 min |
| 11:35 – 12:15 | 3.4 Async/Await | 40 min |
| 12:15 – 12:55 | 3.5 Fetch API y manejo de errores con try/catch | 40 min |
| 12:55 – 13:00 | Cierre y asignación de práctica | 5 min |

## 3.1 Gestión de operaciones que no bloquean el hilo principal

Al ser JavaScript de un solo hilo, cualquier operación lenta (una petición de red, leer un archivo grande, esperar la respuesta de una base de datos) no puede simplemente 'detener' la ejecución sin congelar toda la interfaz de usuario. La asincronía es el mecanismo que permite iniciar esas operaciones y seguir ejecutando otro código mientras se resuelven, retomando el resultado cuando esté disponible.

- Sin asincronía: la interfaz se congelaría mientras se espera cada respuesta de red.
- Con asincronía: la operación se delega al entorno (navegador/Node), y el resultado se procesa mediante un callback, una promesa o async/await cuando está listo.

## 3.2 Callbacks: el origen y el 'Callback Hell'

Un callback es simplemente una función que se pasa como argumento a otra función, para ser invocada cuando cierta operación termine. Fue el primer mecanismo de asincronía en JavaScript.

```js
function obtenerUsuario(id, callback) {
  setTimeout(() => {
    callback({ id, nombre: 'Cliente ' + id });
  }, 500);
}

obtenerUsuario(1, (usuario) => {
  obtenerUsuario(usuario.id + 1, (siguiente) => {
    obtenerUsuario(siguiente.id + 1, (otro) => {
      console.log('Callback Hell:', otro); // anidamiento creciente
    });
  });
});
```

Ejemplo ejecutable: [`ejemplos/3.2-callbacks.js`](ejemplos/3.2-callbacks.js).

Cuando varias operaciones asíncronas dependen entre sí, el anidamiento de callbacks crece rápidamente en profundidad ('pyramid of doom'), dificultando la lectura, el manejo de errores y el mantenimiento del código. Esto motivó la creación de las promesas.

**Ejercicio 3.1 — Identificar el problema**

1. Se entrega un fragmento con tres llamadas anidadas a una función simulada de lectura de archivos vía callback.
2. Señala por escrito al menos tres problemas concretos de mantenibilidad que observas en el código (manejo de errores repetido, anidamiento, dificultad para reutilizar).

Se trabaja en: bloque 3.1 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).

## 3.3 Promesas: creación, consumo y encadenamiento

Una Promise representa el resultado eventual (exitoso o fallido) de una operación asíncrona. Tiene tres estados: pending (pendiente), fulfilled (resuelta) y rejected (rechazada).

```js
function obtenerUsuarioProm(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error('id inválido'));
      resolve({ id, nombre: 'Cliente ' + id });
    }, 500);
  });
}

obtenerUsuarioProm(1)
  .then((usuario) => obtenerUsuarioProm(usuario.id + 1))
  .then((siguiente) => obtenerUsuarioProm(siguiente.id + 1))
  .then((resultado) => console.log('Encadenado:', resultado))
  .catch((error) => console.error('Error en la cadena:', error.message))
  .finally(() => console.log('Proceso terminado'));
```

Ejemplo ejecutable: [`ejemplos/3.3-promesas.js`](ejemplos/3.3-promesas.js).

- .then() procesa el valor resuelto y puede devolver otra promesa (encadenamiento).
- .catch() captura cualquier error ocurrido en la cadena, sin importar en qué eslabón ocurrió.
- .finally() se ejecuta siempre, haya éxito o error; útil para limpieza (ocultar un spinner, cerrar una conexión).
- Promise.all() ejecuta varias promesas en paralelo y espera a que todas terminen; Promise.race() resuelve con la primera que termine.

**Ejercicio 3.2 — Migración de callbacks a promesas**

1. Convierte la función obtenerUsuario del ejercicio 3.1 a una versión basada en Promise.
2. Reescribe la cadena de tres llamadas anidadas usando .then() encadenado, con un único .catch() al final.
3. Agrega un caso que provoque un rechazo (id inválido) y confirma que el .catch() lo captura correctamente.

Se trabaja en: bloque 3.2 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).

## 3.4 Async/Await: sintaxis moderna para manejo de asincronía

async/await es azúcar sintáctico sobre las promesas: permite escribir código asíncrono con apariencia secuencial, mucho más fácil de leer que las cadenas de .then(). Una función async siempre devuelve una promesa; await pausa la ejecución de esa función (sin bloquear el hilo principal) hasta que la promesa se resuelva.

```js
async function flujoUsuarios() {
  try {
    const u1 = await obtenerUsuarioProm(1);
    const u2 = await obtenerUsuarioProm(u1.id + 1);
    const u3 = await obtenerUsuarioProm(u2.id + 1);
    console.log('Resultado final:', u3);
  } catch (error) {
    console.error('Error capturado:', error.message);
  } finally {
    console.log('Flujo terminado');
  }
}

flujoUsuarios();
```

Ejemplo ejecutable: [`ejemplos/3.4-async-await.js`](ejemplos/3.4-async-await.js).

**Ejercicio 3.3 — Reescritura con async/await**

1. Reescribe la solución del ejercicio 3.2 usando async/await con try/catch/finally en lugar de .then()/.catch().
2. Agrega una versión que ejecute las tres llamadas en paralelo (no encadenadas) usando Promise.all, y mide con console.time/console.timeEnd la diferencia de tiempo respecto a la versión secuencial.

Se trabaja en: bloque 3.3 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).

## 3.5 Consumo de APIs: Fetch API y manejo de errores con try/catch

La Fetch API es la interfaz estándar del navegador para realizar peticiones HTTP de forma nativa, sin depender de librerías externas. Devuelve una promesa que se resuelve con un objeto Response.

```js
async function obtenerPost(id) {
  try {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    console.log(datos);
    return datos;
  } catch (error) {
    console.error('No se pudo obtener el post:', error.message);
  }
}

obtenerPost(1);
```

Ejemplo ejecutable: [`ejemplos/3.5-fetch.js`](ejemplos/3.5-fetch.js).

Un detalle importante que suele confundir a quienes inician: fetch() solo rechaza la promesa ante errores de red (sin conexión, CORS); un error 404 o 500 se considera una respuesta 'exitosa' a nivel de red, por lo que siempre debe verificarse response.ok o response.status manualmente.

**Ejercicio 3.4 — Cliente de API con manejo de errores**

1. Construye una función listarUsuarios() que consuma un endpoint público (por ejemplo, JSONPlaceholder /users) y muestre en pantalla el nombre y correo de cada usuario.
2. Agrega manejo de errores para: falla de red, código de estado distinto de 2xx, y JSON malformado.
3. Agrega un indicador de carga (por ejemplo, un mensaje 'Cargando...' en consola) que se muestre antes de la petición y se retire en el bloque finally.

Se trabaja en: bloque 3.4 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).

## Cierre de la sesión 3

**Actividad de aprendizaje 3 (evaluable)**

- Entrega individual: cliente de API del ejercicio 3.4, con las tres versiones (callbacks, promesas, async/await) del flujo de usuarios comentadas en el mismo archivo para comparación.
- Se evaluará: correcto encadenamiento/await, manejo robusto de errores y justificación escrita de por qué async/await mejora la legibilidad.

Enunciado, esqueleto y verificador: [`ejercicios/actividad-3/`](ejercicios/actividad-3/README.md).

## Ejercicios y actividad

- **Ejercicio 3.1 — Identificar el problema** — se trabaja en: bloque 3.1 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).
  - Video: [Asincronismo en JS: ¿qué es el Callback Hell? – JS desde cero #15](https://www.youtube.com/watch?v=iAq9SOEODvo)
  - Video: [Callbacks: ¿qué son y cómo utilizarlos? – Evitar callback hell](https://www.youtube.com/watch?v=WYVOvwTZ7Bo)
  - Video: [Qué es el antipatrón Callback Hell en JavaScript](https://www.youtube.com/watch?v=TcEjFk1cDzU)
- **Ejercicio 3.2 — Migración de callbacks a promesas** — se trabaja en: bloque 3.2 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).
  - Video: [Promesas: new Promise, resolve, reject, then, catch](https://www.youtube.com/watch?v=W-HPYsmHG6U)
  - Video: [Cómo usar promesas en JavaScript – JS en Español](https://www.youtube.com/watch?v=urapbZL9knY)
  - Video: [Promesas: métodos Promise.all y race en JavaScript](https://www.youtube.com/watch?v=-xhWDNm3XvY)
- **Ejercicio 3.3 — Reescritura con async/await** — se trabaja en: bloque 3.3 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).
  - Video: [Promesas y async-await: then y catch – JS desde cero #16](https://www.youtube.com/watch?v=ksg6SDwllDs)
  - Video: [Callback, Promesas, Async Await y Try Catch | JavaScript](https://www.youtube.com/watch?v=p3Oq3AfuteA)
  - Video: [JavaScript asíncrono con Async Await](https://www.youtube.com/watch?v=za8Z6saKVdw)
- **Ejercicio 3.4 — Cliente de API con manejo de errores** — se trabaja en: bloque 3.4 de [`actividad3.js`](ejercicios/actividad-3/actividad3.js).
  - Video: [Cómo consumir una API REST con Fetch + Promises con gestión de errores](https://www.youtube.com/watch?v=FJ-w0tf3d_w)
  - Video: [Curso de JavaScript: API fetch – manejo de errores](https://www.youtube.com/watch?v=U0Qoq3hYPZA)
  - Video: [Javascript Fetch API: qué es y cómo consumir un API](https://www.youtube.com/watch?v=lkMq_qzCV_M)
- **Actividad de aprendizaje 3 (evaluable)** — [`ejercicios/actividad-3/`](ejercicios/actividad-3/README.md): entrega de la solución. Los videos de todas las fichas están en su README.

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

**Actividad 3:** construye un cliente API en tres versiones comentadas: callbacks, Promises y async/await. Debe distinguir error de red y error HTTP, y explicar por qué la versión final es más legible y fácil de mantener. Enunciado, esqueleto y verificador en [`ejercicios/actividad-3`](ejercicios/actividad-3/README.md).

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/api.js`](../proyecto-integrador/src/nucleo/api.js): carga el feed inicial con `async/await` y **no confía en datos externos** — valida el esquema de la respuesta antes de aceptarla y cae a datos de ejemplo si algo falla, sin exponer el error original.
