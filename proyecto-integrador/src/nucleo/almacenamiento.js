// Día 1 (closures) + Día 5 (patrón Módulo): la clave de localStorage queda
// encapsulada; el resto de la app solo conoce cargar()/guardar().
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
