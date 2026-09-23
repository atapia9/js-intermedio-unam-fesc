# Día 1 — Tema 1: Fundamentos Avanzados

**Lunes 28 de septiembre de 2026 · 09:00 a 13:00 hrs. · 4 horas**

Esta primera sesión sienta las bases teóricas del curso: cómo ejecuta JavaScript el código internamente, por qué var, let y const se comportan de forma distinta, qué son los closures y cómo se resuelve el valor de this en distintos contextos. Comprender estos cuatro pilares es indispensable para razonar correctamente sobre el resto del temario.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Agenda de la sesión

| Horario | Actividad | Duración |
|---|---|---|
| 09:00 – 09:20 | Bienvenida, encuadre del curso y evaluación diagnóstica | 20 min |
| 09:20 – 10:00 | 1.1 Contexto de ejecución: Call Stack y Event Loop | 40 min |
| 10:00 – 10:50 | 1.2 Hoisting y Scope: var, let, const | 50 min |
| 10:50 – 11:00 | Receso | 10 min |
| 11:00 – 11:50 | 1.3 Closures | 50 min |
| 11:50 – 12:40 | 1.4 This keyword y sus contextos | 50 min |
| 12:40 – 13:00 | Ejercicio integrador y cierre de sesión | 20 min |

## 1.1 Contexto de Ejecución: Call Stack y Event Loop

JavaScript es un lenguaje de un solo hilo (single-threaded): en un momento dado solo puede ejecutar una instrucción. Para manejar operaciones que tardan (temporizadores, peticiones de red, lectura de archivos) sin bloquear la interfaz, el motor de JavaScript se apoya en un conjunto de piezas que trabajan de forma coordinada.

- Call Stack (pila de llamadas): estructura LIFO donde se apilan los contextos de ejecución de las funciones que se van invocando.
- Heap: región de memoria donde se almacenan los objetos.
- Web APIs / APIs del entorno: temporizadores, peticiones HTTP, eventos del DOM, gestionados por el navegador o por Node.js, no por el motor de JS.
- Callback Queue (cola de tareas o macrotasks): donde esperan los callbacks listos para ejecutarse (setTimeout, eventos).
- Microtask Queue: cola de mayor prioridad que atiende promesas (.then, catch, finally) y queueMicrotask.
- Event Loop: ciclo que revisa continuamente si la Call Stack está vacía; si lo está, primero vacía toda la Microtask Queue y después toma la siguiente tarea de la Callback Queue.

```js
console.log('1: inicio');

setTimeout(() => console.log('2: setTimeout'), 0);

Promise.resolve().then(() => console.log('3: promesa'));

console.log('4: fin');

// Orden real de salida: 1, 4, 3, 2
// Las microtareas (promesas) siempre se resuelven antes
// que las macrotareas (setTimeout), aunque el timeout sea 0.
```

Ejemplo ejecutable: [`ejemplos/1.1-event-loop.js`](ejemplos/1.1-event-loop.js).

Comprender este modelo evita errores muy comunes, como asumir que setTimeout(fn, 0) ejecuta la función de inmediato, o no saber por qué una promesa 'se adelanta' a un temporizador.

**Ejercicio 1.1 — Predicción de salida**

1. Sin ejecutar el código, escribe en tu libreta el orden exacto en que se imprimirán 5 líneas que combinen console.log directos, un setTimeout y dos promesas encadenadas.
2. Ejecuta el código en la consola del navegador (DevTools) y compara tu predicción contra el resultado real; anota las diferencias.
3. Modifica el ejemplo agregando un segundo setTimeout con delay de 100 ms y explica por escrito, en tus propias palabras, en qué momento entra a la Call Stack.

Se trabaja en: bloque 1.1 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).

## 1.2 Hoisting y Scope

El hoisting es el comportamiento por el cual las declaraciones de variables y funciones se 'elevan' conceptualmente al inicio de su contexto de ejecución durante la fase de compilación, antes de que el código se ejecute línea por línea.

### Diferencias entre var, let y const

