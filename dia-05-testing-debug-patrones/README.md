# Día 5 — Testing con Jest, Debugging con DevTools y Patrones de Diseño

La sesión de cierre del curso conecta todo lo aprendido con prácticas profesionales: pruebas unitarias, depuración eficiente y patrones de diseño comunes. Culmina con el proyecto integrador.

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

## Ejercicios

1. [`ejercicios/01-pruebas-validaciones.js`](ejercicios/01-pruebas-validaciones.js) + su `.test.js` — escribir pruebas para funciones de validación.
2. [`ejercicios/02-debug-bug.js`](ejercicios/02-debug-bug.js) — encontrar y corregir un bug usando `debugger;`/breakpoints.
3. [`ejercicios/03-singleton-config.js`](ejercicios/03-singleton-config.js) — implementar un Singleton de configuración.

## Proyecto integrador final

Ver [`../proyecto-integrador/README.md`](../proyecto-integrador/README.md).
