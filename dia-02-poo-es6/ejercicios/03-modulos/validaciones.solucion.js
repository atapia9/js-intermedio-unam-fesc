// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

export function esCorreoValido(correo) {
  return /\S+@\S+\.\S+/.test(correo);
}

export function esTelefonoValido(telefono) {
  return /^\d{10}$/.test(telefono);
}
