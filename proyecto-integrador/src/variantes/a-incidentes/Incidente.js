import Registro from '../../nucleo/Registro.js';

export const CATEGORIAS = ['phishing', 'malware', 'acceso-sospechoso', 'equipo-extraviado', 'otro'];

const TRANSICIONES = {
  nuevo: ['en-triage', 'falso-positivo'],
  'en-triage': ['contenido', 'falso-positivo'],
  contenido: ['cerrado'],
  cerrado: [],
  'falso-positivo': [],
};

export default class Incidente extends Registro {
  constructor({ categoria, descripcion, reportantePseudonimo, impacto, urgencia, estado = 'nuevo', id, fechaReporte }) {
    super(estado, id);
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.reportantePseudonimo = reportantePseudonimo;
    this.impacto = impacto;
    this.urgencia = urgencia;
    this.fechaReporte = fechaReporte || this.creadoEn;
  }

  avanzar() {
    const siguientes = TRANSICIONES[this.estado];
    if (!siguientes || siguientes.length === 0) {
      throw new Error(`El incidente en estado "${this.estado}" no tiene siguiente paso`);
    }
    return this.cambiarEstado(siguientes[0], TRANSICIONES);
  }

  toJSON() {
    return {
      id: this.id,
      fechaReporte: this.fechaReporte,
      categoria: this.categoria,
      descripcion: this.descripcion,
      reportantePseudonimo: this.reportantePseudonimo,
      impacto: this.impacto,
      urgencia: this.urgencia,
      estado: this.estado,
    };
  }

  static desdeJSON(obj) {
    return new Incidente(obj);
  }

  static desdeAPI(item) {
    return new Incidente({
      categoria: 'otro',
      descripcion: item.title,
      reportantePseudonimo: `reportante-${item.userId}`,
      impacto: 1,
      urgencia: 1,
      estado: item.completed ? 'cerrado' : 'nuevo',
    });
  }
}
