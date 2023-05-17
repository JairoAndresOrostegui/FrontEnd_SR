export interface Login {
  token: string;
  message: string;
  user:  UserData[];
}

export interface UserData {
  id_usuario:                   number;
  login_usuario:                string;
  id_persona:                   number;
  primer_nombre_persona:        string;
  primer_apellido_persona:      string;
  id_rol:                       number;
  nombre_rol:                   string;
  id_unidad_organizacional:     number;
  nombre_unidad_organizacional: string;
  nivel_rol:                    number;
  area_rol:                     string;
  rol_estapcio:                 Rol_espacio[];
  componente:                   Componente[];
}

export interface Rol_espacio {
  value:   number;
  label:   string;
}

export interface Componente {
  nombre_componente:  string;
  funcionalidad:      Funcionalidad[];
}

export interface Funcionalidad {
  nombre_funcionalidad: string;
  url_funcionalidad:    string;
  permisosRol:          PermisosRol;
}

export interface PermisosRol {
  agregar:   string;
  modificar: string;
  consultar: string;
  eliminar:  string;
}
