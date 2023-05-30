import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { ReservaDia } from 'src/app/modelos/reservas/reserva';
import { docentes } from 'src/app/modelos/reservas/reserva3';
import { NestorService } from 'src/app/servicios/nestor.service';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-crearreserva',
  templateUrl: './crearreserva.component.html',
  styleUrls: ['./crearreserva.component.css']
})
export class CrearreservaComponent implements OnInit {

  spinner: boolean;
  verFormCrear: string;
  verPrivado: string;
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
  cbcodigo: any;
  cbniveles: any;
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
  cbvacio = [{ value: 0, label: 'No existen registros' }];
  // Variable que almacena el id de la sede
  idsede?: Number;
  // Variable que almacena el estado para mostrar u ocultar el form
  visible = false;
  // Variable que almacena el objeto para crear el registro
  objetoreserva?: {};
  // Temporal
  cbencargado?: any;

  semana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  cbtiporeserva: any[] = [ { value: 0, label: 'Programa' }, { value: 1, label: 'Privada' } ];
  cbProgramasDefecto = [{ codigo_programa: 'Error', label: 'Error', grupo_cerrado: false }];

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

  /*Quemados
  this.cbcodigo = [{ codigo_programa: 'CN', label: 'Ingeniería Industrial' }, { codigo_programa: 'UL', label: 'Ingeniería de Sistemas' }];
  cbniveles = [{ value: 1, label: '1' }, { value: 2, label: '2' }];
  grupos = [{ value: 1, label: '1A' }, { value: 2, label: '1B' }, { value: 3, label: '2A' }, { value: 4, label: '2B' }];
  this.cbgrupos = this.grupos;
  this.crearreserva.controls['grupo'].setValue(this.cbgrupos[0].value);
  submodulos = [{ value: 'Algebra 1', label: 'Algebra 1' }, { value: 'Algebra 2', label: 'Algebra 2' }, { value: 'Estadística', label: 'Estadística' }, { value: 'Lógica computacional', label: 'Lógica computacional' }];
  this.cbsubmodulo = this.submodulos;
  this.crearreserva.controls['submodulo'].setValue(this.cbsubmodulo[0].value);
  encargados = [{value: 1, label: 'Carlos Docente'},{value: 2, label: 'Jaime Docente'},{value: 3, label: 'Jorge Docente'}];
  this.cbencargado = this.encargados;
  this.crearreserva.controls['encargado'].setValue(this.cbencargado[0].value);
  
  this.listaUnidades = this.listaUnidades1;
  */
  
  constructor(private fb: FormBuilder, private autenticacion: DatosUsuario, private toastr: ToastrService, private _peticion: RestService, private _peticionNestor: NestorService) {
    this.spinner = true;
    this.verFormCrear = 'none';
    this.verPrivado = 'flex';
    this.crearreserva = this.fb.group({
      tiporeserva: [0],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      horainicio: [600],
      horafin: [645],
      sede: '',
      codigo: [''],
      programa: [''],
      tipo: '',
      submodulo: '',
      dia: ['', Validators.required],
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
    this.sedes = this.autenticacion.datosLogin.User.unidad_rol;
    this.crearreserva.controls['sede'].setValue(this.sedes[0].value);
    this.cbusuarios = [{ value: this.autenticacion.datosLogin.User.id_usuario, label: this.autenticacion.datosLogin.User.nombre_rol }];
    this.crearreserva.controls['usuariopersona'].setValue(this.cbusuarios[0].value);
    // Petición que llama y pide las caracteristicas y lo almacena en la variable y le establece el valor inicial que se encuentre en la BD
    this._peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
      this.cbcaracteristicas = respuesta;
      this.cbcaracteristicas.unshift({ value: 0, label: 'No aplica' });
      this.crearreserva.controls['caracteristica'].setValue(this.cbcaracteristicas[0].value);
    });

    this._peticionNestor.getInfo('profesores/comboprofesores').subscribe((respuesta) => {
      this.cbencargado = respuesta.sort((firstObject: docentes, secondObject: docentes) => (firstObject.nombre_persona > secondObject.nombre_persona) ? 1 : -1);
      this.crearreserva.controls['encargado'].setValue(this.cbencargado[0].id_profesor);
    });
    this.cambiarCombos();
  }

