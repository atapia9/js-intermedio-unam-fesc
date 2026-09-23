# Día 5 — Tema 5: Testing y Buenas Prácticas

**Viernes 2 de octubre de 2026 · 09:00 a 13:00 hrs. · 4 horas**

La sesión de cierre del curso conecta todo lo aprendido con prácticas profesionales que garantizan la calidad y estabilidad del código: pruebas unitarias, depuración eficiente con las herramientas del navegador, y patrones de diseño comunes. La sesión culmina con un proyecto integrador que combina los cinco temas del curso.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Agenda de la sesión

| Horario | Actividad | Duración |
|---|---|---|
| 09:00 – 09:15 | Repaso de sesión 4 y contexto de la sesión | 15 min |
| 09:15 – 09:35 | 5.1 Garantizar la calidad y estabilidad del código | 20 min |
| 09:35 – 10:35 | 5.2 Introducción al testing con Jest | 60 min |
| 10:35 – 10:45 | Receso | 10 min |
| 10:45 – 11:25 | 5.3 Debuggeo profesional con Chrome DevTools | 40 min |
| 11:25 – 12:05 | 5.4 Patrones de diseño: Singleton y Módulo | 40 min |
| 12:05 – 12:50 | Proyecto integrador final | 45 min |
| 12:50 – 13:00 | Evaluación final y cierre del curso | 10 min |

## 5.1 Garantizar la calidad y estabilidad del código

A medida que una aplicación crece, verificar manualmente que cada cambio no rompa funcionalidad existente se vuelve inviable. Las pruebas automatizadas (tests) documentan el comportamiento esperado del código y detectan regresiones de forma temprana y repetible.

- Pruebas unitarias: verifican una unidad aislada de código (una función, un método) sin dependencias externas reales.
- Pruebas de integración: verifican que varias unidades trabajen bien juntas.
- Pruebas end-to-end (E2E): simulan el flujo completo de un usuario real sobre la aplicación.

Este curso se enfoca en pruebas unitarias básicas, la base sobre la cual se construyen las demás.

## 5.2 Introducción al Testing: pruebas unitarias básicas con Jest

Jest es uno de los frameworks de testing más utilizados en el ecosistema JavaScript, por su configuración mínima y su sintaxis clara basada en test()/it() y expect().

```js
// archivo: matematicas.js
export function sumar(a, b) { return a + b; }
export function dividir(a, b) {
  if (b === 0) throw new Error('No se puede dividir entre cero');
  return a / b;
}

// archivo: matematicas.test.js
import { sumar, dividir } from './matematicas.js';

test('sumar 2 + 3 debe ser 5', () => {
  expect(sumar(2, 3)).toBe(5);
});

test('dividir entre cero debe lanzar un error', () => {
  expect(() => dividir(10, 0)).toThrow('No se puede dividir entre cero');
});

describe('función sumar', () => {
  test('con números negativos', () => {
    expect(sumar(-2, -3)).toBe(-5);
  });
});
```

Ejemplo ejecutable: [`ejemplos/5.2-jest/`](ejemplos/5.2-jest/).

- describe() agrupa pruebas relacionadas; test()/it() define un caso individual; expect() establece la aserción.
- Matchers comunes: toBe (igualdad estricta), toEqual (igualdad profunda en objetos/arreglos), toThrow (errores), toContain, toBeTruthy/toBeFalsy.
- Comando típico de ejecución: npx jest, o npm test si está configurado en package.json.

**Ejercicio 5.1 — Suite de pruebas para el carrito de compras**

1. Retoma el módulo carrito.js de la sesión 2 (agregarProducto, eliminarProducto, calcularTotal).
2. Escribe al menos 5 pruebas unitarias con Jest cubriendo: carrito vacío, agregar un producto, eliminar un producto inexistente, cálculo correcto del total y manejo de cantidades negativas.
3. Ejecuta la suite y confirma que todas las pruebas pasan (en verde); si alguna falla, corrige el código fuente, no la prueba, salvo que la prueba esté mal planteada.

Se trabaja en: [`ejercicio-5.1-suite-de-pruebas/`](ejercicios/ejercicio-5.1-suite-de-pruebas/).

