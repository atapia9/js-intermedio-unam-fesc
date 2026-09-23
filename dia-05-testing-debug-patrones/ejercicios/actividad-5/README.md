# Actividad 5 — Proyecto integrador (BIS)

Cierre del curso, Sesión 5 del [manual del curso](../../README.md):

> **Proyecto integrador — Requisitos mínimos**
>
> - Tema 1: al menos un closure con propósito claro (por ejemplo, un generador de IDs únicos) y uso correcto de `let`/`const`.
> - Tema 2: al menos una clase ES6 con campos privados, y el código organizado en módulos ESM (mínimo 3 archivos).
> - Tema 3: consumo de una API pública con Fetch, usando `async`/`await` y manejo de errores con `try`/`catch`.
> - Tema 4: delegación de eventos para las interacciones de la lista, y persistencia del estado en `localStorage`.
> - Tema 5: al menos 4 pruebas unitarias con Jest sobre la lógica de negocio (sin DOM), y uso documentado de las DevTools durante el desarrollo (breakpoints en al menos un bug real encontrado).
>
> **Criterios de evaluación del proyecto:** funcionalidad completa, calidad y organización del código, cobertura razonable de pruebas, y una breve exposición (5 minutos) explicando las decisiones técnicas tomadas.

El manual lo llama *Task Manager*; en este repositorio el proyecto es **BIS** ([proyecto-integrador](../../../proyecto-integrador/README.md)) y cubre los mismos requisitos, más una capa de seguridad.

**Sobre la ponderación.** La rúbrica del manual (Anexo C) da 40 puntos a las "Actividades de aprendizaje (5 actividades, una por sesión)" y 20 puntos a la "Evaluación final / proyecto integrador". Pero el manual define solo cuatro actividades de aprendizaje (Sesiones 1 a 4) y, en la Sesión 5, este proyecto. Aquí se trata como la Actividad 5; **confirma con el instructor** si el proyecto se pondera con las actividades, con la evaluación final o en ambas.

Esta actividad se evalúa, por eso el repositorio incluye un verificador de criterios, pero **no un proyecto resuelto**: el scaffold es tu punto de partida.

## Los criterios y dónde se cumplen

| Tema | Requisito del manual | Dónde aterriza en BIS | Cómo se comprueba |
|---|---|---|---|
| 1 | IDs únicos con closures | `nucleo/Registro.js`, `nucleo/almacenamiento.js` | verificador |
| 2 | Clases, **campos privados** y al menos 3 módulos ESM | `nucleo/Registro.js`, `variantes/…/Incidente.js`, todo `src/` | verificador |
| 3 | `fetch`, `async/await` y `try/catch` | `nucleo/api.js` | verificador |
| 4 | Delegación de eventos y `localStorage` | `nucleo/app.js`, `nucleo/almacenamiento.js` | verificador |
| 4 | Sanitización del texto libre (capa de seguridad de BIS) | `nucleo/sanitizar.js` | verificador |
| 5 | Al menos 4 pruebas con Jest | `tests/` | verificador (las cuenta y las ejecuta con `npm test`) |
| 5 | Depuración con DevTools | sección 6 de tu `docs/entrega.md` y tu demostración | manual: en tu exposición |
| — | Presentación de 5 minutos con defensa técnica | guion en la plantilla de entrega | manual: instructor |

El scaffold ya cumple los criterios comprobables del verificador; lo que falte es tu parte. `Registro` ya protege su `#estado` con un campo privado y un getter (solo `cambiarEstado()` lo modifica), que es el ejemplo a seguir: cuando definas la entidad de tu variante, protege también sus datos sensibles con campos privados, y conserva esa protección al extender el proyecto.

## Qué debes hacer

1. Elige tu variante y decláralo ([docs/01-variantes.md](../../../proyecto-integrador/docs/01-variantes.md)).
2. Trabaja en tu propia copia del proyecto (rama y Pull Request, como en el curso de Git y GitHub).
3. Corre el verificador y resuelve lo pendiente.
4. Copia [docs/plantilla-entrega.md](../../../proyecto-integrador/docs/plantilla-entrega.md) como `docs/entrega.md` en tu proyecto y complétala: checklist, trazabilidad, decisiones por día, evidencia de seguridad, **evidencia de depuración con DevTools** y extensión propia.
5. Prepara una demostración de **depuración con DevTools**: un bug real que encontraste, con un breakpoint, el panel Scope, Call Stack o Network. Documéntalo en la sección 6 de tu `docs/entrega.md`.
6. Deja `npm test` y el CI en verde (el verificador ejecuta `npm test` por ti).
7. Prepara tu presentación de 5 minutos (el guion está en la plantilla de entrega).

## Cómo verificar

Necesitas Node.js 18+. Para que el verificador pueda ejecutar las pruebas, instala antes las dependencias **una vez** en la raíz del repositorio (o en la de tu propio proyecto):

```bash
npm install
```

Después, desde esta carpeta:

```bash
node verificar.mjs                       # revisa ../../../proyecto-integrador
node verificar.mjs ruta/a/tu/proyecto    # revisa tu propia copia
node verificar.mjs --sin-pruebas         # solo la auditoría estática, sin ejecutar npm test
```

El verificador hace tres cosas:

1. **Audita el código** de `src/` y de las pruebas de forma estática y muestra cada criterio como `ok` o `FALLA` con el motivo.
2. **Ejecuta `npm test`** y da `FALLA` si alguna prueba falla, si faltan las dependencias o si tardan más de 3 minutos. Busca el `package.json` con el script `test` desde tu proyecto hacia arriba; si está en una carpeta superior (como en este repositorio), ejecuta solo las pruebas de tu proyecto.

3. **Exige la captura de DevTools** cuando ya copiaste la plantilla como `docs/entrega.md`: el archivo debe tener la sección 6 y, en el campo "Captura de pantalla", la ruta de un archivo (imagen o video) que **exista y no esté vacío dentro de `docs/evidencias/`**. Acepta la ruta completa (`docs/evidencias/network-404.png`), solo el nombre del archivo o una imagen en Markdown; un enlace externo no vale. Si falta algo de eso, sale `FALLA`. Mientras no exista `docs/entrega.md`, este paso se omite.

Al final lista lo que debes revisar tú a mano y avisa (`pend`) si los demás campos de la sección 6 (síntoma, herramienta marcada, qué observaste, causa y corrección) siguen sin completar. Esos avisos no cambian el resultado del verificador, y el verificador no puede juzgar si lo que escribiste es verdad: eso lo valora el instructor en tu exposición.

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
