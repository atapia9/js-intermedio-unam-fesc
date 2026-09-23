# Seguridad

Este repositorio es material educativo del curso JavaScript Intermedio (UNAM · FES
Cuautitlán · REDEC). El proyecto integrador (BIS) incluye una capa de seguridad
aplicada como parte del aprendizaje, no como un producto en producción.

> **Nota de divulgación:** Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

## Minimización de datos

El proyecto integrador **no debe** contener nombres reales, correos, teléfonos u
otros datos que identifiquen a una persona real. Todo dato de ejemplo (`mock.js`,
capturas en `docs/evidencias/`, etc.) debe ser ficticio y evidente como tal.

## Reportar un problema

Si encuentras un problema de seguridad en el material del curso (por ejemplo, un
ejemplo de código que enseñe una práctica insegura sin advertirlo), abre un issue
describiéndolo. No incluyas datos sensibles ni credenciales en el reporte.

## Variables de entorno

Este proyecto no requiere credenciales para funcionar (usa una API pública de
prueba). Si extiendes el proyecto integrador con una API que requiera clave,
documenta la variable en `.env.example` y nunca la commitees en texto plano.
