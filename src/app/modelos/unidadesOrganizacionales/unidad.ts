export interface Unidad {
  message:                              string;
  id_unidad_organizacional:             number;
  id_tipo_espacio:                      number;
  id_municipio:                         number;
  id_departamento:                      number;
  id_unidad_organizacional_padre:       number;
  nombre_tipo_espacio:                  string;
  nombre_municipio:                     string;
  nombre_departamento:                  string;
  nombre_unidad_organizacional:         string;
  piso_unidad_organizacional:           number;
  capacidad_unidad_organizacional:      number;
  estado_unidad_organizacional:         string;
  nombre_unidad_organizacional_padre:   string;
  caracteristicas:                      Caracteristica[];
}

export interface Caracteristica {
  message:                                          string;
  id_unidad_organizacional_caracteristica:          number;
  nombre_caracteristica:                            string;
  estado_caracteristica:                            string;
  id_caracteristica:                                number;
  id_unidad_organizacional:                         number;
  cantidad_unidad_organizacional_caracteristica:    number
}

export interface Tipoespaciofisico {
  message:             string;
  id_tipo_espacio:     number;
  nombre_tipo_espacio: string;
  estado_tipo_espacio: string;
}

export interface ConsultaUnidadReserva {
  id_unidad_organizacional:     number;
  nombre_unidad_organizacional: string;
  nombre_tipo_espacio:          null;
}