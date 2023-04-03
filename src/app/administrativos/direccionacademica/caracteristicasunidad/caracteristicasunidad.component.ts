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
  vereditar = false;
  verbuscar = false;
  volver = false;
  chequeo = false;
  busqueda = true;
  mostrarCrear = true;
  // Variable que almacena la ruta de la imagen
  urlimagen?: string;
  // Variable que almacena el nombre del fomulario 'Crear' u 'Actualizar'
  txtformulario?: string;
  // Variable que almacena el nombre del boton 'Crear' u 'Actualizar' 
  txtboton?: string;

  constructor(
    private fb: FormBuilder,
    public Usuario: DatosUsuario,
    private toastr: ToastrService,
    private _peticion: RestService,
    public confirmacion: MatDialog
    ) {
      // Se iniciliza las variables
      this.txtformulario = 'Actualizar';
      this.txtboton = 'Actualizar';
      // Se crean los FormBuilder
      this.buscar = this.fb.group ({ 
        entrada: [''], 
        filtro: ['nombre'] });
      this.actualizar = this.fb.group ({ 
        idactualizar: [''], 
        nombreactualizar: ['', Validators.required], 
        estadoactualizar: ['activo', Validators.required] 
      });
  }

  ngOnInit(): void {
  }
  // Metodo para el boton de regresar
  regresar(): void {
    this.busqueda = true;
    this.vereditar = false;
    this.verbuscar = false;
    this.volver = false;
    this.mostrarCrear = true;
    this.urlimagen = '';
  }
  // Metodo para el boton de Crear Caracteristica de unidad
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
  // Metodo para realizar la busqueda segun el filtro seleccionado
  buscarCaracteristica(): void {
    this.txtformulario = 'Actualizar';
    this.txtboton = 'Actualizar';
    this.vereditar = false;
    this.volver = false;
    this.busqueda = true;
    if (this.buscar.value.entrada === '') {
      this._peticion.getcaracteristica('caracteristica').subscribe((respuesta) => {
            this.Usuario.datosCaracteristica = respuesta;
            this.verbuscar = true;
      });
    } else {
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
  // Metodo que carga los datos almacenados en la BD para luego actualizarlos
  mostrarCaracteristica(id: string): void {
    this.chequeo = false;
    this.verbuscar = false;
    this.busqueda = false;
    this.vereditar = true; 
    this.volver = true;
    this.mostrarCrear = false;
    this._peticion.getcaracteristica('caracteristica/'+id).subscribe((respuesta) => {
      this.actualizar.controls['idactualizar'].setValue(id)
      this.actualizar.controls['nombreactualizar'].setValue(respuesta.nombre_caracteristica);
      this.txtcaracteristica = respuesta.nombre_caracteristica.toLowerCase();
      this.actualizar.controls['estadoactualizar'].setValue(respuesta.estado_caracteristica);
      this.txtestadocaracteristica = respuesta.estado_caracteristica.toLowerCase();
    });
  }
  // Metodo que actualiza los datos segun los valores cambiados por el usuario
  actualizarCaracteristica(): void {
    this.chequeo = false;
    this.busqueda = false;
    if (this.actualizar.value.nombreactualizar === '') {
      this.chequeo = false;
      this.actualizar.controls['nombreactualizar'].markAsTouched();
      return;
    }
    this.chequeo = true;
    if (this.txtcaracteristica === this.actualizar.value.nombreactualizar.toLowerCase()) {
      if (this.txtestadocaracteristica === this.actualizar.value.estadoactualizar.toLowerCase()) {
        this.toastr.info('Debe modificar algun campo para actualizar', 'Información', { timeOut: 1500 });
        this.chequeo = false;
      } else {
        this.actualizarDatos();
      }
    } else{
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
    if (this.txtboton === 'Crear') {
      this.update = {
        id_caracteristica: 0,
        nombre_caracteristica: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_caracteristica: this.actualizar.value.estadoactualizar
      };
      this._peticion.create('caracteristica', this.update).subscribe((respuesta) => {
        if (respuesta.message === 'Registro guardado con exito') {
          this.toastr.success('Caracteristica creada con exito', 'Exitoso', { timeOut: 1500 });
          this.txtcaracteristica = this.actualizar.value.nombreactualizar.toLowerCase();
          this.txtestadocaracteristica = this.actualizar.value.estadoactualizar.toLowerCase()
        } else {
          this.toastr.error('Error en la creacion de la caracteristica', 'Error', { timeOut: 1500 });
        };
      });
    } else {
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

  // Metodo que elimina la caracteristica
  eliminarCaracteristica(id: number): void {
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar esta característica?' } });
    dialogRef.afterClosed().subscribe(res => {
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
