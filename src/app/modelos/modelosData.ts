import { Injectable } from '@angular/core';
import { PermisosRol } from './autenticacion/login';

@Injectable({
  providedIn: 'root'
})

export class DatosUsuario {

  funcionalidadActiva?: string = '';

  permisos?: PermisosRol;

  datosLogin?: any;

  datosUnidad?: any;

  datosCaracteristica?: any;

  datosTipoEspacio?: any;

  datosReserva?: any;

}
