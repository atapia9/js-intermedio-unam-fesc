# Día 2 — Tema 2: Programación Orientada a Objetos y ES6+

**Martes 29 de septiembre de 2026 · 09:00 a 13:00 hrs. · 4 horas**

En esta sesión se explora cómo JavaScript implementa la orientación a objetos a través de prototipos, y cómo la sintaxis de clases introducida en ES6 ofrece una forma más clara y familiar de expresar herencia. También se cubren herramientas modernas de manipulación de datos: desestructuración, spread/rest y el sistema de módulos ESM.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Agenda de la sesión

| Horario | Actividad | Duración |
|---|---|---|
| 09:00 – 09:15 | Repaso rápido de la sesión 1 (preguntas y dudas) | 15 min |
| 09:15 – 09:40 | 2.1 Estructura moderna del lenguaje | 25 min |
| 09:40 – 10:30 | 2.2 Prototipos: herencia prototípica vs. clases | 50 min |
| 10:30 – 10:40 | Receso | 10 min |
| 10:40 – 11:40 | 2.3 Clases en ES6: constructores, métodos, getters/setters | 60 min |
| 11:40 – 12:20 | 2.4 Desestructuración y Spread/Rest | 40 min |
| 12:20 – 12:50 | 2.5 Módulos ESM: import/export | 30 min |
| 12:50 – 13:00 | Cierre y asignación de práctica | 10 min |

## 2.1 Dominio de la estructura moderna del lenguaje

JavaScript moderno (ES6 en adelante, también llamado ES2015+) introdujo azúcar sintáctico y capacidades nuevas que hoy son estándar en cualquier código profesional: let/const, arrow functions, template literals, clases, módulos, desestructuración, spread/rest, Promesas y más. Dominar esta 'caja de herramientas' es indispensable para leer y escribir JavaScript contemporáneo con fluidez.

```js
// Template literals
const nombre = 'Luis';
const saludo = `Hola, ${nombre}. Hoy es ${new Date().toLocaleDateString()}`;

// Arrow functions con retorno implícito
const doble = (n) => n * 2;

// Parámetros por defecto
function crearUsuario(nombre, rol = 'invitado') { return { nombre, rol }; }
```

Ejemplo ejecutable: [`ejemplos/2.1-estructura-moderna.js`](ejemplos/2.1-estructura-moderna.js).

## 2.2 Prototipos: herencia prototípica vs. herencia de clases

Internamente, JavaScript siempre ha usado un modelo de herencia basado en prototipos: cada objeto tiene una referencia interna ([[Prototype]], accesible vía Object.getPrototypeOf u __proto__) a otro objeto del cual 'hereda' propiedades y métodos.

```js
function Animal(nombre) {
  this.nombre = nombre;
}
Animal.prototype.hacerSonido = function () {
  console.log(`${this.nombre} hace un sonido`);
};

const perro = new Animal('Rex');
perro.hacerSonido(); // 'Rex hace un sonido'

console.log(Object.getPrototypeOf(perro) === Animal.prototype); // true
```

Ejemplo ejecutable: [`ejemplos/2.2-prototipos.js`](ejemplos/2.2-prototipos.js).

La sintaxis class de ES6 no reemplaza este mecanismo; es una capa de sintaxis más clara sobre el mismo modelo prototípico. Es importante que los participantes entiendan que 'debajo' de una clase sigue habiendo prototipos.

**Ejercicio 2.1 — De función constructora a prototipo explícito**

1. Reescribe la función constructora Animal del ejemplo agregando un segundo método moverse en el prototipo.
2. Crea una función constructora Ave que 'herede' de Animal usando Object.create() sobre Animal.prototype.
3. Verifica con instanceof que un objeto Ave es también instancia de Animal.

Se trabaja en: [`ejercicio-2.1-funcion-constructora-a-prototipo.js`](ejercicios/ejercicio-2.1-funcion-constructora-a-prototipo.js).

## 2.3 Clases en ES6

Las clases ES6 ofrecen constructores, métodos de instancia, métodos y propiedades estáticas, getters y setters, y herencia mediante extends/super, con una sintaxis mucho más legible que el patrón prototípico manual.

