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
  // FormBuilder para los datos a crear y actualizar
  actualizar: FormGroup;
  // Variable que almacena el nombre de la caracteristica y su estado
  txtcaracteristica?: string;
  txtestadocaracteristica?: string;
  // Objeto que almacena los campos a crear o actualizar
  update?: {};
  // Variables que muestran u ocultan los formularios
  vereditar: boolean;  // false oculta, true muestra - Formulario de Editar o Crear
  verbuscar = false;  // false oculta, true muestra - Tabla de datos
  volver = false;   // false oculta, true muestra - Boton Regresar = icono: flecha
  busqueda = true;  // false oculta, true muestra - Formulario de busqueda y tabla de datos
  mostrarCrear = true; // false oculta, true muestra - Boton Crear
  // Variable que muestra u oculta el icono que valida el nombre del registro
  chequeo = false; // false oculta, true muestra
  // Variable que almacena la ruta de la imagen
  urlimagen?: string;
  // Variable que almacena el nombre del fomulario 'Crear' o 'Actualizar'
  txtformulario?: string;
  // Variable que almacena el nombre del boton 'Crear' o 'Actualizar' 
  txtboton?: string;

  constructor(
    // Se inyectan las dependencias requeridas
    private fb: FormBuilder,
    public Usuario: DatosUsuario,
    private toastr: ToastrService,
    private _peticion: RestService,
    public confirmacion: MatDialog
    ) {
      // Se inicilizan las variables
      this.txtformulario = 'Actualizar';
      this.txtboton = 'Actualizar';
      this.vereditar = false;
      // Se crean los FormBuilder iniciales de los radioButtons y el input de buscar
      this.buscar = this.fb.group ({ 
        entrada: [''], 
        filtro: ['nombre'] });
        // Se crean los FormBuilder de crear o actualizar los datos de caracteristicas de unidad
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
      // Si el filtro no esta vacio, envia el nombre de busqueda y el valor de entrada del input y retorna los datos segun los parametros de filtro que se envio
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
  }

  // Funcion que carga los datos del registro seleccionado para actualizar
  mostrarCaracteristica(id: number): void {
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
    // Verifica que el campo nombre no este vacio
    if (this.actualizar.value.nombreactualizar === '' || this.actualizar.value.nombreactualizar === null) {
      this.chequeo = false;
      this.actualizar.controls['nombreactualizar'].markAsTouched();
      return; // Si esta vacio, no se puede enviar la peticion y debe informar al usuario que ese campo es requerido
    }
    this.chequeo = true;
    // Valida las variables de nombre de registro y estado para evitar enviar peticiones innecesarias
    if (this.txtcaracteristica === this.actualizar.value.nombreactualizar.toLowerCase()) {
      if (this.txtestadocaracteristica === this.actualizar.value.estadoactualizar.toLowerCase()) {
        if (this.txtboton === 'Crear') {
          this.toastr.info('Este registro ya ha sido creado', 'Información', { timeOut: 1500 }); // Muestra el mensaje que informa una creacion de registro duplicada
        } else {
          this.toastr.info('Debe modificar algun campo para actualizar', 'Información', { timeOut: 1500 }); // Muestra el mensaje que debe modificar un campo para actualizar
        }
        this.chequeo = false;
      } else {
        this.actualizarDatos();  // Invoca la funcion que envia la peticion
      }
    } else{
      // Si modifico el nombre valida que no exista en los registros
      this._peticion.getvalidar('caracteristica/validatename/'+this.actualizar.value.nombreactualizar).subscribe((respuesta) => {
        if (!respuesta || this.txtcaracteristica === this.actualizar.value.nombreactualizar.toLowerCase()) {
          this.actualizarDatos(); // Invoca la funcion que envia la peticion
        } else {
          this.urlimagen = './../../assets/img/iconos/cerrar.svg';
          this.toastr.warning('Esa característica ya existe', 'Alerta', { timeOut: 1500 }); // Muestra el mensaje que alerta la existencia de un registro con igual nombre
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
        id_caracteristica: 0, //El id debe ser 0 para que el backend le asigne el ID autoincrementable
        nombre_caracteristica: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_caracteristica: this.actualizar.value.estadoactualizar
      };
      //Envia la peticion de creacion de registro
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
      // Si el boton es Actualizar, se actualiza un nuevo registro existente
      this.update = {
        id_caracteristica: this.actualizar.value.idactualizar,
        nombre_caracteristica: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_caracteristica: this.actualizar.value.estadoactualizar
      };
      //Envia la peticion de creacion de registro
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
    // Llama una ventana modal para confirmar si desea eliminar el registro
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar esta característica?' } });
    dialogRef.afterClosed().subscribe(res => {
      // Si la respuesta es afirmativa procede a borrar el registro
      if (res) {
        this._peticion.delete('caracteristica/'+id).subscribe((respuesta) => {
          if (respuesta.message === "Registro eliminado con exito") {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.vereditar = false;
            this.volver = false;
            this.buscarCaracteristica(); // Refresca la lista de registros
          } else {
            this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          }
        });
      };
    });
  }

}
