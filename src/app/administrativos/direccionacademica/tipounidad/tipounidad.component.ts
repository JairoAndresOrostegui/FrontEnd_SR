import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  // Variable que almacena los formControlName de los radio button seleccionado
  buscar: FormGroup;
  // Variable que almacena los formControlName de lo datos a ingresar
  actualizar: FormGroup;
  // Variable que almacena el tipo de espacio y su estado
  txttipoespacio?: string;
  txtestadotipo?: string;
  // Varible que almacena el objeto a actualizar
  update?: {};
  // Variable que muestra u ocultan los formularios del HTMKL
  vereditar = false;
  verbuscar = false;
  busqueda = true;
  mostrarCrear = true;
  // Varible del boton retroceder
  volver = false;
  // 
  chequeo = false;
  // Variable para condicional
  valido = true;
  // Variable que almacena la URL d ela imagen chulito o rechazo
  urlimagen?: string;
  // Variable que almacena el nombre del formulario dependiendo si es crear o actualizar
  txtformulario?: string;
  // Variable que almacena el nombre del boton dependiendo si es crear o actualizar
  txtboton?: string;

  constructor(
    private fb: FormBuilder,
    public Usuario: DatosUsuario,
    private toastr: ToastrService,
    private _peticion: RestService,
    public confirmacion: MatDialog
    ) {
      // Variables inicializadas
      this.txtformulario = 'Actualizar';
      this.txtboton = 'Actualizar';
      // FormBuilder de los radioButton
      this.buscar = this.fb.group ({
        entrada: [''],
        filtro: ['nombre']
      });
      // FormBuilder del Formulario de creacion y actualizacion
      this.actualizar = this.fb.group ({ 
        idactualizar: [''], 
        nombreactualizar: ['', Validators.required], 
        estadoactualizar: ['activo', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  // Boton regresar
  regresar(): void {
    this.busqueda = true;
    this.vereditar = false;
    this.verbuscar = false;
    this.volver = false;
    this.mostrarCrear = true;
    this.urlimagen = '';
  }
  // Metodo para crear nuevo registro
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
  // Metodo de la lupa que busca el espacio por defecto si es vacio muestra todos los espacio
  // Si no realiza el filtrado con los datos ingresados en el input
  buscarTipoEspacio(): void {
    this.txtformulario = 'Actualizar';
    this.txtboton = 'Actualizar';
    this.vereditar = false;
    this.volver = false;
    this.busqueda = true;
    if (this.buscar.value.entrada === '') {
      this._peticion.gettipoespacio('tipoespacio').subscribe((respuesta) => {
            this.Usuario.datosTipoEspacio = respuesta;
            this.verbuscar = true;
      });
    } else {
      this._peticion.gettipoespacio('tipoespacio/buscar?type='+this.buscar.value.filtro+'&search='+this.buscar.value.entrada)
          .subscribe((respuesta) => {
            if (respuesta.message != 'No hay registros') {
              this.Usuario.datosTipoEspacio = respuesta;
              this.verbuscar = true;
            } else {
              this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
              this.verbuscar = false;
            };
      });
    };
  };

  // Metodo que muestra los datos de un espacio en especifico 
  mostrarTipoEspacio(id: string): void {
    this.chequeo = false;
    this.verbuscar = false;
    this.busqueda = false;
    this.vereditar = true;
    this.volver = true;
    this.mostrarCrear = false;
    this._peticion.gettipoespacio('tipoespacio/'+id).subscribe((respuesta) => {
      this.actualizar.controls['idactualizar'].setValue(id)
      this.actualizar.controls['nombreactualizar'].setValue(respuesta.nombre_tipo_espacio);
      this.txttipoespacio = respuesta.nombre_tipo_espacio.toLowerCase();
      this.actualizar.controls['estadoactualizar'].setValue(respuesta.estado_tipo_espacio);
      this.txtestadotipo = respuesta.estado_tipo_espacio.toLowerCase();
    });
  }

  // Metodo para actualizar o crear una unidad
  actualizarTipoEspacio(): void {
    this.busqueda = false;
    if (this.actualizar.value.nombreactualizar === '') {
      this.chequeo = false;
      this.actualizar.controls['nombreactualizar'].markAsTouched();
      return;
    }
    this.chequeo = true;
    if (this.txttipoespacio === this.actualizar.value.nombreactualizar.toLowerCase()) {
      if (this.txtestadotipo === this.actualizar.value.estadoactualizar.toLowerCase()) {
        if (this.txtboton === 'Crear') {
          this.toastr.info('Este registro ya ha sido creado', 'Información', { timeOut: 1500 });
        } else {
          this.toastr.info('Debe modificar algun campo para actualizar', 'Información', { timeOut: 1500 });
        }
        this.chequeo = false;
      } else {
        this.actualizarDatos();
      }
    } else{
      this._peticion.getvalidar('tipoespacio/validatename/'+this.actualizar.value.nombreactualizar).subscribe((respuesta) => {
        if (!respuesta || this.txttipoespacio === this.actualizar.value.nombreactualizar.toLowerCase()) {
          this.actualizarDatos();
        } else {
          this.urlimagen = './../../assets/img/iconos/cerrar.svg';
          this.toastr.warning('Ese tipo de espacio ya existe', 'Alerta', { timeOut: 1500 });
        }
      });
    }
  }

  // Funcion que envia la peticion de actualizacion a la base de datos
  actualizarDatos(): void {
    this.urlimagen = './../../assets/img/iconos/verificacion.svg';
    if (this.txtboton === 'Crear') {
      this.update = {
        id_tipo_espacio: 0,
        nombre_tipo_espacio: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_tipo_espacio: this.actualizar.value.estadoactualizar
      };
      this._peticion.create('tipoespacio', this.update).subscribe((respuesta) => {
        if (respuesta.message === 'Registro guardado con exito') {
          this.toastr.success('Tipo de espacio creado con exito', 'Exitoso', { timeOut: 1500 });
          this.txttipoespacio = this.actualizar.value.nombreactualizar.toLowerCase();
          this.txtestadotipo = this.actualizar.value.estadoactualizar.toLowerCase()
        } else {
          this.toastr.error('Error en la creación del tipoespacio', 'Error', { timeOut: 1500 });
        };
      });
    } else {
      this.update = {
        id_tipo_espacio: this.actualizar.value.idactualizar,
        nombre_tipo_espacio: this.actualizar.value.nombreactualizar.toLowerCase(),
        estado_tipo_espacio: this.actualizar.value.estadoactualizar
      };
      this._peticion.update('tipoespacio', this.update).subscribe((respuesta) => {
        if (respuesta.message === "Registro actualizado con exito") {
          this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
          this.txttipoespacio = this.actualizar.value.nombreactualizar.toLowerCase();
          this.txtestadotipo = this.actualizar.value.estadoactualizar.toLowerCase()
        } else {
          this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
        };
      });
    };
  }

  // Elimina el tipo de espacio
  eliminarTipoEspacio(id: number): void {
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar este tipo de espacio físico?' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._peticion.delete('tipoespacio/'+id).subscribe((respuesta) => {
          if (respuesta.message === "Registro eliminado con exito") {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.vereditar = false;
            this.volver = false;
            this.buscarTipoEspacio();
          } else {
            this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          }
        });
      };
    });
  }

}
