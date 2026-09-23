# El caso: BIS — Bitácora de Incidentes de Soporte

El proyecto integrador ya no es un "Task Manager" genérico: es **BIS**, una bitácora que
el personal de soporte usa para registrar y dar seguimiento a incidentes de seguridad
reportados por usuarios (correos sospechosos, equipos extraviados, accesos anómalos, etc.).

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

Este caso conecta tres cursos:

- **Git y GitHub** redacta la política que dice *qué* se hace con un incidente.
- **JavaScript Intermedio** (este repositorio) construye la aplicación que *ejecuta* esa política.
- **Ciberseguridad para personal de soporte** aporta el contenido y los criterios de calidad.

No son tres proyectos parecidos: son dos caras del mismo proyecto, y lo que se evalúa
es que puedas señalar, en cualquier dirección, la regla de la política y la línea de
código que la implementa.

## Por qué importa para este curso

Cada tema de la semana tiene un lugar exacto en BIS — no es un ejercicio aislado:

| Tema de JS | Dónde aterriza en BIS |
|---|---|
| Closures | La clave de `localStorage` queda encapsulada en `nucleo/almacenamiento.js` |
| Clases ES6 / módulos | `nucleo/Registro.js` y `variantes/a-incidentes/Incidente.js` |
| Async/await + Fetch | `nucleo/api.js` valida el esquema antes de aceptar datos externos |
| DOM + delegación + Storage | `nucleo/app.js` con un único listener delegado |
| Testing + patrones | `tests/` prueba la función de puntaje y la sanitización sin tocar el DOM |

Ver también [01-variantes.md](01-variantes.md) y el contrato de campos en
[02-modelo-riesgo.md](02-modelo-riesgo.md).
