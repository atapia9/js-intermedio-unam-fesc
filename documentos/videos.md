# Índice de videos de apoyo

Los 67 videos del [Anexo de videos de apoyo](Anexo_Videos_JS_Intermedio.pdf) del curso *JavaScript Intermedio* (REDEC-UNAM / FESC), organizados por día y por ficha. Cada video se marca como **Principal**, **Refuerzo** u otro tipo según el anexo; los marcados como *Opcional (inglés)* se pueden ver con subtítulos.

Todos están también en la [lista de reproducción del curso](https://www.youtube.com/playlist?list=PLBN8bJQ3f4w4).

Este índice se genera a partir de los README de los días con `npm run indice`; no lo edites a mano.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

| Día | Videos |
|---|---|
| [Día 1 — Fundamentos avanzados](#día-1--fundamentos-avanzados) | 13 |
| [Día 2 — POO y ES6+](#día-2--poo-y-es6) | 15 |
| [Día 3 — Programación asíncrona](#día-3--programación-asíncrona) | 15 |
| [Día 4 — DOM, eventos, Web Storage y formularios](#día-4--dom-eventos-web-storage-y-formularios) | 12 |
| [Día 5 — Testing, depuración y arquitectura](#día-5--testing-depuración-y-arquitectura) | 12 |
| **Total** | **67** |

Antes de cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso del README del día y responde la pregunta.

**Sobre los enlaces:** se verificaron el 23 de septiembre de 2026 y los 67 funcionan. Pueden cambiar o dejar de estar disponibles con el tiempo, como advierte el anexo; conviene revisarlos antes de cada edición del curso con `npm run verificar-videos`. El video «JavaScript asíncrono: síncrono vs. asíncrono» (ficha 3.1) no permite insertarse en otros sitios, pero se abre con normalidad en YouTube.

## Día 1 — Fundamentos avanzados

Sesión del 28 de septiembre de 2026. Detalle, casos de uso y preguntas en el [README del día](../dia-01-fundamentos/README.md).

### 1.1 · Call Stack y Event Loop

| Tipo | Video |
|---|---|
| Principal | [La pila de ejecución (Call Stack) – JS en Español](https://www.youtube.com/watch?v=ygA5U7Wgsg8) |
| Principal | [Entiende el Event Loop de JavaScript en 10 minutos](https://www.youtube.com/watch?v=XdzDDRF8_mY) |
| Refuerzo | [Qué es el Event Loop en JavaScript – paso a paso](https://www.youtube.com/watch?v=rvzItyLuh28) |
| Opcional (inglés) | [What the heck is the event loop anyway? – Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ) |

Se usa en: [Ejercicio 1](../dia-01-fundamentos/ejercicios/01-orden-ejecucion.js), [Actividad 1](../dia-01-fundamentos/ejercicios/04-actividad-1/README.md).

### 1.2 · Hoisting y Scope: `var`, `let`, `const`

| Tipo | Video |
|---|---|
| Principal | [VAR, LET o CONST: ¿cuál debería usar? – JS en Español](https://www.youtube.com/watch?v=bvkY9ey83yY) |
| Refuerzo | [Diferencia entre var, let y const – Curso JS desde cero #4](https://www.youtube.com/watch?v=a8SJJPvkGIE) |
| Opcional (inglés) | [Scope vs Closure vs Hoisting](https://www.youtube.com/watch?v=sDmn6p4lRHk) |

Se usa en: [Actividad 1](../dia-01-fundamentos/ejercicios/04-actividad-1/README.md).

### 1.3 · Closures

| Tipo | Video |
|---|---|
| Principal | [Closures en JavaScript: qué son y cómo funcionan](https://www.youtube.com/watch?v=xa8lhVwQBw4) |
| Casos reales | [3 ejemplos REALES de Closures en JavaScript](https://www.youtube.com/watch?v=ubS-ejTrSRc) |
| Refuerzo | [¿Qué son los Closures y por qué dan tanto miedo?](https://www.youtube.com/watch?v=bPZpjI2tzRo) |

Se usa en: [Ejercicio 2](../dia-01-fundamentos/ejercicios/02-contador-privado.js), [Actividad 1](../dia-01-fundamentos/ejercicios/04-actividad-1/README.md).

### 1.4 · `this`, `call`, `apply` y `bind`

| Tipo | Video |
|---|---|
| Principal | [This en JavaScript (bind, call, apply y más)](https://www.youtube.com/watch?v=bS71_W_BDFE) |
| Práctico | [¿Para qué sirve call(), bind() y apply()?](https://www.youtube.com/watch?v=OZ02GSH9QkY) |
| Refuerzo | [¿Cómo usar call, apply y bind? This a profundidad](https://www.youtube.com/watch?v=j1Zs_o32uo4) |

Se usa en: [Ejercicio 3](../dia-01-fundamentos/ejercicios/03-this-practico.js), [Actividad 1](../dia-01-fundamentos/ejercicios/04-actividad-1/README.md).

### Cierre: ¿cómo se conecta todo?

| Tipo | Video |
|---|---|

## Día 2 — POO y ES6+

Sesión del 29 de septiembre de 2026. Detalle, casos de uso y preguntas en el [README del día](../dia-02-poo-es6/README.md).

### 2.1 · Estructura moderna: template literals, arrow functions y parámetros por defecto

| Tipo | Video |
|---|---|
| Principal | [Curso de ES6 04 – Template literals o literales de texto](https://www.youtube.com/watch?v=Oi8MzxD0aGc) |
| Refuerzo | [Template strings en JavaScript (plantillas literales)](https://www.youtube.com/watch?v=1OUldGc5qNY) |
| Opcional (inglés) | [ES6+: Arrow Functions, Template Literals & Destructuring](https://www.youtube.com/watch?v=cfAg55yCmmQ) |

### 2.2 · Prototipos: el motor oculto

| Tipo | Video |
|---|---|
| Principal | [Herencia prototípica en JavaScript (POO)](https://www.youtube.com/watch?v=S_bDXnLnDs8) |
| Refuerzo | [Curso JavaScript: 23. Herencia prototípica – jonmircha](https://www.youtube.com/watch?v=1-m7xtwvH1E) |
| Profundidad | [Prototypes a profundidad – herencia prototípica](https://www.youtube.com/watch?v=KrzlS0_HQuQ) |

Se usa en: [Ejercicio 1](../dia-02-poo-es6/ejercicios/01-herencia-clases.js), [Actividad 2](../dia-02-poo-es6/ejercicios/04-actividad-2/README.md).

### 2.3 · Clases ES6: constructor, getters/setters, privados, `extends` y `super`

| Tipo | Video |
|---|---|
| Principal | [Las clases y sus métodos: constructor, getters y setters – JS desde cero #12](https://www.youtube.com/watch?v=M0FfjG4mhZg) |
| Herencia | [Herencia de clases: extends y super – JS desde cero #13](https://www.youtube.com/watch?v=-0p9MIqChK0) |
| Refuerzo | [Curso JavaScript: 25. Métodos estáticos, getters y setters – jonmircha](https://www.youtube.com/watch?v=TEzu31q9MVA) |

Se usa en: [Ejercicio 1](../dia-02-poo-es6/ejercicios/01-herencia-clases.js), [Actividad 2](../dia-02-poo-es6/ejercicios/04-actividad-2/README.md).

### 2.4 · Desestructuración, Spread y Rest

| Tipo | Video |
|---|---|
| Principal | [JavaScript moderno: Desestructuración y Operador Spread](https://www.youtube.com/watch?v=aBcYXgtlH4E) |
| Refuerzo | [Curso JavaScript Moderno (ES6) #16 – Destructuring](https://www.youtube.com/watch?v=PQinHHCFsVc) |
| Rest | [Desestructuración avanzada en JavaScript: parámetros Rest](https://www.youtube.com/watch?v=8OmDRKk1PSE) |

Se usa en: [Ejercicio 2](../dia-02-poo-es6/ejercicios/02-destructuring-practico.js), [Actividad 2](../dia-02-poo-es6/ejercicios/04-actividad-2/README.md).

### 2.5 · Módulos ESM: `import` / `export`

| Tipo | Video |
|---|---|
| Principal | [Import y Export en JavaScript (ES Modules) – Explicación](https://www.youtube.com/watch?v=0t-Le4kdaMg) |
| Refuerzo | [Javascript #14: Módulos (export, export default, import)](https://www.youtube.com/watch?v=ATBCZz7eWU0) |
| Refuerzo | [Curso JavaScript: 33. Módulos (import / export) – jonmircha](https://www.youtube.com/watch?v=0GEUyQXe3NI) |

Se usa en: [Ejercicio 3](../dia-02-poo-es6/ejercicios/03-modulos/monolito-original.txt), [Actividad 2](../dia-02-poo-es6/ejercicios/04-actividad-2/README.md).

### Cierre: ¿cómo se conecta todo?

| Tipo | Video |
|---|---|

## Día 3 — Programación asíncrona

Sesión del 30 de septiembre de 2026. Detalle, casos de uso y preguntas en el [README del día](../dia-03-asincronia/README.md).

### 3.1 · Operaciones no bloqueantes

| Tipo | Video |
|---|---|
| Principal | [¿Qué es código asíncrono y síncrono en JavaScript? (con ejemplos simples)](https://www.youtube.com/watch?v=Vt9MLvaG278) |
| Refuerzo | [¿Qué es la programación asíncrona en JavaScript? Explicación fácil](https://www.youtube.com/watch?v=Y4HYnHsOfvI) |
| Visual | [JavaScript asíncrono: síncrono vs. asíncrono – descripción gráfica](https://www.youtube.com/watch?v=UDk7QYO0ZpM) |

Se usa en: [Actividad 3](../dia-03-asincronia/ejercicios/04-actividad-3/README.md).

### 3.2 · Callbacks y Callback Hell

| Tipo | Video |
|---|---|
| Principal | [Asincronismo en JS: ¿qué es el Callback Hell? – JS desde cero #15](https://www.youtube.com/watch?v=iAq9SOEODvo) |
| Refuerzo | [Callbacks: ¿qué son y cómo utilizarlos? – Evitar callback hell](https://www.youtube.com/watch?v=WYVOvwTZ7Bo) |
| Refuerzo | [Qué es el antipatrón Callback Hell en JavaScript](https://www.youtube.com/watch?v=TcEjFk1cDzU) |

Se usa en: [Ejercicio 1](../dia-03-asincronia/ejercicios/01-refactor-callback-a-promesa.js), [Actividad 3](../dia-03-asincronia/ejercicios/04-actividad-3/README.md).

### 3.3 · Promesas: `then`, `catch`, `finally`, `Promise.all` y `race`

| Tipo | Video |
|---|---|
| Principal | [Promesas: new Promise, resolve, reject, then, catch](https://www.youtube.com/watch?v=W-HPYsmHG6U) |
| Refuerzo | [Cómo usar promesas en JavaScript – JS en Español](https://www.youtube.com/watch?v=urapbZL9knY) |
| Paralelo | [Promesas: métodos Promise.all y race en JavaScript](https://www.youtube.com/watch?v=-xhWDNm3XvY) |

Se usa en: [Ejercicio 1](../dia-03-asincronia/ejercicios/01-refactor-callback-a-promesa.js), [Ejercicio 2](../dia-03-asincronia/ejercicios/02-promise-all.js), [Actividad 3](../dia-03-asincronia/ejercicios/04-actividad-3/README.md).

### 3.4 · Async / Await y `try` / `catch`

| Tipo | Video |
|---|---|
| Principal | [Promesas y async-await: then y catch – JS desde cero #16](https://www.youtube.com/watch?v=ksg6SDwllDs) |
| Comparativo | [Callback, Promesas, Async Await y Try Catch | JavaScript](https://www.youtube.com/watch?v=p3Oq3AfuteA) |
| Refuerzo | [JavaScript asíncrono con Async Await](https://www.youtube.com/watch?v=za8Z6saKVdw) |

Se usa en: [Ejercicio 3](../dia-03-asincronia/ejercicios/03-consumir-api.js), [Actividad 3](../dia-03-asincronia/ejercicios/04-actividad-3/README.md).

### 3.5 · Fetch API y manejo de errores

| Tipo | Video |
|---|---|
| Principal | [Cómo consumir una API REST con Fetch + Promises con gestión de errores](https://www.youtube.com/watch?v=FJ-w0tf3d_w) |
| Errores | [Curso de JavaScript: API fetch – manejo de errores](https://www.youtube.com/watch?v=U0Qoq3hYPZA) |
| Refuerzo | [Javascript Fetch API: qué es y cómo consumir un API](https://www.youtube.com/watch?v=lkMq_qzCV_M) |

Se usa en: [Ejercicio 3](../dia-03-asincronia/ejercicios/03-consumir-api.js), [Actividad 3](../dia-03-asincronia/ejercicios/04-actividad-3/README.md).

### Cierre: ¿cómo se conecta todo?

| Tipo | Video |
|---|---|

## Día 4 — DOM, eventos, Web Storage y formularios

Sesión del 1 de octubre de 2026. Detalle, casos de uso y preguntas en el [README del día](../dia-04-dom-storage-forms/README.md).

### 4.1 · Interacción eficiente: `DocumentFragment`

| Tipo | Video |
|---|---|
| Principal | [DOM – Curso JavaScript Moderno #04: Fragment + createElement](https://www.youtube.com/watch?v=kUpx6ovPILc) |
| Breve | [DocumentFragment en JavaScript (short)](https://www.youtube.com/shorts/o21LBIEn8EA) |
| Opcional (inglés) | [What is reflow & repaint in the browser?](https://www.youtube.com/watch?v=PK4bzxWLOfo) |

Se usa en: [Ejercicio 1](../dia-04-dom-storage-forms/ejercicios/01-lista-tareas-fragment.html), [Actividad 4](../dia-04-dom-storage-forms/ejercicios/04-actividad-4/README.md).

### 4.2 · Propagación y delegación de eventos

| Tipo | Video |
|---|---|
| Principal | [Delegación de eventos en JavaScript con ejemplo práctico](https://www.youtube.com/watch?v=M48MZv60ZPs) |
| Bubbling | [¿Cómo funciona el Event Bubbling? – JavaScript DOM](https://www.youtube.com/watch?v=xlci1S08Cww) |
| Refuerzo | [¿Qué es y para qué sirve la delegación de eventos en JavaScript?](https://www.youtube.com/watch?v=5MUHJNSCeGU) |

Se usa en: [Ejercicio 2](../dia-04-dom-storage-forms/ejercicios/02-delegacion-practica.html), [Actividad 4](../dia-04-dom-storage-forms/ejercicios/04-actividad-4/README.md).

### 4.3 · Web Storage: `localStorage`, `sessionStorage` y JSON

| Tipo | Video |
|---|---|
| Principal | [LocalStorage y SessionStorage ¿cómo funcionan? – Curso JavaScript #48](https://www.youtube.com/watch?v=ZlpA2hez92Y) |
| JSON | [Guarda objetos y arrays en LocalStorage como un PRO (JSON explicado fácil)](https://www.youtube.com/watch?v=EZWY9EOzzG4) |
| Refuerzo | [API localStorage – guardar y recuperar objetos con formato JSON](https://www.youtube.com/watch?v=sL0RHt_QK3I) |

Se usa en: [Ejercicio 3](../dia-04-dom-storage-forms/ejercicios/03-persistir-preferencias.html), [Actividad 4](../dia-04-dom-storage-forms/ejercicios/04-actividad-4/README.md).

### 4.4 · Formularios: `preventDefault`, `FormData` y validación

| Tipo | Video |
|---|---|
| Principal | [FormData en JavaScript: cómo, cuándo y por qué usarlo](https://www.youtube.com/watch?v=HSj1CRba8tg) |
| preventDefault | [preventDefault en JavaScript: evitando el comportamiento por defecto](https://www.youtube.com/watch?v=i_7WLzT0oEY) |
| Validación | [Aprende a validar formularios con JavaScript y expresiones regulares](https://www.youtube.com/watch?v=s3pC93LgP18) |

Se usa en: [Actividad 4](../dia-04-dom-storage-forms/ejercicios/04-actividad-4/README.md).

### Cierre: ¿cómo se conecta todo?

| Tipo | Video |
|---|---|

## Día 5 — Testing, depuración y arquitectura

Sesión del 2 de octubre de 2026. Detalle, casos de uso y preguntas en el [README del día](../dia-05-testing-debug-patrones/README.md).

### 5.1 · Testing: la pirámide de pruebas

| Tipo | Video |
|---|---|
| Principal | [Aprende en 3 minutos: pruebas unitarias y pruebas de integración](https://www.youtube.com/watch?v=UwoCR0eJNgo) |
| Refuerzo | [Pruebas unitarias y de integración – Curso de Tester de Software](https://www.youtube.com/watch?v=4Ulc8FcmfnQ) |
| Opcional (inglés) | [Testing Pyramid – Unit Test, Integration Test and E2E Test](https://www.youtube.com/watch?v=VO0Qbl-wzOQ) |

Se usa en: [Ejercicio 1](../dia-05-testing-debug-patrones/ejercicios/01-pruebas-validaciones.test.js), [Actividad 5](../dia-05-testing-debug-patrones/ejercicios/04-actividad-5/README.md).

### 5.2 · Jest: `describe`, `test`, `expect` y matchers

| Tipo | Video |
|---|---|
| Principal | [Jest JS tutorial en español para principiantes – Curso de Testing](https://www.youtube.com/watch?v=tgWBQZNCOT0) |
| Refuerzo | [Introducción al Testing desde cero con Jest](https://www.youtube.com/watch?v=_DzBez4qMi0) |
| Buenas prácticas | [¿Cómo se escribe una buena prueba unitaria en JavaScript? 10 buenas prácticas](https://www.youtube.com/watch?v=Rqyg8kjpzX0) |

Se usa en: [Ejercicio 1](../dia-05-testing-debug-patrones/ejercicios/01-pruebas-validaciones.test.js), [Actividad 5](../dia-05-testing-debug-patrones/ejercicios/04-actividad-5/README.md).

### 5.3 · Depuración profesional con Chrome DevTools

| Tipo | Video |
|---|---|
| Principal | [Debugging como un profesional en JavaScript con DevTools del navegador – Programación en español](https://www.youtube.com/watch?v=ps1WhgelV_E) |
| Refuerzo | [Curso de JavaScript #10: Debug y DevTools](https://www.youtube.com/watch?v=Oz3InVBI_K4) |
| Refuerzo | [Depurar JavaScript con el navegador y con Visual Studio Code](https://www.youtube.com/watch?v=CRXMli2ZkS8) |

Se usa en: [Ejercicio 2](../dia-05-testing-debug-patrones/ejercicios/02-debug-bug.js), [Actividad 5](../dia-05-testing-debug-patrones/ejercicios/04-actividad-5/README.md).

### 5.4 · Patrones de diseño: Singleton y Módulo

| Tipo | Video |
|---|---|
| Singleton | [Patrón Singleton – Patrones de diseño – Programación en español](https://www.youtube.com/watch?v=YRLvJfItAT4) |
| Singleton | [#1 Singleton – Patrones de diseño con JavaScript](https://www.youtube.com/watch?v=OuKl1HwD1x8) |
| Módulo | [Patrón Module en JavaScript: ejemplo paso a paso](https://www.youtube.com/watch?v=uNBZ8ohLnxM) |

Se usa en: [Ejercicio 3](../dia-05-testing-debug-patrones/ejercicios/03-singleton-config.js), [Actividad 5](../dia-05-testing-debug-patrones/ejercicios/04-actividad-5/README.md).

### Cierre del curso: ¿cómo se conecta todo?

| Tipo | Video |
|---|---|
