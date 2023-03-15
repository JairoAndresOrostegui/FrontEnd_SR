export interface Tipoespaciofisico {
  token: string;
  menu:  Menu;
}

export interface Menu {
  componente: Componente[];
}

export interface Componente {
  nombre_componente: string;
  funcionalidad:     Funcionalidad[];
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