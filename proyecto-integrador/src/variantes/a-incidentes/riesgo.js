// Función pura, sin dependencias del DOM: matriz impacto × urgencia → severidad.
// Refleja PIG/politicas/respuesta-incidentes.md (ver docs/02-modelo-riesgo.md).
export function calcularPuntaje(incidente) {
  const producto = incidente.impacto * incidente.urgencia;
  let severidad;
  if (producto >= 9) severidad = 'critica';
  else if (producto >= 6) severidad = 'alta';
  else if (producto >= 3) severidad = 'media';
  else severidad = 'baja';

  return { valor: producto, severidad, etiqueta: `${severidad} (${producto})` };
}