- var: tiene scope de función, se hoistea e inicializa con undefined; puede redeclararse y reasignarse.
- let: tiene scope de bloque, se hoistea pero queda en 'zona muerta temporal' (TDZ) hasta su declaración; puede reasignarse pero no redeclararse en el mismo scope.
- const: igual que let en cuanto a scope y TDZ, pero no permite reasignación del identificador (aunque el contenido de objetos/arreglos referenciados sí puede mutar).

```js
console.log(a); // undefined (hoisting de var)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

{
  let x = 'bloque';
  console.log(x); // 'bloque'
}
console.log(typeof x); // 'undefined', x no existe fuera del bloque
```

Ejemplo ejecutable: [`ejemplos/1.2-hoisting-scope.js`](ejemplos/1.2-hoisting-scope.js).

### Tipos de scope

- Scope global: variables accesibles desde cualquier parte del programa.
- Scope local o de función: variables visibles solo dentro de la función donde se declaran.
- Scope de bloque: variables declaradas con let/const visibles solo dentro de las llaves { } donde se definen (if, for, while, bloques sueltos).

**Ejercicio 1.2 — Refactor de var a let/const**

1. Se entrega un fragmento de código legado que usa var en un ciclo for dentro de un event listener y produce un bug clásico de closures (todos los botones muestran el mismo índice).
2. Identifica la causa del bug relacionándola con el scope de función de var.
3. Corrige el código sustituyendo var por let y explica por qué basta ese cambio para resolver el problema.
4. Adicionalmente, reescribe el fragmento usando const donde sea posible y justifica cada elección.

Se trabaja en: bloque 1.2 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).

## 1.3 Closures

Un closure (clausura) se forma cuando una función interna 'recuerda' y mantiene acceso al entorno léxico (variables) de la función externa en la que fue creada, incluso después de que la función externa ha terminado de ejecutarse.

```js
function crearContador() {
  let contador = 0;
  return function incrementar() {
    contador++;
    return contador;
  };
}

const contadorA = crearContador();
console.log(contadorA()); // 1
console.log(contadorA()); // 2

const contadorB = crearContador();
console.log(contadorB()); // 1 (cuenta independiente)
```

Ejemplo ejecutable: [`ejemplos/1.3-closures.js`](ejemplos/1.3-closures.js).

Casos de uso prácticos de los closures:

- Encapsulamiento de estado privado (simular variables privadas antes de las clases con campos privados).
- Fábricas de funciones (function factories) que generan variantes configuradas de una misma función.
- Memoización: cachear resultados costosos de calcular.
- Manejo de manejadores de eventos que necesitan 'recordar' un valor específico.

**Ejercicio 1.3 — Módulo con estado privado**

1. Construye una función crearCuentaBancaria(saldoInicial) que devuelva un objeto con los métodos depositar(monto), retirar(monto) y consultarSaldo(), sin exponer la variable saldo directamente.
2. Agrega validación: retirar no debe permitir saldo negativo; debe registrar un mensaje de error controlado.
3. Crea dos cuentas distintas y demuestra que sus saldos son completamente independientes entre sí.

Se trabaja en: bloque 1.3 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).

## 1.4 This keyword

El valor de this en JavaScript no depende de dónde se define una función, sino de cómo se invoca. Esto suele confundir a quienes vienen de otros lenguajes orientados a objetos.

- Contexto global: en el navegador, this en el nivel superior apunta a window (en modo no estricto).
- Método de un objeto: this apunta al objeto que llama al método (obj.metodo()).
- Función normal invocada suelta: this es undefined en modo estricto, o el objeto global en modo no estricto.
- Arrow functions: no tienen su propio this; heredan el this léxico del contexto donde fueron definidas.
- call, apply y bind: permiten fijar explícitamente el valor de this al invocar una función.

```js
const persona = {
  nombre: 'Ana',
  saludarNormal: function () {
    console.log(`Hola, soy ${this.nombre}`); // this = persona
  },
  saludarArrow: () => {
    console.log(`Hola, soy ${this.nombre}`); // this NO es persona
  },
};

function presentar(saludo) {
  console.log(`${saludo}, soy ${this.nombre}`);
}

presentar.call(persona, 'Hola');   // this = persona
presentar.apply(persona, ['Hola']); // igual, con arreglo de argumentos
const presentarAna = presentar.bind(persona);
presentarAna('Hola');               // this fijado permanentemente
```

