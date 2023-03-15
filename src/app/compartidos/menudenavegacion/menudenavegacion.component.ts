import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosUsuario } from 'src/app/modelos/modelosData';

@Component({
  selector: 'app-menudenavegacion',
  templateUrl: './menudenavegacion.component.html',
  styleUrls: ['./menudenavegacion.component.css'],
  animations: [
    trigger('toggleBox', [
      state('open', style({ display: 'block' })),
      state('closed', style({ display: 'none' }))
    ])
  ]
})
export class MenudenavegacionComponent implements OnInit {

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  };

  toggle2(key: number) {
    this.Usuariomenu.datosLogin[key].estado = !this.Usuariomenu.datosLogin[key].estado;
  };

  constructor(public Usuariomenu: DatosUsuario, private router: Router) {
    if (typeof(this.Usuariomenu.datosLogin) === 'undefined') {
      this.router.navigate(['/']);
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
    this.Usuariomenu.datosLogin = [];
    this.router.navigate(['/']);
  }

}
