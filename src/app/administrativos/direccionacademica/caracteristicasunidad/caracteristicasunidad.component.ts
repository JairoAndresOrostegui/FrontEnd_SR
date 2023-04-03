import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarComponent } from 'src/app/compartidos/confirmar/confirmar.component';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-caracteristicasunidad',
  templateUrl: './caracteristicasunidad.component.html',
  styleUrls: ['./caracteristicasunidad.component.css']
})
export class CaracteristicasunidadComponent implements OnInit {
  // FormBuilder para radioButtons
  buscar: FormGroup;
  // FormBuilder para los datos a crear
  actualizar: FormGroup;
  // Variable que almacena el nombre de la caracteristica y su estado
  txtcaracteristica?: string;
  txtestadocaracteristica?: string;
  // Objeto que almacena los campos a actualizar
  update?: {};
  // Variables que muestran u ocultan los formularios
  vereditar = false;  // Se inicializa en false para que no se muestre este campo de editar
  verbuscar = false;  // Se inicializa en false para que no se muestre este campo que muestra todos los campos que trae
  volver = false;   // Se inicializa en false para que no se muestre este campo. Solamente se muestra cuando se va a crear una caracteristica o actualizar 
  chequeo = false; // Variable que almacena el estado para mostrar y ocultar un icono-validar, se inicializa en false para que no se muestre. Solamente cuando cambie de estado
  busqueda = true;  // Se inicializa en false para que no se muestre este campo que muestra todas las busquedas en la BD
  mostrarCrear = true; // Variable que oculta o muestra el boton de crear, por defecto estara en true
  // Variable que almacena la ruta de la imagen
  urlimagen?: string;
  // Variable que almacena el nombre del fomulario 'Crear' u 'Actualizar'
  txtformulario?: string;
  // Variable que almacena el nombre del boton 'Crear' u 'Actualizar' 
  txtboton?: string;

  constructor(
    // Se inyectan las dependencias requeridas
    private fb: FormBuilder,
    public Usuario: DatosUsuario,
    private toastr: ToastrService,
    private _peticion: RestService,
    public confirmacion: MatDialog
    ) {
      // Se iniciliza las variables
      this.txtformulario = 'Actualizar';
      this.txtboton = 'Actualizar';
      // Se crean los FormBuilder iniciales de los radioButtons y el inout de buscar
      this.buscar = this.fb.group ({ 
        entrada: [''], 
        filtro: ['nombre'] });
        // Se crean los FormBuilder de crear o actualizar los datos caracteristicas de unidad
      this.actualizar = this.fb.group ({ 
        idactualizar: [''], 
        nombreactualizar: ['', Validators.required], 
        estadoactualizar: ['activo', Validators.required] 
      });
  }

