// Día 4/5: capa de seguridad — escape de HTML y enmascarado de PII antes de persistir o renderizar.

const MAPA_ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escaparHTML(texto = '') {
  return String(texto).replace(/[&<>"']/g, (caracter) => MAPA_ESCAPE[caracter]);
}

const REGEX_CORREO = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const REGEX_TELEFONO = /\b\d{2,3}[\s-]?\d{3,4}[\s-]?\d{4}\b/g;

export function enmascararPII(texto = '') {
  return String(texto)
    .replace(REGEX_CORREO, (correo) => correo[0] + '***@***')
    .replace(REGEX_TELEFONO, '***-***-****');
}

export function sanitizarTextoLibre(texto = '') {
  return escaparHTML(enmascararPII(texto));
}
