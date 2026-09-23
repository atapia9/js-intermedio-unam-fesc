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

## Videos de apoyo

Recuerda: código moderno no significa más sintaxis, sino una intención más clara. Antes de ver cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso y responde la pregunta. Los videos marcados como opcional (inglés) se pueden ver con subtítulos. Fuente: [Anexo de videos de apoyo](../documentos/Anexo_Videos_JS_Intermedio.pdf) (sesión 2, 29 de septiembre de 2026).

### 2.1 · Estructura moderna: template literals, arrow functions y parámetros por defecto

*Idea clave:* ES6+ no es un JavaScript nuevo: es el mismo lenguaje, más expresivo.

| Tipo | Video |
|---|---|
| Principal | [Curso de ES6 04 – Template literals o literales de texto](https://www.youtube.com/watch?v=Oi8MzxD0aGc) |
| Refuerzo | [Template strings en JavaScript (plantillas literales)](https://www.youtube.com/watch?v=1OUldGc5qNY) |
| Opcional (inglés) | [ES6+: Arrow Functions, Template Literals & Destructuring](https://www.youtube.com/watch?v=cfAg55yCmmQ) |

*Caso de uso real:* un mensaje de ticket «Producto: Laptop · IVA: $2,960» en una sola línea legible, y un usuario nuevo que recibe el rol «invitado» si no se indica otro.  
*Pregunta para pensar:* ¿por qué una arrow function no es solo «una función más corta»? (Pista: `this`)

### 2.2 · Prototipos: el motor oculto

*Idea clave:* muchos objetos comparten comportamiento sin copiarlo: lo buscan en su prototipo.

| Tipo | Video |
|---|---|
| Principal | [Herencia prototípica en JavaScript (POO)](https://www.youtube.com/watch?v=S_bDXnLnDs8) |
| Refuerzo | [Curso JavaScript: 23. Herencia prototípica – jonmircha](https://www.youtube.com/watch?v=1-m7xtwvH1E) |
| Profundidad | [Prototypes a profundidad – herencia prototípica](https://www.youtube.com/watch?v=KrzlS0_HQuQ) |

*Caso de uso real:* 1,000 empleados comparten los métodos `calcularBono()` y `mostrarPerfil()` en un «catálogo común» en lugar de tener 1,000 copias.  
*Pregunta para pensar:* ¿dónde está definido `hacerSonido`: dentro de `Perro` o en `Animal.prototype`?

### 2.3 · Clases ES6: constructor, getters/setters, privados, `extends` y `super`

*Idea clave:* `class` es una fachada legible sobre los prototipos, no un modelo distinto.

| Tipo | Video |
|---|---|
| Principal | [Las clases y sus métodos: constructor, getters y setters – JS desde cero #12](https://www.youtube.com/watch?v=M0FfjG4mhZg) |
| Herencia | [Herencia de clases: extends y super – JS desde cero #13](https://www.youtube.com/watch?v=-0p9MIqChK0) |
| Refuerzo | [Curso JavaScript: 25. Métodos estáticos, getters y setters – jonmircha](https://www.youtube.com/watch?v=TEzu31q9MVA) |

*Caso de uso real:* un sistema de nómina donde el `#salario` es privado y nadie puede asignarle un valor negativo; `Gerente` y `Desarrollador` heredan de `Empleado`.  
*Pregunta para pensar:* ¿por qué `calcularNomina()` tiene sentido como método estático?

### 2.4 · Desestructuración, Spread y Rest

*Idea clave:* describe qué datos quieres, no cómo sacarlos paso a paso. Los tres puntos (`...`) expanden o agrupan según dónde estén.

| Tipo | Video |
|---|---|
| Principal | [JavaScript moderno: Desestructuración y Operador Spread](https://www.youtube.com/watch?v=aBcYXgtlH4E) |
| Refuerzo | [Curso JavaScript Moderno (ES6) #16 – Destructuring](https://www.youtube.com/watch?v=PQinHHCFsVc) |
| Rest | [Desestructuración avanzada en JavaScript: parámetros Rest](https://www.youtube.com/watch?v=8OmDRKk1PSE) |

*Caso de uso real:* limpiar la respuesta de una API: sacar nombre, ciudad y teléfono, y crear copias con `activo: true` sin alterar los datos originales.  
*Pregunta para pensar:* si copio un objeto con spread y cambio su dirección anidada, ¿se modifica también el original? ¿Por qué?

### 2.5 · Módulos ESM: `import` / `export`

*Idea clave:* cada archivo tiene una responsabilidad y solo expone lo que otros necesitan.

| Tipo | Video |
|---|---|
| Principal | [Import y Export en JavaScript (ES Modules) – Explicación](https://www.youtube.com/watch?v=0t-Le4kdaMg) |
| Refuerzo | [Javascript #14: Módulos (export, export default, import)](https://www.youtube.com/watch?v=ATBCZz7eWU0) |
| Refuerzo | [Curso JavaScript: 33. Módulos (import / export) – jonmircha](https://www.youtube.com/watch?v=0GEUyQXe3NI) |

*Caso de uso real:* dividir una tienda en línea en `productos.js`, `carrito.js` y `app.js`: si falla el cálculo del total, sabes exactamente dónde buscar.  
*Pregunta para pensar:* ¿cuándo importas con llaves `{ }` y cuándo sin ellas?

### Cierre: ¿cómo se conecta todo?

Prototipos (el motor) → Clases (el modelo) → Desestructuración / Spread / Rest (los datos) → Módulos (la arquitectura). La Sesión 2 no reemplaza la Sesión 1: usa `this`, scope y closures.

**Actividad 2:** en un mismo repositorio, entrega la jerarquía Empleado / Gerente / Desarrollador (ejercicio 2.2) y el carrito dividido en módulos (ejercicio 2.4), con una estructura de carpetas clara. Se evalúa si cada archivo deja ver qué responsabilidad tiene, no solo si el código corre. Enunciado, esqueleto y verificador en [`ejercicios/04-actividad-2`](ejercicios/04-actividad-2/README.md).

## Ejercicios

1. [`ejercicios/01-herencia-clases.js`](ejercicios/01-herencia-clases.js) — modelar `Vehiculo` → `Auto`/`Motocicleta` con `extends`.
   - Video: [Herencia prototípica en JavaScript (POO)](https://www.youtube.com/watch?v=S_bDXnLnDs8)
   - Video: [Curso JavaScript: 23. Herencia prototípica – jonmircha](https://www.youtube.com/watch?v=1-m7xtwvH1E)
   - Video: [Prototypes a profundidad – herencia prototípica](https://www.youtube.com/watch?v=KrzlS0_HQuQ)
   - Video: [Las clases y sus métodos: constructor, getters y setters – JS desde cero #12](https://www.youtube.com/watch?v=M0FfjG4mhZg)
   - Video: [Herencia de clases: extends y super – JS desde cero #13](https://www.youtube.com/watch?v=-0p9MIqChK0)
   - Video: [Curso JavaScript: 25. Métodos estáticos, getters y setters – jonmircha](https://www.youtube.com/watch?v=TEzu31q9MVA)
2. [`ejercicios/02-destructuring-practico.js`](ejercicios/02-destructuring-practico.js) — refactorizar código usando destructuring y spread/rest.
   - Video: [JavaScript moderno: Desestructuración y Operador Spread](https://www.youtube.com/watch?v=aBcYXgtlH4E)
   - Video: [Curso JavaScript Moderno (ES6) #16 – Destructuring](https://www.youtube.com/watch?v=PQinHHCFsVc)
   - Video: [Desestructuración avanzada en JavaScript: parámetros Rest](https://www.youtube.com/watch?v=8OmDRKk1PSE)
3. [`ejercicios/03-modulos/`](ejercicios/03-modulos/) — dividir un archivo monolítico en módulos ESM.
   - Video: [Import y Export en JavaScript (ES Modules) – Explicación](https://www.youtube.com/watch?v=0t-Le4kdaMg)
   - Video: [Javascript #14: Módulos (export, export default, import)](https://www.youtube.com/watch?v=ATBCZz7eWU0)
   - Video: [Curso JavaScript: 33. Módulos (import / export) – jonmircha](https://www.youtube.com/watch?v=0GEUyQXe3NI)
4. [`ejercicios/04-actividad-2/`](ejercicios/04-actividad-2/README.md) — **Actividad 2 (evaluable):** jerarquía Empleado / Gerente / Desarrollador y tienda dividida en módulos, con verificador local (`node verificar.mjs`).
   - Video: [Herencia prototípica en JavaScript (POO)](https://www.youtube.com/watch?v=S_bDXnLnDs8)
   - Video: [Curso JavaScript: 23. Herencia prototípica – jonmircha](https://www.youtube.com/watch?v=1-m7xtwvH1E)
   - Video: [Prototypes a profundidad – herencia prototípica](https://www.youtube.com/watch?v=KrzlS0_HQuQ)
   - Video: [Las clases y sus métodos: constructor, getters y setters – JS desde cero #12](https://www.youtube.com/watch?v=M0FfjG4mhZg)
   - Video: [Herencia de clases: extends y super – JS desde cero #13](https://www.youtube.com/watch?v=-0p9MIqChK0)
   - Video: [Curso JavaScript: 25. Métodos estáticos, getters y setters – jonmircha](https://www.youtube.com/watch?v=TEzu31q9MVA)
   - Video: [JavaScript moderno: Desestructuración y Operador Spread](https://www.youtube.com/watch?v=aBcYXgtlH4E)
   - Video: [Curso JavaScript Moderno (ES6) #16 – Destructuring](https://www.youtube.com/watch?v=PQinHHCFsVc)
   - Video: [Desestructuración avanzada en JavaScript: parámetros Rest](https://www.youtube.com/watch?v=8OmDRKk1PSE)
   - Video: [Import y Export en JavaScript (ES Modules) – Explicación](https://www.youtube.com/watch?v=0t-Le4kdaMg)
   - Video: [Javascript #14: Módulos (export, export default, import)](https://www.youtube.com/watch?v=ATBCZz7eWU0)
   - Video: [Curso JavaScript: 33. Módulos (import / export) – jonmircha](https://www.youtube.com/watch?v=0GEUyQXe3NI)

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/Registro.js`](../proyecto-integrador/src/nucleo/Registro.js) (clase base ES6) y en [`proyecto-integrador/src/variantes/a-incidentes/Incidente.js`](../proyecto-integrador/src/variantes/a-incidentes/Incidente.js), que la extiende con los campos y transiciones de estado de un incidente.