```js
class Vehiculo {
  #kilometraje = 0; // campo privado

  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }

  static compararAntiguedad(v1, v2) {
    return v1.kilometraje - v2.kilometraje;
  }

  get kilometraje() { return this.#kilometraje; }
  set kilometraje(valor) {
    if (valor < 0) throw new Error('Kilometraje inválido');
    this.#kilometraje = valor;
  }

  describir() {
    return `${this.marca} ${this.modelo} — ${this.#kilometraje} km`;
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, puertas) {
    super(marca, modelo);
    this.puertas = puertas;
  }
  describir() {
    return `${super.describir()} — ${this.puertas} puertas`;
  }
}

const miAuto = new Auto('Nissan', 'Versa', 4);
miAuto.kilometraje = 15000;
console.log(miAuto.describir());
```

Ejemplo ejecutable: [`ejemplos/2.3-clases.js`](ejemplos/2.3-clases.js).

**Ejercicio 2.2 — Jerarquía de clases**

1. Diseña una clase base Empleado con nombre, puesto y un campo privado #salario, con getter/setter validado (el salario no puede ser negativo).
2. Crea dos clases derivadas, Gerente y Desarrollador, cada una con al menos un atributo o método propio (por ejemplo, equipoACargo o lenguajesDominados).
3. Agrega un método estático en Empleado que reciba un arreglo de empleados y calcule la nómina total usando reduce.

Se trabaja en: carpeta `empleados/` de la [Actividad 2](ejercicios/actividad-2/).

## 2.4 Desestructuración y Spread/Rest

- Desestructuración de objetos y arreglos: extraer valores en variables de forma declarativa, incluyendo alias y valores por defecto.
- Operador spread (...): expande elementos de un arreglo/objeto (clonar, combinar, pasar como argumentos).
- Operador rest (...): agrupa el resto de elementos/argumentos en un solo arreglo u objeto.

```js
const usuario = { id: 1, nombre: 'Sara', rol: 'admin', activo: true };
const { nombre, rol: cargo, pais = 'MX' } = usuario;

const numeros = [10, 20, 30, 40];
const [primero, segundo, ...resto] = numeros;

const base = { a: 1, b: 2 };
const extendido = { ...base, c: 3 }; // clonación superficial + extensión

function sumarTodos(...valores) {
  return valores.reduce((acc, n) => acc + n, 0);
}
sumarTodos(1, 2, 3, 4); // 10
```

Ejemplo ejecutable: [`ejemplos/2.4-desestructuracion-spread-rest.js`](ejemplos/2.4-desestructuracion-spread-rest.js).

**Ejercicio 2.3 — Normalización de datos de API**

1. Se entrega un arreglo de objetos 'crudo' proveniente de una API simulada, con campos anidados (dirección, contacto).
2. Usando desestructuración anidada, extrae en una sola línea el nombre, la ciudad y el teléfono de cada registro.
3. Usando spread, crea una copia del arreglo donde a cada usuario se le agregue un campo activo: true sin mutar el arreglo original.

Se trabaja en: [`ejercicio-2.3-normalizacion-de-datos.js`](ejercicios/ejercicio-2.3-normalizacion-de-datos.js).

## 2.5 Módulos (ESM): import/export

El estándar de módulos ECMAScript (ESM) permite dividir el código en archivos independientes que exportan e importan funcionalidad de forma explícita, mejorando la organización, el reuso y la posibilidad de hacer tree-shaking (eliminar código no utilizado) en herramientas de build.

```js
// archivo: matematicas.js
export const PI = 3.14159;
export function area(radio) { return PI * radio ** 2; }
export default function circunferencia(radio) { return 2 * PI * radio; }

