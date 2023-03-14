import { Injectable } from '@angular/core';
import { PermisosRol } from './login';

@Injectable({
  providedIn: 'root'
})

export class DatosUsuario {

  funcionalidadActiva?: string = '';

  permisos?: PermisosRol;

  datosLogin?: any;

  datosUnidad?: any;

}
