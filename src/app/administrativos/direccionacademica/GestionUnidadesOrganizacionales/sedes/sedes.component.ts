import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarComponent } from 'src/app/compartidos/confirmar/confirmar.component';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  actualizar: FormGroup;
  cmbtipoespacio: any;
  tiposdeespacio: any;
  cmbdptounidad: any;
  cmbmunicipiound: any;
  cmbcaracteristica: any;
  cmbtipoespaciodep: any;
  cmbunidaddependencia: any;
  caracteristicaslista: any;
  caracteristicaspush: any;
  sedes: any;
  objetounidad?: {};
  visible: boolean;
  mostrar: boolean;
  verBuscar: boolean;
  chequeo: boolean;
  volver: boolean;
  urlimagen = '';
  txtunidad?: string;
  iddpto?: Number;
  idtipoespaciopadre?: Number;
  txtformulario: string;
  verFormConsulta: string;
  verFormActualizar: string;
  spinner: boolean;
  page_size: number;
  page_number: number;
  pageSizeOptions = [5,10,20];

  constructor(private fb: FormBuilder, private toastr: ToastrService, public confirmacion: MatDialog,
    public Usuario: DatosUsuario, private _peticion: RestService, private paginator: MatPaginatorIntl) {
    this.txtformulario = 'Actualizar';
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.visible = true;
    this.mostrar = false;
    this.chequeo = false;
    this.verBuscar = true;
    this.volver = false;
    this.spinner = false;
    this.verFormConsulta = 'block';
    this.verFormActualizar = 'block';
    this.page_size = 5;
    this.page_number = 1;
    paginator.itemsPerPageLabel = 'Registros por página:';
    paginator.nextPageLabel = 'Siguiente';
    paginator.previousPageLabel = 'Anterior';
    this.actualizar = this.fb.group({
      idUnidad: 0,
      nombre: ['', Validators.required],
      piso: [0, Validators.required],
      capacidad: [0, Validators.required],
      cantidad: [0, Validators.required],
      tipoespacio: [''],
      unidaddependencia: [''],
      municipiound: [''],
      dptounidad: [''],
      caracteristica: [''],
      tipoespaciodep: [''],
      estado: [''],
    });
    this.refrescar();
  }

  ngOnInit(): void {
  }

  refrescar(): void {
    this.spinner = true;
    this.verFormConsulta = 'none';
    this._peticion.getselect('unidadorganizacional/combo/2').subscribe((respuesta) => {
      setTimeout(() => {
        this.spinner = false;
        this.verFormConsulta = 'block';
        this.sedes = respuesta;
        if (this.sedes.length === 0) {
          this.toastr.error('No hay registros', 'Error', { timeOut: 1500 });
        }
      }, 300);
    });
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  mostrarUnidad(id: string): void {
    this.spinner = true;
    this.verFormActualizar = 'none';
    this.verFormConsulta = 'none';
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.Usuario.datosUnidad = [];
    this.actualizar.controls['cantidad'].setValue(0);
    this.chequeo = false;
    this.visible = false;
    this.txtformulario = 'Actualizar';
    this._peticion.getunidad('unidadorganizacional/' + id).subscribe((respuesta) => {
      this.Usuario.datosUnidad = respuesta;
      this.actualizar.controls['idUnidad'].setValue(id);
      this.actualizar.controls['nombre'].setValue(respuesta.nombre_unidad_organizacional);
      this.txtunidad = respuesta.nombre_unidad_organizacional.toLowerCase();
      this.actualizar.controls['piso'].setValue(respuesta.piso_unidad_organizacional);
      this._peticion.getId('reserva/obtener-capacidad?id_sede=' + id).subscribe((respuesta4) => {
        this.actualizar.controls['capacidad'].setValue(respuesta4);
      });
      this.actualizar.controls['estado'].setValue(respuesta.estado_unidad_organizacional);
      this._peticion.getselect('tipoespacio/combo').subscribe((respuesta1) => {
        this.tiposdeespacio = respuesta1;
        this.cmbtipoespacio = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value === 2);
        this.actualizar.controls['tipoespacio'].setValue(this.cmbtipoespacio[0].value);
        this.cmbtipoespaciodep = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value === 1);
        this.actualizar.controls['tipoespaciodep'].setValue(this.cmbtipoespaciodep[0].value);
        this._peticion.getselect('unidadorganizacional/combo/1').subscribe((respuesta2) => {
          this.cmbunidaddependencia = respuesta2;
          this.actualizar.controls['unidaddependencia'].setValue(respuesta.id_unidad_organizacional_padre);
        });
      });
      this._peticion.getId('municipio/getByIdMunicipio/' + respuesta.id_municipio).subscribe((respuesta4) => {
        this.iddpto = respuesta4;
        this._peticion.getselect('departamento').subscribe((respuesta3) => {
          this.cmbdptounidad = respuesta3;
          this.actualizar.controls['dptounidad'].setValue(this.iddpto);
          this._peticion.getselect('municipio/' + this.iddpto).subscribe((respuesta2) => {
            this.cmbmunicipiound = respuesta2;
            this.actualizar.controls['municipiound'].setValue(respuesta.id_municipio);
            setTimeout(() => {
              this.verFormActualizar = 'block';
              this.verFormConsulta = 'block';
              this.volver = true;
              this.spinner = false;
            }, 300);
          });
        });
      });
      this._peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
        this.cmbcaracteristica = respuesta;
        this.actualizar.controls['caracteristica'].setValue(this.cmbcaracteristica[0].value);
      });
      for (let item of respuesta.caracteristicas) {
        this.caracteristicaspush.push({
          id_unidad_organizacional_caracteristica: 0,
          id_caracteristica: item.id_caracteristica,
          nombre_caracteristica: item.nombre_caracteristica,
          id_unidad_organizacional: item.id_unidad_organizacional,
          cantidad_unidad_organizacional_caracteristica: item.cantidad_unidad_organizacional_caracteristica
        });
        this.caracteristicaslista.push({
          value: item.id_caracteristica,
          label: item.nombre_caracteristica,
          cantidad: item.cantidad_unidad_organizacional_caracteristica
        });
      }
      setTimeout(() => {
        if (this.Usuario.permisos?.modificar != 'si') {
          this.txtformulario = 'Información del';
          this.actualizar.controls['tipoespacio'].disable();
          this.actualizar.controls['nombre'].disable();
          this.actualizar.controls['piso'].disable();
          this.actualizar.controls['capacidad'].disable();
          this.actualizar.controls['cantidad'].disable();
          this.actualizar.controls['tipoespaciodep'].disable();
          this.actualizar.controls['unidaddependencia'].disable();
          this.actualizar.controls['dptounidad'].disable();
          this.actualizar.controls['municipiound'].disable();
          this.actualizar.controls['estado'].disable();
        }
      }, 200);
    });
    this.mostrar = true;
  }

  eliminarUnidad(id: number): void {
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar este registro?' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._peticion.getunidad('unidadorganizacional?id_sede=' + id).subscribe((respuesta) => {
          if (respuesta.message === 'No hay registros') {
            this._peticion.delete('unidadorganizacional/' + id).subscribe((respuesta) => {
              if (respuesta.message === "Registro eliminado con exito") {
                this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
                this.refrescar();
              } else {
                this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
              }
            });
          } else {
            this.toastr.error(respuesta.message, 'Error, esta sede tiene registros asociados', { timeOut: 1500 });
          }
        });
      };
    });
  }

  actualizarUnidad(): void {
    if (this.actualizar.invalid) {
      for (const control of Object.keys(this.actualizar.controls)) {
        this.actualizar.controls[control].markAsTouched();
      }
      return;
    }
    this.spinner = true;
    this.verFormActualizar = 'none';
    this.verFormConsulta = 'none';
    this.chequeo = true;
    this.volver = false;
    if (this.txtunidad === this.actualizar.value.nombre.toLowerCase()) {
      this.actualizarDatos();
    } else {
      this._peticion.getvalidar('unidadorganizacional/validatename?nombre_unidad_organizacional=' + this.actualizar.value.nombre.toLowerCase()
                              + '&id_sede=' + this.actualizar.value.unidaddependencia).subscribe((respuesta) => {
        if (!respuesta || this.actualizar.value.nombre === this.txtunidad) {
          this.actualizarDatos();
        } else {
          setTimeout(() => {
            this.verFormActualizar = 'block';
            this.verFormConsulta = 'block';
            this.volver = true;
            this.spinner = false;
            this.urlimagen = './../../../../../../assets/img/iconos/cerrar.svg';
            this.toastr.warning('Este nombre de sede ya existe', 'Alerta', { timeOut: 2500 }); // Muestra el mensaje que alerta la existencia de un registro con igual nombre
          }, 300);
        };
      });
    }
  }

  actualizarDatos(): void {
    this.urlimagen = './../../../../../../assets/img/iconos/Verificacion.svg';
    this.objetounidad = {
      id_unidad_organizacional: this.actualizar.value.idUnidad,
      id_tipo_espacio: this.actualizar.value.tipoespacio,
      id_municipio: this.actualizar.value.municipiound,
      nombre_unidad_organizacional: this.actualizar.value.nombre,
      piso_unidad_organizacional: this.actualizar.value.piso,
      capacidad_unidad_organizacional: this.actualizar.value.capacidad,
      estado_unidad_organizacional: this.actualizar.value.estado,
      id_unidad_organizacional_padre: this.actualizar.value.unidaddependencia,
      caracteristicas: this.caracteristicaspush
    };
    this._peticion.update('unidadorganizacional', this.objetounidad).subscribe((respuesta) => {
      if (respuesta.message === 'Registro actualizado con exito') {
        setTimeout(() => {
          this.verFormActualizar = 'block';
          this.verFormConsulta = 'block';
          this.volver = true;
          this.spinner = false;
          this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
          this.txtunidad = this.actualizar.value.nombre.toLowerCase();
          this.chequeo = false;
        }, 300);
      } else {
        setTimeout(() => {
          this.verFormActualizar = 'block';
          this.verFormConsulta = 'block';
          this.volver = true;
          this.spinner = false;
          this.toastr.error('Error al actualizar el registro', 'Error', { timeOut: 1500 });
          this.txtunidad = this.actualizar.value.nombre.toLowerCase();
          this.chequeo = false;
        }, 300);
      };
    });
  }

  agregarcaracteristica(): void {
    if (this.actualizar.value.cantidad > 0) {
      for (let item of this.caracteristicaslista) {
        if (this.actualizar.value.caracteristica === item.value) {
          this.toastr.error('Esta caracteristica ya esta en la lista', 'Error', { timeOut: 2500 });
          return;
        }
      }
      this.caracteristicaspush.push({
        id_unidad_organizacional_caracteristica: 0,
        id_caracteristica: this.actualizar.value.caracteristica,
        nombre_caracteristica: "",
        id_unidad_organizacional: this.actualizar.value.idUnidad,
        cantidad_unidad_organizacional_caracteristica: this.actualizar.value.cantidad
      });
      for (let item of this.cmbcaracteristica) {
        if (item.value === this.actualizar.value.caracteristica) {
          this.caracteristicaslista.push({
            value: item.value,
            label: item.label,
            cantidad: this.actualizar.value.cantidad,
          });
        };
      };
    } else {
      this.toastr.warning('Ingrese una cantidad mayor a 0', 'Alerta', { timeOut: 2500 });
    }
  }

  eliminarcaracteristica(itemr: string): void {
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar esta caracteristica?' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        var indice = 0;
        for (let item of this.caracteristicaspush) {
          if (item.id_caracteristica === itemr) {
            indice = this.caracteristicaspush.indexOf(item)
          }
        };
        this.caracteristicaspush.splice(indice, 1);
        for (let item of this.caracteristicaslista) {
          if (item.value === itemr) {
            indice = this.caracteristicaslista.indexOf(item)
          }
        };
        this.caracteristicaslista.splice(indice, 1);
      };
    });
  }

  selectMunicipio(): void {
    if (this.Usuario.permisos?.modificar === 'si') {
      setTimeout(() => {
        this._peticion.getselect('municipio/' + this.actualizar.value.dptounidad).subscribe((respuesta) => {
          this.cmbmunicipiound = respuesta;
          this.actualizar.controls['municipiound'].setValue(this.cmbmunicipiound[0].value);
        });
      }, 50);
    }
  }

  regresar(): void {
    this.spinner = true;
    this.verFormActualizar = 'none';
    this.verFormConsulta = 'none';
    this.visible = true;
    this.mostrar = false;
    this.volver = false;
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.Usuario.datosUnidad = [];
    this.urlimagen = '';
    this.refrescar();
    setTimeout(() => {
      this.verFormActualizar = 'block';
      this.verFormConsulta = 'block';
      this.visible = true;
      this.spinner = false;
    }, 300);
  }

}
