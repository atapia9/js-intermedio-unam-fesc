# Proyecto integrador — Task Manager

Como cierre del curso, cada participante (o pareja, según indique el instructor) desarrolla una pequeña aplicación web de gestión de tareas ("Task Manager") que integre los cinco temas revisados durante la semana.

## Criterios de evaluación

- Funcionalidad completa.
- Calidad y organización del código.
- Cobertura razonable de pruebas.
- Breve exposición (5 minutos) explicando las decisiones técnicas tomadas.

## Requisitos funcionales mínimos

1. Agregar, completar y eliminar tareas.
2. Persistir las tareas en `localStorage` (sobreviven al recargar la página).
3. Simular la carga inicial de tareas desde una "API" (usa la Fetch API contra `https://jsonplaceholder.typicode.com/todos` o el mock incluido) usando `async/await`.
4. Usar delegación de eventos para manejar clicks en la lista de tareas (no un listener por tarea).
5. Modelar `Tarea` como una **clase ES6**.
6. Incluir al menos 3 pruebas unitarias con Jest sobre la lógica (no sobre el DOM).

## Cómo está organizado este scaffold

```
proyecto-integrador/
├── index.html         Interfaz de la aplicación
├── src/
│   ├── Tarea.js        Clase ES6 que modela una tarea (módulo ESM)
│   ├── almacenamiento.js  Persistencia en localStorage (módulo ESM)
│   ├── api.js           Simulación de carga remota con fetch + async/await
│   └── app.js            Orquesta todo: DOM, delegación de eventos, render
└── src/Tarea.test.js   Pruebas unitarias con Jest sobre la clase Tarea
```

## Cómo ejecutar

- Abre `index.html` directamente en el navegador (usa módulos ESM nativos, no requiere build).
- Para correr las pruebas: desde la raíz del repositorio, `npm install && npm test`.

## Puntos de integración con cada día del curso

| Día | Dónde se aplica en este proyecto |
|---|---|
| Día 1 (closures, this) | `almacenamiento.js` usa un closure para encapsular la clave de `localStorage` |
| Día 2 (clases, módulos ESM) | `Tarea.js` es una clase ES6 exportada como módulo |
| Día 3 (async/await, fetch) | `api.js` simula la carga inicial de tareas remotas |
| Día 4 (DOM, delegación, storage) | `app.js` usa un solo listener delegado y `almacenamiento.js` persiste en `localStorage` |
| Día 5 (testing, patrones) | `Tarea.test.js` prueba la clase; `almacenamiento.js` sigue el patrón Módulo |

Este scaffold es un punto de partida — se espera que cada participante lo extienda (filtros, categorías, fechas límite, edición de tareas, etc.).
