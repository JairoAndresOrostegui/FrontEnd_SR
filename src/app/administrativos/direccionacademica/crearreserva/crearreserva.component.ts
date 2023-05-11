import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-crearreserva',
  templateUrl: './crearreserva.component.html',
  styleUrls: ['./crearreserva.component.css']
})
export class CrearreservaComponent implements OnInit {
  // FormBuilder que almacena los formControlName de los inputs
  crearreserva: FormGroup;
  // Variable que almacena las cedes
  sedes: any;
  // Variable que almacena el tipo de espacio
  cbtipoespacio?: any;
  // Variable que almacena la lista de unidades
  listaUnidades?: any;
  // Variable que almacena los programas
  cbprograma: any;
  // Variable que almacena los grupos
  cbgrupos?: any;
  // Variable que almacena los usuarios
  cbusuarios?: any;
  // Variable que almacena los submodulos
  cbsubmodulo?: any;
  // Variable que almacena el estado disponible o no disponible
  cbdisponibles?: any;
  // Variable que almacena las caracteristicas
  cbcaracteristicas?: any;
  // Variable que almacena un objeto en caso que no exista registros
  cbvacio = [{ value: 0, label: 'No existen registros' }]
  // Variable que almacena el id de la sede
  idsede?: Number;
  // Variable que almacena el estado para mostrar u ocultar el form
  visible = false;
  // Variable que almacena el objeto para crear el registro
  objetoreserva?: {};
  // Temporal
  cbencargado?: any;

