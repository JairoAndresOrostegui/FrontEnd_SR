import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarComponent } from 'src/app/compartidos/confirmar/confirmar.component';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-crearunidad',
  templateUrl: './crearunidad.component.html',
  styleUrls: ['./crearunidad.component.css']
})
export class CrearunidadComponent implements OnInit {

  // FormBuilder para los datos a crear y actualizar
  crearsede: FormGroup;
  // Variable que almacena los valores Tipo de Espacio se usa como variable para ngFor
  cmbtipoespacio: any;
  // Variable que almacena los valores Tipo Unidad Dependencia
  cmbtipoespaciodep: any;
  // Variable que almacena tipo de espacio se usa para realizar un filtro
  tiposdeespacio: any;
  // Variable que almacena la sede principal CESDE
  unidadpadre: any;
  // Variable que almacena las sedes que pertenecen a CESDE
  unidadespadre: any;
  // Variable que almacena los departamentos
  cmbdptounidad: any;
  // Variable que almacena los municipios
  cmbmunicipiound: any;
  // Variable que almacena las caracteristicas
  cmbcaracteristica: any;
  // Variable que almacena la unidad de dependencia
  cmbunidaddependencia: any;
  // Variable que almacena las caracteristicas
  caracteristicaslista: any;
  // Variable que realiza push de una nueva catacteristica
  caracteristicaspush: any;
  // Objeto que almacena los campos a crear o actualizar
  objetounidad?: {};
  // Variable que muestra u oculta el icono que valida el nombre del registro
  chequeo = false; // false oculta, true muestra
  // Variable que almacena la ruta de la imagen
  urlimagen = '';
  verFormCrear: string;
  spinner: boolean;
  
