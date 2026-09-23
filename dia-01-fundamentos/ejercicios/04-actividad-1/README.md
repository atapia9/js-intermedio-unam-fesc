# Actividad 1 — Fundamentos avanzados (bloques 1.1 a 1.4)

Actividad de la Sesión 1 (según el [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf)):

> Entrega un archivo `.js` con los ejercicios 1.1 a 1.4. Cada bloque debe incluir comentarios que expliquen qué hace, por qué funciona y qué concepto demuestra. Entrégalo antes de la Sesión 2.

La Sesión 2 es el 29 de septiembre de 2026. Esta actividad se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

Recuerda la consigna de la sesión: no buscamos solo código que funcione, sino código que podamos explicar.

## Qué debes entregar

```
04-actividad-1/
├── actividad1.js   TU código: un solo archivo con los cuatro bloques (es lo que completas)
├── verificar.mjs   comprobación local del contrato
└── package.json    marca la carpeta como módulos ES; no lo cambies
```

En cada bloque escribe, con tus palabras, tres líneas de comentario:

```js
// Qué hace: ...
// Por qué funciona: ...
// Concepto: ...
```

Pueden ocupar varias líneas (las siguientes también deben empezar con `//`). La primera línea del archivo es `// Responsabilidad: ...` con una frase real, igual que en las demás actividades.

## Contrato de cada bloque

El archivo es un módulo ES: exporta las funciones con `export`. Como los módulos son estrictos, una función suelta tiene `this` indefinido.

### Bloque 1.1 — Call Stack y Event Loop

`ordenDeEjecucion()` devuelve una `Promise` que se resuelve con un arreglo con el **orden real** en que ocurren cuatro eventos. Dentro de la función, en este orden de escritura:

1. registra `'sincrono-1'`;
2. agenda un `setTimeout` de 0 ms que registra `'macrotarea'` y resuelve la promesa con el arreglo;
3. agenda una promesa con `.then` que registra `'microtarea'`;
4. registra `'sincrono-2'`.

Resultado esperado: `['sincrono-1', 'sincrono-2', 'microtarea', 'macrotarea']`. Pregunta para pensar: ¿por qué `setTimeout(fn, 0)` no se ejecuta «inmediatamente»?

### Bloque 1.2 — Hoisting y Scope

- `botonesConVar(nombres)`: devuelve un arreglo de funciones, una por nombre. Usa un ciclo `for` con `var` y, **dentro del ciclo**, declara `var nombre = nombres[i]` y guarda una función que devuelve `nombre`. Reproduce el error clásico: todas devuelven el **último** nombre.
- `botonesConLet(nombres)`: igual, pero con `let` o `const`: cada función devuelve **su propio** nombre.
- `demostrarHoisting()`: devuelve `{ conVar, conLet }`, donde `conVar` es el valor de una variable `var` leída **antes** de declararla (`undefined`) y `conLet` es el **nombre del error** que lanza leer una variable `let` antes de declararla (`'ReferenceError'`), capturado con `try/catch`.

Pregunta para pensar: ¿por qué cambiar `var` por `let` en el ciclo corrige el error?

### Bloque 1.3 — Closures

`crearCuenta(saldoInicial = 0)` devuelve un objeto con exactamente tres funciones:

| Función | Qué hace |
|---|---|
| `depositar(n)` | suma `n` al saldo y devuelve el saldo nuevo; si `n` no es un número mayor que 0 lanza `RangeError` |
| `retirar(n)` | resta `n` y devuelve el saldo nuevo; si `n` no es válido o es mayor que el saldo, lanza un error y **no cambia el saldo** |
| `saldo()` | devuelve el saldo actual |

El saldo debe ser **privado**: vive en un closure, no como propiedad del objeto, y este bloque no usa `class` ni `this`. Pregunta para pensar: ¿por qué la cuenta de Ana y la de Luis no comparten saldo?

### Bloque 1.4 — `this`, `call`, `apply` y `bind`

- `crearTemporizador()` devuelve un objeto con:
  - `segundos`, que empieza en `0`;
  - `tic()`: método que incrementa `this.segundos` y devuelve el valor nuevo (debe usar `this`);
  - `iniciar(pasos, ms)`: usa `setInterval` cada `ms` milisegundos, llama a `tic()` **conservando `this`** (con `bind` o una arrow function) y, al llegar a `pasos`, detiene el intervalo con `clearInterval` y resuelve una `Promise` con `segundos`.
- `demostrarThis()` devuelve `{ suelto, conBind, conFlecha }`:
  - `suelto`: el **nombre del error** al llamar a `tic` sacado del objeto (`const f = t.tic; f()`), es decir `'TypeError'`;
  - `conBind`: el resultado de `tic.bind(t)()` en un temporizador nuevo (`1`);
  - `conFlecha`: el resultado de `(() => t.tic())()` en otro temporizador nuevo (`1`).

Pregunta para pensar: ¿cuándo usarías `bind` y cuándo una arrow function para conservar el contexto?

## Cómo verificar

Necesitas Node.js 18+ y no hay que instalar nada. Desde esta carpeta:

```bash
node verificar.mjs
```

Cada comprobación sale como `ok` o `FALLA` con el motivo. El verificador prueba el comportamiento de tus funciones, revisa que cada bloque use la técnica que le corresponde (por ejemplo, `setTimeout` y una microtarea en el 1.1, `var` y `let` en el 1.2, ni `class` ni `this` en el 1.3, `clearInterval` en el 1.4) y que hayas escrito las tres explicaciones de cada bloque. **No juzga si tus explicaciones son correctas o claras:** eso lo valora el instructor.

## Qué se evalúa

- Que el verificador quede en verde (las cuatro funciones cumplen el contrato).
- **Que expliques tu código:** las tres líneas «Qué hace», «Por qué funciona» y «Concepto» de cada bloque, con tus palabras y con criterio.
- Que cada archivo deje ver su responsabilidad (`// Responsabilidad: ...` en la primera línea).
- Entrega **antes de la Sesión 2** (29 de septiembre de 2026).

## Videos de apoyo

- [La pila de ejecución (Call Stack) – JS en Español](https://www.youtube.com/watch?v=ygA5U7Wgsg8)
- [Entiende el Event Loop de JavaScript en 10 minutos](https://www.youtube.com/watch?v=XdzDDRF8_mY)
- [Qué es el Event Loop en JavaScript – paso a paso](https://www.youtube.com/watch?v=rvzItyLuh28)
- [VAR, LET o CONST: ¿cuál debería usar? – JS en Español](https://www.youtube.com/watch?v=bvkY9ey83yY)
- [Diferencia entre var, let y const – Curso JS desde cero #4](https://www.youtube.com/watch?v=a8SJJPvkGIE)
- [Closures en JavaScript: qué son y cómo funcionan](https://www.youtube.com/watch?v=xa8lhVwQBw4)
- [3 ejemplos REALES de Closures en JavaScript](https://www.youtube.com/watch?v=ubS-ejTrSRc)
- [¿Qué son los Closures y por qué dan tanto miedo?](https://www.youtube.com/watch?v=bPZpjI2tzRo)
- [This en JavaScript (bind, call, apply y más)](https://www.youtube.com/watch?v=bS71_W_BDFE)
- [¿Para qué sirve call(), bind() y apply()?](https://www.youtube.com/watch?v=OZ02GSH9QkY)
- [¿Cómo usar call, apply y bind? This a profundidad](https://www.youtube.com/watch?v=j1Zs_o32uo4)

## Nota de divulgación

Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
