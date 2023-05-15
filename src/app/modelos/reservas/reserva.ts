//Obtener reserva -> Crear reserva

export interface Reserva {
  reservas:          ReservaElement[];
  reservaDisponible: ReservaDisponible[];
  reservaReservada:  any[];
}

export interface ReservaDisponible {
  value: number;
  label: string;
}

export interface ReservaElement {
  id_unidad_organizacional:     number;
  nombre_unidad_organizacional: string;
}

//Obtener reserva -> Consultar reserva

export interface ObtenerReserva {
  id_reserva:                   number;
  nombre_unidad_organizacional: string;
  nombre_submodulo:             string;
  nombre_usuario:               string;
  fecha_inicio_reserva:         Date;
  fecha_fin_reserva:            Date;
  descripcion_reserva:          string;
  estado_reserva:               string;
  reservaDias:                  ReservaDia[];
}

export interface ReservaDia {
  reserva_dia_id:          number;
  id_reserva:              number;
  reserva_dia_dia:         string;
  reserva_dia_hora_inicio: number;
  jornada:    string;
}