  constructor(
    // Se inyectan las dependencias requeridas
    private _peticion: RestService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public confirmacion: MatDialog
    ) {
      this.spinner = true;
      this.verFormCrear = 'none';
      // Se crean los FormBuilder de crear o actualizar los datos crear unidad
      this.crearsede = this.fb.group ({ 
        nombre: ['', Validators.required],
        piso: [0, Validators.required],
        capacidad: [0, Validators.required],
        cantidad: [0, Validators.required],
        tipoespacio: [''],
        unidaddependencia: [''],
        municipiound: [''],
        dptounidad: [''],
        caracteristica: [''],
        tipoespaciodep: ['']
      });
      this.caracteristicaslista = [];
      this.caracteristicaspush = [];
      // Peticion HTTP al Backend aninada segun la respuesta de la primera filtra la segunda peticion. y lo renderiza en el FrontEnd
      this._peticion.getselect('tipoespacio/combo').subscribe((respuesta) => {
        this.tiposdeespacio = respuesta;
        this.cmbtipoespacio = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value != 1);
        this.crearsede.controls['tipoespacio'].setValue(this.cmbtipoespacio[0].value);
        this.cambiarTipoDependencia();
      });
      // Peticion HTTP al Backend para traer la unidad padre CESDE
      this._peticion.getselect('unidadorganizacional/combo/1').subscribe((respuesta) => {
        this.unidadpadre = respuesta;
      });
      // Peticion HTTP al Backend para traer las sedes asociadas al padre
      this._peticion.getselect('unidadorganizacional/combo/2').subscribe((respuesta) => {
        this.unidadespadre = respuesta;
      });
      // Peticion HTTP al Backend para traer el departamento y lo renderiza en el FrontEnd
      this._peticion.getselect('departamento').subscribe((respuesta) => {
        this.cmbdptounidad = respuesta;
        this.crearsede.controls['dptounidad'].setValue(this.cmbdptounidad[0].value);
      });
      // Peticion HTTP al Backend para traer las caracteristicas y lo renderiza en el FrontEnd
      this._peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
        this.cmbcaracteristica = respuesta;
        this.crearsede.controls['caracteristica'].setValue(this.cmbcaracteristica[0].value);
      });
  }

  ngOnInit(): void {
  }
  
  // Funcion que agregar una nueva caracteristica, con el Boton Verde de +
  agregarcaracteristica(): void {
    // El valor debe ser mayor a 0
    if (this.crearsede.value.cantidad > 0) {
      // Recorre toda la lista de caracteristicas que se trae del Back
      for (let item of this.caracteristicaslista) {
        // Si la caracteristica seleccionada se encuentra ya registrada muestra el mensaje
        if(this.crearsede.value.caracteristica === item.value) {
          this.toastr.error('Esta característica ya esta en la lista', 'Error', { timeOut: 2500 });
          return;
        } // *** Fin del mensaje si se encuentra la caracteristica registrada ***
      } // *** FIn de recorrer la lista de caracteristicas ***
      // Si todo es valido almacena en variable todos los datos registrados y realiza un push
      this.caracteristicaspush.push({
        id_unidad_organizacional_caracteristica: 0,
        id_caracteristica: this.crearsede.value.caracteristica,
        nombre_caracteristica: "",
        id_unidad_organizacional: 0,
        cantidad_unidad_organizacional_caracteristica: this.crearsede.value.cantidad
      });
      // Recorremos todas las caracteristicas
      for (let item of this.cmbcaracteristica) {
          if (item.value === this.crearsede.value.caracteristica) {
            this.caracteristicaslista.push({
              value: item.value,
              label: item.label,
              cantidad: this.crearsede.value.cantidad,
            });
          }; //* FIN if */
      }; 
    } else {
      
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
          } //** FIN if */
        }; //** FIN for */
        this.caracteristicaspush.splice(indice, 1);
        // Recorremos de nuevo todo el arreglo de caracteristicas
        for (let item of this.caracteristicaslista) {
          if (item.value === itemr) {
            indice = this.caracteristicaslista.indexOf(item)
          }
        }; //** FIN for */
        this.caracteristicaslista.splice(indice, 1);
      }; //** FIN if */
    });
  }

  // Funcion que procede a crear la unidad
  crearUnidad(): void {
    // Comprueba que el formulario sea llenado correctamente
    if (this.crearsede.invalid) {
      for (const control of Object.keys(this.crearsede.controls)) {
        this.crearsede.controls[control].markAsTouched();
      } //**FIN for */
      return;
    } //** FIN if */
    this.chequeo = true;
    this.spinner = true;
    this.verFormCrear = 'none';
    //  Si el formulario es correcto procede a llamar la api que valida que el nombre no se encuentre registrado
    this._peticion.getvalidar('unidadorganizacional/validatename?nombre_unidad_organizacional=' + this.crearsede.value.nombre.toLowerCase()
                              + '&id_sede=' + this.crearsede.value.unidaddependencia).subscribe((respuesta) => {
      // Creamos el objeto con todos los campos del formulario registrados
      if (!respuesta) {
        this.urlimagen = './../../assets/img/iconos/verificacion.svg';
        this.objetounidad = {
          id_unidad_organizacional: 0,
          id_tipo_espacio: this.crearsede.value.tipoespacio,
          id_municipio: this.crearsede.value.municipiound,
          nombre_unidad_organizacional: this.crearsede.value.nombre,
          piso_unidad_organizacional: this.crearsede.value.piso,
          capacidad_unidad_organizacional: this.crearsede.value.capacidad,
          estado_unidad_organizacional: 'activo',
          id_unidad_organizacional_padre: this.crearsede.value.unidaddependencia,
          caracteristicas: this.caracteristicaspush
        };
        // Si todos los campos estan bien diligenciados llamamos a la API y enviamos el objeto con todos los campos llenos
        this._peticion.create('unidadorganizacional', this.objetounidad).subscribe((respuesta) => {
          // Si el mensaje que devuelve el Back es 'Registro guardado con exito' se guardo
          if(respuesta.message === 'Registro guardado con exito') {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.chequeo = false;
            this.limpiarFormulario();
          }; //**FIN if */
        });
      } else {
        // Si el nombre ya se encuentre registrado arroja una alerta
        this.urlimagen = './../../assets/img/iconos/cerrar.svg';
        this.toastr.warning('Este nombre de unidad ya existe', 'Alerta', { timeOut: 2500 });
      };
      setTimeout(() => {
        this.spinner = false;
        this.verFormCrear = 'block';
      }, 600);
    });
  }

  // Funcion que cambia el 'tipo unidad de dependencia' segun el 'tipo de espacio' que se escoja
  cambiarTipoDependencia(): void {
    setTimeout(() => {
      if (this.crearsede.value.tipoespacio === 2) {
        this.cmbtipoespaciodep = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value === 1);
        this.crearsede.controls['tipoespaciodep'].setValue(this.cmbtipoespaciodep[0].value);
      } else {
        this.cmbtipoespaciodep = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value === 2);
        this.crearsede.controls['tipoespaciodep'].setValue(this.cmbtipoespaciodep[0].value);
      }
      this.spinner = false;
      this.verFormCrear = 'block';
    }, 150);
  }
  
  // Funcion que muestra en unidad de dependecia
  selectipoespaciodep(): void {
    setTimeout(() => {
      if (this.crearsede.value.tipoespaciodep === 1) {
        this.cmbunidaddependencia = this.unidadpadre;
      } else {
        this.cmbunidaddependencia = this.unidadespadre;
      }
      this.crearsede.controls['unidaddependencia'].setValue(this.cmbunidaddependencia[0].value);
    }, 400);
  }
 
  // Funcion que muestra el municipio
  selectMunicipio(): void {
    setTimeout(() => {
      this._peticion.getselect('municipio/'+this.crearsede.value.dptounidad).subscribe((respuesta) => {
        this.cmbmunicipiound = respuesta;
        this.crearsede.controls['municipiound'].setValue(this.cmbmunicipiound[0].value);
      });
    }, 100);
  }

  // Funcion que limpia el formulario a sus valores predeterminados
  limpiarFormulario(): void {
    this.crearsede.controls['tipoespacio'].setValue(this.cmbtipoespacio[0].value);
    this.crearsede.controls['nombre'].setValue('');
    this.crearsede.controls['piso'].setValue(0);
    this.crearsede.controls['capacidad'].setValue(0);
    this.crearsede.controls['tipoespaciodep'].setValue(this.cmbtipoespacio[0].value);
    this.crearsede.controls['dptounidad'].setValue(this.cmbdptounidad[0].value);
    this.crearsede.controls['caracteristica'].setValue(this.cmbcaracteristica[0].value);
    this.crearsede.controls['cantidad'].setValue(0);
    this.caracteristicaspush = [];
    this.caracteristicaslista = [];
  }

}
