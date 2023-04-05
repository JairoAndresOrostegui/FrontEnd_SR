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
  visible: boolean;  // false oculta, true muestra - La Tabla de datos
  mostrar: boolean;  // false oculta, true muestra - Formulario de actualizar
  verBuscar: boolean; // false oculta, true muestra - Formulario de busqueda y tabla de datos
  // Variable que muestra u oculta el icono que valida el nombre del registro
  chequeo: boolean;  // false oculta, true muestra
  // 
  // valido: boolean;
  // Variable que almacena la ruta de la imagen
  urlimagen = '';
  // Variable que amacenea el nombre de la unidad organizacional
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

  constructor(
     // Se inyectan las dependencias requeridas
    private fb: FormBuilder,
    private toastr: ToastrService,
    public confirmacion: MatDialog,
    public Usuario: DatosUsuario,
    private _peticion: RestService) {
      // Se inicilizan las variables
    this.txtformulario = 'Actualizar';
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.sedes = this.cbvacio;
    this.visible = false;
    this.mostrar = false;
    this.chequeo = false;
    // this.valido = false; 
    this.verBuscar = true;
    //this.Usuario.datosRol = [];
    // Se crean los FormBuilder iniciales de los radioButtons y el input de buscar
    this.buscar = this.fb.group({
      entrada: [''],
      filtro: ['nombre'],
      sede: ['']
    });
    // Se crean los FormBuilder de crear o actualizar los datos de consultar unidad
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
      } //** FIN if */
    });
  };

  ngOnInit(): void {
  }

  // Funcion para realizar la busqueda segun el filtro seleccionado
  buscarUnidad(): void {
    this.mostrar = false;
    // Si el input es vacio trae todos los datos almacenados
    if (this.buscar.value.entrada === '') {
      this._peticion.getrol('unidadorganizacional?id_sede=' + this.buscar.value.sede).subscribe((respuesta) => {
        // Si en el Back hay registros muestra la tabla con todos los registros
        if (respuesta.message != 'No hay registros') {
          this.Usuario.datosUnidad = respuesta;
          this.visible = true;
        } else {
          // Si no hay registros almacenados muestra un error
          this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          this.visible = false;
        }
      });
    } else {
      // Si hay algun filtro seleccionado y datos ingresados envia la peticion de busqueda
      this._peticion.getrol('unidadorganizacional/buscar?type=' + this.buscar.value.filtro + '&search=' + this.buscar.value.entrada + '&id_sede=' + this.buscar.value.sede).subscribe((respuesta) => {
        // Si en el Back hay registros muestra la tabla con todos los registros
        if (respuesta.message != 'No hay registros') {
          this.Usuario.datosUnidad = respuesta;
          this.visible = true;
        } else {
          // Si no hay registros almacenados muestra un error y oculta la tabla
          this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          this.Usuario.datosUnidad = '';
          this.visible = false;
        }
      });
    }
  };

  // Funcion que despliega la unidad que se ha seleccionado y carga todos los valores que ya esten almacenados
  mostrarUnidad(id: string): void {
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.Usuario.datosUnidad = [];
    this.actualizar.controls['cantidad'].setValue(0);
    this.chequeo = false;
    this.visible = false;
    // Envia el ID de la unidad seleccionada
    this._peticion.getunidad('unidadorganizacional/' + id).subscribe((respuesta) => {
      // Almacenamos y renderizamos en cada campo correspondiente
      this.Usuario.datosUnidad = respuesta;
      this.actualizar.controls['idUnidad'].setValue(id);
      this.actualizar.controls['nombre'].setValue(respuesta.nombre_unidad_organizacional);
      this.txtunidad = respuesta.nombre_unidad_organizacional.toLowerCase();
      this.actualizar.controls['piso'].setValue(respuesta.piso_unidad_organizacional);
      this.actualizar.controls['capacidad'].setValue(respuesta.capacidad_unidad_organizacional);
      this.actualizar.controls['estado'].setValue(respuesta.estado_unidad_organizacional);
      setTimeout(() => {
        // Campos que requieren mas tiempo decarga
        // Hacemos llamado a las apis de cada combo y almacenamos y renderizamos en el campo requerido
        // Combo de tipo espacio
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
      // Combo de de municipio segun el departamento
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
      // Traemos las caracteristicas segun el registro 
      this._peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
        this.cmbcaracteristica = respuesta;
        this.actualizar.controls['caracteristica'].setValue(this.cmbcaracteristica[0].value);
      });
      // Recorremos todos los campos
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

  // Funcion que elimina la unidad
  eliminarUnidad(id: number): void {
    // Llama una ventana modal para confirmar si desea eliminar el registro
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar este registro?' } });
    dialogRef.afterClosed().subscribe(res => {
      // Si la respuesta es afirmativa procede a borrar el registro
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

  // Funcion que agregar una nueva caracteristica, con el Boton Verde de +
  agregarcaracteristica(): void {
    // El valor debe ser mayor a 0
    if (this.actualizar.value.cantidad > 0) {
      // Recorre toda la lista de caracteristicas que se trae del Back
      for (let item of this.caracteristicaslista) {
        // Si la caracteristica seleccionada se encuentra ya registrada muestra el mensaje
        if (this.actualizar.value.caracteristica === item.value) {
          this.toastr.error('Esta caracteristica ya esta en la lista', 'Error', { timeOut: 2500 });
          return;
        } // *** Fin del mensaje si se encuentra la caracteristica registrada ***
      }// *** FIn de recorrer la lista de caracteristicas ***
      // Si todo es valido almacena en variable todos los datos registrados y realiza un push
      this.caracteristicaspush.push({
        id_unidad_organizacional_caracteristica: 0,
        id_caracteristica: this.actualizar.value.caracteristica,
        nombre_caracteristica: "",
        id_unidad_organizacional: this.actualizar.value.idUnidad,
        cantidad_unidad_organizacional_caracteristica: this.actualizar.value.cantidad
      });
      // Recorremos todas las caracteristicas
      for (let item of this.cmbcaracteristica) {
        if (item.value === this.actualizar.value.caracteristica) {
          this.caracteristicaslista.push({
            value: item.value,
            label: item.label,
            cantidad: this.actualizar.value.cantidad,
          });
        };  //* FIN if */
      }; //* FIN for */
    } else {
      // Si la cantidad es 0 o meno Muestra el mensaje
      this.toastr.warning('Ingrese una cantidad mayor a 0', 'Alerta', { timeOut: 2500 });
    }
  }

  // Funcion que elimina la caracteristica
  eliminarcaracteristica(itemr: string): void {
    // Llama una ventana modal para confirmar si desea eliminar el registro
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar esta caracteristica?' } });
    dialogRef.afterClosed().subscribe(res => {
      // Si la respuesta es afirmativa procede a borrar el registro
      if (res) {
        var indice = 0;
        // Recorremos todas las caracteriticas
        for (let item of this.caracteristicaspush) {
          // ALmacenamos el id de la caracteristica a eliminar
          if (item.id_caracteristica === itemr) {
            indice = this.caracteristicaspush.indexOf(item)
          }//** FIN if */
        }; //** FIN for */
        this.caracteristicaspush.splice(indice, 1);
        // Recorremos de nuevo todo el arreglo de caracteristicas
        for (let item of this.caracteristicaslista) {
          if (item.value === itemr) {
            indice = this.caracteristicaslista.indexOf(item)
          }//** FIN for */
        }; //** FIN if */
        this.caracteristicaslista.splice(indice, 1);
      };
    });
  }

  // Funcion que permite actualizar los registros nuevos que fueran modificado
  actualizarUnidad(): void {
    // Comprueba que el formulario sea llenado correctamente
    if (this.actualizar.invalid) {
      for (const control of Object.keys(this.actualizar.controls)) {
        this.actualizar.controls[control].markAsTouched();
      }
      return;
    }
    this.chequeo = true;
    // Valida las variables de nombre de registro y estado para evitar enviar peticiones innecesarias
    if (this.txtunidad === this.actualizar.value.nombre.toLowerCase()) {
      this.actualizarDatos(); // Invoca la funcion que envia la peticion
    } else {
      // Si modifico el nombre valida que no exista en los registros
      this._peticion.getvalidar('unidadorganizacional/validatename?nombre_unidad_organizacional=' + this.actualizar.value.nombre.toLowerCase()
                              + '&id_sede=' + this.actualizar.value.unidaddependencia).subscribe((respuesta) => {
        if (!respuesta || this.actualizar.value.nombre === this.txtunidad) {
          this.actualizarDatos(); // Invoca la funcion que envia la peticion
        } else {
          this.urlimagen = './../../../../../../assets/img/iconos/cerrar.svg';
          this.toastr.warning('Este nombre de unidad ya existe', 'Alerta', { timeOut: 2500 }); // Muestra el mensaje que alerta la existencia de un registro con igual nombre
        };
      });
    }
  }

  // Funcion que envia la peticion de actualizacion al backend
  actualizarDatos(): void {
    this.urlimagen = './../../../../../../assets/img/iconos/Verificacion.svg';
    // Creamos el objeto a almacenar
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
        //Envia la peticion de creacion de registro
        this._peticion.update('unidadorganizacional', this.objetounidad).subscribe((respuesta) => {
          if (respuesta.message === 'Registro actualizado con exito') {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.txtunidad = this.actualizar.value.nombre.toLowerCase();
            this.chequeo = false;
          };
        });
  }

  // Funcion que selecciona el Departamento segun el Municipio que se seleccione
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
