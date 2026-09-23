# Actividad 5 — Proyecto integrador (BIS)

Cierre del curso (según el [Anexo de videos de apoyo](../../../documentos/Anexo_Videos_JS_Intermedio.pdf)):

> Proyecto integrador: IDs únicos con closures (Tema 1); clases, campos privados y al menos 3 módulos ESM (Tema 2); API con fetch, async/await y try/catch (Tema 3); delegación de eventos y `localStorage` (Tema 4); al menos 4 pruebas con Jest y depuración con DevTools (Tema 5). Presentación de 5 minutos con defensa técnica.

El anexo no numera esta actividad: la Sesión 5 cierra con el proyecto integrador, que es la actividad final del curso. El anexo lo llama *Task Manager*; en este repositorio el proyecto es **BIS** ([proyecto-integrador](../../../proyecto-integrador/README.md)) y cubre la misma lista de criterios, más la capa de seguridad.

Esta actividad se evalúa, por eso el repositorio incluye un verificador de criterios, pero **no un proyecto resuelto**: el scaffold es tu punto de partida.

## Los criterios y dónde se cumplen

| Tema | Criterio del anexo | Dónde aterriza en BIS | Cómo se comprueba |
|---|---|---|---|
| 1 | IDs únicos con closures | `nucleo/Registro.js`, `nucleo/almacenamiento.js` | verificador |
| 2 | Clases, **campos privados** y al menos 3 módulos ESM | `nucleo/Registro.js`, `variantes/…/Incidente.js`, todo `src/` | verificador |
| 3 | `fetch`, `async/await` y `try/catch` | `nucleo/api.js` | verificador |
| 4 | Delegación de eventos y `localStorage` | `nucleo/app.js`, `nucleo/almacenamiento.js` | verificador |
| 4 | Sanitización del texto libre (capa de seguridad de BIS) | `nucleo/sanitizar.js` | verificador |
| 5 | Al menos 4 pruebas con Jest | `tests/` | verificador (`npm test` para ejecutarlas) |
| 5 | Depuración con DevTools | tu demostración | manual: en tu exposición |
| — | Presentación de 5 minutos con defensa técnica | guion en la plantilla de entrega | manual: instructor |

El scaffold ya cumple los criterios comprobables del verificador; lo que falte es tu parte. `Registro` ya protege su `#estado` con un campo privado y un getter (solo `cambiarEstado()` lo modifica), que es el ejemplo a seguir: cuando definas la entidad de tu variante, protege también sus datos sensibles con campos privados, y conserva esa protección al extender el proyecto.

## Qué debes hacer

1. Elige tu variante y decláralo ([docs/01-variantes.md](../../../proyecto-integrador/docs/01-variantes.md)).
2. Trabaja en tu propia copia del proyecto (rama y Pull Request, como en el curso de Git y GitHub).
3. Corre el verificador y resuelve lo pendiente.
4. Copia [docs/plantilla-entrega.md](../../../proyecto-integrador/docs/plantilla-entrega.md) como `docs/entrega.md` en tu proyecto y complétala: checklist, trazabilidad, decisiones por día, evidencia de seguridad y extensión propia.
5. Prepara una demostración de **depuración con DevTools**: un bug real que encontraste, con un breakpoint, el panel Scope o el panel Network.
6. Deja `npm test` y el CI en verde.
7. Prepara tu presentación de 5 minutos (el guion está en la plantilla de entrega).

## Cómo verificar

Necesitas Node.js 18+ y no hay que instalar nada. Desde esta carpeta:

```bash
node verificar.mjs                       # revisa ../../../proyecto-integrador
node verificar.mjs ruta/a/tu/proyecto    # revisa tu propia copia
```

El verificador revisa el código de `src/` y las pruebas de forma **estática** (no ejecuta tu proyecto) y muestra cada criterio como `ok` o `FALLA` con el motivo. Al final lista lo que debes revisar tú a mano. Para ejecutar las pruebas usa `npm test` en tu proyecto.

## Qué se evalúa

- Funcionalidad completa de la variante elegida.
- Calidad y organización del código.
- Cobertura razonable de pruebas, incluida la capa de seguridad (el proyecto pide además al menos 3 pruebas por variante).
- **Trazabilidad:** poder señalar una regla de la política y la línea de código o la prueba que la implementa.
- Presentación de 5 minutos con defensa técnica.

## Videos de apoyo

- [Aprende en 3 minutos: pruebas unitarias y pruebas de integración](https://www.youtube.com/watch?v=UwoCR0eJNgo)
- [Pruebas unitarias y de integración – Curso de Tester de Software](https://www.youtube.com/watch?v=4Ulc8FcmfnQ)
- [Jest JS tutorial en español para principiantes – Curso de Testing](https://www.youtube.com/watch?v=tgWBQZNCOT0)
- [Introducción al Testing desde cero con Jest](https://www.youtube.com/watch?v=_DzBez4qMi0)
- [¿Cómo se escribe una buena prueba unitaria en JavaScript? 10 buenas prácticas](https://www.youtube.com/watch?v=Rqyg8kjpzX0)
- [Debugging como un profesional en JavaScript con DevTools del navegador – Programación en español](https://www.youtube.com/watch?v=ps1WhgelV_E)
- [Curso de JavaScript #10: Debug y DevTools](https://www.youtube.com/watch?v=Oz3InVBI_K4)
- [Depurar JavaScript con el navegador y con Visual Studio Code](https://www.youtube.com/watch?v=CRXMli2ZkS8)
- [Patrón Singleton – Patrones de diseño – Programación en español](https://www.youtube.com/watch?v=YRLvJfItAT4)
- [#1 Singleton – Patrones de diseño con JavaScript](https://www.youtube.com/watch?v=OuKl1HwD1x8)
- [Patrón Module en JavaScript: ejemplo paso a paso](https://www.youtube.com/watch?v=uNBZ8ohLnxM)

## Nota de divulgación

Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
