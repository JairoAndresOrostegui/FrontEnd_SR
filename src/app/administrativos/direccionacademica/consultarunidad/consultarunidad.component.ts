import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarComponent } from 'src/app/compartidos/confirmar/confirmar.component';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-consultarunidad',
  templateUrl: './consultarunidad.component.html',
  styleUrls: ['./consultarunidad.component.css']
})
export class ConsultarunidadComponent implements OnInit {

  buscar: FormGroup;
  actualizar: FormGroup;
  cmbtipoespacio: any;
  cmbdptounidad: any;
  cmbmunicipiound: any;
  cmbcaracteristica: any;
  cmbtipoespaciodep: any;
  cmbunidaddependencia: any;
  caracteristicaslista: any;
  caracteristicaspush: any;
  objetounidad?: {};
  visible = false;
  mostrar = false;
  chequeo = false;
  valido = false;
  urlimagen = '';
  txtunidad?: string;
  iddpto?: Number;
  idtipoespaciopadre?: Number;
  txtformulario: string;
  verBuscar = false;
  comboBoxSede: any;
  verComboBoxSede = true;
  cbvacio = [{ value: 0, label: 'No existen registros' }]
  sedes: any;
  idSede: any;
  idSede2: any;


  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    public confirmacion: MatDialog,
    public Usuario: DatosUsuario,
    private _peticion: RestService) {
    this.txtformulario = 'Actualizar';
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.sedes = this.cbvacio;
    //this.Usuario.datosRol = [];
    this.buscar = this.fb.group({
      entrada: [''],
      filtro: ['sede'],
      sede: ['']
    });
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
    setTimeout(() => {
      // Pido las sedes que tiene asignadas el rol del usuario
      this._peticion.getselect('unidadrol?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
        this.sedes = respuesta;

        if (this.sedes.length > 0) {
          this.comboBoxSede = respuesta;
          this.buscar.controls['sede'].setValue(this.comboBoxSede[0].value);
        } else {
          this.comboBoxSede = this.cbvacio;
          this.buscar.controls['sede'].setValue(this.comboBoxSede[0].value);
        }
      });
    }, 50);
  };

  cambioRadio() {
    switch (this.buscar.controls['filtro'].value) {
      case 'tipo':
        this.verBuscar = true;
        this.verComboBoxSede = false
        this.visible = false;
        this.mostrar = false;
        break;
      case 'nombre':
        this.verBuscar = true;
        this.verComboBoxSede = false
        this.visible = false;
        this.mostrar = false;
        break;
      case 'capacidad':
        this.verBuscar = true;
        this.verComboBoxSede = false
        this.visible = false;
        this.mostrar = false;
        break;
      case 'caracteristica':
        this.verBuscar = true;
        this.verComboBoxSede = false
        this.visible = false;
        this.mostrar = false;
        break;
      case 'estado':
        this.verBuscar = true;
        this.verComboBoxSede = false
        this.visible = false;
        this.mostrar = false;
        break;
      case 'sede':
        this.verBuscar = false;
        this.verComboBoxSede = true;
        this.visible = false;
        // this.filtrarSede();
        break;
      default:
        return;
    }
  }


  filtrarSede() {
    setTimeout(() => {
      if (this.buscar.value.sede != 0) {
        this._peticion.getSede('unidadorganizacional/buscar?type=sede&search=' + this.buscar.value.sede).subscribe((respuesta) => {
          if (respuesta.message === 'No hay registros') {
            console.log('Primero')
            this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
            this.visible = false;
            console.log('Segundo')
          } else {
            this.Usuario.datosUnidad = respuesta;
            this.visible = true;
          }
          console.log('tercero')
        })
      }
    }, 300);
  }

  ngOnInit(): void {
    this.cambioRadio()
    console.log(this.Usuario.permisos?.eliminar)

  }

  buscarUnidad(): void {
    this.mostrar = false;
    if (this.buscar.value.entrada === '') {
      this._peticion.getrol('unidadorganizacional').subscribe((respuesta) => {
        this.Usuario.datosUnidad = respuesta;
        this.visible = true;
      });
    } else {
      this._peticion.getrol('unidadorganizacional/buscar?type=' + this.buscar.value.filtro + '&search=' + this.buscar.value.entrada).subscribe((respuesta) => {
        if (respuesta.message != 'No hay registros') {
          this.Usuario.datosUnidad = respuesta;
          this.visible = true;
        } else {
          this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          this.visible = false;
        }
      });
    }
  };

  mostrarUnidad(id: string): void {
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.Usuario.datosUnidad = [];
    this.actualizar.controls['cantidad'].setValue(0);
    this.chequeo = false;
    this.visible = false;
    this._peticion.getunidad('unidadorganizacional/' + id).subscribe((respuesta) => {
      this.Usuario.datosUnidad = respuesta;
      this.actualizar.controls['idUnidad'].setValue(id);
      this.actualizar.controls['nombre'].setValue(respuesta.nombre_unidad_organizacional);
      this.txtunidad = respuesta.nombre_unidad_organizacional;
      this.actualizar.controls['piso'].setValue(respuesta.piso_unidad_organizacional);
      this.actualizar.controls['capacidad'].setValue(respuesta.capacidad_unidad_organizacional);
      this.actualizar.controls['estado'].setValue(respuesta.estado_unidad_organizacional);
      this._peticion.getunidad('unidadorganizacional/' + respuesta.id_unidad_organizacional_padre).subscribe((respuesta7) => {
        this.idtipoespaciopadre = respuesta7.id_tipo_espacio;
      });
      setTimeout(() => {
        this._peticion.getselect('tipoespacio/combo').subscribe((respuesta6) => {
          this.cmbtipoespacio = respuesta6;
          this.cmbtipoespaciodep = respuesta6;
          this.actualizar.controls['tipoespacio'].setValue(respuesta.id_tipo_espacio);
          this.actualizar.controls['tipoespaciodep'].setValue(this.idtipoespaciopadre);
        });
      }, 100);
      this._peticion.getselect('unidadorganizacional/combo').subscribe((respuesta5) => {
        this.cmbunidaddependencia = respuesta5;
        this.actualizar.controls['unidaddependencia'].setValue(respuesta.id_unidad_organizacional_padre);
      });
      this._peticion.getId('municipio/getByIdMunicipio/' + respuesta.id_municipio).subscribe((respuesta4) => {
        this.iddpto = respuesta4;
      });
      this._peticion.getselect('departamento').subscribe((respuesta3) => {
        this.cmbdptounidad = respuesta3;
        this.actualizar.controls['dptounidad'].setValue(this.iddpto);
      });
      setTimeout(() => {
        this._peticion.getselect('municipio/' + this.iddpto).subscribe((respuesta2) => {
          this.cmbmunicipiound = respuesta2;
          this.actualizar.controls['municipiound'].setValue(respuesta.id_municipio);
        });
      }, 200);
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
        this._peticion.delete('unidadorganizacional/' + id).subscribe((respuesta) => {
          if (respuesta.message === "Registro eliminado con exito") {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.visible = false;
          } else {
            this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          }
        })
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

  actualizarUnidad(): void {
    if (this.actualizar.invalid) {
      for (const control of Object.keys(this.actualizar.controls)) {
        this.actualizar.controls[control].markAsTouched();
      }
      return;
    }
    this.verificarUnidad();
    setTimeout(() => {
      if (this.valido) {
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
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.txtunidad = this.actualizar.value.nombre;
            this.chequeo = false;
          };
        });
      } else {
        this.toastr.warning('Esta caracteristica ya existe', 'Alerta', { timeOut: 2500 });
      };
    }, 100);
  }

  selectipoespaciodep(): void {
    if (this.Usuario.permisos?.modificar === 'si') {
      setTimeout(() => {
        this._peticion.getselect('unidadorganizacional/combo/' + this.actualizar.value.tipoespaciodep).subscribe((respuesta) => {
          this.cmbunidaddependencia = respuesta;
          this.actualizar.controls['unidaddependencia'].setValue(this.cmbunidaddependencia[0].value);
        });
      }, 100);
    }
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

  verificarUnidad(): void {
    if (this.actualizar.value.nombre === '') {
      this.chequeo = false;
      this.actualizar.controls['nombre'].markAsTouched();
      return;
    };
    this.chequeo = true;
    this._peticion.getvalidar('unidadorganizacional/validatename/' + this.actualizar.value.nombre.toLowerCase()).subscribe((respuesta) => {
      if (!respuesta || this.actualizar.value.nombre === this.txtunidad) {
        this.urlimagen = './../../../../../../assets/img/iconos/Verificacion.svg';
        this.valido = true;
      } else {
        this.urlimagen = './../../../../../../assets/img/iconos/cerrar.svg';
        this.valido = false;
      };
    });
  }



}
