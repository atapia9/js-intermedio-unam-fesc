# Actividad 2 — Empleados y tienda por módulos

Actividad de la Sesión 2 (según el [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf)):

> En un mismo repositorio, entrega la jerarquía **Empleado / Gerente / Desarrollador** y el **carrito dividido en módulos**, con una estructura de carpetas clara. Se evalúa si cada archivo deja ver qué responsabilidad tiene, no solo si el código corre.

Esta actividad se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

## Qué debes entregar

Completa los archivos de esta carpeta (o entrega tu propia estructura equivalente, siempre que `verificar.mjs` siga aplicándose):

```
04-actividad-2/
├── empleados/
│   ├── Empleado.js        clase base
│   ├── Gerente.js         extends Empleado
│   └── Desarrollador.js   extends Empleado
├── tienda/
│   ├── productos.js       catálogo y búsqueda
│   ├── carrito.js         lógica del carrito
│   └── app.js             une los módulos e imprime el ticket
└── verificar.mjs          comprobación local del contrato
```

### Parte 1 — Jerarquía de empleados (fichas 2.2 y 2.3)

Casos de uso del anexo: 1,000 empleados comparten `calcularBono()` y `mostrarPerfil()` en lugar de tener 1,000 copias; el `#salario` es privado y nadie puede asignarle un valor negativo; `Gerente` y `Desarrollador` heredan de `Empleado`.

- `Empleado`: campo privado `#salario` con getter/setter `salario` (`RangeError` si es negativo, también en el constructor), `calcularBono()` (10 %), `mostrarPerfil()` y el método **estático** `calcularNomina(lista)` (suma de salario + bono).
- `Gerente`: usa `super`, guarda su equipo, bono del 20 % y un perfil que dice cuántas personas tiene a cargo.
- `Desarrollador`: usa `super`, guarda sus lenguajes, bono del 15 % y un perfil que los menciona.

Pregunta para pensar: ¿por qué `calcularNomina()` tiene sentido como método estático?

### Parte 2 — Tienda dividida en módulos (fichas 2.4 y 2.5)

Caso de uso del anexo: dividir una tienda en línea en `productos.js`, `carrito.js` y `app.js`, de modo que si falla el cálculo del total sepas exactamente dónde buscar.

- `productos.js`: exports **nombrados** `productos` y `buscarProducto(id)`.
- `carrito.js`: `export default class Carrito` con `agregar`, `quitar`, `total` y un getter `items` que devuelve una **copia** (usa spread; ficha 2.4).
- `app.js`: importa ambos módulos, arma un carrito e imprime un ticket con template literals: subtotal, línea `IVA` (16 %) y línea `Total`.

Pregunta para pensar: ¿cuándo importas con llaves `{ }` y cuándo sin ellas?

## Cómo verificar

Desde esta carpeta (Node.js 18+):

```bash
node verificar.mjs
```

Cada comprobación aparece como `ok` o `FALLA` con el motivo. Al final hay unas *sugerencias* (spread, desestructuración, template literals) que no cambian el resultado. El verificador confirma el contrato; la revisión del instructor valora también el diseño.

## Qué se evalúa

- Que el código funcione (el verificador en verde).
- **Que cada archivo deje ver qué responsabilidad tiene:** la primera línea de cada archivo es `// Responsabilidad: ...` con una frase real (no el `TODO` inicial), y los nombres y la estructura de carpetas cuentan la misma historia.
- El uso adecuado de lo visto en la sesión: prototipos compartidos, clases con `extends`/`super`, campos privados, desestructuración, spread/rest y módulos ESM.

## Videos de apoyo

- [Herencia prototípica en JavaScript (POO)](https://www.youtube.com/watch?v=S_bDXnLnDs8)
- [Curso JavaScript: 23. Herencia prototípica – jonmircha](https://www.youtube.com/watch?v=1-m7xtwvH1E)
- [Prototypes a profundidad – herencia prototípica](https://www.youtube.com/watch?v=KrzlS0_HQuQ)
- [Las clases y sus métodos: constructor, getters y setters – JS desde cero #12](https://www.youtube.com/watch?v=M0FfjG4mhZg)
- [Herencia de clases: extends y super – JS desde cero #13](https://www.youtube.com/watch?v=-0p9MIqChK0)
- [Curso JavaScript: 25. Métodos estáticos, getters y setters – jonmircha](https://www.youtube.com/watch?v=TEzu31q9MVA)
- [JavaScript moderno: Desestructuración y Operador Spread](https://www.youtube.com/watch?v=aBcYXgtlH4E)
- [Curso JavaScript Moderno (ES6) #16 – Destructuring](https://www.youtube.com/watch?v=PQinHHCFsVc)
- [Desestructuración avanzada en JavaScript: parámetros Rest](https://www.youtube.com/watch?v=8OmDRKk1PSE)
- [Import y Export en JavaScript (ES Modules) – Explicación](https://www.youtube.com/watch?v=0t-Le4kdaMg)
- [Javascript #14: Módulos (export, export default, import)](https://www.youtube.com/watch?v=ATBCZz7eWU0)
- [Curso JavaScript: 33. Módulos (import / export) – jonmircha](https://www.youtube.com/watch?v=0GEUyQXe3NI)

## Nota de divulgación

Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
