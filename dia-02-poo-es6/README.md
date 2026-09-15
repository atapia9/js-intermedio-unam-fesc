# Día 2 — Prototipos, Clases ES6, Destructuring, Spread/Rest y Módulos

Esta sesión explora cómo JavaScript implementa la orientación a objetos a través de prototipos, y cómo la sintaxis de clases de ES6 ofrece una forma más clara de expresar herencia. También se cubre destructuring, spread/rest y módulos ESM.

## Agenda de la sesión

1. Dominio de la estructura moderna del lenguaje (ES6+)
2. Prototipos: herencia prototípica vs. herencia de clases
3. Clases en ES6
4. Desestructuración y Spread/Rest
5. Módulos (ESM): `import`/`export`

## 2.2 Prototipos

Cada objeto tiene una referencia interna (`[[Prototype]]`, accesible vía `Object.getPrototypeOf` o `__proto__`) a otro objeto del cual "hereda" propiedades y métodos. La sintaxis `class` no reemplaza este mecanismo: es una capa de sintaxis más clara sobre el mismo modelo prototípico.

Ver [`ejemplos/01-prototipos.js`](ejemplos/01-prototipos.js).

## 2.3 Clases en ES6

Constructores, métodos de instancia, métodos/propiedades estáticas, getters/setters, herencia con `extends`/`super`.

Ver [`ejemplos/02-clases.js`](ejemplos/02-clases.js).

## 2.4 Desestructuración y Spread/Rest

- **Desestructuración**: extraer valores en variables de forma declarativa (alias, valores por defecto).
- **Spread (`...`)**: expande elementos de un arreglo/objeto (clonar, combinar, pasar como argumentos).
- **Rest (`...`)**: agrupa el resto de elementos/argumentos en un solo arreglo u objeto.

Ver [`ejemplos/03-destructuring-spread-rest.js`](ejemplos/03-destructuring-spread-rest.js).

## 2.5 Módulos (ESM)

- `export` nombrado: varios por archivo, se importan entre `{}`.
- `export default`: uno solo por archivo, se importa sin llaves.
- En el navegador: `<script type="module">`.

Ver [`ejemplos/04-modulos/`](ejemplos/04-modulos/).

## Cierre de la sesión 2

Bajo la sintaxis `class` sigue habiendo prototipos. Destructuring y spread/rest son azúcar sintáctico indispensable para escribir JS moderno de forma legible. Los módulos ESM permiten organizar el código en archivos independientes con imports/exports explícitos.

## Ejercicios

1. [`ejercicios/01-herencia-clases.js`](ejercicios/01-herencia-clases.js) — modelar `Vehiculo` → `Auto`/`Motocicleta` con `extends`.
2. [`ejercicios/02-destructuring-practico.js`](ejercicios/02-destructuring-practico.js) — refactorizar código usando destructuring y spread/rest.
3. [`ejercicios/03-modulos/`](ejercicios/03-modulos/) — dividir un archivo monolítico en módulos ESM.
