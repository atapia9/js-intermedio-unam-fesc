# Registro de decisiones técnicas

Una entrada por día de curso — el molde para tu propia bitácora de decisiones, no un
sustituto de ella. Complétala conforme avanzas.

> **Nota de divulgación:** Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. El contenido que tú completes es de tu autoría.

## Día 1

- **Decisión:** la clave de `localStorage` se encapsula con un closure en
  `nucleo/almacenamiento.js` en lugar de exponerse como constante importable.
- **Por qué:** mínimo privilegio — solo `cargar()`/`guardar()` son la API pública.

## Día 2

- **Decisión:** `Registro` es una clase base abstracta (lanza error si se instancia
  directo); cada variante extiende con su propia entidad.
- **Por qué:** las tres variantes comparten `id`/`estado`/timestamps y transición de
  estado validada, pero difieren en campos de dominio.
- **Decisión:** `estado` es un campo privado (`#estado`) con getter; solo
  `cambiarEstado()` lo modifica.
- **Por qué:** nadie puede saltarse el flujo de la política asignando el estado
  directamente; toda transición pasa por la validación.

## Día 3

- **Decisión:** `nucleo/api.js` valida el esquema de la respuesta antes de aceptarla y
  cae a datos de ejemplo (`mock.js`) sin exponer el error original al usuario.
- **Por qué:** no confiar en datos externos; un mensaje interno no debe filtrarse.

## Día 4

- **Decisión:** el render usa `textContent`/`createElement` para el contenido dinámico
  del usuario, nunca `innerHTML` con datos sin sanitizar.
- **Por qué:** un payload como `<img src=x onerror=...>` en la descripción de un
  incidente no debe ejecutarse. Ver la prueba en `tests/sanitizar.test.js`.

## Día 5

- **Decisión:** la función de puntaje (`riesgo.js`) y la sanitización se prueban sin
  tocar el DOM.
- **Por qué:** son la lógica de negocio y de seguridad más crítica del proyecto;
  deben poder probarse rápido y en CI.
