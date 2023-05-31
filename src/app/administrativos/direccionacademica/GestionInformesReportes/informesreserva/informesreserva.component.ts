import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReservaDatosAllsedesComponent } from 'src/app/compartidos/modales/reservas/reserva-datos-allsedes/reserva-datos-allsedes.component';
import { ReservaGraficosAllsedesComponent } from 'src/app/compartidos/modales/reservas/reserva-graficos-allsedes/reserva-graficos-allsedes.component';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';
import { logicaInformesData } from './transformarData';

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
  data: any;
  reportes: any;
  sedes: any;
  sede: any;
  tittle: string = '';

  constructor(private fb: FormBuilder,private toastr: ToastrService, private _peticion: RestService, public Usuario: DatosUsuario, public confirmacion: MatDialog,
    private filerSaver:FileSaverService, private convertir: logicaInformesData) {
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

  mostrarLista(): void {
    
  }

  mostrarDatos(id: number) {
    setTimeout(() => {
      if (this.frmInforme.value.opcionInforme === 1) {
        this._peticion.getselect('reserva/informe-allsede').subscribe((respuesta) => {
          const dialogRef = this.confirmacion.open(ReservaDatosAllsedesComponent, { maxWidth: "800px", data: { data: respuesta } });
          dialogRef.afterClosed().subscribe(res => {
            if (res) {
              //this.refrescarLista();
            };
          });
        });
      }
    }, 200);
  }

  mostrarGrafico(id: number): void {
    setTimeout(() => {
      if (this.frmInforme.value.opcionInforme === 1) {
        this._peticion.getselect('reserva/informe-allsede').subscribe((respuesta) => {
          const dialogRef = this.confirmacion.open(ReservaGraficosAllsedesComponent, { maxWidth: "1000px", data: { data: respuesta } });
          dialogRef.afterClosed().subscribe(res => {
            if (res) {
              //this.refrescarLista();
            };
          });
        });
      }
    }, 200);
  }

  descargarReporte(id: number): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    setTimeout(() => {
      if (this.frmInforme.value.opcionInforme === 1) {
        //const ws:XLSX.WorkSheet = 
        this._peticion.getselect('reserva/informe-allsede').subscribe((respuesta) => {
          this.data = respuesta;
          const newData = this.convertir.convertirDataAllSedes(this.data);
          const worksheet = XLSX.utils.json_to_sheet(newData!);
          const workbook = {
            Sheets: {
              'testingSheet': worksheet
            },
            SheetNames:['testingSheet']
          };
          const excelBuffer = XLSX.write(workbook,{bookType:'xlsx', type:'array'});
          const bloobData = new Blob([excelBuffer],{type:EXCEL_TYPE});
          this.filerSaver.save(bloobData,"ReservasTotalSedes");
        });
      }
    }, 200);
  }

}