Ejemplo ejecutable: [`ejemplos/1.4-this.js`](ejemplos/1.4-this.js).

**Ejercicio 1.4 — Corrección de contexto perdido**

1. Se entrega un objeto contador con un método incrementar que se pasa como callback a setInterval y 'pierde' su this, provocando NaN en pantalla.
2. Diagnostica por qué this deja de apuntar al objeto contador al usarse como callback.
3. Corrige el problema de dos formas distintas: usando bind() y usando una arrow function; compara ambas soluciones.

Se trabaja en: bloque 1.4 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).

## Cierre de la sesión 1

Puntos clave para reforzar antes de continuar: el event loop determina el orden real de ejecución cuando hay asincronía de por medio; let/const con scope de bloque previenen errores comunes de var; los closures permiten encapsular estado; y el valor de this depende siempre de cómo se llama la función, no de dónde se escribió.

**Actividad de aprendizaje 1 (evaluable)**

- Entrega individual: archivo .js con la solución de los ejercicios 1.1 a 1.4, comentando en cada bloque el concepto aplicado.
- Formato de entrega: repositorio o carpeta compartida indicada por el instructor, antes del inicio de la sesión 2.

Enunciado, esqueleto y verificador: [`ejercicios/actividad-1/`](ejercicios/actividad-1/README.md).

## Ejercicios y actividad