  ngOnInit(): void {
  }

  cambiarTipoReserva(): void {
    this.spinner = true;
    this.verFormCrear = 'none';
    setTimeout(() => {
      (this.crearreserva.value.tiporeserva === 0) ? this.verPrivado = 'flex' : this.verPrivado = 'none';
      this.spinner = false;
      this.verFormCrear = 'block';
    }, 200);
  }

  // Metodo que busca los espacios disponibles segun los datos ingresados en el formulario
  buscarEspacios(): void {
    this.listaUnidades = [];
    this.spinner = true;
    this.verFormCrear = 'none';
    let horas = [];
    this.validarFormulario();
    for (let i = 0; i < 50; i++) {
      if (this.horainicial[i].value === this.crearreserva.value.horainicio) {
        for (let j = (i+1); j < 50; j++) {
          horas.push(this.horainicial[(j-1)].value);
          if (this.horainicial[j].value === this.crearreserva.value.horafin) {
            break;
          }
        }
        break;
      }
    }
    this.objetoreserva = {
      id_unidad_organizacional_padre: this.crearreserva.value.sede,
      id_tipo_espacio: this.crearreserva.value.tipo,
      fecha_inicio_reserva: this.crearreserva.value.fechainicio,
      fecha_fin_reserva: this.crearreserva.value.fechafin,
      reserva_dia_dia: this.crearreserva.value.dia,
      reserva_dia_hora_inicio: horas,
      id_caracteristica: this.crearreserva.value.caracteristica,
      capacidad_unidad_organizacional: parseInt(this.crearreserva.value.capacidad),
      estado: "activo"
    };
    // Realiza la busqueda segun el objeto que ingreso el usuario
    this._peticion.postreserva('reserva/obtener-espacios-disponibles', this.objetoreserva).subscribe((respuesta) => {
      if (respuesta.message === 'No hay espacios disponibles') {
        this.toastr.warning('No hay espacios disponibles', 'Alerta', { timeOut: 1500 });
        this.listaUnidades = [];
      } else if (respuesta.message === 'No se pudo obtener unidades') {
        this.toastr.warning('No existe ese tipo de unidad en esa sede', 'Alerta', { timeOut: 1500 });
        this.listaUnidades = [];
      } else {
        this.toastr.success('Espacios encontrados', 'Alerta', { timeOut: 1500 });
        this.listaUnidades = respuesta;
        this.crearreserva.controls['disponibles'].setValue(this.listaUnidades[0].value);
      }
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
    });
  }