## 5.3 Debuggeo: uso profesional de las Chrome DevTools

Depender únicamente de console.log es lento e ineficiente para depurar errores complejos. Las DevTools del navegador ofrecen herramientas mucho más potentes.

- Breakpoints en el panel Sources: pausan la ejecución en una línea específica para inspeccionar variables.
- La palabra clave debugger; en el código provoca una pausa automática si las DevTools están abiertas.
- Panel Scope: muestra las variables locales, de closure y globales disponibles en el punto de pausa.
- Call Stack panel: muestra la pila de llamadas activa en el momento de la pausa, útil para rastrear cómo se llegó a ese punto.
- Breakpoints condicionales: se disparan solo si una expresión booleana se cumple, muy útiles dentro de ciclos largos.
- Panel Network: inspecciona peticiones fetch/XHR, sus cabeceras, cuerpo de respuesta y tiempos.

**Ejercicio 5.2 — Cacería de bugs guiada**

1. Se entrega un pequeño script con un bug intencional relacionado con asincronía (un valor que se usa antes de que la promesa se resuelva).
2. Usando breakpoints y el panel Scope de las DevTools (no console.log), localiza la línea exacta donde el valor es incorrecto.
3. Documenta en tres líneas el proceso de depuración que seguiste y la corrección aplicada.

Se trabaja en: [`ejercicio-5.2-caceria-de-bugs.js`](ejercicios/ejercicio-5.2-caceria-de-bugs.js).

## 5.4 Patrones de Diseño: introducción a patrones comunes

Un patrón de diseño es una solución reutilizable a un problema recurrente de diseño de software. Se revisan dos patrones especialmente relevantes en JavaScript.

### Patrón Singleton

Garantiza que una clase o módulo tenga una única instancia compartida en toda la aplicación, útil por ejemplo para una configuración global o una conexión compartida.

```js
class ConexionAPI {
  static #instancia = null;

  constructor(baseUrl) {
    if (ConexionAPI.#instancia) {
      return ConexionAPI.#instancia;
    }
    this.baseUrl = baseUrl;
    ConexionAPI.#instancia = this;
  }
}

const conexionA = new ConexionAPI('https://api.ejemplo.com');
const conexionB = new ConexionAPI('https://otra-url.com');
console.log(conexionA === conexionB); // true — misma instancia
```

Ejemplo ejecutable: [`ejemplos/5.4-singleton.js`](ejemplos/5.4-singleton.js).

### Patrón Módulo (Module Pattern)

Encapsula estado y comportamiento relacionados, exponiendo únicamente una API pública controlada; en JavaScript moderno se logra de forma natural con módulos ESM (import/export) o con closures, como se vio en la sesión 1.

**Ejercicio 5.3 — Aplicar Singleton**

1. Implementa un Singleton GestorDeNotificaciones que mantenga una lista interna de mensajes y exponga notificar(mensaje) y obtenerHistorial().
2. Demuestra, creando dos instancias 'distintas', que ambas comparten el mismo historial interno.

Se trabaja en: [`ejercicio-5.3-singleton-notificaciones.js`](ejercicios/ejercicio-5.3-singleton-notificaciones.js).

## Proyecto integrador final

Como cierre del curso, cada participante (o pareja, según indique el instructor) desarrolla una pequeña aplicación web de gestión de tareas ('Task Manager') que integre los cinco temas revisados durante la semana.

**Proyecto integrador — Requisitos mínimos**

- Tema 1: al menos un closure con propósito claro (por ejemplo, un generador de IDs únicos) y uso correcto de let/const.
- Tema 2: al menos una clase ES6 con campos privados, y el código organizado en módulos ESM (mínimo 3 archivos).
- Tema 3: consumo de una API pública con Fetch, usando async/await y manejo de errores con try/catch.
- Tema 4: delegación de eventos para las interacciones de la lista, y persistencia del estado en localStorage.
- Tema 5: al menos 4 pruebas unitarias con Jest sobre la lógica de negocio (sin DOM), y uso documentado de las DevTools durante el desarrollo (breakpoints en al menos un bug real encontrado).

Enunciado, criterios y verificador: [`ejercicios/actividad-5/`](ejercicios/actividad-5/README.md).

