# Plantilla de entrega — Proyecto Integrador (BIS)

Copia este archivo a `docs/entrega.md` en tu propio repo (generado desde `bis-plantilla`
o clonado de este scaffold) y complétalo antes de la sesión 5. Es lo que usarás como
guion en la exposición de 5 minutos.

> **Nota de divulgación:** Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. El contenido que tú completes es de tu autoría.

---

## 1. Datos

- **Participante(s):**
- **Variante elegida:** A (Triage de incidentes) / B (Phishing) / C (Hardening)
  <!-- Borra las que no apliquen -->
- **Repositorio:** `https://github.com/<usuario>/<repo>`
- **Fecha de entrega:**

## 2. Checklist de requisitos mínimos

- [ ] Agregar, clasificar y avanzar el estado de un registro (variante A: incidente).
- [ ] Persistencia en `localStorage` (sobrevive a recargar la página).
- [ ] Carga inicial con `fetch` + `async/await`, con validación de esquema y datos
      de respaldo sin conexión.
- [ ] Delegación de eventos: un único listener para toda la lista.
- [ ] Entidad de dominio modelada como clase ES6 que extiende `Registro`, con al menos
      un campo privado (`#campo`).
- [ ] Sanitización de todo texto libre (escape de HTML + enmascarado de PII) antes de
      guardar o mostrar.
- [ ] Mínimo 3 pruebas por variante con Jest (puntaje con casos frontera, payload XSS,
      enmascarado de PII), ninguna sobre el DOM.
- [ ] `npm test` en verde.
- [ ] Depuración con DevTools documentada (sección 6): un bug real encontrado con un
      breakpoint, el panel Scope, Call Stack o Network.
- [ ] CI en verde en el último Pull Request.
- [ ] Rama `main` protegida (PR aprobado + CI en verde como requisito).
- [ ] Tag y release `v1.0.0` creados.
- [ ] Ningún `.env`, token o dato personal real quedó versionado.

## 3. Tabla de trazabilidad (política ↔ código)

Completa al menos tres filas — es lo que sustenta la exposición.

| Regla de la política | Dónde vive en el código | Prueba que la verifica |
|---|---|---|
| _Ej.: un incidente con impacto×urgencia ≥ 9 es "crítica"_ | `src/variantes/a-incidentes/riesgo.js` | `tests/riesgo.test.js` |
| | | |
| | | |

## 4. Decisiones técnicas (una por día)

Reutiliza o adapta [docs/03-decisiones.md](03-decisiones.md) con tus propias
decisiones, no las del scaffold.

| Día | Decisión | Por qué |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

## 5. Evidencia de seguridad (día 4)

- **Payload de prueba usado:**
- **Captura de que se neutraliza** (guardar en `docs/evidencias/`):
- **Confirmación de que ningún dato real (nombre, correo, teléfono) quedó
  persistido:**

## 6. Evidencia de depuración con DevTools (día 5)

Documenta **un bug real** que encontraste en tu proyecto usando las herramientas de
desarrollo del navegador (no `console.log`). Es lo que mostrarás en vivo en la
exposición.

- **Síntoma** (qué veías y dónde; *ej.: la lista no mostraba datos de la API*):
- **Herramienta(s) que usaste** (marca las que apliquen):
  - [ ] Breakpoint en el panel Sources (archivo y línea: )
  - [ ] `debugger;` en el código
  - [ ] Breakpoint condicional (condición: )
  - [ ] Panel Scope (qué variable revisaste: )
  - [ ] Panel Call Stack (qué llamadas seguiste: )
  - [ ] Panel Network (qué petición revisaste y qué respondió: )
- **Qué observaste** (el valor de la variable, el orden de las llamadas o la respuesta
  de la petición, con evidencia, no con suposiciones):
- **Causa** (dónde se originó el error; puede ser distinta de dónde lo veías):
- **Corrección** (enlace al commit o Pull Request):
- **Captura de pantalla** (guarda el archivo en `docs/evidencias/` y escribe aquí su ruta, por ejemplo `docs/evidencias/network-404.png`):

## 7. Extensión propia

Describe brevemente qué agregaste más allá del scaffold base (filtros, categorías
adicionales, edición de registros, etc.):

## 8. Guion de exposición (5 minutos)

1. Caso y variante elegida (30 s).
2. Recorrido rápido del flujo de estados (30 s).
3. Una regla de la tabla de trazabilidad, señalada en vivo: política → línea de código
   (1 min).
4. La prueba de seguridad del día 4, corriendo en vivo (`npm test`) (45 s).
5. Depuración con DevTools en vivo: el bug de la sección 6, del síntoma a la causa
   (1 min).
6. Una decisión técnica que te costó trabajo y por qué la tomaste así (45 s).
7. Cierre: qué extendiste y qué harías distinto (30 s).
