# Actividad de aprendizaje 3 (evaluable) — Cliente de API en tres versiones

Consigna del [manual del curso](../../README.md), Sesión 3:

> **Entrega individual:** cliente de API del ejercicio 3.4, con las tres versiones (callbacks, promesas, async/await) del flujo de usuarios comentadas en el mismo archivo para comparación.
> **Se evaluará:** correcto encadenamiento/await, manejo robusto de errores y justificación escrita de por qué async/await mejora la legibilidad.

El [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf) precisa que el cliente debe distinguir el error de red del error HTTP.

Esta actividad se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

## Qué debes entregar

```
actividad-3/
├── actividad3.js    TU código: un solo archivo con los cuatro bloques (es lo que completas)
├── errores.js       ErrorRed, ErrorHTTP y ErrorJSON (ya está completo)
├── EXPLICACION.md   tu justificación escrita de por qué async/await mejora la legibilidad
├── verificar.mjs    comprobación local del contrato
└── package.json     marca la carpeta como módulos ES; no lo cambies
```

En cada bloque de `actividad3.js` escribe, con tus palabras, las tres líneas de comentario del anexo: `// Qué hace: ...`, `// Por qué funciona: ...` y `// Concepto: ...`. La primera línea del archivo es `// Responsabilidad: ...` con una frase real. Las funciones que el archivo marca como "se entrega" (`leerArchivo`, `procesarArchivos`, `obtenerUsuario` y `flujoUsuariosCallbacks`) **no se modifican**.

`config.retardoMs` es el retardo de las operaciones simuladas (500 ms en el manual); el verificador lo baja para ir más rápido.

## Ejercicios y contrato de cada bloque

### Ejercicio 3.1 — Identificar el problema

1. Se entrega un fragmento con tres llamadas anidadas a una función simulada de lectura de archivos vía callback.
2. Señala por escrito al menos tres problemas concretos de mantenibilidad que observas en el código (manejo de errores repetido, anidamiento, dificultad para reutilizar).

- Escribe los comentarios `// Problema 1:`, `// Problema 2:` y `// Problema 3:` en el bloque 3.1, cada uno con un problema concreto.

### Ejercicio 3.2 — Migración de callbacks a promesas

1. Convierte la función `obtenerUsuario` del ejercicio 3.1 a una versión basada en `Promise`.
2. Reescribe la cadena de tres llamadas anidadas usando `.then()` encadenado, con un único `.catch()` al final.
3. Agrega un caso que provoque un rechazo (id inválido) y confirma que el `.catch()` lo captura correctamente.

- `obtenerUsuarioProm(id)` devuelve una `Promise` que resuelve `{ id, nombre: 'Cliente ' + id }` tras `config.retardoMs`, y rechaza con `Error('id inválido')` si `id <= 0`.
- `flujoUsuariosPromesas(idInicial = 1)` encadena tres llamadas (`idInicial`, el siguiente y el siguiente) con `.then()`, **un único** `.catch()` y un `.finally()`. Devuelve el tercer usuario. Si algo falla, el `.catch()` lo registra con `console.error` y el flujo devuelve `null`; el `.finally()` imprime `Proceso terminado`. Sin `async`/`await`.
- La versión con **callbacks** del flujo ya viene en el archivo (`flujoUsuariosCallbacks`) para compararla.

### Ejercicio 3.3 — Reescritura con async/await

1. Reescribe la solución del ejercicio 3.2 usando `async`/`await` con `try`/`catch`/`finally` en lugar de `.then()`/`.catch()`.
2. Agrega una versión que ejecute las tres llamadas en paralelo (no encadenadas) usando `Promise.all`, y mide con `console.time`/`console.timeEnd` la diferencia de tiempo respecto a la versión secuencial.

- `flujoUsuariosAsync(idInicial = 1)`: mismo comportamiento que la versión de promesas, con `await`, `try`/`catch`/`finally` (el `finally` imprime `Flujo terminado`) y `console.error` en el `catch`; devuelve el tercer usuario o `null`.
- `flujoUsuariosParalelo()`: pide los usuarios 1, 2 y 3 a la vez con `Promise.all`, mide con `console.time`/`console.timeEnd` y devuelve el arreglo de los tres usuarios. Tarda cerca de una llamada, no de tres.

### Ejercicio 3.4 — Cliente de API con manejo de errores

1. Construye una función `listarUsuarios()` que consuma un endpoint público (por ejemplo, JSONPlaceholder `/users`) y muestre en pantalla el nombre y correo de cada usuario.
2. Agrega manejo de errores para: falla de red, código de estado distinto de 2xx, y JSON malformado.
3. Agrega un indicador de carga (por ejemplo, un mensaje 'Cargando...' en consola) que se muestre antes de la petición y se retire en el bloque `finally`.

- `listarUsuarios(urlBase = 'https://jsonplaceholder.typicode.com', ruta = '/users')` pide `${urlBase}${ruta}` con `fetch` y devuelve un arreglo de `{ nombre, correo }` (a partir de `name` y `email`), mostrando una línea por usuario con `console.log`.
- Antes de la petición muestra `Cargando...` y en el `finally` muestra `Carga terminada`, también cuando hay error.
- Lanza `ErrorRed` si `fetch` falla, `ErrorHTTP` (con `status`) si la respuesta no es 2xx y `ErrorJSON` si el cuerpo no es un JSON válido. Ojo: `fetch()` **no** rechaza la promesa ante un 404 o 500; hay que revisar `response.ok`.

### Justificación escrita

Responde en `EXPLICACION.md`, con tus palabras (al menos 80 palabras), por qué async/await mejora la legibilidad frente a callbacks y promesas.

## Cómo verificar

Necesitas Node.js 18+ y no hay que instalar nada ni tener internet: el verificador levanta un servidor HTTP de prueba propio. Desde esta carpeta:

```bash
node verificar.mjs
```

Cada comprobación sale como `ok` o `FALLA` con el motivo. El verificador prueba las tres versiones del flujo, `listarUsuarios` ante éxito, HTTP 500, JSON malformado y servidor caído, y revisa que cada bloque use la técnica que le corresponde. **No juzga la calidad de tus comentarios ni de tu justificación:** eso lo valora el instructor.

## Qué se evalúa

- Correcto encadenamiento con promesas y uso correcto de `await`.
- **Manejo robusto de errores**, distinguiendo red, HTTP y JSON.
- **Justificación escrita** de por qué async/await mejora la legibilidad, y las tres versiones del flujo comentadas en el mismo archivo.
- Que el verificador quede en verde y que el archivo deje ver su responsabilidad (`// Responsabilidad: ...`).

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
