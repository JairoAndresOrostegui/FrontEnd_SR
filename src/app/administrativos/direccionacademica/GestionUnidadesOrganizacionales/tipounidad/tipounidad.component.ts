import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarComponent } from 'src/app/compartidos/confirmar/confirmar.component';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-tipounidad',
  templateUrl: './tipounidad.component.html',
  styleUrls: ['./tipounidad.component.css']
})
export class TipounidadComponent implements OnInit {
  // FormBuilder para radioButtons
  buscar: FormGroup;
  // FormBuilder para los datos a crear y actualizar
  actualizar: FormGroup;
  // Variable que almacena el tipo de espacio y su estado
  txttipoespacio?: string;
  txtestadotipo?: string;
  // Objeto que almacena los campos a crear o actualizar
  update?: {};
  // Variables que muestran u ocultan los formularios
  vereditar: boolean; // false oculta, true muestra - Formulario de Editar o Crear
  verbuscar: boolean; // false oculta, true muestra - Tabla de datos
  busqueda: boolean; // false oculta, true muestra - Formulario de busqueda y tabla de datos
  mostrarCrear: boolean; // false oculta, true muestra - Boton Crear
  volver: boolean; // false oculta, true muestra - Boton Regresar = icono: flecha
  // Variable que muestra u oculta el icono que valida el nombre del registro
  chequeo: boolean; // false oculta, true muestra
  // Variable que almacena la ruta de la imagen
  urlimagen?: string;
  // Variable que almacena el nombre del fomulario 'Crear' o 'Actualizar'
  txtformulario?: string;
  // Variable que almacena el nombre del boton 'Crear' o 'Actualizar'
  txtboton?: string;
  verFormConsulta: string;
  verFormActualizar: string;
  spinner: boolean;
  page_size: number;
  page_number: number;
  pageSizeOptions = [5,10,20];

