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
  nombre_rol:                   string;
  id_unidad_organizacional:     number;
  nombre_unidad_organizacional: string;
  componente:                   Componente[];
}

export interface Componente {
  nombre_componente:  string;
  estado:             boolean;
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
