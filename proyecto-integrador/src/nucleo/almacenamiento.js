// Día 1 (closures) + Día 5 (patrón Módulo): la clave de localStorage queda
// encapsulada; el resto de la app solo conoce cargar()/guardar().
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

export function crearAlmacenamiento(clave, ClaseRegistro) {
  return {
    cargar() {
      const crudo = localStorage.getItem(clave);
      if (!crudo) return [];
      try {
        const arreglo = JSON.parse(crudo);
        return arreglo.map(ClaseRegistro.desdeJSON);
      } catch {
        return [];
      }
    },
    guardar(registros) {
      localStorage.setItem(clave, JSON.stringify(registros.map((r) => r.toJSON())));
    },
  };
}
