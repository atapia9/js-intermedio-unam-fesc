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
// Qué hace: TODO
// Por qué funciona: TODO
// Concepto: TODO
export async function listarUsuarios(urlBase = 'https://jsonplaceholder.typicode.com', ruta = '/users') {
  // TODO
}
