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

  buscar: FormGroup;
  actualizar: FormGroup;
  txttipoespacio?: string;
  update?: {};
  vereditar = false;
  verbuscar = false;
  volver = false;
  chequeo = false;
  busqueda = true;
  valido = true;
  mostrarCrear = true;
  urlimagen?: string;
  txtformulario?: string;
  txtboton?: string;

  constructor(
    private fb: FormBuilder,
    public Usuario: DatosUsuario,
    private toastr: ToastrService,
    private peticion: RestService,
    public confirmacion: MatDialog
    ) {
      this.txtformulario = 'Actualizar';
      this.txtboton = 'Actualizar';
      this.buscar = this.fb.group ({ entrada: [''], filtro: ['nombre'] });
      this.actualizar = this.fb.group ({ idactualizar: [''], nombreactualizar: ['', Validators.required], estadoactualizar: ['activo', Validators.required] });
  }

  ngOnInit(): void {
  }

  regresar(): void {
    this.busqueda = true;
    this.vereditar = false;
    this.verbuscar = false;
    this.volver = false;
    this.mostrarCrear = true;
  }

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

  buscarTipoEspacio(): void {
    this.txtformulario = 'Actualizar';
    this.txtboton = 'Actualizar';
    this.vereditar = false;
    this.volver = false;
    this.busqueda = true;
    if (this.buscar.value.entrada === '') {
      this.peticion.gettipoespacio('tipoespacio').subscribe((respuesta) => {
            this.Usuario.datosTipoEspacio = respuesta;
            this.verbuscar = true;
      });
    } else {
      this.peticion.gettipoespacio('tipoespacio/buscar?type='+this.buscar.value.filtro+'&search='+this.buscar.value.entrada)
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

  mostrarTipoEspacio(id: string): void {
    this.chequeo = false;
    this.verbuscar = false;
    this.busqueda = false;
    this.vereditar = true; 
    this.volver = true;
    this.mostrarCrear = false;
    this.peticion.gettipoespacio('tipoespacio/'+id).subscribe((respuesta) => {
      this.actualizar.controls['idactualizar'].setValue(id)
      this.actualizar.controls['nombreactualizar'].setValue(respuesta.nombre_tipo_espacio);
      this.txttipoespacio = respuesta.nombre_tipo_espacio;
      this.actualizar.controls['estadoactualizar'].setValue(respuesta.estado_tipo_espacio);
    });
  }

  actualizarTipoEspacio(): void {
    this.chequeo = false;
    this.busqueda = false;
    if (this.actualizar.invalid) {
      for (const control of Object.keys(this.actualizar.controls)) {
        this.actualizar.controls[control].markAsTouched();
      };
      return;
    };
    this.verificarTipoEspacio();
    setTimeout(() => {
      if (this.valido) {
        if (this.txtboton === 'Crear') {
          this.update = {
            id_tipo_espacio: 0,
            nombre_tipo_espacio: this.actualizar.value.nombreactualizar.toLowerCase(),
            estado_tipo_espacio: this.actualizar.value.estadoactualizar
          };
          this.peticion.create('tipoespacio', this.update).subscribe((respuesta) => {
            if (respuesta.message === 'Registro guardado con exito') {
              this.toastr.success('Tipo de espacio fisico creada con exito', 'Exitoso', { timeOut: 1500 });
            } else {
              this.toastr.error('Error en la creacion del tipo de espacio fisico', 'Error', { timeOut: 1500 });
            };
          });
        } else {
          this.update = {
            id_tipo_espacio: this.actualizar.value.idactualizar,
            nombre_tipo_espacio: this.actualizar.value.nombreactualizar.toLowerCase(),
            estado_tipo_espacio: this.actualizar.value.estadoactualizar
          };
          this.peticion.update('tipoespacio', this.update).subscribe((respuesta) => {
            if (respuesta.message === "Registro actualizado con exito") {
              this.toastr.success('Tipo de espacio actualizado con exito', 'Exitoso', { timeOut: 1500 });
            } else {
              this.toastr.error('Error en la actualizacion del tipo de espacio', 'Error', { timeOut: 1500 });
            };
          });
        };
      } else {
        this.toastr.warning('Ese tipo de espacio ya existe', 'Alerta', { timeOut: 1500 });
      }
    }, 100);
  }

  verificarTipoEspacio(): void {
    if (this.actualizar.value.nombreactualizar === '') {
      this.chequeo = false;
      this.actualizar.controls['nombreactualizar'].markAsTouched();
      return;
    }
    this.chequeo = true;
    this.peticion.getvalidar('tipoespacio/validatename/'+this.actualizar.value.nombreactualizar).subscribe((respuesta) => {
      if (!respuesta || this.txttipoespacio === this.actualizar.value.nombreactualizar) {
        this.urlimagen = './../../../../../../assets/img/iconos/Verificacion.svg';
        this.valido = true;
      } else {
        this.urlimagen = './../../../../../../assets/img/iconos/cerrar.svg';
        this.valido = false;
      }
    })
  }

  eliminarTipoEspacio(id: number): void {
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar este tipo de espacio fisico?' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.peticion.delete('tipoespacio/'+id).subscribe((respuesta) => {
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
