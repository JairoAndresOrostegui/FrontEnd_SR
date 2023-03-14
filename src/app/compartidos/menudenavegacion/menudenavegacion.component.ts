import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosUsuario } from 'src/app/modelos/modelosData';

@Component({
  selector: 'app-menudenavegacion',
  templateUrl: './menudenavegacion.component.html',
  styleUrls: ['./menudenavegacion.component.css']
})
export class MenudenavegacionComponent implements OnInit {

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  };

  toggle2(key: number) {
    this.Usuariomenu.datosLogin.user.componente[key].estado = !this.Usuariomenu.datosLogin.user.componente[key].estado;
  };

  constructor(public Usuariomenu: DatosUsuario, private router: Router) {
    if (typeof(this.Usuariomenu.datosLogin) === 'undefined') {
      this.router.navigate(['/']);
    } else {
      for(let item of Usuariomenu.datosLogin.user.componente) {
        item.estado = true;
      }
    }
  };

  establecerfuncionalidad(sublista: any): void {
    this.Usuariomenu.funcionalidadActiva = sublista.nombre_funcionalidad;
    this.Usuariomenu.permisos = sublista.permisosRol;
    this.router.navigate(['/'+sublista.url_funcionalidad]);
  }

  ngOnInit(): void {
  }

  reset() {
    this.Usuariomenu.funcionalidadActiva = '';
    this.Usuariomenu.datosLogin.user = [];
    this.router.navigate(['/']);
  }

}
