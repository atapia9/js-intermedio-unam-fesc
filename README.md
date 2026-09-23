# JavaScript Intermedio — UNAM · FES Cuautitlán · REDEC

[![CI](https://github.com/atapia9/js-intermedio-unam-fesc/actions/workflows/ci.yml/badge.svg)](https://github.com/atapia9/js-intermedio-unam-fesc/actions/workflows/ci.yml)

Versión electrónica y de refuerzo del **Manual del curso "JavaScript Intermedio"** (Educación Continua FESC, modalidad presencial, 20 horas / 5 sesiones de 4 horas).

Este repositorio acompaña el manual con **ejemplos de código ejecutables y ejercicios prácticos organizados por día de sesión**, para que cada participante pueda clonar, experimentar y practicar fuera del salón.

> El manual es un documento de trabajo sujeto a ajustes del instructor titular según el ritmo del grupo. Este repositorio se actualiza en paralelo al avance del curso.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
>
> Esta nota cubre también los archivos que genera npm y que no admiten comentarios, como `package-lock.json`.

## Objetivo general del curso

Desarrollar en los participantes las habilidades necesarias para aplicar conceptos intermedios y avanzados de JavaScript: modelo de ejecución del lenguaje, programación orientada a objetos con ES6+, asincronía, manipulación eficiente del DOM y buenas prácticas de desarrollo y pruebas.

## Estructura del repositorio

```
├── dia-01-fundamentos/            Call stack, event loop, hoisting, scope, closures, this
├── dia-02-poo-es6/                Prototipos, clases ES6, destructuring, spread/rest, módulos ESM
├── dia-03-asincronia/             Callbacks, promesas, async/await, Fetch API
├── dia-04-dom-storage-forms/      DOM eficiente, delegación de eventos, Web Storage, formularios
├── dia-05-testing-debug-patrones/ Jest, DevTools, patrones Singleton y Módulo
├── proyecto-integrador/           BIS: Bitácora de Incidentes de Soporte — proyecto final que integra los 5 temas
└── anexos/                        Glosario y bibliografía del manual
```

Cada carpeta `dia-XX` contiene:

- **`README.md`** — resumen teórico de la sesión (agenda, temas, puntos clave), con enlaces a los ejemplos.
- **`ejemplos/`** — código comentado y ejecutable que ilustra cada tema.
- **`ejercicios/`** — retos prácticos con enunciado; cada uno incluye un archivo de solución sugerida.

## Cómo usar este repositorio durante el curso

1. Clona el repositorio antes de la primera sesión:
   ```bash
   git clone https://github.com/atapia9/js-intermedio-unam-fesc.git
   cd js-intermedio-unam-fesc
   ```
2. Antes de cada sesión, revisa el `README.md` del `dia-XX` correspondiente.
3. Ejecuta los ejemplos en Node.js (`node archivo.js`) o abriéndolos en el navegador cuando el tema lo requiera (DOM, Fetch, Storage).
4. Intenta resolver cada ejercicio en `ejercicios/` **antes** de mirar la solución sugerida.
5. Al final de la sesión 5, aborda el `proyecto-integrador/`.

## Requisitos

- Node.js 18+ (para ejecutar ejemplos de consola y `async/await`/Fetch nativo).
- Navegador moderno (Chrome recomendado, por las DevTools).
- Editor de código (VS Code recomendado).
- Conocimientos previos: lógica de programación, variables, funciones básicas, ciclos, HTML/CSS básico.

## Evaluación del curso

| Rubro | Puntos |
|---|---|
| Asistencia | 40 |
| Actividades de aprendizaje | 40 |
| Evaluación final | 20 |
| **Total** | **100** |

Calificación mínima aprobatoria: **8.00** (escala 0–10, dos decimales).

## Temario por sesión

| Día | Tema central |
|---|---|
| [Día 1](dia-01-fundamentos/README.md) | Contexto de ejecución: Call Stack, Event Loop, Hoisting, Scope, Closures, `this` |
| [Día 2](dia-02-poo-es6/README.md) | Prototipos, Clases ES6, Destructuring, Spread/Rest, Módulos ESM |
| [Día 3](dia-03-asincronia/README.md) | Callbacks, Promesas, Async/Await, Fetch API |
| [Día 4](dia-04-dom-storage-forms/README.md) | DOM eficiente, Delegación de eventos, Web Storage, Formularios |
| [Día 5](dia-05-testing-debug-patrones/README.md) | Testing con Jest, Debugging con DevTools, Patrones de diseño |
| [Proyecto integrador](proyecto-integrador/README.md) | BIS — Bitácora de Incidentes de Soporte, aplicación que integra los 5 temas |

## Anexos

- [Glosario de términos](anexos/glosario.md)
- [Bibliografía y referencias recomendadas](anexos/bibliografia.md)
- [Anexo de videos de apoyo (PDF)](documentos/Anexo_Videos_JS_Intermedio.pdf) y la [lista de reproducción del curso en YouTube](https://www.youtube.com/playlist?list=PLBN8bJQ3f4w4)
- [Índice de todos los videos](documentos/videos.md), organizado por día y ficha, con los ejercicios donde se usa cada uno. Se regenera con `npm run indice` y el CI comprueba que esté al día; `npm run verificar-videos` comprueba que los enlaces sigan vivos (necesita internet) y una revisión semanal en GitHub Actions abre un issue si alguno falla

## Ecosistema de repositorios

El proyecto integrador de este curso es la mitad ejecutable de un caso compartido con
otros dos cursos de Educación Continua FESC. Ver
[proyecto-integrador/docs/00-caso.md](proyecto-integrador/docs/00-caso.md) para el
detalle.

| Repositorio | Qué aporta al caso BIS |
|---|---|
| `PIG` | Política de respuesta a incidentes (fuente de verdad documental) |
| `CursoGitHub` | Actividades y guía de evaluación del proyecto integrador, con el flujo de ramas/PR |
| **`js-intermedio-unam-fesc`** *(este repo)* | La aplicación BIS que implementa la política |
| `CursoGitHub-autoevaluacion` | Preguntas de autoevaluación sobre trazabilidad y buenas prácticas de Git |
| `bis-plantilla` | Plantilla reutilizable del scaffold para generar un proyecto BIS propio |

## Licencia y uso

Material de apoyo elaborado para el curso de Educación Continua FESC — REDEC, UNAM. Uso educativo para los participantes del curso.
