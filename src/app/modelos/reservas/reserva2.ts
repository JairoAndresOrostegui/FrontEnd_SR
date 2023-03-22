export interface Reservas {
  id_unidad_organizacional:        number;
  id_tipo_espacio:                 number;
  id_municipio:                    number;
  nombre_unidad_organizacional:    string;
  piso_unidad_organizacional:      number;
  capacidad_unidad_organizacional: number;
  estado_unidad_organizacional:    string;
  id_unidad_organizacional_padre:  number;
  caracteristicas:                 Caracteristica[];
}

export interface Caracteristica {
  id_unidad_organizacional_caracteristica:       number;
  id_caracteristica:                             number;
  nombre_caracteristica:                         string;
  id_unidad_organizacional:                      number;
  cantidad_unidad_organizacional_caracteristica: number;
}