// archivo: app.js
import circunferencia, { PI, area } from './matematicas.js';
console.log(area(3), circunferencia(3), PI);
```

Ejemplo ejecutable: [`ejemplos/2.5-modulos/`](ejemplos/2.5-modulos/).

- export nombrado: puede haber varios por archivo, se importan entre llaves {}.
- export default: uno solo por archivo, se importa sin llaves y con el nombre que se elija.
- Para usar ESM en el navegador se agrega type="module" a la etiqueta <script>.

**Ejercicio 2.4 — Modularización de un carrito de compras**

1. Divide un archivo monolítico de carrito de compras en tres módulos: productos.js, carrito.js y app.js.
2. productos.js exporta un arreglo de productos (export nombrado); carrito.js exporta funciones agregarProducto, eliminarProducto y calcularTotal.
3. app.js importa ambos módulos y arma una demostración funcional en consola.

Se trabaja en: carpeta `tienda/` de la [Actividad 2](ejercicios/actividad-2/).

## Cierre de la sesión 2

**Actividad de aprendizaje 2 (evaluable)**

- Entrega individual: proyecto de la jerarquía de clases (ejercicio 2.2) más el carrito modularizado (ejercicio 2.4), en un mismo repositorio con estructura de carpetas clara.
- Se evaluará: uso correcto de clases y campos privados, aplicación de desestructuración/spread, y organización en módulos ESM.

Enunciado, esqueleto y verificador: [`ejercicios/actividad-2/`](ejercicios/actividad-2/README.md).

## Ejercicios y actividad

- **Ejercicio 2.1 — De función constructora a prototipo explícito** — se trabaja en: [`ejercicio-2.1-funcion-constructora-a-prototipo.js`](ejercicios/ejercicio-2.1-funcion-constructora-a-prototipo.js).
  - Video: [Herencia prototípica en JavaScript (POO)](https://www.youtube.com/watch?v=S_bDXnLnDs8)
  - Video: [Curso JavaScript: 23. Herencia prototípica – jonmircha](https://www.youtube.com/watch?v=1-m7xtwvH1E)
  - Video: [Prototypes a profundidad – herencia prototípica](https://www.youtube.com/watch?v=KrzlS0_HQuQ)
- **Ejercicio 2.2 — Jerarquía de clases** — se trabaja en: carpeta `empleados/` de la [Actividad 2](ejercicios/actividad-2/).
  - Video: [Las clases y sus métodos: constructor, getters y setters – JS desde cero #12](https://www.youtube.com/watch?v=M0FfjG4mhZg)
  - Video: [Herencia de clases: extends y super – JS desde cero #13](https://www.youtube.com/watch?v=-0p9MIqChK0)
  - Video: [Curso JavaScript: 25. Métodos estáticos, getters y setters – jonmircha](https://www.youtube.com/watch?v=TEzu31q9MVA)
- **Ejercicio 2.3 — Normalización de datos de API** — se trabaja en: [`ejercicio-2.3-normalizacion-de-datos.js`](ejercicios/ejercicio-2.3-normalizacion-de-datos.js).
  - Video: [JavaScript moderno: Desestructuración y Operador Spread](https://www.youtube.com/watch?v=aBcYXgtlH4E)
  - Video: [Curso JavaScript Moderno (ES6) #16 – Destructuring](https://www.youtube.com/watch?v=PQinHHCFsVc)
  - Video: [Desestructuración avanzada en JavaScript: parámetros Rest](https://www.youtube.com/watch?v=8OmDRKk1PSE)
- **Ejercicio 2.4 — Modularización de un carrito de compras** — se trabaja en: carpeta `tienda/` de la [Actividad 2](ejercicios/actividad-2/).
  - Video: [Import y Export en JavaScript (ES Modules) – Explicación](https://www.youtube.com/watch?v=0t-Le4kdaMg)
  - Video: [Javascript #14: Módulos (export, export default, import)](https://www.youtube.com/watch?v=ATBCZz7eWU0)
  - Video: [Curso JavaScript: 33. Módulos (import / export) – jonmircha](https://www.youtube.com/watch?v=0GEUyQXe3NI)
- **Actividad de aprendizaje 2 (evaluable)** — [`ejercicios/actividad-2/`](ejercicios/actividad-2/README.md): entrega de la solución. Los videos de todas las fichas están en su README.

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

**Actividad 2:** en un mismo repositorio, entrega la jerarquía Empleado / Gerente / Desarrollador (ejercicio 2.2) y el carrito dividido en módulos (ejercicio 2.4), con una estructura de carpetas clara. Se evalúa si cada archivo deja ver qué responsabilidad tiene, no solo si el código corre. Enunciado, esqueleto y verificador en [`ejercicios/actividad-2`](ejercicios/actividad-2/README.md).

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/Registro.js`](../proyecto-integrador/src/nucleo/Registro.js) (clase base ES6) y en [`proyecto-integrador/src/variantes/a-incidentes/Incidente.js`](../proyecto-integrador/src/variantes/a-incidentes/Incidente.js), que la extiende con los campos y transiciones de estado de un incidente. `Registro` protege su `#estado` con un campo privado y un getter, de modo que solo `cambiarEstado()` puede modificarlo.
