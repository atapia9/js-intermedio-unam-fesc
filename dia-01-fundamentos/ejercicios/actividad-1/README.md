# Actividad de aprendizaje 1 (evaluable) — Solución de los ejercicios 1.1 a 1.4

Consigna del [manual del curso](../../README.md), Sesión 1:

> **Entrega individual:** archivo `.js` con la solución de los ejercicios 1.1 a 1.4, comentando en cada bloque el concepto aplicado.
> **Formato de entrega:** repositorio o carpeta compartida indicada por el instructor, antes del inicio de la sesión 2.

La Sesión 2 es el 29 de septiembre de 2026. El [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf) precisa qué debe tener el comentario de cada bloque: **qué hace, por qué funciona y qué concepto demuestra**. No buscamos solo código que funcione, sino código que podamos explicar.

Esta actividad se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

## Qué debes entregar

```
actividad-1/
├── actividad1.js   TU código: un solo archivo con los cuatro bloques (es lo que completas)
├── verificar.mjs   comprobación local del contrato
└── package.json    marca la carpeta como módulos ES; no lo cambies
```

En cada bloque escribe, con tus palabras, estas tres líneas de comentario, además de las explicaciones propias de cada ejercicio (abajo):

```js
// Qué hace: ...
// Por qué funciona: ...
// Concepto: ...
```

Pueden ocupar varias líneas (las siguientes también empiezan con `//`). La primera línea del archivo es `// Responsabilidad: ...` con una frase real.

El archivo ya trae los fragmentos que el manual dice que "se entregan" (`crearManejadoresLegado`, `crearContador` e `iniciarLegado`): **no los modifiques**.

## Ejercicios y contrato de cada bloque

### Ejercicio 1.1 — Predicción de salida

1. Sin ejecutar el código, escribe el orden exacto en que se imprimirán 5 líneas que combinen `console.log` directos, un `setTimeout` y dos promesas encadenadas.
2. Ejecútalo y compara tu predicción contra el resultado real; anota las diferencias.
3. Modifica el ejemplo agregando un segundo `setTimeout` con delay de 100 ms y explica en qué momento entra a la Call Stack.

- `ejercicio11()` devuelve una `Promise` que se resuelve cuando terminó de imprimir. Imprime **5 líneas** con `console.log`: dos directas, una de un `setTimeout` de 0 ms y dos de promesas encadenadas (`.then().then()`). **Cada línea empieza con** `sincrono`, `promesa` o `timeout` según su origen (puedes agregar numeración o texto después). El verificador comprueba el orden real: `sincrono`, `sincrono`, `promesa`, `promesa`, `timeout`.
- `ejercicio11Modificado()` hace lo mismo y agrega un segundo `setTimeout` de **100 ms**: imprime 6 líneas, la última con `timeout` y unos 100 ms después de la anterior.
- Comentarios propios: `// Predicción:`, `// Diferencias con lo real:` (puede ser "ninguna") y `// Cuándo entra a la Call Stack el setTimeout de 100 ms:`.

### Ejercicio 1.2 — Refactor de `var` a `let/const`

1. Se entrega un fragmento de código legado que usa `var` en un ciclo `for` y produce un bug clásico de closures (todos los botones muestran el mismo índice).
2. Identifica la causa del bug relacionándola con el scope de función de `var`.
3. Corrige el código sustituyendo `var` por `let` y explica por qué basta ese cambio.
4. Reescribe el fragmento usando `const` donde sea posible y justifica cada elección.

- `crearManejadoresLegado(n)` es el código legado que se entrega: devuelve `n` funciones que devuelven todas `n`. No lo modifiques.
- `crearManejadoresConLet(n)` devuelve `n` funciones; la `i`-ésima devuelve `i`. Usa `let` y no `var`.
- `crearManejadoresConConst(n)` hace lo mismo usando `const` donde sea posible (`let` solo donde haya reasignación), sin `var`.
- Comentarios propios: `// Causa del bug:`, `// Por qué basta con cambiar a let:` y `// Justificación de const:`.

### Ejercicio 1.3 — Módulo con estado privado

1. Construye una función `crearCuentaBancaria(saldoInicial)` que devuelva un objeto con los métodos `depositar(monto)`, `retirar(monto)` y `consultarSaldo()`, sin exponer la variable `saldo` directamente.
2. Agrega validación: retirar no debe permitir saldo negativo; debe registrar un mensaje de error controlado.
3. Crea dos cuentas distintas y demuestra que sus saldos son completamente independientes entre sí.

- El objeto tiene **exactamente** esas tres funciones; el saldo vive en un closure (sin `class` ni `this`). Sin `saldoInicial`, la cuenta empieza en 0.
- `depositar(monto)` y `retirar(monto)` devuelven `true` si lo lograron. Con un monto inválido (0, negativo, `NaN`) o, en `retirar`, mayor que el saldo, **no lanzan excepción**: registran un mensaje con `console.error`, devuelven `false` y el saldo no cambia.
- Demuestra las dos cuentas independientes con código en el propio bloque (al menos dos llamadas a `crearCuentaBancaria`).

### Ejercicio 1.4 — Corrección de contexto perdido

1. Se entrega un objeto contador con un método `incrementar` que se pasa como callback a `setInterval` y "pierde" su `this`, provocando `NaN` en pantalla.
2. Diagnostica por qué `this` deja de apuntar al objeto contador al usarse como callback.
3. Corrige el problema de dos formas distintas: usando `bind()` y usando una arrow function; compara ambas soluciones.

- `crearContador()` e `iniciarLegado(pasos, ms)` se entregan: el segundo reproduce el error y su "pantalla" (`contador.pantalla`) queda en `[NaN, NaN, NaN]`.
- `iniciarConBind(pasos, ms)` e `iniciarConFlecha(pasos, ms)` devuelven una `Promise` que se resuelve con `contador.pantalla` cuando se hicieron `pasos` incrementos: `[1, 2, 3, ...]`. Deben **detener el intervalo** con `clearInterval`. Una usa `bind()` y la otra una arrow function.
- Comentarios propios: `// Diagnóstico:` y `// Comparación entre bind y arrow function:`.

## Cómo verificar

Necesitas Node.js 18+ y no hay que instalar nada. Desde esta carpeta:

```bash
node verificar.mjs
```

Cada comprobación sale como `ok` o `FALLA` con el motivo. El verificador prueba el comportamiento de tus funciones (capturando lo que imprimen), revisa que cada bloque use la técnica que le corresponde y que hayas escrito todas las explicaciones. **No juzga si tus explicaciones son correctas o claras:** eso lo valora el instructor.

## Qué se evalúa

- Que el verificador quede en verde (los cuatro ejercicios cumplen el contrato).
- **Que expliques tu código:** las tres líneas de cada bloque y las propias de cada ejercicio, con tus palabras y con criterio.
- Que el archivo deje ver su responsabilidad (`// Responsabilidad: ...` en la primera línea).
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
