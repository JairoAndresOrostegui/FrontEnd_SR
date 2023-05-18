import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaDia } from 'src/app/modelos/reservas/reserva';

@Component({
  selector: 'app-actualizarreserva',
  templateUrl: './actualizarreserva.component.html',
  styleUrls: ['./actualizarreserva.component.css']
})
export class ActualizarreservaComponent implements OnInit {

  verFormCrear: string;
  crearreserva: FormGroup;
  visible: boolean;
  
  // Variable que almacena la sede para mostrar el comboBox
  cmbSedes: any;
  sedes: any;
  espacios: any;
  spinner: boolean;
  idUnidadReserva?: number;
  verFormConsulta: string;

  cbtipoespacio?: any;
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
  cbvacio = [{ value: 0, label: 'No existen registros' }];
  //Objetos quemados
  //Submodulos
  cbencargado?: any;
  listaUnidades?: any;
  objetoreserva?: {};
  semana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  submodulos = [{ value: 'Algebra 1', label: 'Algebra 1' }, { value: 'Algebra 2', label: 'Algebra 2' },
                { value: 'Estadística', label: 'Estadística' }, { value: 'Lógica computacional', label: 'Lógica computacional' }];
  //Programa
  programas = [{ value: 'CN', label: 'Ingeniería Industrial' }, { value: 'UL', label: 'Ingeniería de Sistemas' }];
  // Grupos
  grupos = [{ value: 1, label: '1A' }, { value: 2, label: '1B' }, { value: 3, label: '2A' }, { value: 4, label: '2B' }];
  // Encargados
  encargados = [{value: 1, label: 'Carlos Docente'},{value: 2, label: 'Jaime Docente'},{value: 3, label: 'Jorge Docente'}];
  cbniveles = [{ value: 1, label: '1' }, { value: 2, label: '2' }];
  listaUnidades1 = [{ value: 1, label: 'Aula 225' }, { value: 2, label: 'Laboratorio 1' }];

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

  constructor(private fb: FormBuilder, private _peticion: RestService, public Usuario: DatosUsuario, public confirmacion: MatDialog,
              private toastr: ToastrService, private peticion: RestService){
    this.spinner = true;
    this.visible = false;
    this.verFormCrear = 'none';
    this.verFormConsulta = 'block';
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
    // Inicializamos el comboBox de sedes con las que el usuario tenga acceso de informacion
    this._peticion.getselect('reserva/filtrar-rol-usuario?nivel_rol=' + this.Usuario.datosLogin.User.nivel_rol + '&area_rol=' + 'plantafisica'/*this.Usuario.datosLogin.area_rol*/).subscribe((respuesta) => {
      this.Usuario.datosReserva = respuesta;
      // Miramos si el valor retornado por la APi contiene datos
      setTimeout(() => {
        this.spinner = false;
        if (this.Usuario.datosReserva.length > 0) {
          this.toastr.success('Registros encontrados', 'Exitoso', { timeOut: 1500 });
          this.visible = true;
        } else {
          this.toastr.error('No hay registros', 'Error', { timeOut: 1500 });
        }
      }, 300);
    });
    // this._peticion.getselect('tipoespacio/combo').subscribe((respuesta) => {
    //   this.comboBoxSede = respuesta;
    //   this.miFormulario.controls['tipoespacio'].setValue(this.comboBoxSede[0].value);
    // });
    // this.cambioRadio();
  };

  ngOnInit(){
  }

  mostrarReserva(id: number): void {
    this.spinner = true;
    this.visible = false;
    this.Usuario.datosReserva = [];
    this.idUnidadReserva = id;
    setTimeout(() => {
      this._peticion.getunidad('reserva/' + id).subscribe((respuesta) => {
        console.log(respuesta)
      });
    }, 100);
    setTimeout(() => {
      this.spinner = false;
      this.verFormCrear = 'block';
    }, 300);
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

  buscarEspacios(): void {
    this.spinner = true;
    this.verFormCrear = 'none';
    if (this.crearreserva.invalid) {
      for (const control of Object.keys(this.crearreserva.controls)) {
        this.crearreserva.controls[control].markAsTouched();
      }
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 300);
      return;
    };
    /*
    if (this.crearreserva.value.horainicio >= this.crearreserva.value.horafin) {
      this.toastr.warning('La hora de inicio debe ser menor que la hora final', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.fechainicio > this.crearreserva.value.fechafin) {
      this.toastr.warning('La fecha de inicio debe ser menor o igual a la fecha final', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.fechainicio < '2023-06-17') {
      this.toastr.warning('Solo se pueden hacer reservas despues del 18 de Junio del 2023', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.capacidad < 1) {
      this.toastr.warning('La capacidad debe ser un número entero mayor a 0', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.dia.length === 0) {
      this.toastr.warning('Debe escoger al menos un día', 'Alerta', { timeOut: 1500 });
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
      capacidad_unidad_organizacional: parseInt(this.crearreserva.value.capacidad),
      estado: this.crearreserva.value.estado
    };
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
    setTimeout(() => {
      this.spinner = false;
      this.verFormCrear = 'block';
    }, 300);
  }

  // Actualiza la reserva segun el dato escogido por el usuario ingresado
  actualizarReserva() {
    this.spinner = true;
    this.verFormCrear = 'none';
    if (this.crearreserva.invalid) {
      for (const control of Object.keys(this.crearreserva.controls)) {
        this.crearreserva.controls[control].markAsTouched();
      }
      this.toastr.warning('Revise los campos, algo no se encuentra bien', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.disponibles === 0 || this.crearreserva.value.disponibles === '') {
      this.toastr.warning('Elija una unidad disponible', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.horainicio >= this.crearreserva.value.horafin) {
      this.toastr.warning('La hora de inicio debe ser menor que la hora final', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.fechainicio > this.crearreserva.value.fechafin) {
      this.toastr.warning('La fecha de inicio debe ser menor o igual a la fecha final', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.fechainicio < '2023-06-17') {
      this.toastr.warning('Solo se pueden hacer reservas despues del 18 de Junio del 2023', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.capacidad < 1) {
      this.toastr.warning('La capacidad debe ser un número entero mayor a 0', 'Alerta', { timeOut: 1500 });
      return;
    }
    if (this.crearreserva.value.dia.length === 0) {
      this.toastr.warning('Debe escoger al menos un día', 'Alerta', { timeOut: 1500 });
      return;
    }
    const objetogrupo = this.grupos.filter( item =>  item.value === this.crearreserva.value.grupo);
    const objetocolaborador = this.encargados.filter( item => item.value === this.crearreserva.value.encargado);
    const objetoprograma = this.programas.filter( item => item.value === this.crearreserva.value.programa);
    const objetoReservaDia = this.generarObjetoReservaDia();
    this.objetoreserva = {
      id_reserva: this.idUnidadReserva,
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
      sede: '',
      reservaDia: objetoReservaDia
    }
    console.log(this.objetoreserva);
    this.peticion.create('reserva', this.objetoreserva).subscribe((respuesta) => {
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
              id_reserva: this.idUnidadReserva!,
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


}
