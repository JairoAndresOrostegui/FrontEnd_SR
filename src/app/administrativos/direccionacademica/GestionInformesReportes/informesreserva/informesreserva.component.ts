import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ModalgraficotortaComponent } from 'src/app/compartidos/modales/modalgraficotorta/modalgraficotorta.component';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-informesreserva',
  templateUrl: './informesreserva.component.html',
  styleUrls: ['./informesreserva.component.css']
})
export class InformesreservaComponent implements OnInit {

  reportes: any;
  sedes: any;
  mes: any;
  sede: any;
  
  temp: number;
  tittle: string = '';

  //programas: any;
  //usuarios: any;

  //Quemados
  meses = [
    { value: 1, label: 'Enero'},
    { value: 2, label: 'Febrero'},
    { value: 3, label: 'Marzo'},
    { value: 4, label: 'Abril'},
    { value: 5, label: 'Mayo'},
    { value: 6, label: 'Junio'},
    { value: 7, label: 'Julio'},
    { value: 8, label: 'Agosto'},
    { value: 9, label: 'Septiembre'},
    { value: 10, label: 'Octubre'},
    { value: 11, label: 'Noviembre'},
    { value: 12, label: 'Diciembre'}
  ];
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


  constructor(private toastr: ToastrService, private _peticion: RestService, public Usuario: DatosUsuario, public confirmacion: MatDialog,) {
    this.mostrarLista(1);
    this._peticion.getselect('unidadrol?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
      this.sedes = respuesta;
      this.tittle = this.sedes[0].label;
    });
    this.mes = 1;
    this.sede = 2;
    this.temp = 1;
  }

  ngOnInit(): void {}

  mostrarLista(id: number): void {
    if (id === 1) {
      this.reportes = [{ value: 1, label: 'Comparativo entre sedes' }];
    } else if (id === 2) {
      this._peticion.getselect('rolespacio?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
        this.reportes = respuesta;
      });
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
    this.temp = id;
  }

  mostrarGrafico(id: number): void {
    this._peticion.getselect('reserva/informe-allsede').subscribe((respuesta) => {
      let rta: any = respuesta;
      let data = [];
      for (let item of rta) {
        const temp = {
          "name": item.nombre_sede,
          "value": item.cantidad_reserva
        }
        data.push(temp);
      }
      if (this.temp === 1) {
        this.tittle = '';
      } else {
        this.tittle = this.sedes.filter((item: any) => item.value === this.sede)[0].label;
      }
      const dialogRef = this.confirmacion.open(ModalgraficotortaComponent, { maxWidth: "700px", data: { data: data, temp: this.temp, tittle: this.tittle } });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          //this.refrescarLista();
        };
      });
    });
  }

  descargarReporte(id: number): void {
  
  }

}