  // Crea la reserva segun el dato escogido por el usuario ingresado
  crearReserva() {
    this.spinner = true;
    this.verFormCrear = 'none';
    this.validarFormulario();
    if (this.crearreserva.value.disponibles === 0 || this.crearreserva.value.disponibles === '') {
      this.toastr.warning('Elija una unidad disponible', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
    const objetoReservaDia = this.generarObjetoReservaDia();
    if (this.crearreserva.value.tiporeserva === 1) {
      this.objetoreserva = {
        id_reserva:0,
        id_unidad_organizacional: this.crearreserva.value.disponibles,
        identificador_grupo: 0,
        nombre_grupo: '',
        id_usuario_reserva: this.crearreserva.value.usuariopersona,
        fecha_inicio_reserva: this.crearreserva.value.fechainicio,
        fecha_fin_reserva: this.crearreserva.value.fechafin,
        descripcion_reserva: this.crearreserva.value.observaciones,
        estado_reserva: 'activo',
        id_usuario_colaborador: 0,
        nombre_usuario_colaborador: '',
        nivel: '',
        codigo_programa: '',
        nombre_programa: '',
        submodulo: '',
        reservaDia: objetoReservaDia
      }
    } else {
      //Quemado
      //const objetogrupo = this.grupos.filter( item =>  item.value === this.crearreserva.value.grupo);
      //const objetoprograma = this.programas.filter( item => item.codigo_programa === this.crearreserva.value.programa);
      const objetocolaborador = this.cbencargado.filter( (item: any) => item.id_profesor === this.crearreserva.value.encargado);
      this.objetoreserva = {
        id_reserva:0,
        id_unidad_organizacional: this.crearreserva.value.disponibles,
        identificador_grupo: 0,
        nombre_grupo: this.crearreserva.value.grupo,
        id_usuario_reserva: this.crearreserva.value.usuariopersona,
        fecha_inicio_reserva: this.crearreserva.value.fechainicio,
        fecha_fin_reserva: this.crearreserva.value.fechafin,
        descripcion_reserva: this.crearreserva.value.observaciones,
        estado_reserva: 'activo',
        id_usuario_colaborador: this.crearreserva.value.encargado,
        nombre_usuario_colaborador: objetocolaborador[0].nombre_persona,
        nivel: this.crearreserva.value.nivel,
        codigo_programa: this.crearreserva.value.codigo,
        nombre_programa: this.crearreserva.value.programa,
        submodulo: this.crearreserva.value.submodulo,
        reservaDia: objetoReservaDia
      }
    }
    this._peticion.create('reserva', this.objetoreserva).subscribe((respuesta) => {
      setTimeout(() => {
        if (respuesta.message === 'Registro guardado con exito') {
          this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
        } else {
          this.toastr.error(respuesta.message, 'Exitoso', { timeOut: 1500 });
        };
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
    });
  }

  generarObjetoReservaDia(): ReservaDia[] {
    const objetoReservaDia: ReservaDia[] = [];
    let objDias = [];
    objDias = this.crearreserva.value.dia;
    for (let item of objDias) {
      let tempReservaDia: ReservaDia;
      for (let i = 0; i < 50; i++) {
        if (this.horainicial[i].value === this.crearreserva.value.horainicio) {
          for (let j = (i+1); j < 50; j++) {
            tempReservaDia = {
              reserva_dia_id: 0,
              id_reserva: 0,
              reserva_dia_dia: item,
              reserva_dia_hora_inicio: this.horainicial[(j-1)].value,
              jornada: this.obtenerJornada(item, this.horainicial[(j-1)].value)
            }
            objetoReservaDia.push(tempReservaDia);
            if (this.horainicial[j].value === this.crearreserva.value.horafin) {
              break;
            }
          }
          break;
        }
      }
    };
    return objetoReservaDia;
  }

  obtenerJornada(item: string, hora: number): string {
    if (item === 'Lunes' || item === 'Martes' || item === 'Miércoles' || item === 'Jueves' || item === 'Viernes') {
      if (hora < 1200) {
        return '01';
      } else if (hora < 1815) {
        return '02';
      } else {
        return '03';
      }
    } else if (item === "Sábado") {
      return '04';
    } else {
      return '05';
    }
  }

  cambiarCombos(): void {
    setTimeout(() => {
      if (this.crearreserva.value.sede === 2 || this.crearreserva.value.sede === 426|| this.crearreserva.value.sede === 427 || this.crearreserva.value.sede === 428) {
        this._peticionNestor.getInfo('academico/programas/codigo-escuela/01').subscribe((respuesta) => {
          this.ejecutarCambioCodigoPrograma(respuesta);
        });
      } else if (this.crearreserva.value.sede === 3) {
        this._peticionNestor.getInfo('academico/programas/codigo-sede/04').subscribe((respuesta) => {
          this.ejecutarCambioCodigoPrograma(respuesta);
        });
      } else if (this.crearreserva.value.sede === 4) {
        this._peticionNestor.getInfo('academico/programas/nombre-sede/rionegro').subscribe((respuesta) => {
          this.ejecutarCambioCodigoPrograma(respuesta);
        });
      } else if (this.crearreserva.value.sede === 5) {
        this._peticionNestor.getInfo('academico/programas/nombre-sede/la pintada').subscribe((respuesta) => {
          this.ejecutarCambioCodigoPrograma(respuesta);
        });
      } else if (this.crearreserva.value.sede === 6) {
        this._peticionNestor.getInfo('academico/programas/codigo-sede/05').subscribe((respuesta) => {
          this.ejecutarCambioCodigoPrograma(respuesta);
        });
      } else if (this.crearreserva.value.sede === 7) {
        this._peticionNestor.getInfo('academico/programas/nombre-sede/apartadó').subscribe((respuesta) => {
          this.ejecutarCambioCodigoPrograma(respuesta);
        });
      } else if (this.crearreserva.value.sede === 8) {
        this._peticionNestor.getInfo('academico/programas/codigo-escuela/07').subscribe((respuesta) => {
          this.ejecutarCambioCodigoPrograma(respuesta);
        });
      }
    }, 100);
  }

  identificarGrupoCerrado(item: boolean): string {
    if (item) {
      return 'Grupo Cerrado';
    } else {
      return 'Grupo Regular';
    }
  }

  ejecutarCambioCodigoPrograma(obj: any):void {
    this.spinner = true;
    this.verFormCrear = 'none';
    setTimeout(() => {
      if (obj.length === 0) {
        this.cbcodigo = this.cbProgramasDefecto;
        this.toastr.info('No se encontraron programas asociados', 'Información');
        return
      } else {
        this.cbcodigo = obj;
      }
      this.crearreserva.controls['codigo'].setValue(this.cbcodigo[0].codigo_programa);
    }, 100);
  }

  ejecutarCambioNombrePrograma(): void {
    this.spinner = true;
    this.verFormCrear = 'none';
    setTimeout(() => {
      this.cbprograma = this.cbcodigo.filter((item: any) => item.codigo_programa === this.crearreserva.value.codigo);
      this.crearreserva.controls['programa'].setValue(this.cbprograma[0].label);
    }, 100);
  }

  ejecutarCambioNivel(): void {
    this.spinner = true;
    this.verFormCrear = 'none';
    setTimeout(() => {
      this._peticionNestor.getInfo('academico/' + this.crearreserva.value.codigo + '/niveles').subscribe((respuesta) => {
        this.cbniveles = respuesta;
        this.crearreserva.controls['nivel'].setValue(this.cbniveles[0].nivel);
      });
    }, 100);
  }

  ejecutarCambioGrupo(): void {
    this.spinner = true;
    this.verFormCrear = 'none';
    setTimeout(() => {
      this._peticionNestor.getInfo('academico/' + this.crearreserva.value.codigo + '/' + this.crearreserva.value.nivel + '/grupos').subscribe((respuesta) => {
        this.cbgrupos = respuesta;
        this.crearreserva.controls['grupo'].setValue(this.cbgrupos[0].grupo);
      });
    }, 100);
  }

  ejecutarCambioSubmodulo(): void {
    this.spinner = true;
    this.verFormCrear = 'none';
    setTimeout(() => {
      this._peticionNestor.getInfo('academico/' + this.crearreserva.value.codigo + '/' + this.crearreserva.value.nivel + '/' + this.crearreserva.value.grupo + '/materias').subscribe((respuesta) => {
        this.cbsubmodulo = respuesta;
        this.crearreserva.controls['submodulo'].setValue(this.cbsubmodulo[0].codigo_materia);
      });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 100);
    }, 100);
  }

  validarFormulario():void {
    if (this.crearreserva.invalid) {
      for (const control of Object.keys(this.crearreserva.controls)) {
        this.crearreserva.controls[control].markAsTouched();
      }
      this.toastr.warning('Revise los campos, algo no se encuentra bien', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
    if (this.crearreserva.value.horainicio >= this.crearreserva.value.horafin) {
      this.toastr.warning('La hora de inicio debe ser menor que la hora final', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
    if (this.crearreserva.value.fechainicio <= '2023-06-17') {
      this.toastr.warning('Solo se pueden hacer reservas despues del 18 de Junio del 2023', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
    let datenow = new Date();
    if (this.crearreserva.value.fechainicio < datenow.toISOString().slice(0,10)) {
      this.toastr.warning('La fecha de inicio debe ser mayor a la actual', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
    if (this.crearreserva.value.fechainicio > this.crearreserva.value.fechafin) {
      this.toastr.warning('La fecha de inicio debe ser menor o igual a la fecha final', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
    if (this.crearreserva.value.capacidad < 1) {
      this.toastr.warning('La capacidad debe ser un número entero mayor a 0', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
    if (this.crearreserva.value.dia.length === 0) {
      this.toastr.warning('Debe escoger al menos un día', 'Alerta', { timeOut: 1500 });
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    }
  }

}
