# Modelo de riesgo y contrato de campos (variante A)

Estos nombres son el contrato compartido con la política del curso de Git y GitHub y
con el contenido de Ciberseguridad. Si algo se renombra aquí, debe renombrarse también
en la política escrita — no al revés.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Entidad `Incidente`

- Campos: `id`, `fechaReporte`, `categoria`, `descripcion`, `reportantePseudonimo`,
  `impacto` (1–3), `urgencia` (1–3), `estado`
- Categorías: `phishing` · `malware` · `acceso-sospechoso` · `equipo-extraviado` · `otro`
- Estados: `nuevo` → `en-triage` → `contenido` → `cerrado`, más `falso-positivo` como
  salida lateral desde `nuevo` o `en-triage`
- Severidad derivada (`src/variantes/a-incidentes/riesgo.js`): `baja` (producto 1–2) ·
  `media` (3–4) · `alta` (6) · `critica` (9)

## Regla de minimización de datos

Nada que identifique a una persona real se persiste. El campo `reportantePseudonimo`
guarda un identificador derivado (no un nombre ni un correo), y
`nucleo/sanitizar.js` enmascara correos y teléfonos que aparezcan dentro de texto libre
antes de guardarlo o mostrarlo.

## Trazabilidad esperada

En la exposición de cinco minutos debes poder señalar, en cualquier dirección:

- Una regla de la política de respuesta a incidentes → la línea de `riesgo.js` o
  `Incidente.js` que la implementa.
- Una prueba en `tests/` → la regla de negocio o de seguridad que verifica.

> Si tu grupo también cursa Git y GitHub, la política completa vive en el repositorio
> `PIG` (`politicas/respuesta-incidentes.md`) y este documento la resume solo en lo
> que afecta al modelo de datos.
