export interface Rol {
  message:                              string;
  id_rol:                               string;
  nombre_rol:                           string;
  tamano_minimo_clave_rol:              number;
  vigencia_actualizacion_clave_rol:     number;
  vigencia_actualizacion_datos_rol:     number;
  maximo_autenticaciones_fallidas_rol:  number;
  actualizacion_datos_usuario_rol:      string;
  actualizacion_clave_usuario_rol:      string;
  estado_rol:                           number;
  permisosRol:                        PermisoParaRol;
}

export interface PermisoParaRol {
  id_funcionalidad: number;
  nombre_funcionalidad: string;
  agregar:   string;
  modificar: string;
  consultar: string;
  eliminar:  string;
}
