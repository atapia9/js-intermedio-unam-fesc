export function esCorreoValido(correo) {
  return /\S+@\S+\.\S+/.test(correo);
}

export function esTelefonoValido(telefono) {
  return /^\d{10}$/.test(telefono);
}
