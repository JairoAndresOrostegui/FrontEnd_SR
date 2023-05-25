import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  frmInforme: FormGroup;
  verFormInforme: string;
  spinner: boolean;
  selectSedes: boolean;
  mostrarTodas: boolean;
  opcionesInforme: any[];
  reportes: any;
  sedes: any;
  sede: any;
  
  tittle: string = '';

  constructor(private fb: FormBuilder,private toastr: ToastrService, private _peticion: RestService, public Usuario: DatosUsuario, public confirmacion: MatDialog) {
    this.opcionesInforme = [{ value: 1, label: 'Todas las sedes'}, { value: 2, label: 'Por sede'},];
    this.selectSedes = false;
    this.mostrarTodas = false;
    this.verFormInforme = 'none';
    this.spinner = true;
    this.frmInforme = this.fb.group ({
      opcionInforme: [1],
      sede: [''],
    });
    this._peticion.getselect('unidadrol?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
      this.sedes = respuesta;
      this.frmInforme.controls['sede'].setValue(this.sedes[0].value);
      this.spinner = false;
      this.verFormInforme = 'block';
    });
  }

  ngOnInit(): void {}

  cambiarOpcionInforme() {
    this.spinner = true;
    this.selectSedes = false;
    this.mostrarTodas = false;
    this.verFormInforme = 'none';
    setTimeout (() => {
      this.spinner = false;
      this.verFormInforme = 'block';
      if (this.frmInforme.value.opcionInforme === 1) {
        this.selectSedes = false;
        this.mostrarTodas = true;
        this.reportes = [{ value: 0, label: 'Comparativo entre sedes' }];
      } else {
        this.selectSedes = true;
        this.mostrarTodas = false;
      }
    }, 300);
  }

  mostrarDatos(id: number) {
    if (id === 0) {
      this._peticion.getselect('reserva/informe-allsede').subscribe((respuesta) => {
        console.log(respuesta);
      });
    }
    /*
      let rta: any = respuesta;
      let data = [];
      for (let item of rta) {
        const temp = {
          "name": item.nombre_sede,
          "value": item.ocupacion_total
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
    */
  }

  mostrarLista(id: number): void {
    if (id === 1) {
      
    }/* else if (id === 2) {
      this._peticion.getselect('rolespacio?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
        this.reportes = respuesta;
      });
    } else if (id === 3) {
      this._peticion.getselect('sede/combo?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
        this.reportes = respuesta;
      });
      //this.reportes = this.programas;
    } else if (id === 4) {
      this._peticion.getselect('sede/combo?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
        this.reportes = respuesta;
      });
      //this.reportes = this.usuarios;
    }
    this.temp = id;*/
  }

  mostrarGrafico(id: number): void {/*
    this._peticion.getselect('reserva/informe-allsede').subscribe((respuesta) => {
      let rta: any = respuesta;
      let data = [];
      for (let item of rta) {
        const temp = {
          "name": item.nombre_sede,
          "value": item.ocupacion_total
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
    });*/
  }

  descargarReporte(id: number): void {
  
  }

}