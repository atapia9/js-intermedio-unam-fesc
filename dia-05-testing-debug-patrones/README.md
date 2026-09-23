# Día 5 — Testing con Jest, Debugging con DevTools y Patrones de Diseño

La sesión de cierre del curso conecta todo lo aprendido con prácticas profesionales: pruebas unitarias, depuración eficiente y patrones de diseño comunes. Culmina con el proyecto integrador.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Agenda de la sesión

1. Garantizar la calidad y estabilidad del código
2. Introducción al testing: pruebas unitarias básicas con Jest
3. Debuggeo profesional con Chrome DevTools
4. Patrones de diseño: Singleton y Módulo

## 5.1 – 5.2 Testing con Jest

- **Unitarias**: verifican una unidad aislada (función/método) sin dependencias externas reales.
- **Integración**: verifican que varias unidades trabajen bien juntas.
- **E2E**: simulan el flujo completo de un usuario real.

API de Jest: `describe()` agrupa pruebas relacionadas; `test()`/`it()` define un caso; `expect()` establece la aserción. Matchers comunes: `toBe`, `toEqual`, `toThrow`, `toContain`, `toBeTruthy`/`toBeFalsy`.

Ver [`ejemplos/01-suma.js`](ejemplos/01-suma.js) y su prueba [`ejemplos/01-suma.test.js`](ejemplos/01-suma.test.js).

Ejecuta las pruebas del repositorio completo con:
```bash
npm install
npm test
```

## 5.3 Debugging con Chrome DevTools

- **Breakpoints** en el panel Sources.
- La palabra clave `debugger;` pausa automáticamente si DevTools está abierto.
- **Panel Scope**: variables locales, de closure y globales en el punto de pausa.
- **Call Stack panel**: pila de llamadas activa.
- **Breakpoints condicionales**: se disparan solo si una expresión se cumple.
- **Panel Network**: inspecciona peticiones fetch/XHR.

Ver [`ejemplos/02-debugging.html`](ejemplos/02-debugging.html) — ábrelo con DevTools abiertas y coloca un breakpoint.

## 5.4 Patrones de diseño

- **Singleton**: garantiza una única instancia compartida (p. ej. configuración global).
- **Módulo**: encapsula estado/comportamiento exponiendo solo una API pública; en JS moderno se logra con ESM o closures (ver Día 1).

Ver [`ejemplos/03-singleton.js`](ejemplos/03-singleton.js) y [`ejemplos/04-patron-modulo.js`](ejemplos/04-patron-modulo.js).

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

**Proyecto integrador** — ver [proyecto-integrador/README.md](../proyecto-integrador/README.md). Presentación de 5 minutos con defensa técnica. Siguientes pasos: sube tu código a un repositorio público, explora proyectos Open Source y convierte tus ejercicios en portafolio.

## Ejercicios

1. [`ejercicios/01-pruebas-validaciones.js`](ejercicios/01-pruebas-validaciones.js) + su `.test.js` — escribir pruebas para funciones de validación.
   - Video: [Aprende en 3 minutos: pruebas unitarias y pruebas de integración](https://www.youtube.com/watch?v=UwoCR0eJNgo)
   - Video: [Pruebas unitarias y de integración – Curso de Tester de Software](https://www.youtube.com/watch?v=4Ulc8FcmfnQ)
   - Video: [Jest JS tutorial en español para principiantes – Curso de Testing](https://www.youtube.com/watch?v=tgWBQZNCOT0)
   - Video: [Introducción al Testing desde cero con Jest](https://www.youtube.com/watch?v=_DzBez4qMi0)
   - Video: [¿Cómo se escribe una buena prueba unitaria en JavaScript? 10 buenas prácticas](https://www.youtube.com/watch?v=Rqyg8kjpzX0)
2. [`ejercicios/02-debug-bug.js`](ejercicios/02-debug-bug.js) — encontrar y corregir un bug usando `debugger;`/breakpoints.
   - Video: [Debugging como un profesional en JavaScript con DevTools del navegador – Programación en español](https://www.youtube.com/watch?v=ps1WhgelV_E)
   - Video: [Curso de JavaScript #10: Debug y DevTools](https://www.youtube.com/watch?v=Oz3InVBI_K4)
   - Video: [Depurar JavaScript con el navegador y con Visual Studio Code](https://www.youtube.com/watch?v=CRXMli2ZkS8)
3. [`ejercicios/03-singleton-config.js`](ejercicios/03-singleton-config.js) — implementar un Singleton de configuración.
   - Video: [Patrón Singleton – Patrones de diseño – Programación en español](https://www.youtube.com/watch?v=YRLvJfItAT4)
   - Video: [#1 Singleton – Patrones de diseño con JavaScript](https://www.youtube.com/watch?v=OuKl1HwD1x8)
   - Video: [Patrón Module en JavaScript: ejemplo paso a paso](https://www.youtube.com/watch?v=uNBZ8ohLnxM)

## Hacia el proyecto integrador

Este tema aterriza en [`proyecto-integrador/tests/`](../proyecto-integrador/tests/): la función de puntaje (`riesgo.test.js`) y la sanitización (`sanitizar.test.js`) se prueban sin tocar el DOM, siguiendo el mismo patrón que las pruebas de esta sesión. La suite corre en CI (`.github/workflows/ci.yml`) en cada Pull Request.

## Proyecto integrador final

Ver [`../proyecto-integrador/README.md`](../proyecto-integrador/README.md).
