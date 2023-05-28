export interface Reservas3 {
  id_unidad_organizacional_padre:  number;
  id_tipo_espacio:                 number;
  fecha_inicio_reserva:            Date;
  fecha_fin_reserva:               Date;
  reserva_dia_dia:                 string;
  reserva_dia_hora_inicio:         string;
  reserva_dia_hora_fin:            string;
  estado:                          string;
  id_caracteristica:               number;
  capacidad_unidad_organizacional: number;
}

export interface docentes {
  id_profesor: string;
  nombre_persona: string;
}
