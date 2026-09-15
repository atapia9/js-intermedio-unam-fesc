function esCorreoValido(correo) {
  return /\S+@\S+\.\S+/.test(correo);
}

function esPasswordSegura(password) {
  // Al menos 8 caracteres, una mayúscula y un número
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

module.exports = { esCorreoValido, esPasswordSegura };
