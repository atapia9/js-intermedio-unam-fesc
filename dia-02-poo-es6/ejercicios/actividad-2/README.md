# Actividad de aprendizaje 2 (evaluable) — Jerarquía de clases y carrito modularizado

Consigna del [manual del curso](../../README.md), Sesión 2:

> **Entrega individual:** proyecto de la jerarquía de clases (ejercicio 2.2) más el carrito modularizado (ejercicio 2.4), en un mismo repositorio con estructura de carpetas clara.
> **Se evaluará:** uso correcto de clases y campos privados, aplicación de desestructuración/spread, y organización en módulos ESM.

El [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf) agrega: *se evalúa si cada archivo deja ver qué responsabilidad tiene, no solo si el código corre.*

Esta actividad se evalúa, por eso el repositorio incluye el esqueleto y un verificador, pero **no una solución**.

## Qué debes entregar

```
actividad-2/
├── empleados/
│   ├── Empleado.js        clase base
│   ├── Gerente.js         extends Empleado
│   └── Desarrollador.js   extends Empleado
├── tienda/
│   ├── productos.js       catálogo
│   ├── carrito.js         funciones del carrito
│   └── app.js             une los módulos y muestra la demostración
└── verificar.mjs          comprobación local del contrato
```

La primera línea de cada archivo es `// Responsabilidad: ...` con una frase real (no el `TODO` inicial): que cada archivo deje ver qué responsabilidad tiene.

## Ejercicio 2.2 — Jerarquía de clases

1. Diseña una clase base `Empleado` con `nombre`, `puesto` y un campo privado `#salario`, con getter/setter validado (el salario no puede ser negativo).
2. Crea dos clases derivadas, `Gerente` y `Desarrollador`, cada una con al menos un atributo o método propio (por ejemplo, `equipoACargo` o `lenguajesDominados`).
3. Agrega un método estático en `Empleado` que reciba un arreglo de empleados y calcule la nómina total usando `reduce`.

Contrato para poder comprobarlo (los nombres de los atributos propios son los del ejemplo del manual):

- `new Empleado(nombre, puesto, salario)`. Un salario negativo lanza `Error`, tanto en el constructor como en el setter, y el valor no cambia.
- `new Gerente(nombre, puesto, salario, equipoACargo = [])` y `new Desarrollador(nombre, puesto, salario, lenguajesDominados = [])` extienden a `Empleado` (con `super`) y guardan su atributo propio.
- `Empleado.calcularNomina(empleados)` devuelve la **suma de los salarios** del arreglo (0 si está vacío), calculada con `reduce`.

## Ejercicio 2.4 — Modularización de un carrito de compras

1. Divide un archivo monolítico de carrito de compras en tres módulos: `productos.js`, `carrito.js` y `app.js`.
2. `productos.js` exporta un arreglo de productos (export nombrado); `carrito.js` exporta funciones `agregarProducto`, `eliminarProducto` y `calcularTotal`.
3. `app.js` importa ambos módulos y arma una demostración funcional en consola.

El manual no fija las firmas de las funciones. Para poder comprobarlas, y para que en el ejercicio 5.1 puedas escribir pruebas unitarias sobre ellas, **el carrito es un arreglo de `{ ...producto, cantidad }` que las funciones reciben y no modifican: devuelven uno nuevo**.

| Módulo | Qué exporta |
|---|---|
| `productos.js` | `productos` (export nombrado): al menos 3 objetos `{ id, nombre, precio }` con `precio` numérico mayor que 0 |
| `carrito.js` | `agregarProducto(carrito, producto, cantidad = 1)`: carrito nuevo; si el producto ya estaba, suma las cantidades; `RangeError` si la cantidad no es un entero mayor que 0 |
| | `eliminarProducto(carrito, id)`: carrito nuevo sin ese producto; si no existía, devuelve un carrito igual, sin error |
| | `calcularTotal(carrito)`: suma de `precio * cantidad` (0 con el carrito vacío) |
| `app.js` | no exporta: al ejecutarlo (`node tienda/app.js`) importa los dos módulos y muestra una demostración con el total |

## Cómo verificar

Necesitas Node.js 18+ y no hay que instalar nada. Desde esta carpeta:

```bash
node verificar.mjs
```

Cada comprobación sale como `ok` o `FALLA` con el motivo. Al final hay *sugerencias* (spread, desestructuración, template literals) que no cambian el resultado. El verificador confirma el contrato; la revisión del instructor valora también el diseño.

## Qué se evalúa

- Uso correcto de **clases y campos privados** (`#salario`, `extends`/`super`, getter y setter, método estático).
- Aplicación de **desestructuración y spread** (por ejemplo, al copiar el carrito sin modificarlo).
- **Organización en módulos ESM** y estructura de carpetas clara: que cada archivo deje ver qué responsabilidad tiene.
- Que el verificador quede en verde.

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
