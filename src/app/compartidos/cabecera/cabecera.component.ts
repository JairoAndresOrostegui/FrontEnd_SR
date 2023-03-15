import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from 'src/app/modelos/modelosData';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  nombreUsuario: string;
  nombreFuncionalidad: string;

  constructor(public Usuario: DatosUsuario) {
    this.nombreUsuario = '';
    this.nombreFuncionalidad = '';
  }

  ngOnInit(): void {
  }

}
