// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

import Incidente, { CATEGORIAS } from './Incidente.js';

// Descripción declarativa del formulario y de las columnas de la lista,
// para que src/nucleo/app.js sea idéntico entre variantes.
export default {
  titulo: 'BIS — Triage de incidentes',

  resumen(incidente) {
    return `[${incidente.categoria}] ${incidente.descripcion}`;
  },

  avanzarEstado(incidente) {
    incidente.avanzar();
  },

  leerFormulario(form) {
    const datos = new FormData(form);
    const descripcion = String(datos.get('descripcion') || '').trim();
    if (!descripcion) return null;
    return {
      categoria: String(datos.get('categoria') || 'otro'),
      descripcion,
      reportantePseudonimo: String(datos.get('reportantePseudonimo') || 'anonimo'),
      impacto: Number(datos.get('impacto') || 1),
      urgencia: Number(datos.get('urgencia') || 1),
    };
  },

  crearDesdeFormulario(datos) {
    return new Incidente(datos);
  },

  categorias: CATEGORIAS,
};