  ngOnInit(): void {
  }
  // Funcion del boton regresar. Cambia los estados de los campos que desea ocultar o mostrar
  regresar(): void {
    this.busqueda = true;
    this.vereditar = false;
    this.verbuscar = false;
    this.volver = false;
    this.mostrarCrear = true;
    this.urlimagen = '';
  }
  // Funcion para el boton de Crear Caracteristica
  iniciarCrear(): void {
    this.busqueda = false;
    this.vereditar = true;
    this.verbuscar = false;
    this.volver = true;
    this.chequeo = false;
    this.mostrarCrear = false;
    this.txtformulario = 'Crear';
    this.txtboton = 'Crear';
    this.txtcaracteristica = '';
    this.actualizar.reset();
    this.actualizar.controls['estadoactualizar'].setValue('activo');
  }
  // Funcion para realizar la busqueda segun el filtro seleccionado
  buscarCaracteristica(): void {
    this.txtformulario = 'Actualizar';
    this.txtboton = 'Actualizar';
    this.vereditar = false;
    this.volver = false;
    this.busqueda = true;
    // Si el filtro es vacio muestra todos los datos en la api 'caracteristicas' y los almacena en la variable global 'this.Usuario.datosCaracteristica'
    if (this.buscar.value.entrada === '') {
      this._peticion.getcaracteristica('caracteristica').subscribe((respuesta) => {
            this.Usuario.datosCaracteristica = respuesta;
            this.verbuscar = true;
      });
    } else {
      // Si el filtro no esta vacio envia el nombre de busqueda y el valor de entrada del input y retorna los datos segun los parametros de filtro que se envio
      this._peticion.getcaracteristica('caracteristica/buscar?type='+this.buscar.value.filtro+'&search='+this.buscar.value.entrada)
          .subscribe((respuesta) => {
            if (respuesta.message != 'No hay registros') {
              this.Usuario.datosCaracteristica = respuesta;
              this.verbuscar = true;
            } else {
              this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
              this.verbuscar = false;
            };
      });
    };
  };
  // Funcion que carga los datos del registro al cual se dio click, al cual se va editar o actualizar
  mostrarCaracteristica(id: string): void {
    this.chequeo = false;
    this.verbuscar = false;
    this.busqueda = false;
    this.vereditar = true; 
    this.volver = true;
    this.mostrarCrear = false;
    // Carga los datos del registro seleccionado y lo renderiza en el formulario en su respectivo campo
    this._peticion.getcaracteristica('caracteristica/'+id).subscribe((respuesta) => {
      this.actualizar.controls['idactualizar'].setValue(id)
      this.actualizar.controls['nombreactualizar'].setValue(respuesta.nombre_caracteristica);
      this.txtcaracteristica = respuesta.nombre_caracteristica.toLowerCase();
      this.actualizar.controls['estadoactualizar'].setValue(respuesta.estado_caracteristica);
      this.txtestadocaracteristica = respuesta.estado_caracteristica.toLowerCase();
    });
  }
  // Funcion que actualiza los datos, segun los valores cambiados por el usuario
  actualizarCaracteristica(): void {
    this.busqueda = false;
    if (this.actualizar.value.nombreactualizar === '') {
      this.chequeo = false;
      this.actualizar.controls['nombreactualizar'].markAsTouched();
      return;
    }
    this.chequeo = true;
    // Si no se realizo ninguna modificación muestra el mensaje que debe modificar un campo para actualizar
    if (this.txtcaracteristica === this.actualizar.value.nombreactualizar.toLowerCase()) {
      if (this.txtestadocaracteristica === this.actualizar.value.estadoactualizar.toLowerCase()) {
        this.toastr.info('Debe modificar algun campo para actualizar', 'Información', { timeOut: 1500 });
        this.chequeo = false;
      } else {
        this.actualizarDatos();
      }
    } else{
      // Si modifico algun campo, valida el nombre. Que no se encuentre ya en los registro ingresados. Si no hay ninguno repetido llama la funcion actualizarDatos()
      this._peticion.getvalidar('caracteristica/validatename/'+this.actualizar.value.nombreactualizar).subscribe((respuesta) => {
        if (!respuesta || this.txtcaracteristica === this.actualizar.value.nombreactualizar.toLowerCase()) {
          this.actualizarDatos();
        } else {
          this.urlimagen = './../../assets/img/iconos/cerrar.svg';
          this.toastr.warning('Esa característica ya existe', 'Alerta', { timeOut: 1500 });
        }
      });
    }
  }

  // Funcion que envia la peticion de actualizacion a la base de datos
  actualizarDatos(): void {
    this.urlimagen = './../../assets/img/iconos/verificacion.svg';
    // Si el boton ese Crear, se creara un nuevo registro
    if (this.txtboton === 'Crear') {
      this.update = {
        id_caracteristica: 0,
        nombre_caracteristica: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_caracteristica: this.actualizar.value.estadoactualizar
      };
      this._peticion.create('caracteristica', this.update).subscribe((respuesta) => {
        if (respuesta.message === 'Registro guardado con exito') {
          this.toastr.success('Característica creada con exito', 'Exitoso', { timeOut: 1500 });
          this.txtcaracteristica = this.actualizar.value.nombreactualizar.toLowerCase();
          this.txtestadocaracteristica = this.actualizar.value.estadoactualizar.toLowerCase()
        } else {
          this.toastr.error('Error en la creacion de la característica', 'Error', { timeOut: 1500 });
        };
      });
    } else {
      // Si el boton ese Actualizar, se actualiza un nuevo registro existente
      this.update = {
        id_caracteristica: this.actualizar.value.idactualizar,
        nombre_caracteristica: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_caracteristica: this.actualizar.value.estadoactualizar
      };
      this._peticion.update('caracteristica', this.update).subscribe((respuesta) => {
        if (respuesta.message === "Registro actualizado con exito") {
          this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
          this.txtcaracteristica = this.actualizar.value.nombreactualizar.toLowerCase();
          this.txtestadocaracteristica = this.actualizar.value.estadoactualizar.toLowerCase()
        } else {
          this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
        };
      });
    };
  }

  // Funcion que elimina la caracteristica
  eliminarCaracteristica(id: number): void {
    // Llama una ventana modal para confirmar que si desea eliminar el registro
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar esta característica?' } });
    dialogRef.afterClosed().subscribe(res => {
      // Si la respuesta es afirmativa procede a borrar el registro
      if (res) {
        this._peticion.delete('caracteristica/'+id).subscribe((respuesta) => {
          if (respuesta.message === "Registro eliminado con exito") {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.vereditar = false;
            this.volver = false;
            this.buscarCaracteristica();
          } else {
            this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          }
        });
      };
    });
  }

}