- **Ejercicio 1.1 — Predicción de salida** — se trabaja en: bloque 1.1 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).
  - Video: [La pila de ejecución (Call Stack) – JS en Español](https://www.youtube.com/watch?v=ygA5U7Wgsg8)
  - Video: [Entiende el Event Loop de JavaScript en 10 minutos](https://www.youtube.com/watch?v=XdzDDRF8_mY)
  - Video: [Qué es el Event Loop en JavaScript – paso a paso](https://www.youtube.com/watch?v=rvzItyLuh28)
- **Ejercicio 1.2 — Refactor de var a let/const** — se trabaja en: bloque 1.2 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).
  - Video: [VAR, LET o CONST: ¿cuál debería usar? – JS en Español](https://www.youtube.com/watch?v=bvkY9ey83yY)
  - Video: [Diferencia entre var, let y const – Curso JS desde cero #4](https://www.youtube.com/watch?v=a8SJJPvkGIE)
- **Ejercicio 1.3 — Módulo con estado privado** — se trabaja en: bloque 1.3 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).
  - Video: [Closures en JavaScript: qué son y cómo funcionan](https://www.youtube.com/watch?v=xa8lhVwQBw4)
  - Video: [3 ejemplos REALES de Closures en JavaScript](https://www.youtube.com/watch?v=ubS-ejTrSRc)
  - Video: [¿Qué son los Closures y por qué dan tanto miedo?](https://www.youtube.com/watch?v=bPZpjI2tzRo)
- **Ejercicio 1.4 — Corrección de contexto perdido** — se trabaja en: bloque 1.4 de [`actividad1.js`](ejercicios/actividad-1/actividad1.js).
  - Video: [This en JavaScript (bind, call, apply y más)](https://www.youtube.com/watch?v=bS71_W_BDFE)
  - Video: [¿Para qué sirve call(), bind() y apply()?](https://www.youtube.com/watch?v=OZ02GSH9QkY)
  - Video: [¿Cómo usar call, apply y bind? This a profundidad](https://www.youtube.com/watch?v=j1Zs_o32uo4)
- **Actividad de aprendizaje 1 (evaluable)** — [`ejercicios/actividad-1/`](ejercicios/actividad-1/README.md): entrega de la solución. Los videos de todas las fichas están en su README.

## Videos de apoyo

Antes de ver cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso y responde la pregunta. Los videos marcados como opcional (inglés) se pueden ver con subtítulos. Fuente: [Anexo de videos de apoyo](../documentos/Anexo_Videos_JS_Intermedio.pdf) (sesión 1, 28 de septiembre de 2026).

### 1.1 · Call Stack y Event Loop

*Idea clave:* JavaScript hace una cosa a la vez; el navegador espera por él.

| Tipo | Video |
|---|---|
| Principal | [La pila de ejecución (Call Stack) – JS en Español](https://www.youtube.com/watch?v=ygA5U7Wgsg8) |
| Principal | [Entiende el Event Loop de JavaScript en 10 minutos](https://www.youtube.com/watch?v=XdzDDRF8_mY) |
| Refuerzo | [Qué es el Event Loop en JavaScript – paso a paso](https://www.youtube.com/watch?v=rvzItyLuh28) |
| Opcional (inglés) | [What the heck is the event loop anyway? – Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ) |

*Caso de uso real:* un botón de «Descargar reporte» sigue respondiendo mientras llegan los datos del servidor: la página no se congela.  
*Pregunta para pensar:* ¿por qué `setTimeout(fn, 0)` no se ejecuta «inmediatamente»?

### 1.2 · Hoisting y Scope: `var`, `let`, `const`

*Idea clave:* ¿dónde «vive» cada variable y desde cuándo existe?

| Tipo | Video |
|---|---|
| Principal | [VAR, LET o CONST: ¿cuál debería usar? – JS en Español](https://www.youtube.com/watch?v=bvkY9ey83yY) |
| Refuerzo | [Diferencia entre var, let y const – Curso JS desde cero #4](https://www.youtube.com/watch?v=a8SJJPvkGIE) |
| Opcional (inglés) | [Scope vs Closure vs Hoisting](https://www.youtube.com/watch?v=sDmn6p4lRHk) |

*Caso de uso real:* una lista de productos con botón «Agregar»: con `var` todos los botones agregan el mismo producto.  
*Pregunta para pensar:* ¿por qué cambiar `var` por `let` en el ciclo corrige el error?

### 1.3 · Closures

*Idea clave:* una función puede «recordar» el lugar donde nació.

| Tipo | Video |
|---|---|
| Principal | [Closures en JavaScript: qué son y cómo funcionan](https://www.youtube.com/watch?v=xa8lhVwQBw4) |
| Casos reales | [3 ejemplos REALES de Closures en JavaScript](https://www.youtube.com/watch?v=ubS-ejTrSRc) |
| Refuerzo | [¿Qué son los Closures y por qué dan tanto miedo?](https://www.youtube.com/watch?v=bPZpjI2tzRo) |

*Caso de uso real:* el saldo de una cuenta bancaria que solo cambia con `depositar()` y `retirar()`, nunca «desde afuera».  
*Pregunta para pensar:* ¿por qué la cuenta de Ana y la de Luis no comparten saldo?

### 1.4 · `this`, `call`, `apply` y `bind`

*Idea clave:* `this` depende de quién llama a la función, no de dónde se escribió.

| Tipo | Video |
|---|---|
| Principal | [This en JavaScript (bind, call, apply y más)](https://www.youtube.com/watch?v=bS71_W_BDFE) |
| Práctico | [¿Para qué sirve call(), bind() y apply()?](https://www.youtube.com/watch?v=OZ02GSH9QkY) |
| Refuerzo | [¿Cómo usar call, apply y bind? This a profundidad](https://www.youtube.com/watch?v=j1Zs_o32uo4) |

*Caso de uso real:* un temporizador que «olvida» a qué objeto pertenece cuando se pasa como callback a `setInterval`.  
*Pregunta para pensar:* ¿cuándo usarías `bind` y cuándo una arrow function para conservar el contexto?

### Cierre: ¿cómo se conecta todo?

Tiempo (Event Loop) · Espacio (Scope) · Contexto (`this`) → los closures son la memoria que une estos tres.

**Actividad 1:** entrega un archivo `.js` con los ejercicios 1.1 a 1.4. Cada bloque debe incluir comentarios que expliquen qué hace, por qué funciona y qué concepto demuestra. Entrégalo antes de la Sesión 2. Enunciado, esqueleto y verificador en [`ejercicios/actividad-1`](ejercicios/actividad-1/README.md).

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/src/nucleo/almacenamiento.js`](../proyecto-integrador/src/nucleo/almacenamiento.js): la clave de `localStorage` queda encapsulada en un closure, y solo se exponen `cargar()`/`guardar()` — mínimo privilegio aplicado a código real.
