import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';
import { logicaReserva } from './logicareserva';

@Component({
  selector: 'app-consultarreserva',
  templateUrl: './consultarreserva.component.html',
  styleUrls: ['./consultarreserva.component.css']
})
export class ConsultarreservaComponent implements OnInit {

  buscar: FormGroup;
  visible: boolean;
  
  // Variable que almacena la sede para mostrar el comboBox
  cmbSedes: any;
  cmbTipos: any;
  sedes: any;
  cbvacio: any;
  espacios: any;
  cmbEspacios: any;
  objReserva: any[];
  spinner: boolean;
  idUnidadReserva?: number;
  verFormConsulta: string;
  
  semana: string[] = ['Hora', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  hora = ['06:00', '06:45', '07:30', '08:15', '09:00', '09:45', '10:30', '11:15', '12:00', '12:45', '13:30', '14:15', '15:00', '15:45',
                '16:30','17:15', '18:15', '19:00', '19:55', '20:40', '21:25'];

  constructor(private fb: FormBuilder, private _peticion: RestService, public Usuario: DatosUsuario, public confirmacion: MatDialog,
              private toastr: ToastrService, private logReserva: logicaReserva ){
    this.spinner = false;
    this.visible = false;
    this.objReserva = [];
    this.verFormConsulta = 'block';
    this.buscar = this.fb.group ({
      sede: [''],
      espacios: [''],
      tipo: ['']
    });
    // Inicializamos el comboBox de sedes con las que el usuario tenga acceso de informacion
    this._peticion.getselect('unidadrol?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
      this.sedes = respuesta;
      // Miramos si el valor retornado por la APi contiene datos
      if (this.sedes.length > 0) {
        this.cmbSedes = respuesta;
        this.buscar.controls['sede'].setValue(this.cmbSedes[0].value);
      } else {
        this.cmbSedes = this.cbvacio;
        this.buscar.controls['sede'].setValue(this.cmbSedes[0].value);
      } //** FIN if */
      this.mostrarEspacios();
    });
  };

  ngOnInit(){
  }

  mostrarEspacios(): void {
    this.spinner = true;
    this.visible = false;
    this.verFormConsulta = 'none';
    setTimeout(() => {
      this._peticion.getselect('unidadorganizacional?id_sede=' + this.buscar.value.sede).subscribe((respuesta) => {
        this.cmbEspacios = respuesta;
        this.spinner = false;
        this.verFormConsulta = 'block';
        this.buscar.controls['espacios'].setValue(this.cmbEspacios[0]?.id_unidad_organizacional);
      });
    }, 300);
  }

  buscarReserva(): void {
    this.visible = false;
    this.spinner = true;
    this.verFormConsulta = 'none';
    setTimeout (() => {
      this._peticion.gettodasreserva('reserva/buscar?type=unidad_organizacional&search=' + this.buscar.value.espacios).subscribe((respuesta) => {
        this.Usuario.datosReserva = respuesta;
        if (this.Usuario.datosReserva.message != 'No hay registros') {
          this.objReserva = this.logReserva.crearObjeto(this.Usuario.datosReserva);
          this.visible = true;
        } else {
          this.toastr.error('No hay registros', 'Error', { timeOut: 1500 });
          this.visible = false;
        }
        this.spinner = false;
        this.verFormConsulta = 'block';
      });
    }, 300);
  }

}