  constructor(
    // Se inyectan las dependencias requeridas
    private fb: FormBuilder,
    public Usuario: DatosUsuario,
    private toastr: ToastrService,
    private _peticion: RestService,
    public confirmacion: MatDialog,
    private paginator: MatPaginatorIntl
  ) {
    // Variables inicializadas
    this.txtformulario = 'Actualizar';
    this.txtboton = 'Actualizar';
    this.vereditar = false;
    this.verbuscar = false;
    this.busqueda = true;
    this.mostrarCrear = true;
    this.volver = false;
    this.chequeo = false;
    this.spinner = false;
    this.verFormConsulta = 'block';
    this.verFormActualizar = 'block';
    this.page_size = 5;
    this.page_number = 1;
    paginator.itemsPerPageLabel = 'Registros por página:';
    paginator.nextPageLabel = 'Siguiente';
    paginator.previousPageLabel = 'Anterior';
    // Se crean los FormBuilder iniciales de los radioButtons y el input de buscar
    this.buscar = this.fb.group({
      entrada: [''],
      filtro: ['nombre']
    });
    // Se crean los FormBuilder de crear o actualizar los datos de caracteristicas de unidad
    this.actualizar = this.fb.group({
      idactualizar: [''],
      nombreactualizar: ['', Validators.required],
      estadoactualizar: ['activo', Validators.required]
    });
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  ngOnInit(): void {
  }

  // Funcion del boton regresar. Cambia los estados de los campos que desea ocultar o mostrar
  regresar(): void {
    this.spinner = true;
    this.vereditar = false;
    this.verbuscar = false;
    this.volver = false;
    setTimeout(() => {
      this.busqueda = true;
      this.mostrarCrear = true;
      this.urlimagen = '';
      this.spinner = false;
    }, 300);
  }

  // Funcion para establecer los estados y variables en la modalidad de Crear Caracteristica
  iniciarCrear(): void {
    this.busqueda = false;
    this.vereditar = true;
    this.verbuscar = false;
    this.volver = true;
    this.chequeo = false;
    this.mostrarCrear = false;
    this.txtformulario = 'Crear';
    this.txtboton = 'Crear';
    this.txttipoespacio = '';
    this.actualizar.reset();
    this.actualizar.controls['estadoactualizar'].setValue('activo');
  }

  // Funcion para realizar la busqueda segun el filtro seleccionado
  buscarTipoEspacio(): void {
    this.spinner = true;
    this.verFormConsulta = 'none';
    this.txtformulario = 'Actualizar';
    this.txtboton = 'Actualizar';
    this.vereditar = false;
    this.volver = false;
    // Si el filtro es vacio muestra todos los datos en la api 'tipoespacio' y los almacena en la variable global 'this.Usuario.datosTipoEspacio'
    if (this.buscar.value.entrada === '') {
      this._peticion.gettipoespacio('tipoespacio').subscribe((respuesta) => {
        setTimeout(() => {
          this.spinner = false;
          this.verFormConsulta = 'block';
          this.verbuscar = true;
          this.Usuario.datosTipoEspacio = respuesta;
        }, 300);
      });
    } else {
      // Si el filtro no esta vacio, envia el nombre de busqueda y el valor de entrada del input y retorna los datos segun los parametros de filtro que se envio
      this._peticion.gettipoespacio('tipoespacio/buscar?type=' + this.buscar.value.filtro + '&search=' + this.buscar.value.entrada)
        .subscribe((respuesta) => {
          setTimeout(() => {
            this.verFormConsulta = 'block';
            if (respuesta.message != 'No hay registros') {
              this.verbuscar = true;
              this.Usuario.datosTipoEspacio = respuesta;
            } else {
              this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
              this.verbuscar = false;
            };
            this.spinner = false;
          }, 300);
        });
    };
  };

  // Funcion que carga los datos del registro seleccionado para actualizar
  mostrarTipoEspacio(id: number): void {
    this.chequeo = false;
    this.verbuscar = false;
    this.busqueda = false;
    this.vereditar = true;
    this.volver = true;
    this.mostrarCrear = false;
    this.txtboton = 'Actualizar';
     // Carga los datos del registro seleccionado y lo renderiza en el formulario en su respectivo campo
    this._peticion.gettipoespacio('tipoespacio/' + id).subscribe((respuesta) => {
      this.actualizar.controls['idactualizar'].setValue(id)
      this.actualizar.controls['nombreactualizar'].setValue(respuesta.nombre_tipo_espacio);
      this.txttipoespacio = respuesta.nombre_tipo_espacio.toLowerCase();
      this.actualizar.controls['estadoactualizar'].setValue(respuesta.estado_tipo_espacio);
      this.txtestadotipo = respuesta.estado_tipo_espacio.toLowerCase();
    });
  }

  // Funcion que actualiza los datos, segun los valores cambiados por el usuario
  actualizarTipoEspacio(): void {
    this.busqueda = false;
    // Verifica que el campo nombre no este vacio
    if (this.actualizar.value.nombreactualizar === '' || this.actualizar.value.nombreactualizar === null) {
      this.chequeo = false;
      this.actualizar.controls['nombreactualizar'].markAsTouched();
      return; // Si esta vacio, no se puede enviar la peticion y debe informar al usuario que ese campo es requerido
    }
    this.spinner = true;
    this.verFormActualizar = 'none';
    this.volver = false;
    this.chequeo = true;
    // Valida las variables de nombre de registro y estado para evitar enviar peticiones innecesarias
    if (this.txttipoespacio === this.actualizar.value.nombreactualizar.toLowerCase()) {
      if (this.txtestadotipo === this.actualizar.value.estadoactualizar.toLowerCase()) {
        if (this.txtboton === 'Crear') {
          setTimeout(() => {
            this.spinner = false;
            this.volver = true;
            this.toastr.info('Este registro ya ha sido creado', 'Información', { timeOut: 1500 }); // Muestra el mensaje que informa una creacion de registro duplicada
            this.verFormActualizar = 'block';
          }, 300);
        } else {
          setTimeout(() => {
            this.spinner = false;
            this.volver = true;
            this.toastr.info('Debe modificar algun campo para actualizar', 'Información', { timeOut: 1500 }); // Muestra el mensaje que debe modificar un campo para actualizar
            this.verFormActualizar = 'block';
          }, 300);
        }
        this.chequeo = false;
      } else {
        this.actualizarDatos(); // Invoca la funcion que envia la peticion
      }
    } else {
      // Si modifico el nombre valida que no exista en los registros
      this._peticion.getvalidar('tipoespacio/validatename/' + this.actualizar.value.nombreactualizar).subscribe((respuesta) => {
        if (!respuesta || this.txttipoespacio === this.actualizar.value.nombreactualizar.toLowerCase()) {
          this.actualizarDatos(); // Invoca la funcion que envia la peticion
        } else {
          setTimeout(() => {
            this.spinner = false;
            this.volver = true;
            this.urlimagen = './../../assets/img/iconos/cerrar.svg';
            this.toastr.warning('Ese tipo de espacio ya existe', 'Alerta', { timeOut: 1500 }); // Muestra el mensaje que alerta la existencia de un registro con igual nombre
            this.verFormActualizar = 'block';
            this.txttipoespacio = '';
          }, 300);
        }
      });
    }
  }

  // Funcion que envia la peticion de actualizacion al backend
  actualizarDatos(): void {
    this.urlimagen = './../../assets/img/iconos/verificacion.svg';
    // Si el boton ese Crear, se creara un nuevo registro
    if (this.txtboton === 'Crear') {
      this.update = {
        id_tipo_espacio: 0, //El id debe ser 0 para que el backend le asigne el ID autoincrementable
        nombre_tipo_espacio: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_tipo_espacio: this.actualizar.value.estadoactualizar
      };
      //Envia la peticion de creacion de registro
      this._peticion.create('tipoespacio', this.update).subscribe((respuesta) => {
        if (respuesta.message === 'Registro guardado con exito') {
          setTimeout(() => {
            this.spinner = false;
            this.volver = true;
            this.toastr.success('Tipo de espacio creado con exito', 'Exitoso', { timeOut: 1500 });
            if (this.txtboton === 'Crear') {
              this.txttipoespacio = '';
            } else {
              this.txttipoespacio = this.actualizar.value.nombreactualizar.toLowerCase();
            }
            this.txtestadotipo = this.actualizar.value.estadoactualizar.toLowerCase();
            this.verFormActualizar = 'block';
          }, 300);
        } else {
          setTimeout(() => {
            this.spinner = false;
            this.volver = true;
            this.toastr.error('Error en la creación del tipoespacio', 'Error', { timeOut: 1500 });
            this.verFormActualizar = 'block';
          }, 300);
        };
      });
    } else {
      // Si el boton es Actualizar, se actualiza un nuevo registro existente
      this.update = {
        id_tipo_espacio: this.actualizar.value.idactualizar,
        nombre_tipo_espacio: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_tipo_espacio: this.actualizar.value.estadoactualizar
      };
      //Envia la peticion de creacion de registro
      this._peticion.update('tipoespacio', this.update).subscribe((respuesta) => {
        if (respuesta.message === "Registro actualizado con exito") {
          setTimeout(() => {
            this.spinner = false;
            this.volver = true;
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.txttipoespacio = this.actualizar.value.nombreactualizar.toLowerCase();
            this.txtestadotipo = this.actualizar.value.estadoactualizar.toLowerCase();
            this.verFormActualizar = 'block';
          }, 300);
        } else {
          setTimeout(() => {
            this.spinner = false;
            this.volver = true;
            this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
            this.verFormActualizar = 'block';
          }, 300);
        };
      });
    };
  }

  // Funcion que elimina la caracteristica
  eliminarTipoEspacio(id: number): void {
    // Llama una ventana modal para confirmar si desea eliminar el registro
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar este tipo de espacio físico?' } });
    dialogRef.afterClosed().subscribe(res => {
      // Si la respuesta es afirmativa procede a borrar el registro
      if (res) {
        this._peticion.delete('tipoespacio/' + id).subscribe((respuesta) => {
          if (respuesta.message === "Registro eliminado con exito") {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.vereditar = false;
            this.volver = false;
            this.buscarTipoEspacio(); // Refresca la lista de registros
          } else {
            this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          }
        });
      };
    });
  }

}