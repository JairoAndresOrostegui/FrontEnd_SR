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
  cbprograma: any;
  cbgrupos?: any;
  cbusuarios?: any;
  cbsubmodulo?: any;
  cbdisponibles?: any;
  cbcaracteristicas?: any;
  cbvacio = [{ value: 0, label: 'No existen registros' }]
  idsede?: Number;
  visible = false;
  objetoreserva?: {};
  // Temporal
  cbencargado?: any;

  semana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  horainicial = [
    { value: '6:00', viewValue: '6:00' },
    { value: '6:45', viewValue: '6:45' },
    { value: '7:30', viewValue: '7:30' },
    { value: '8:15', viewValue: '8:15' },
    { value: '9:00', viewValue: '9:00' },
    { value: '9:45', viewValue: '9:45' },
    { value: '10:30', viewValue: '10:30' },
    { value: '11:15', viewValue: '11:15' },
    { value: '12:00', viewValue: '12:00' },
    { value: '12:45', viewValue: '12:45' },
    { value: '13:30', viewValue: '13:30' },
    { value: '14:15', viewValue: '14:15' },
    { value: '15:00', viewValue: '15:00' },
    { value: '15:45', viewValue: '15:45' },
    { value: '16:30', viewValue: '16:30' },
    { value: '17:15', viewValue: '17:15' },
    { value: '18:15', viewValue: '18:15' },
    { value: '19:00', viewValue: '19:00' },
    { value: '19:55', viewValue: '19:55' },
    { value: '20:40', viewValue: '20:40' },
    { value: '21:25', viewValue: '21:25' },
    { value: '22:10', viewValue: '22:10' },
  ]
  horafinal = [
    { value: '6:45', viewValue: '6:45' },
    { value: '7:30', viewValue: '7:30' },
    { value: '8:15', viewValue: '8:15' },
    { value: '9:00', viewValue: '9:00' },
    { value: '9:45', viewValue: '9:45' },
    { value: '10:30', viewValue: '10:30' },
    { value: '11:15', viewValue: '11:15' },
    { value: '12:00', viewValue: '12:00' },
    { value: '12:45', viewValue: '12:45' },
    { value: '13:30', viewValue: '13:30' },
    { value: '14:15', viewValue: '14:15' },
    { value: '15:00', viewValue: '15:00' },
    { value: '15:45', viewValue: '15:45' },
    { value: '16:30', viewValue: '16:30' },
    { value: '17:15', viewValue: '17:15' },
    { value: '18:00', viewValue: '18:00' },
    { value: '19:00', viewValue: '19:00' },
    { value: '19:45', viewValue: '19:45' },
    { value: '20:40', viewValue: '20:40' },
    { value: '21:25', viewValue: '21:25' },
    { value: '22:10', viewValue: '22:10' },
    { value: '22:55', viewValue: '22:55' }
  ]

  //Objetos quemados
  //Submodulos
  submodulos = [{ value: 1, label: 'Algebra 1' }, { value: 2, label: 'Algebra 2' }, { value: 3, label: 'Estadistica' }, { value: 4, label: 'Lógica computacional' }];
  //Programa
  programas = [{ value: 1, label: 'Ingeniería Industrial' }, { value: 2, label: 'Ingeniería Mecánica' }, { value: 3, label: 'Ingeniería Robótica y Mecatrónica' }, { value: 4, label: 'Ingeniería de Sistemas' }];
  // Sede
  sede = [{ value: 1, label: 'Medellín' }, { value: 2, label: 'Bogotá' }, { value: 2, label: 'Oriente' }, { value: 3, label: 'Suroeste' }, { value: 4, label: 'Norte' }, { value: 5, label: 'Apartadó' }];
  // Grupos
  grupos = [{ value: 1, label: '1A' }, { value: 2, label: '2V' }, { value: 3, label: '4C' }, { value: 4, label: '6H' }];
  // Usuario
  usuario = [{value: 1, label: 'David Alvarez'}];
  // Encargados
  encargados = [{value: 1, label: 'Carlos Docente'},{value: 2, label: 'Manuel Docente'},{value: 3, label: 'Jorge Docente'}]


  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private peticion: RestService) {
    this.crearreserva = this.fb.group({
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      horainicio: ['6:00'],
      horafin: ['6:45'],
      estado: ['disponible'],
      sede: '',
      programa: [''],
      tipo: '',
      submodulo: '',
      dia: [''],
      grupo: [''],
      usuariopersona: [''],
      encargado: [''],
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
    this.peticion.getselect('unidadorganizacional/combo/'+9).subscribe((respuesta) => {
      this.sedes = respuesta;
      this.crearreserva.controls['sede'].setValue(this.sedes[0].value);
    });
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      this.cbprograma = this.programas;
      this.crearreserva.controls['programa'].setValue(this.cbprograma[0].value);
    });
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      this.cbgrupos = this.grupos;
      this.crearreserva.controls['grupo'].setValue(this.cbgrupos[0].value);
    });
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      this.cbsubmodulo = this.submodulos;
      this.crearreserva.controls['submodulo'].setValue(this.cbsubmodulo[0].value);
    });
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      this.cbusuarios = this.usuario;
      this.crearreserva.controls['usuariopersona'].setValue(this.cbusuarios[0].value);
      this.cbencargado = this.encargados;
      this.crearreserva.controls['encargado'].setValue(this.cbencargado[0].value);
    });
    this.peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
      this.cbcaracteristicas = respuesta;
      this.cbcaracteristicas.unshift({ value: 0, label: 'No aplica' });
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
    this.objetoreserva = {
      id_unidad_organizacional_padre: this.crearreserva.value.sede,
      id_tipo_espacio: this.crearreserva.value.tipo,
      fecha_inicio_reserva: this.crearreserva.value.fechainicio,
      fecha_fin_reserva: this.crearreserva.value.fechafin,
      reserva_dia_dia: this.crearreserva.value.dia,
      reserva_dia_hora_inicio: this.crearreserva.value.horainicio,
      reserva_dia_hora_fin: this.crearreserva.value.horafin,
      id_caracteristica: this.crearreserva.value.caracteristica,
      capacidad_unidad_organizacional: this.crearreserva.value.capacidad,
      estado: this.crearreserva.value.estado
    }
    this.peticion.postreserva('unidadorganizacional/reserva', this.objetoreserva).subscribe((respuesta) => {
      if (this.crearreserva.value.estado === 'disponible') {
        this.listaUnidades = respuesta.reservaDisponible;
      } else {
        this.listaUnidades = respuesta.reservaReservada;
      }
      if (this.listaUnidades.length === 0 || undefined) {
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
    const objetogrupo = this.grupos.filter( item =>  item.value === this.crearreserva.value.grupo);
    const objetonombreusuarioreserva = this.encargados.filter( item => item.value === this.crearreserva.value.encargado);
    const objetocolaborador = this.usuario.filter( item => item.value === this.crearreserva.value.usuariopersona)
    const objetoprograma = this.programas.filter( item => item.value === this.crearreserva.value.programa);
    this.objetoreserva = {
      id_reserva:0,
      id_unidad_organizacional: this.crearreserva.value.disponibles,
      identificador_grupo: this.crearreserva.value.grupo,
      nombre_grupo: objetogrupo[0].label,
      id_usuario_reserva: objetogrupo[0].value,
      nombre_usuario_reserva: objetonombreusuarioreserva[0].label,
      fecha_inicio_reserva: this.crearreserva.value.fechainicio,
      fecha_fin_reserva: this.crearreserva.value.fechafin,
      descripcion_reserva: this.crearreserva.value.observaciones,
      estado_reserva: this.crearreserva.value.estado,
      id_usuario_colaborador: objetocolaborador[0].value,
      nombre_usuario_colaborador: objetocolaborador[0].label,
      nivel: 99,
      codigo_programa: objetoprograma[0].label,
      nombre_programa: objetoprograma[0].label,
      id_rol: 99,
      escuela: 99,
      reservaDia: {
        id_reserva: 0,
        reserva_dia_dia: this.crearreserva.value.dia,
        reserva_dia_id: 99,
        reserva_dia_hora_inicio: this.crearreserva.value.horainicio,
        reserva_dia_hora_fin: this.crearreserva.value.horafin
      }
    }
    console.log(this.objetoreserva)
    this.peticion.create('reserva', this.objetoreserva).subscribe((respuesta) => {
      if (respuesta.message === 'Registro guardado con exito') {
        this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
      } else {
        this.toastr.error(respuesta.message, 'Exitoso', { timeOut: 1500 });
      };
    });
  }

}
