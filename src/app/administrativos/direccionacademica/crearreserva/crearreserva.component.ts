import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-crearreserva',
  templateUrl: './crearreserva.component.html',
  styleUrls: ['./crearreserva.component.css']
})
export class CrearreservaComponent implements OnInit {

  crearreserva: FormGroup;
  sedes: any;
  cbtipoespacio?: any;
  listaUnidades?: any;
  cbgrupo?: any;
  cbusuarios?: any;
  cbdisponibles?: any;
  cbcaracteristicas?: any;
  cbvacio = [{value: 0, label: 'No existen registros'}]
  idsede?: Number;
  visible = false;
  objetoreserva?: {};
  horainicial = [
    {value: '6:00', viewValue: '6:00'},
    {value: '6:45', viewValue: '6:45'},
    {value: '7:30', viewValue: '7:30'},
    {value: '8:15', viewValue: '8:15'},
    {value: '9:00', viewValue: '9:00'},
    {value: '9:45', viewValue: '9:45'},
    {value: '10:30', viewValue: '10:30'},
    {value: '11:15', viewValue: '11:15'},
    {value: '12:00', viewValue: '12:00'},
    {value: '12:45', viewValue: '12:45'},
    {value: '13:30', viewValue: '13:30'},
    {value: '14:15', viewValue: '14:15'},
    {value: '15:00', viewValue: '15:00'},
    {value: '15:45', viewValue: '15:45'},
    {value: '16:30', viewValue: '16:30'},
    {value: '17:15', viewValue: '17:15'},
    {value: '18:15', viewValue: '18:15'},
    {value: '19:00', viewValue: '19:00'},
    {value: '19:55', viewValue: '19:55'},
    {value: '20:40', viewValue: '20:40'},
    {value: '21:25', viewValue: '21:25'},
    {value: '22:10', viewValue: '22:10'},
  ]
  horafinal = [
    {value: '6:45', viewValue: '6:45'},
    {value: '7:30', viewValue: '7:30'},
    {value: '8:15', viewValue: '8:15'},
    {value: '9:00', viewValue: '9:00'},
    {value: '9:45', viewValue: '9:45'},
    {value: '10:30', viewValue: '10:30'},
    {value: '11:15', viewValue: '11:15'},
    {value: '12:00', viewValue: '12:00'},
    {value: '12:45', viewValue: '12:45'},
    {value: '13:30', viewValue: '13:30'},
    {value: '14:15', viewValue: '14:15'},
    {value: '15:00', viewValue: '15:00'},
    {value: '15:45', viewValue: '15:45'},
    {value: '16:30', viewValue: '16:30'},
    {value: '17:15', viewValue: '17:15'},
    {value: '18:00', viewValue: '18:00'},
    {value: '19:00', viewValue: '19:00'},
    {value: '19:45', viewValue: '19:45'},
    {value: '20:40', viewValue: '20:40'},
    {value: '21:25', viewValue: '21:25'},
    {value: '22:10', viewValue: '22:10'},
    {value: '22:55', viewValue: '22:55'}
  ]

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private peticion: RestService) {
    this.crearreserva = this.fb.group ({
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required], 
      horainicio: ['6:00'],
      horafin: ['6:45'],
      estado: ['disponible'],
      sede: '',
      tipo: '',
      dia: 'lunes',
      grupo: '',
      usuariopersona: '',
      usuario: '',
      disponibles: '',
      caracteristica: '',
      capacidad: 1,
      observaciones: ['']
    });
    this.peticion.getselect('tipoespacio/combo').subscribe((respuesta) => {
      this.cbtipoespacio = respuesta;
      this.crearreserva.controls['tipo'].setValue(this.cbtipoespacio[0].value);
    });
    this.peticion.getselect('unidadorganizacional/combo/'+5).subscribe((respuesta) => {
      this.sedes = respuesta;
      this.crearreserva.controls['sede'].setValue(this.sedes[0].value);
    });
    this.peticion.getselect('grupo/combo').subscribe((respuesta) => {
      this.cbgrupo = respuesta;
      this.crearreserva.controls['grupo'].setValue(this.cbgrupo[0].value);
    });
    this.peticion.getselect('usuario/combo').subscribe((respuesta) => {
      this.cbusuarios = respuesta;
      this.crearreserva.controls['usuariopersona'].setValue(this.cbusuarios[0].value);
      this.crearreserva.controls['usuario'].setValue(this.cbusuarios[0].value);
    });
    this.peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
      this.cbcaracteristicas = respuesta;
      this.cbcaracteristicas.unshift({value: 0, label: 'No aplica'});
      this.crearreserva.controls['caracteristica'].setValue(this.cbcaracteristicas[0].value);
    });
  }

  ngOnInit(): void {
  }

  buscarEspacios(): void {
    if (this.crearreserva.invalid) {
      for (const control of Object.keys(this.crearreserva.controls)) {
        this.crearreserva.controls[control].markAsTouched();
      }
      return;
    }
    this.visible = true;
    this.objetoreserva = {
      id_unidad_organizacional_padre:   this.crearreserva.value.sede,
      id_tipo_espacio:                  this.crearreserva.value.tipo,
      fecha_inicio_reserva:             this.crearreserva.value.fechainicio,
      fecha_fin_reserva:                this.crearreserva.value.fechafin,
      reserva_dia_dia:                  this.crearreserva.value.dia,
      reserva_dia_hora_inicio:          this.crearreserva.value.horainicio,
      reserva_dia_hora_fin:             this.crearreserva.value.horafin,
      id_caracteristica:                this.crearreserva.value.caracteristica,
      capacidad_unidad_organizacional:  this.crearreserva.value.capacidad,
      estado:                           this.crearreserva.value.estado
    }
    this.peticion.getreserva('unidadorganizacional/reserva', this.objetoreserva).subscribe((respuesta) => {
      if (this.crearreserva.value.estado === 'disponible') {
        this.listaUnidades = respuesta.reservaDisponible;
      } else {
        this.listaUnidades = respuesta.reservaReservada;
      }
      if (this.listaUnidades.length === 0) {
        this.listaUnidades = this.cbvacio;
      }
      this.crearreserva.controls['disponibles'].setValue(this.listaUnidades[0].value);
    });
  }

  crearReserva() {
    if (this.crearreserva.invalid) {
      for (const control of Object.keys(this.crearreserva.controls)) {
        this.crearreserva.controls[control].markAsTouched();
      }
      return;
    }
    if (this.crearreserva.value.disponibles === 0 || this.crearreserva.value.disponibles === '') {
      this.toastr.warning('Elija una unidad disponible', 'Alerta', { timeOut: 1500 });
      return;
    }
    this.objetoreserva = {
      id_reserva:                     0,
      id_unidad_organizacional:       this.crearreserva.value.disponibles,
      identificador_grupo:            this.crearreserva.value.grupo,
      id_usuario:                     this.crearreserva.value.usuariopersona,
      fecha_inicio_reserva:           this.crearreserva.value.fechainicio,
      fecha_fin_reserva:              this.crearreserva.value.fechafin,
      descripcion_reserva:            this.crearreserva.value.observaciones,
      estado_reserva:                 'activo',
      reservaDias: [
        {
          reserva_dia_id:             0,
          reserva_dia_dia:            this.crearreserva.value.dia,
          reserva_dia_hora_inicio:    this.crearreserva.value.horainicio,
          reserva_dia_hora_fin:       this.crearreserva.value.horafin
        }
      ]
    }
    this.peticion.create('reserva', this.objetoreserva).subscribe((respuesta) => {
      if(respuesta.message === 'Registro guardado con exito') {
        this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
        this.visible = false;
      };
    });
  }

}
