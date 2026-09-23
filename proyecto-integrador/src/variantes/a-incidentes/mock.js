// Datos de ejemplo para sembrar la app cuando no hay conexión al feed inicial.
// Ficticios y evidentes como tales — ver mock.json para el mismo contenido en formato plano.
export default [
  {
    id: 'inc-001',
    fechaReporte: '2026-09-01T09:00:00.000Z',
    categoria: 'phishing',
    descripcion: 'Correo sospechoso reportado por usuario de Contabilidad',
    reportantePseudonimo: 'reportante-A1',
    impacto: 2,
    urgencia: 3,
    estado: 'nuevo',
  },
  {
    id: 'inc-002',
    fechaReporte: '2026-09-02T14:30:00.000Z',
    categoria: 'equipo-extraviado',
    descripcion: 'Laptop institucional no localizada tras evento externo',
    reportantePseudonimo: 'reportante-B7',
    impacto: 3,
    urgencia: 2,
    estado: 'en-triage',
  },
  {
    id: 'inc-003',
    fechaReporte: '2026-09-03T11:15:00.000Z',
    categoria: 'acceso-sospechoso',
    descripcion: 'Múltiples intentos fallidos de inicio de sesión fuera de horario',
    reportantePseudonimo: 'reportante-C3',
    impacto: 1,
    urgencia: 1,
    estado: 'cerrado',
  },
];
