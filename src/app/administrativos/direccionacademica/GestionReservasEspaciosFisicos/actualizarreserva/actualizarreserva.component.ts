import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';
import { logicaReserva } from '../consultarreserva/logicareserva';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actualizarreserva',
  templateUrl: './actualizarreserva.component.html',
  styleUrls: ['./actualizarreserva.component.css']
})
export class ActualizarreservaComponent implements OnInit {

  buscar: FormGroup;
  visible: boolean;
  
  // Variable que almacena la sede para mostrar el comboBox
  cmbSedes: any;
  sedes: any;
  cbvacio: any;
  espacios: any;
  arrayEspacios: any[];
  cmbEspacios: any[];
  objReserva: any[];
  spinner: boolean;
  idUnidadReserva?: number;
  verFormConsulta: string;

  horainicial = [
    { value: 600, viewValue: '6:00' },
    { value: 645, viewValue: '6:45' },
    { value: 730, viewValue: '7:30' },
    { value: 815, viewValue: '8:15' },
    { value: 900, viewValue: '9:00' },
    { value: 945, viewValue: '9:45' },
    { value: 1030, viewValue: '10:30' },
    { value: 1115, viewValue: '11:15' },
    { value: 1200, viewValue: '12:00' },
    { value: 1245, viewValue: '12:45' },
    { value: 1330, viewValue: '13:30' },
    { value: 1415, viewValue: '14:15' },
    { value: 1500, viewValue: '15:00' },
    { value: 1545, viewValue: '15:45' },
    { value: 1630, viewValue: '16:30' },
    { value: 1715, viewValue: '17:15' },
    { value: 1815, viewValue: '18:15' },
    { value: 1900, viewValue: '19:00' },
    { value: 1955, viewValue: '19:55' },
    { value: 2040, viewValue: '20:40' },
    { value: 2125, viewValue: '21:25' }
  ];

  horafinal = [
    { value: 645, viewValue: '6:45' },
    { value: 730, viewValue: '7:30' },
    { value: 815, viewValue: '8:15' },
    { value: 900, viewValue: '9:00' },
    { value: 945, viewValue: '9:45' },
    { value: 1030, viewValue: '10:30' },
    { value: 1115, viewValue: '11:15' },
    { value: 1200, viewValue: '12:00' },
    { value: 1245, viewValue: '12:45' },
    { value: 1330, viewValue: '13:30' },
    { value: 1415, viewValue: '14:15' },
    { value: 1500, viewValue: '15:00' },
    { value: 1545, viewValue: '15:45' },
    { value: 1630, viewValue: '16:30' },
    { value: 1715, viewValue: '17:15' },
    { value: 1815, viewValue: '18:15' },
    { value: 1900, viewValue: '19:00' },
    { value: 1955, viewValue: '19:55' },
    { value: 2040, viewValue: '20:40' },
    { value: 2125, viewValue: '21:25' },
    { value: 2210, viewValue: '22:10' }
  ];

  //Objetos quemados
  // comboBox = [{value: 1, label: 'Algebra 1'},{value: 2, label: 'Algebra 2'},{value: 3, label: 'Estadistica'},{value: 4, label: 'Lógica computacional'}];

  constructor(private fb: FormBuilder, private _peticion: RestService, public Usuario: DatosUsuario, public confirmacion: MatDialog,
              private toastr: ToastrService, private logReserva: logicaReserva ){
    this.spinner = false;
    this.visible = false;
    this.cmbEspacios = [];
    this.arrayEspacios = [];
    this.objReserva = [];
    this.verFormConsulta = 'block';
    this.buscar = this.fb.group ({
      sede: [''],
      espacios: [''],
      /*
      radioButton: ['jornada'],
      unidadOrganizacional: [''],
      submodulo: [''],
      unidadorganizacional: [''],
      aulas: [''],
      programas: [''],
      area: [''],
      diaInicio: [''],
      jornada: [''],
      usuario: [''],*/
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
    });
    // this._peticion.getselect('tipoespacio/combo').subscribe((respuesta) => {
    //   this.comboBoxSede = respuesta;
    //   this.miFormulario.controls['tipoespacio'].setValue(this.comboBoxSede[0].value);
    // });
    // this.cambioRadio();
  };

  ngOnInit(){
  }

