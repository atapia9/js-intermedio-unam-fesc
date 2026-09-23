# JavaScript Intermedio — UNAM · FES Cuautitlán · REDEC

[![CI](https://github.com/atapia9/js-intermedio-unam-fesc/actions/workflows/ci.yml/badge.svg)](https://github.com/atapia9/js-intermedio-unam-fesc/actions/workflows/ci.yml)

Versión electrónica y de refuerzo del **Manual del curso "JavaScript Intermedio"** (Educación Continua FESC, modalidad presencial, 20 horas / 5 sesiones de 4 horas).

Este repositorio acompaña el manual con **ejemplos de código ejecutables y ejercicios prácticos organizados por día de sesión**, para que cada participante pueda clonar, experimentar y practicar fuera del salón.

> El manual es un documento de trabajo sujeto a ajustes del instructor titular según el ritmo del grupo. Este repositorio se actualiza en paralelo al avance del curso.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
>
> Esta nota cubre también los archivos que genera npm y que no admiten comentarios, como `package-lock.json`.

## Datos generales del curso

| | |
|---|---|
| **Curso** | JavaScript Intermedio |
| **Modalidad** | Presencial |
| **Duración** | 20 horas (5 sesiones de 4 horas) |
| **Fechas** | 28 de septiembre al 2 de octubre de 2026 |
| **Horario** | Lunes a viernes, de 09:00 a 13:00 hrs. |
| **Sede** | Gladiolas 161, El Rosario, Xochimilco, 16070, Ciudad de México, CDMX |
| **Dirigido a** | Personal en el área de informática |

**Perfil de ingreso:** dominar lógica de programación, variables, funciones básicas, ciclos, HTML/CSS básico y manejo de computadora.

## Cronograma general

| Sesión | Tema | Fecha | Duración |
|---|---|---|---|
| [Sesión 1](dia-01-fundamentos/README.md) | Tema 1 — Fundamentos Avanzados | Lunes 28 sep 2026 | 4 h |
| [Sesión 2](dia-02-poo-es6/README.md) | Tema 2 — POO y ES6+ | Martes 29 sep 2026 | 4 h |
| [Sesión 3](dia-03-asincronia/README.md) | Tema 3 — Programación Asíncrona | Miércoles 30 sep 2026 | 4 h |
| [Sesión 4](dia-04-dom-storage-forms/README.md) | Tema 4 — Manipulación Avanzada del DOM y Eventos | Jueves 1 oct 2026 | 4 h |
| [Sesión 5](dia-05-testing-debug-patrones/README.md) | Tema 5 — Testing y Buenas Prácticas | Viernes 2 oct 2026 | 4 h |

## Objetivo general del curso

Desarrollar en los participantes las habilidades necesarias para aplicar conceptos intermedios y avanzados del lenguaje JavaScript en el desarrollo de aplicaciones web, mediante el dominio del modelo de ejecución del lenguaje, programación orientada a objetos con ES6+, manejo de asincronía, manipulación eficiente del DOM y aplicación de buenas prácticas de desarrollo y pruebas, con el fin de crear código modular, eficiente, mantenible y preparado para interactuar con servicios y APIs modernas.

## Objetivos específicos

- Explicar el modelo de ejecución de JavaScript (call stack, event loop, hoisting y scope) y su impacto en el comportamiento del código.
- Aplicar programación orientada a objetos moderna con clases ES6, herencia prototípica y sintaxis de desestructuración/spread-rest.
- Construir flujos asíncronos robustos utilizando callbacks, promesas y async/await, consumiendo APIs reales con Fetch.
- Manipular el DOM de forma eficiente, delegar eventos y persistir datos en el navegador mediante Web Storage.
- Incorporar pruebas unitarias básicas, técnicas de depuración profesional y patrones de diseño comunes al flujo de trabajo.

## Metodología de trabajo

En cada tema se propone la revisión de diferentes materiales visuales, lecturas (teoría) y la realización de actividades para reforzar el aprendizaje (prácticas). Cada sesión combina exposición teórica guiada, demostraciones de código en vivo, ejercicios individuales o por parejas, y una breve retroalimentación grupal al cierre.

## Estructura del repositorio

```
├── dia-01-fundamentos/            Sesión 1: call stack, event loop, hoisting, scope, closures, this
├── dia-02-poo-es6/                Sesión 2: prototipos, clases ES6, destructuring, spread/rest, módulos ESM
├── dia-03-asincronia/             Sesión 3: callbacks, promesas, async/await, Fetch API
├── dia-04-dom-storage-forms/      Sesión 4: DOM eficiente, delegación de eventos, Web Storage, formularios
├── dia-05-testing-debug-patrones/ Sesión 5: Jest, DevTools, patrones Singleton y Módulo
├── proyecto-integrador/           BIS: Bitácora de Incidentes de Soporte, proyecto final que integra los 5 temas
├── documentos/                    Anexo de videos de apoyo (PDF) e índice de todos los videos
└── anexos/                        Glosario y bibliografía del manual
```

Cada carpeta `dia-XX` sigue la sesión correspondiente del manual:

- **`README.md`**: la sesión del manual convertida a Markdown: encabezado, agenda con horarios, teoría, código de ejemplo, **enunciado de cada ejercicio** y de la actividad de aprendizaje, cierre, videos de apoyo y el puente hacia el proyecto integrador.
- **`ejemplos/`**: el código de ejemplo **del manual**, listo para ejecutar (un archivo por ficha, por ejemplo `1.1-event-loop.js`).
- **`ejercicios/`**: los ejercicios que no forman parte de una actividad (`ejercicio-2.1-…`, `ejercicio-5.1-…`) y una carpeta **`actividad-N/`** con la actividad de aprendizaje: enunciado, esqueleto y un verificador local (`node verificar.mjs`). Como cada actividad se evalúa y consiste en "la solución de los ejercicios X.Y", **no incluye solución**.

## Cómo usar este repositorio durante el curso

1. Clona el repositorio antes de la primera sesión:
   ```bash
   git clone https://github.com/atapia9/js-intermedio-unam-fesc.git
   cd js-intermedio-unam-fesc
   ```
2. Antes de cada sesión, revisa el `README.md` del `dia-XX` correspondiente.
3. Ejecuta los ejemplos en Node.js (`node archivo.js`) o abriéndolos en el navegador cuando el tema lo requiera (DOM, Fetch, Storage).
4. Resuelve los ejercicios en `ejercicios/`. En los que traen una solución sugerida, inténtalo **antes** de mirarla; las actividades evaluables se comprueban con su verificador.
5. Al final de la sesión 5, aborda el `proyecto-integrador/`.

## Requisitos

- Node.js 18+ (para ejecutar ejemplos de consola y `async/await`/Fetch nativo).
- Navegador moderno (Chrome recomendado, por las DevTools).
- Editor de código (VS Code recomendado).
- Conocimientos previos: lógica de programación, variables, funciones básicas, ciclos, HTML/CSS básico.

## Evaluación del curso

Rúbrica general (Anexo C del manual):

| Rubro | Ponderación |
|---|---|
| Evaluación diagnóstica | Sin ponderación: referencia de nivel de entrada |
| Asistencia | 40 puntos |
| Actividades de aprendizaje (5 actividades, una por sesión) | 40 puntos |
| Evaluación final / proyecto integrador | 20 puntos |
| **Total** | **100 puntos** |

Calificación mínima aprobatoria: **8.00** (escala 0 a 10, dos decimales).

Las actividades de aprendizaje son evaluables e individuales: [Actividad 1](dia-01-fundamentos/ejercicios/actividad-1/README.md), [2](dia-02-poo-es6/ejercicios/actividad-2/README.md), [3](dia-03-asincronia/ejercicios/actividad-3/README.md) y [4](dia-04-dom-storage-forms/ejercicios/actividad-4/README.md), más el [proyecto integrador](dia-05-testing-debug-patrones/ejercicios/actividad-5/README.md) de la sesión 5. El manual habla de "5 actividades, una por sesión" pero define cuatro más el proyecto; ver la nota de ponderación en la Actividad 5.

## Temario por sesión

| Sesión | Tema central |
|---|---|
| [Día 1](dia-01-fundamentos/README.md) | Fundamentos Avanzados: Call Stack, Event Loop, Hoisting, Scope, Closures, `this` |
| [Día 2](dia-02-poo-es6/README.md) | Programación Orientada a Objetos y ES6+: Prototipos, Clases, Destructuring, Spread/Rest, Módulos ESM |
| [Día 3](dia-03-asincronia/README.md) | Programación Asíncrona: Callbacks, Promesas, Async/Await, Fetch API |
| [Día 4](dia-04-dom-storage-forms/README.md) | Manipulación Avanzada del DOM y Eventos: DOM eficiente, Delegación, Web Storage, Formularios |
| [Día 5](dia-05-testing-debug-patrones/README.md) | Testing y Buenas Prácticas: Jest, DevTools, patrones de diseño |
| [Proyecto integrador](proyecto-integrador/README.md) | BIS (Bitácora de Incidentes de Soporte): aplicación que integra los 5 temas |

## Anexos

- [Glosario de términos](anexos/glosario.md)
- [Bibliografía y referencias recomendadas](anexos/bibliografia.md)
- [Anexo de videos de apoyo (PDF)](documentos/Anexo_Videos_JS_Intermedio.pdf) y la [lista de reproducción del curso en YouTube](https://www.youtube.com/playlist?list=PLBN8bJQ3f4w4)
- [Índice de todos los videos](documentos/videos.md), organizado por día y ficha, con los ejercicios donde se usa cada uno. Se regenera con `npm run indice` y el CI comprueba que esté al día; `npm run verificar-enlaces` comprueba que los videos y los enlaces de la bibliografía sigan vivos (necesita internet; `npm run verificar-videos` solo revisa los videos) y una revisión semanal en GitHub Actions abre un issue si alguno falla

## Ecosistema de repositorios

El proyecto integrador de este curso es la mitad ejecutable de un caso compartido con
otros dos cursos de Educación Continua FESC. Ver
[proyecto-integrador/docs/00-caso.md](proyecto-integrador/docs/00-caso.md) para el
detalle.

| Repositorio | Qué aporta al caso BIS |
|---|---|
| [`PIG`](https://github.com/atapia9/PIG) | Política de respuesta a incidentes (fuente de verdad documental) |
| [`CursoGitHub`](https://github.com/atapia9/CursoGitHub) | Actividades y guía de evaluación del proyecto integrador, con el flujo de ramas/PR |
| **`js-intermedio-unam-fesc`** *(este repo)* | La aplicación BIS que implementa la política |
| [`CursoGitHub-autoevaluacion`](https://github.com/atapia9/CursoGitHub-autoevaluacion) | Preguntas de autoevaluación sobre trazabilidad y buenas prácticas de Git |
| [`bis-plantilla`](https://github.com/atapia9/bis-plantilla) | Plantilla reutilizable del scaffold para generar un proyecto BIS propio |

## Licencia y uso

Este material (textos, ejemplos, ejercicios y código) se distribuye bajo la licencia **Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)**: el texto completo está en [LICENSE](LICENSE) y aquí su [resumen](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Puedes compartirlo y adaptarlo citando la fuente (*JavaScript Intermedio*, Educación Continua FESC, REDEC-UNAM), sin fines comerciales y con la misma licencia.

Material de apoyo elaborado para el curso de Educación Continua FESC — REDEC, UNAM.
