export interface Hdocente {
  reserva_dia_dia:           string;
  reporteReservaDiaDocentes: ReporteReservaDiaDocentes;
}

export interface ReporteReservaDiaDocentes {
  fecha_inicio_reserva:         Date;
  fecha_fin_reserva:            Date;
  nombre_programa:              string;
  nivel:                        number;
  nombre_unidad_organizacional: string;
  reserva_dia_hora_inicio:      number;
}