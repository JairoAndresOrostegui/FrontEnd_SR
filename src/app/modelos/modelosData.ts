import { Injectable } from '@angular/core';
import { PermisosRol } from './login';

@Injectable({
  providedIn: 'root'
})

export class DatosUsuario {

  datosLogin?: any;

  permisos?: PermisosRol;

  datosUnidad?: any;

}
