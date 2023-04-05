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
  // Form de buscar para aplicar los filtros del radioButtons
  buscar: FormGroup;
  // Form de actualizar el formularios
  actualizar: FormGroup;
  // Variable que almacena los datos del tipo de espacio
  cmbtipoespacio: any;
  tiposdeespacio: any;
  // Variable que almacena los datos del tipo de unidad
  cmbdptounidad: any;
  // Variable que almacena los datos del municipio
  cmbmunicipiound: any;
  // Variable que almacena los datos de la caracteristica
  cmbcaracteristica: any;
  // Variable que almacena los datos de tipo espacio combo
  cmbtipoespaciodep: any;
  // Variable que almacena los datos de unidad de dependencia
  cmbunidaddependencia: any;
  // Variable que almacena la lista de caracteristicas
  caracteristicaslista: any;
  // Variable que almacena el objeto de caracteristicas
  caracteristicaspush: any;
  // Variable que almacena el objeto ingresado
  objetounidad?: {};
  // Variables que permite ocultar u mostrar el formulario
  visible = false;
  mostrar = false;
  chequeo = false;
  valido = false;
  verBuscar = true;
  // Variable que almacena la ruta de la imagen
  urlimagen = '';
  // Variable que lamacenea el nombre de la unidad organizacional
  txtunidad?: string;
  // Variable que almacena el id del departamento
  iddpto?: Number;
  // Variable que almacena el id del tipo espacio padre
  idtipoespaciopadre?: Number;
  // Variable que almacena el nombre del formulario
  txtformulario: string;
  // Variable que almacena la sede para mostrar el comboBox
  cmbSedes: any;
  // Variable que inicializa en caso que no tenga caracteristicas la API
  cbvacio = [{ value: 0, label: 'No existen registros' }]
  // Variable que almacena la sede
  sedes: any;
  // Variable que almacena los id de sede
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
    // FormBuilder de los radioButtons
    this.buscar = this.fb.group({
      entrada: [''],
      filtro: ['nombre'],
      sede: ['']
    });
    // FormBuilder del formulario
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
    // Inicializamos el comboBox de sedes con las que el usuario tenga acceso de informacion
    this._peticion.getselect('unidadrol?id_rol=' + this.Usuario.datosLogin.rol).subscribe((respuesta) => {
      this.sedes = respuesta;
      // Miramos si el valor retornado por la APi contiene datos
      if (this.sedes.length > 0) {
        this.cmbSedes = respuesta;
        this.buscar.controls['sede'].setValue(this.cmbSedes[0].value);
      } else {
        this.cmbSedes = this.cbvacio;
        this.buscar.controls['sede'].setValue(this.cmbSedes[0].value);
      }
    });
  };

  // Iniciamos el radioInicial
  ngOnInit(): void {
  }

  // Metodo para buscar la unidad y le aplica el filtro que se seleccione en el radioButton
  buscarUnidad(): void {
    this.mostrar = false;
    if (this.buscar.value.entrada === '') {
      this._peticion.getrol('unidadorganizacional?id_sede=' + this.buscar.value.sede).subscribe((respuesta) => {
        if (respuesta.message != 'No hay registros') {
          this.Usuario.datosUnidad = respuesta;
          this.visible = true;
        } else {
          this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          this.visible = false;
        }
      });
    } else {
      this._peticion.getrol('unidadorganizacional/buscar?type=' + this.buscar.value.filtro + '&search=' + this.buscar.value.entrada + '&id_sede=' + this.buscar.value.sede).subscribe((respuesta) => {
        if (respuesta.message != 'No hay registros') {
          this.Usuario.datosUnidad = respuesta;
          this.visible = true;
        } else {
          this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          this.Usuario.datosUnidad = '';
          this.visible = false;
        }
      });
    }
  };

  // Despliega la unidad que se ha seleccionado y carga todos los valores que ya esten almacenados
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
      this.txtunidad = respuesta.nombre_unidad_organizacional.toLowerCase();
      this.actualizar.controls['piso'].setValue(respuesta.piso_unidad_organizacional);
      this.actualizar.controls['capacidad'].setValue(respuesta.capacidad_unidad_organizacional);
      this.actualizar.controls['estado'].setValue(respuesta.estado_unidad_organizacional);
      setTimeout(() => {
        this._peticion.getselect('tipoespacio/combo').subscribe((respuesta6) => {
          this.tiposdeespacio = respuesta6;
          this.cmbtipoespacio = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value != 1 && item.value != 2);
          this.actualizar.controls['tipoespacio'].setValue(respuesta.id_tipo_espacio);
          this.cmbtipoespaciodep = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value === 2);
          this.actualizar.controls['tipoespaciodep'].setValue(this.cmbtipoespaciodep[0].value);
          this._peticion.getselect('unidadorganizacional/combo/2').subscribe((respuesta5) => {
            this.cmbunidaddependencia = respuesta5;
            this.actualizar.controls['unidaddependencia'].setValue(respuesta.id_unidad_organizacional_padre);
          });
        });
      }, 100);
      this._peticion.getId('municipio/getByIdMunicipio/' + respuesta.id_municipio).subscribe((respuesta4) => {
        this.iddpto = respuesta4;
        this._peticion.getselect('departamento').subscribe((respuesta3) => {
          this.cmbdptounidad = respuesta3;
          this.actualizar.controls['dptounidad'].setValue(this.iddpto);
          this._peticion.getselect('municipio/' + this.iddpto).subscribe((respuesta2) => {
            this.cmbmunicipiound = respuesta2;
            this.actualizar.controls['municipiound'].setValue(respuesta.id_municipio);
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

  // Elimina la unidad
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

  // Metodo que permite agregar nuevas caracteristicas a la unidad seleccionadoa
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

  // Metodo que permite eliminar caracteristicas en la unidad seleccionada
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

  // Metodo que permite guardar y actualizar con los registros nuevos que fueran modificado
  actualizarUnidad(): void {
    if (this.actualizar.invalid) {
      for (const control of Object.keys(this.actualizar.controls)) {
        this.actualizar.controls[control].markAsTouched();
      }
      return;
    }
    this.chequeo = true;
    if (this.txtunidad === this.actualizar.value.nombre.toLowerCase()) {
      this.actualizarDatos();
    } else {
      this._peticion.getvalidar('unidadorganizacional/validatename?nombre_unidad_organizacional=' + this.actualizar.value.nombre.toLowerCase()
                              + '&id_sede=' + this.actualizar.value.unidaddependencia).subscribe((respuesta) => {
        if (!respuesta || this.actualizar.value.nombre === this.txtunidad) {
          this.actualizarDatos()
        } else {
          this.urlimagen = './../../../../../../assets/img/iconos/cerrar.svg';
          this.toastr.warning('Este nombre de unidad ya existe', 'Alerta', { timeOut: 2500 });
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
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.txtunidad = this.actualizar.value.nombre.toLowerCase();
            this.chequeo = false;
          };
        });
  }

  // Muestra el municipio que se encuentre alamacenado en la api y la almacena en una variable para ser usada en el comboBox
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

}
