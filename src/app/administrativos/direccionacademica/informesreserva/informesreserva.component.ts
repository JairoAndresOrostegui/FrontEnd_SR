import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-informesreserva',
  templateUrl: './informesreserva.component.html',
  styleUrls: ['./informesreserva.component.css']
})
export class InformesreservaComponent implements OnInit {

  reportes: any;


  //Quemados
  programas = [
    { value: 1, label: 'Diplomado en programación web (PW)'},
    { value: 2, label: 'Diplomado en programación móvil (PM)'},
    { value: 3, label: 'Curso de contabilidad avanzada (CA)'},
    { value: 4, label: 'Curso de Secretariado (CS)'}
  ];
  usuarios = [
    { value: 1, label: 'Carlos Ramirez'},
    { value: 2, label: 'Jaime Berrio'},
    { value: 3, label: 'Jairo Orostegui'},
    { value: 4, label: 'Manuel Vasquez'}
  ];

  constructor(private toastr: ToastrService, private _peticion: RestService, public Usuario: DatosUsuario) {
    this.mostrarLista(1);
  }

  ngOnInit(): void {
  }

  mostrarLista(id: number): void {
    if (id === 1) {/*
      this._peticion.getselect('sede/combo?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
        this.reportes = respuesta;
      });*/
      this.reportes = [];
    } else if (id === 2) {/*
    this._peticion.getselect('tipounidad/combo?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
      this.reportes = respuesta;
    });*/
    this.reportes = [];
    } else if (id === 3) {/*
    this._peticion.getselect('sede/combo?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
      this.reportes = respuesta;
    });*/
    this.reportes = this.programas;
    } else if (id === 4) {/*
    this._peticion.getselect('sede/combo?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
      this.reportes = respuesta;
    });*/
    this.reportes = this.usuarios;
    }
  }

}