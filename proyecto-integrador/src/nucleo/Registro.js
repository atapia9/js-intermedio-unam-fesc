// Día 2: clase base ES6, extendida por cada variante (Incidente, Correo, Equipo)
let siguienteIdAutogenerado = 1;

export default class Registro {
  constructor(estado, id = `local-${siguienteIdAutogenerado++}`) {
    if (new.target === Registro) {
      throw new Error('Registro es una clase base; usa una clase de variante (Incidente, Correo, Equipo)');
    }
    this.id = id;
    this.estado = estado;
    this.creadoEn = new Date().toISOString();
    this.actualizadoEn = this.creadoEn;
  }

  cambiarEstado(nuevoEstado, transicionesValidas) {
    const permitidos = transicionesValidas[this.estado] || [];
    if (!permitidos.includes(nuevoEstado)) {
      throw new Error(`Transición inválida: ${this.estado} → ${nuevoEstado}`);
    }
    this.estado = nuevoEstado;
    this.actualizadoEn = new Date().toISOString();
    return this.estado;
  }
}
