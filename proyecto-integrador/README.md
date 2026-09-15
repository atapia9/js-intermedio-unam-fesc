# Proyecto integrador — BIS (Bitácora de Incidentes de Soporte)

Como cierre del curso, cada participante (o pareja, según indique el instructor)
desarrolla **BIS**, una aplicación web que registra y da seguimiento a incidentes de
soporte, integrando los cinco temas revisados durante la semana **y** una capa de
seguridad aplicada.

BIS no es un caso aislado: es la mitad ejecutable de un caso que también cursas en
Git y GitHub (la política escrita) y en Ciberseguridad para personal de soporte (el
contenido). Ver [docs/00-caso.md](docs/00-caso.md).

## Las tres variantes

Este scaffold trae lista y funcional la **variante A — Triage de incidentes**
(la opción sugerida). Existen dos variantes adicionales, B y C, para quien quiera
diferenciarse; ver [docs/01-variantes.md](docs/01-variantes.md) para elegir y declarar
la tuya.

## Criterios de evaluación

- Funcionalidad completa de la variante elegida.
- Calidad y organización del código.
- Cobertura razonable de pruebas, incluida la capa de seguridad.
- **Trazabilidad:** poder señalar, en cualquier dirección, una regla de la política y
  la línea de código (o prueba) que la implementa.
- Breve exposición (5 minutos) explicando las decisiones técnicas tomadas.

## Requisitos funcionales mínimos

1. Registrar, clasificar y avanzar el estado de un incidente (u otro registro, según
   variante).
2. Persistir los registros en `localStorage` (sobreviven al recargar la página).
3. Cargar un feed inicial con `fetch` + `async/await`, validando su esquema antes de
   aceptarlo, con datos de ejemplo como respaldo sin conexión.
4. Usar delegación de eventos para manejar clicks en la lista (un único listener, no
   uno por elemento).
5. Modelar la entidad de dominio como una **clase ES6** que extiende `Registro`.
6. Sanitizar todo texto libre capturado del usuario (escape de HTML + enmascarado de
   correo/teléfono) antes de guardarlo o mostrarlo.
7. Incluir al menos tres pruebas por variante con Jest: la función de puntaje con
   casos frontera, la sanitización con un payload tipo XSS, y el enmascarado de PII.
   Ninguna de estas pruebas toca el DOM.

## Cómo está organizado este scaffold

```
proyecto-integrador/
├── index.html
├── src/
│   ├── main.js               Punto de entrada: conecta núcleo + variante activa
│   ├── variante.js           Una línea: qué variante está activa
│   ├── nucleo/                Idéntico entre variantes
│   │   ├── Registro.js           Clase base ES6 (id, estado, timestamps)
│   │   ├── almacenamiento.js     Closure que encapsula la clave de localStorage
│   │   ├── sanitizar.js          Escape de HTML + enmascarado de PII
│   │   ├── api.js                Carga del feed inicial con validación de esquema
│   │   └── app.js                DOM, delegación de eventos, render
│   └── variantes/
│       └── a-incidentes/     Incidente.js · riesgo.js · mock.js · campos.js
├── tests/                    Puntaje, sanitización, PII, transiciones de estado
└── docs/                     00-caso · 01-variantes · 02-modelo-riesgo · 03-decisiones
```

## Cómo ejecutar

- Sirve la carpeta con un servidor estático (usa módulos ESM nativos, no requiere
  build): por ejemplo `npx serve .` o `python3 -m http.server` desde
  `proyecto-integrador/`, y abre `index.html` en el navegador.
- Para correr las pruebas: desde la raíz del repositorio, `npm install && npm test`.

## Mapeo día ↔ archivo

| Día | Tema de JavaScript | Capa de seguridad | Dónde aterriza en BIS |
|---|---|---|---|
| 1 | Closures, scope, `this` | Mínimo privilegio | `nucleo/almacenamiento.js` |
| 2 | Clases ES6, módulos ESM | Clasificación y severidad según la política | `nucleo/Registro.js`, `variantes/a-incidentes/Incidente.js` |
| 3 | Async/await, Fetch | No confiar en datos externos | `nucleo/api.js` |
| 4 | DOM, delegación, Storage, formularios | Sanitización, enmascarado de PII | `nucleo/app.js`, `nucleo/sanitizar.js` |
| 5 | Jest, DevTools, patrones | Prueba de seguridad dentro de la suite | `tests/` |

## Plantilla de entrega

Usa [docs/plantilla-entrega.md](docs/plantilla-entrega.md) como guion para preparar
tu entrega y tu exposición de 5 minutos: checklist de requisitos, tabla de
trazabilidad y registro de decisiones.

Este scaffold es un punto de partida — se espera que cada participante lo extienda
(filtros, más categorías, adjuntos, edición de registros, etc.), y que quien elija
variante B o C complete su función de puntaje siguiendo el mismo patrón que
`riesgo.js`.