Criterios de evaluación del proyecto: funcionalidad completa, calidad y organización del código, cobertura razonable de pruebas, y una breve exposición (5 minutos) explicando las decisiones técnicas tomadas.

## Cierre del curso

Se aplica la evaluación final conforme a los rubros establecidos (asistencia 40, actividades de aprendizaje 40, evaluación final 20, total 100 puntos; calificación mínima aprobatoria 8.00). Se recomienda a los participantes continuar practicando mediante retos de código, contribuciones a proyectos open source y la construcción de un portafolio personal con los ejercicios desarrollados durante el curso.

## Ejercicios y actividad

- **Ejercicio 5.1 — Suite de pruebas para el carrito de compras** — se trabaja en: [`ejercicio-5.1-suite-de-pruebas/`](ejercicios/ejercicio-5.1-suite-de-pruebas/).
  - Video: [Jest JS tutorial en español para principiantes – Curso de Testing](https://www.youtube.com/watch?v=tgWBQZNCOT0)
  - Video: [Introducción al Testing desde cero con Jest](https://www.youtube.com/watch?v=_DzBez4qMi0)
  - Video: [¿Cómo se escribe una buena prueba unitaria en JavaScript? 10 buenas prácticas](https://www.youtube.com/watch?v=Rqyg8kjpzX0)
- **Ejercicio 5.2 — Cacería de bugs guiada** — se trabaja en: [`ejercicio-5.2-caceria-de-bugs.js`](ejercicios/ejercicio-5.2-caceria-de-bugs.js).
  - Video: [Debugging como un profesional en JavaScript con DevTools del navegador – Programación en español](https://www.youtube.com/watch?v=ps1WhgelV_E)
  - Video: [Curso de JavaScript #10: Debug y DevTools](https://www.youtube.com/watch?v=Oz3InVBI_K4)
  - Video: [Depurar JavaScript con el navegador y con Visual Studio Code](https://www.youtube.com/watch?v=CRXMli2ZkS8)
- **Ejercicio 5.3 — Aplicar Singleton** — se trabaja en: [`ejercicio-5.3-singleton-notificaciones.js`](ejercicios/ejercicio-5.3-singleton-notificaciones.js).
  - Video: [Patrón Singleton – Patrones de diseño – Programación en español](https://www.youtube.com/watch?v=YRLvJfItAT4)
  - Video: [#1 Singleton – Patrones de diseño con JavaScript](https://www.youtube.com/watch?v=OuKl1HwD1x8)
  - Video: [Patrón Module en JavaScript: ejemplo paso a paso](https://www.youtube.com/watch?v=uNBZ8ohLnxM)
- **Proyecto integrador** — [`ejercicios/actividad-5/`](ejercicios/actividad-5/README.md) y [`proyecto-integrador/`](../proyecto-integrador/README.md).

## Videos de apoyo

Idea del día: el código funcional resuelve el problema de hoy; el código robusto está preparado para los cambios de mañana. Antes de ver cada video, intenta predecir qué va a pasar; después, relaciona el tema con el caso de uso y responde la pregunta. Los videos marcados como opcional (inglés) se pueden ver con subtítulos. Fuente: [Anexo de videos de apoyo](../documentos/Anexo_Videos_JS_Intermedio.pdf) (sesión 5, 2 de octubre de 2026).

### 5.1 · Testing: la pirámide de pruebas

*Idea clave:* muchas pruebas pequeñas y rápidas en la base (unitarias), menos de integración y pocas de flujo completo (E2E).

| Tipo | Video |
|---|---|
| Principal | [Aprende en 3 minutos: pruebas unitarias y pruebas de integración](https://www.youtube.com/watch?v=UwoCR0eJNgo) |
| Refuerzo | [Pruebas unitarias y de integración – Curso de Tester de Software](https://www.youtube.com/watch?v=4Ulc8FcmfnQ) |
| Opcional (inglés) | [Testing Pyramid – Unit Test, Integration Test and E2E Test](https://www.youtube.com/watch?v=VO0Qbl-wzOQ) |

*Caso de uso real:* un carrito de compras: la prueba unitaria revisa que el total sea 200; la E2E simula a un cliente que entra, agrega un producto y paga.  
*Pregunta para pensar:* ¿qué es una regresión y cómo te protegen de ella las pruebas automáticas?

### 5.2 · Jest: `describe`, `test`, `expect` y matchers

*Idea clave:* una prueba es una especificación que se ejecuta: «dado este escenario, espero este comportamiento».

| Tipo | Video |
|---|---|
| Principal | [Jest JS tutorial en español para principiantes – Curso de Testing](https://www.youtube.com/watch?v=tgWBQZNCOT0) |
| Refuerzo | [Introducción al Testing desde cero con Jest](https://www.youtube.com/watch?v=_DzBez4qMi0) |
| Buenas prácticas | [¿Cómo se escribe una buena prueba unitaria en JavaScript? 10 buenas prácticas](https://www.youtube.com/watch?v=Rqyg8kjpzX0) |

*Caso de uso real:* proteger `carrito.js` con cinco casos: carrito vacío, agregar, eliminar un producto inexistente, calcular el total y rechazar cantidades negativas (`toThrow`).  
*Pregunta para pensar:* si una prueba falla, ¿cambias la prueba o el código? ¿Cómo decides?

### 5.3 · Depuración profesional con Chrome DevTools

*Idea clave:* más allá de `console.log`: detén el programa y observa Scope, Call Stack y Network con evidencia, no con suposiciones.

| Tipo | Video |
|---|---|
| Principal | [Debugging como un profesional en JavaScript con DevTools del navegador – Programación en español](https://www.youtube.com/watch?v=ps1WhgelV_E) |
| Refuerzo | [Curso de JavaScript #10: Debug y DevTools](https://www.youtube.com/watch?v=Oz3InVBI_K4) |
| Refuerzo | [Depurar JavaScript con el navegador y con Visual Studio Code](https://www.youtube.com/watch?v=CRXMli2ZkS8) |

*Caso de uso real:* una lista que no muestra datos de la API: Network dice si la petición salió y qué respondió; un breakpoint muestra que el valor se usó antes de que la promesa terminara.  
*Pregunta para pensar:* ¿qué diferencia hay entre el síntoma (dónde ves el error) y la causa (dónde se originó)?

### 5.4 · Patrones de diseño: Singleton y Módulo

*Idea clave:* un patrón es una solución conocida a un problema concreto, no una receta obligatoria.

| Tipo | Video |
|---|---|
| Singleton | [Patrón Singleton – Patrones de diseño – Programación en español](https://www.youtube.com/watch?v=YRLvJfItAT4) |
| Singleton | [#1 Singleton – Patrones de diseño con JavaScript](https://www.youtube.com/watch?v=OuKl1HwD1x8) |
| Módulo | [Patrón Module en JavaScript: ejemplo paso a paso](https://www.youtube.com/watch?v=uNBZ8ohLnxM) |

*Caso de uso real:* un gestor de notificaciones único: sin importar desde qué parte de la app se notifique, todo queda en el mismo historial. El módulo oculta el estado y solo expone `notificar()` y `obtenerHistorial()`.  
*Pregunta para pensar:* ¿necesitas realmente una instancia única o solo compartir comportamiento?

### Cierre del curso: ¿cómo se conecta todo?

Testing permite comprobar; debugging, comprender; la arquitectura, evolucionar. Ruta del curso: Día 1 entender JavaScript → Día 2 organizar el código → Día 3 coordinar lo asíncrono → Día 4 construir interfaces → Día 5 probar, depurar y estructurar.

**Proyecto integrador** — ver [proyecto-integrador/README.md](../proyecto-integrador/README.md). Presentación de 5 minutos con defensa técnica. Enunciado, criterios y verificador en [`ejercicios/actividad-5`](ejercicios/actividad-5/README.md). Siguientes pasos: sube tu código a un repositorio público, explora proyectos Open Source y convierte tus ejercicios en portafolio.

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/tests/`](../proyecto-integrador/tests/): la función de puntaje (`riesgo.test.js`) y la sanitización (`sanitizar.test.js`) se prueban sin tocar el DOM, siguiendo el mismo patrón que las pruebas de esta sesión. La suite corre en CI (`.github/workflows/ci.yml`) en cada Pull Request.
