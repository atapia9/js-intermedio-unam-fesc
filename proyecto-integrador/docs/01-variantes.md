# Las tres variantes de BIS

Un solo motor (`src/nucleo/`), tres dominios posibles. Eliges una al declarar tu
proyecto (ver el `README.md` de tu propio repo generado desde la plantilla).

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

| | Variante | Entidad | Qué hace el usuario | Función de puntaje |
|---|---|---|---|---|
| **A** | **Triage de incidentes** *(predeterminada, la que trae este scaffold)* | `Incidente` | Registra, clasifica y cierra incidentes reportados por usuarios | Matriz impacto × urgencia → severidad |
| **B** | Bandeja de phishing | `Correo` | Revisa correos simulados y emite veredicto legítimo/sospechoso | Suma de señales detectadas → puntaje 0–100 |
| **C** | Inventario de hardening | `Equipo` | Marca controles de seguridad aplicados a cada equipo | Controles cumplidos / totales → % de cumplimiento |

## Por qué A es la opción sugerida

A es la única variante que ya tiene su política escrita (respuesta a incidentes), así
que la trazabilidad política ↔ código sale gratis: puedes señalar directamente en el
manual del curso la regla que `riesgo.js` implementa. B y C son válidas para quien
quiera diferenciarse, pero exigen redactar antes su propia política breve (alcance,
responsables, criterios, qué se registra) siguiendo el mismo formato.

## Cómo cambiar de variante

Todo el árbol es idéntico entre variantes salvo `src/variantes/<variante>/` y una
línea en `src/variante.js`:

```js
// Cambiar de variante = cambiar esta línea.
export { default as ClaseRegistro } from './variantes/a-incidentes/Incidente.js';
```

Si eliges B o C, crea `src/variantes/b-phishing/` o `src/variantes/c-hardening/` con
la misma forma que `a-incidentes/` (clase de dominio, función de puntaje pura,
`mock.js`, `campos.js`) y actualiza esa línea.
