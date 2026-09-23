// Responsabilidad: TODO — describe en una frase qué hace este archivo.
//
// Actividad de aprendizaje 3 — solución de los ejercicios 3.1 a 3.4 del manual: el flujo de usuarios en sus tres versiones
// (callbacks, promesas y async/await, comentadas en este mismo archivo para compararlas) y el cliente de API listarUsuarios.
// El contrato de cada función está en el README de la actividad. En cada bloque completa las tres líneas
// "Qué hace", "Por qué funciona" y "Concepto" con tus palabras. Las funciones marcadas "se entrega" no se modifican.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

import { ErrorRed, ErrorHTTP, ErrorJSON } from './errores.js';

// Retardo de las operaciones simuladas (el manual usa 500 ms). El verificador lo baja para ir más rápido.
export const config = { retardoMs: 500 };

// ===== Bloque 3.1 — Identificar el problema =====
// Videos de apoyo (ficha 3.2 del README del día):
//   - Asincronismo en JS: ¿qué es el Callback Hell? – JS desde cero #15: https://www.youtube.com/watch?v=iAq9SOEODvo
//   - Callbacks: ¿qué son y cómo utilizarlos? – Evitar callback hell: https://www.youtube.com/watch?v=WYVOvwTZ7Bo
//   - Qué es el antipatrón Callback Hell en JavaScript: https://www.youtube.com/watch?v=TcEjFk1cDzU
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
// Problema 1: TODO (un problema concreto de mantenibilidad del fragmento de abajo)
// Problema 2: TODO
// Problema 3: TODO

// Se entrega así (ejercicio 3.1): tres llamadas anidadas a una lectura de archivos simulada con callbacks.
export function leerArchivo(nombre, callback) {
  setTimeout(() => {
    if (nombre.endsWith('.bad')) callback(new Error(`No se pudo leer ${nombre}`));
    else callback(null, `contenido de ${nombre}`);
  }, config.retardoMs);
}

export function procesarArchivos(callback) {
  leerArchivo('a.txt', (err1, a) => {
    if (err1) return callback(err1);
    leerArchivo('b.txt', (err2, b) => {
      if (err2) return callback(err2);
      leerArchivo('c.txt', (err3, c) => {
        if (err3) return callback(err3);
        callback(null, [a, b, c].join(' | '));
      });
    });
  });
}

// ===== Bloque 3.2 — Migración de callbacks a promesas =====
// Videos de apoyo (ficha 3.3 del README del día):
//   - Promesas: new Promise, resolve, reject, then, catch: https://www.youtube.com/watch?v=W-HPYsmHG6U
//   - Cómo usar promesas en JavaScript – JS en Español: https://www.youtube.com/watch?v=urapbZL9knY
//   - Promesas: métodos Promise.all y race en JavaScript: https://www.youtube.com/watch?v=-xhWDNm3XvY
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO

// Se entrega así (ejemplo 3.2 del manual): la versión con CALLBACKS del flujo de usuarios, para compararla con las otras dos.
export function obtenerUsuario(id, callback) {
  setTimeout(() => {
    callback({ id, nombre: 'Cliente ' + id });
  }, config.retardoMs);
}

export function flujoUsuariosCallbacks(callback) {
  obtenerUsuario(1, (usuario) => {
    obtenerUsuario(usuario.id + 1, (siguiente) => {
      obtenerUsuario(siguiente.id + 1, (otro) => {
        callback(otro); // anidamiento creciente: el "Callback Hell"
      });
    });
  });
}

export function obtenerUsuarioProm(id) {
  // TODO
}

export function flujoUsuariosPromesas(idInicial = 1) {
  // TODO
}

// ===== Bloque 3.3 — Reescritura con async/await =====
// Videos de apoyo (ficha 3.4 del README del día):
//   - Promesas y async-await: then y catch – JS desde cero #16: https://www.youtube.com/watch?v=ksg6SDwllDs
//   - Callback, Promesas, Async Await y Try Catch | JavaScript: https://www.youtube.com/watch?v=p3Oq3AfuteA
//   - JavaScript asíncrono con Async Await: https://www.youtube.com/watch?v=za8Z6saKVdw
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
export async function flujoUsuariosAsync(idInicial = 1) {
  // TODO
}

export async function flujoUsuariosParalelo() {
  // TODO
}

// ===== Bloque 3.4 — Cliente de API con manejo de errores =====
// Videos de apoyo (ficha 3.5 del README del día):
//   - Cómo consumir una API REST con Fetch + Promises con gestión de errores: https://www.youtube.com/watch?v=FJ-w0tf3d_w
//   - Curso de JavaScript: API fetch – manejo de errores: https://www.youtube.com/watch?v=U0Qoq3hYPZA
//   - Javascript Fetch API: qué es y cómo consumir un API: https://www.youtube.com/watch?v=lkMq_qzCV_M
//
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
export async function listarUsuarios(urlBase = 'https://jsonplaceholder.typicode.com', ruta = '/users') {
  // TODO
}