  mostrarEspacios(): void {/*
    this.spinner = true;
    this.visible = false;
    this.cmbEspacios = [];
    this.arrayEspacios = [];
    this.verFormConsulta = 'none';
    setTimeout(() => {
      this._peticion.getunidad('unidadorganizacional/buscar?type=tipo&search=' + item + '&id_sede=' + this.buscar.value.sede).subscribe((respuesta) => {
        if (respuesta.message != 'No hay registros') {
          this.espacios = respuesta;
          if (this.espacios.length != 0) {
            for(let item of this.espacios) {
              this.arrayEspacios.push(item);
            }
          }
        }
      });
    }, 100);
    setTimeout(() => {
      this.cmbEspacios = this.arrayEspacios;
      this.spinner = false;
      this.verFormConsulta = 'block';
      this.buscar.controls['espacios'].setValue(this.cmbEspacios[0]?.id_unidad_organizacional);
    }, 300);*/
  }

  filtrarUnidadportipo() {
    // setTimeout (() => {
    //   this._peticion.getselect('unidadorganizacional/combo/' + this.miFormulario.value.tipoespacio).subscribe((respuesta) => {
    //     this.comboBox = respuesta;
    //     if (this.comboBox.length === 0) {
    //       this.toastr.error('Este tipo de espacio no tiene registros', 'Error', { timeOut: 1500 });
    //     } else {
    //       this.miFormulario.controls['submodulo'].setValue(this.comboBox[0].value);
    //     }
    //   });
    // }, 50)
  }

  obtenerIdReserva(id: number): void {
    setTimeout (() => {
      this.idUnidadReserva = id;
    }, 150);
  }

  buscarReserva(): void {
    this.visible = false;
    this.spinner = true;
    this.verFormConsulta = 'none';
    setTimeout (() => {
      this._peticion.gettodasreserva('reserva/buscar?type=unidad_organizacional&search=' + this.idUnidadReserva).subscribe((respuesta) => {
        this.Usuario.datosReserva = respuesta
        if (this.Usuario.datosReserva.message != 'No hay registros') {
          this.objReserva = this.logReserva.crearObjeto(this.Usuario.datosReserva);
        } else {
          this.toastr.error('No hay registros', 'Error', { timeOut: 1500 });
        }
        this.spinner = false;
        this.visible = true;
        this.verFormConsulta = 'block';
      });
    }, 400);
    // setTimeout (() => {
    //   this._peticion.gettodasreserva('reserva/buscar?type=' + this.miFormulario.value.radioButton + '&search=' + this.miFormulario.value.submodulo).subscribe((respuesta) => {
    //     console.log(respuesta)
    //     this.Usuario.datosReserva = respuesta;
    //     if (this.Usuario.datosReserva.message === 'No hay registros') {
    //       this.toastr.error('No hay registros', 'Error', { timeOut: 1500 });
    //       this.visible = false;
    //     } else {
    //       this.visible = true;
    //     }
    //   });
    // }, 100)
  }

  eliminarReserva(id: number ): void {
    // const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar este registro?' } });
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     this._peticion.delete('reserva/' + id).subscribe((respuesta) => {
    //       if (respuesta.message === "Registro eliminado con exito") {
    //         this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
    //         this.visible = false;
    //       } else {
    //         this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
    //       }
    //     })
    //   };
    // });
  }

  cambioRadio(){
    // switch (this.miFormulario.value.radioButton) {
    //   case 'unidad_organizacional':
    //     this.vertipoespacio = true;
    //     this.filtrarUnidadportipo();
    //     break;
    //   case 'usuario':
    //     // Usuarios
    //     this.vertipoespacio = false;
    //     this._peticion.getselect('usuario/combo').subscribe((respuesta) => {
    //       this.comboBox = respuesta;
    //       this.miFormulario.controls['submodulo'].setValue(this.comboBox[0].value);
    //     });
    //     break;
    //   case 'submodulo':
    // //     // Submodulo
    //     this.vertipoespacio = false;
    //     this.versubmodulo = true;
    //     this._peticion.getselect('submodulo/combo').subscribe((respuesta) => {
    //       this.comboBox = respuesta;
    //       this.miFormulario.controls['submodulo'].setValue(this.comboBox[0].value);
    //     });
    //     this.miFormulario.controls['submodulo'].setValue(this.comboBox[0].value) ;
    //     break;
    //   default:
    //     break;
    // };
  };

}