  semana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

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
    { value: 2125, viewValue: '21:25' },
    { value: 2210, viewValue: '22:10' }
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
    { value: 2210, viewValue: '22:10' },
    { value: 2255, viewValue: '22:55' }
  ];

  verificarHora(): void {
    if(this.crearreserva.value.horafin <= this.crearreserva.value.horainicio) {
      this.toastr.warning('La hora fin debe ser mayor a la hora de inicio.', 'Exitoso', { timeOut: 1500 });
    }
  }

  //Objetos quemados
  //Submodulos
  submodulos = [{ value: 1, label: 'Algebra 1' }, { value: 2, label: 'Algebra 2' }, { value: 3, label: 'Estadistica' }, { value: 4, label: 'Lógica computacional' }];
  //Programa
  programas = [{ value: 'CN', label: 'Ingeniería Industrial' }, { value: 'UL', label: 'Ingeniería de Sistemas' }];
  // Grupos
  grupos = [{ value: 1, label: '1A' }, { value: 2, label: '1B' }, { value: 3, label: '2A' }, { value: 4, label: '2B' }];
  // Encargados
  encargados = [{value: 1, label: 'Carlos Docente'},{value: 2, label: 'Jaime Docente'},{value: 3, label: 'Jorge Docente'}];

  cbniveles = [{ value: 1, label: '1' }, { value: 2, label: '2' }];
  listaUnidades1 = [{ value: 1, label: 'Aula 225' }, { value: 2, label: 'Laboratorio 1' }];


  constructor(private fb: FormBuilder, private autenticacion: DatosUsuario,
    private toastr: ToastrService,
    private peticion: RestService) {
    this.crearreserva = this.fb.group({
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      horainicio: [600],
      horafin: [645],
      estado: ['disponible'],
      sede: '',
      programa: [''],
      tipo: '',
      submodulo: '',
      dia: [''],
      nivel: [1],
      grupo: [''],
      usuariopersona: [''],
      encargado: [''],
      usuario: '',
      disponibles: '',
      caracteristica: '',
      capacidad: 1,
      observaciones: ['']
    });
    //Se muestran los tipo de espacio almacenados la BD para el usuario actual
    this.cbtipoespacio = this.autenticacion.datosLogin.User.rol_espacio;
    this.crearreserva.controls['tipo'].setValue(this.cbtipoespacio[0].value);
    // Petición que llama y pide sedes lo almacena en la variable y le establece el valor inicial que se encuentre ne la BD
    /*this.peticion.getselect('unidadorganizacional/combo/'+9).subscribe((respuesta) => {
      this.sedes = respuesta;
      this.crearreserva.controls['sede'].setValue(this.sedes[0].value);
    });*/
    this.sedes = this.autenticacion.datosLogin.User.unidad_rol;
    this.crearreserva.controls['sede'].setValue(this.sedes[0].value);
    this.cbusuarios = [{ value: this.autenticacion.datosLogin.User.id_usuario, label: this.autenticacion.datosLogin.User.nombre_rol }];
    this.crearreserva.controls['usuariopersona'].setValue(this.cbusuarios[0].value);
    // Petición que llama y pide programa lo almacena en la variable y le establece el valor inicial que se encuentre en la BD
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      this.cbprograma = this.programas;
      this.crearreserva.controls['programa'].setValue(this.cbprograma[0].value);
    });
    // Petición que llama y pid eel grupo y lo almacena en la variable y le establece el valor inicial que se encuentre en la BD
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      this.cbgrupos = this.grupos;
      this.crearreserva.controls['grupo'].setValue(this.cbgrupos[0].value);
    });
    // Petición que llama y pide el mdoulo y lo almacena en la variable y le establece el valor inicial que se encuentre en la BD
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      this.cbsubmodulo = this.submodulos;
      this.crearreserva.controls['submodulo'].setValue(this.cbsubmodulo[0].value);
    });
    // Petición que llama y pide el el usuario y encargado  y lo almacena en la variable y le establece el valor inicial que se encuentre en la BD
    this.peticion.getselect('unidadorganizacional/combo/').subscribe((respuesta) => {
      /*this.cbusuarios = this.usuario;
      this.crearreserva.controls['usuariopersona'].setValue(this.cbusuarios[0].value);*/
      this.cbencargado = this.encargados;
      this.crearreserva.controls['encargado'].setValue(this.cbencargado[0].value);
    });
    // Petición que llama y pide las caracteristicas y lo almacena en la variable y le establece el valor inicial que se encuentre en la BD
    this.peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
      this.cbcaracteristicas = respuesta;
      this.cbcaracteristicas.unshift({ value: 0, label: 'No aplica' });
      this.crearreserva.controls['caracteristica'].setValue(this.cbcaracteristicas[0].value);
    });
  }

  ngOnInit(): void {
  }
  // Metodo que busca los espacios disponibles segun los datos ingresados en el formulario
  buscarEspacios(): void {
    if (this.crearreserva.invalid) {
      for (const control of Object.keys(this.crearreserva.controls)) {
        this.crearreserva.controls[control].markAsTouched();
      }
      return;
    };/*
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
    };
    console.log(this.objetoreserva);
    // Realiza la busqueda segun el objeto que ingreso el usuario
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
    });*/
    this.listaUnidades = this.listaUnidades1;
    this.crearreserva.controls['disponibles'].setValue(this.listaUnidades[0].value);
  }
  // Crea la reserva segun el dato escogido por el usuario ingresado
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
    const objetocolaborador = this.encargados.filter( item => item.value === this.crearreserva.value.encargado)
    const objetoprograma = this.programas.filter( item => item.value === this.crearreserva.value.programa);
    this.objetoreserva = {
      id_reserva:0,
      id_unidad_organizacional: this.crearreserva.value.disponibles,
      identificador_grupo: 0,
      nombre_grupo: objetogrupo[0].label,
      id_usuario_reserva: this.crearreserva.value.usuariopersona,
      fecha_inicio_reserva: this.crearreserva.value.fechainicio,
      fecha_fin_reserva: this.crearreserva.value.fechafin,
      descripcion_reserva: this.crearreserva.value.observaciones,
      estado_reserva: this.crearreserva.value.estado,
      id_usuario_colaborador: objetocolaborador[0].value,
      nombre_usuario_colaborador: objetocolaborador[0].label,
      nivel: this.crearreserva.value.nivel,
      codigo_programa: objetoprograma[0].value,
      nombre_programa: objetoprograma[0].label,
      submodulo: this.crearreserva.value.submodulo,
      id_rol: this.autenticacion.datosLogin.rol,
      reservaDia: {
        id_reserva: 0,
        reserva_dia_dia: this.crearreserva.value.dia,
        reserva_dia_id: 99,
        reserva_dia_hora_inicio: this.crearreserva.value.horainicio,
        reserva_dia_hora_fin: this.crearreserva.value.horafin
      }
    }
    this.peticion.create('reserva', this.objetoreserva).subscribe((respuesta) => {
      if (respuesta.message === 'Registro guardado con exito') {
        this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
      } else {
        this.toastr.error(respuesta.message, 'Exitoso', { timeOut: 1500 });
      };
    });
  }

}
