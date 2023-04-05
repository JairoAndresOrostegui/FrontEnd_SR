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

  crearsede: FormGroup;
  cmbtipoespacio: any;
  cmbtipoespaciodep: any;
  tiposdeespacio: any;
  unidadpadre: any;
  unidadespadre: any;
  cmbdptounidad: any;
  cmbmunicipiound: any;
  cmbcaracteristica: any;
  cmbunidaddependencia: any;
  caracteristicaslista: any;
  caracteristicaspush: any;
  objetounidad?: {};
  chequeo = false;
  urlimagen = '';
  
  constructor(
    private _peticion: RestService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public confirmacion: MatDialog
    ) {
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
      this._peticion.getselect('tipoespacio/combo').subscribe((respuesta) => {
        this.tiposdeespacio = respuesta;
        this.cmbtipoespacio = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value != 1);
        this.crearsede.controls['tipoespacio'].setValue(this.cmbtipoespacio[0].value);
        this.cambiarTipoDependencia();
      });
      this._peticion.getselect('unidadorganizacional/combo/1').subscribe((respuesta) => {
        this.unidadpadre = respuesta;
      });
      this._peticion.getselect('unidadorganizacional/combo/2').subscribe((respuesta) => {
        this.unidadespadre = respuesta;
      });
      this._peticion.getselect('departamento').subscribe((respuesta) => {
        this.cmbdptounidad = respuesta;
        this.crearsede.controls['dptounidad'].setValue(this.cmbdptounidad[0].value);
      });
      this._peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
        this.cmbcaracteristica = respuesta;
        this.crearsede.controls['caracteristica'].setValue(this.cmbcaracteristica[0].value);
      });
  }

  ngOnInit(): void {
  }
  
  agregarcaracteristica(): void {
    if (this.crearsede.value.cantidad > 0) {
      for (let item of this.caracteristicaslista) {
        if(this.crearsede.value.caracteristica === item.value) {
          this.toastr.error('Esta característica ya esta en la lista', 'Error', { timeOut: 2500 });
          return;
        }
      }
      this.caracteristicaspush.push({
        id_unidad_organizacional_caracteristica: 0,
        id_caracteristica: this.crearsede.value.caracteristica,
        nombre_caracteristica: "",
        id_unidad_organizacional: 0,
        cantidad_unidad_organizacional_caracteristica: this.crearsede.value.cantidad
      });
      for (let item of this.cmbcaracteristica) {
          if (item.value === this.crearsede.value.caracteristica) {
            this.caracteristicaslista.push({
              value: item.value,
              label: item.label,
              cantidad: this.crearsede.value.cantidad,
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

  crearUnidad(): void {
    if (this.crearsede.invalid) {
      for (const control of Object.keys(this.crearsede.controls)) {
        this.crearsede.controls[control].markAsTouched();
      }
      return;
    }
    this.chequeo = true;
    this._peticion.getvalidar('unidadorganizacional/validatename?nombre_unidad_organizacional=' + this.crearsede.value.nombre.toLowerCase()
                              + '&id_sede=' + this.crearsede.value.unidaddependencia).subscribe((respuesta) => {
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
        this._peticion.create('unidadorganizacional', this.objetounidad).subscribe((respuesta) => {
          if(respuesta.message === 'Registro guardado con exito') {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.chequeo = false;
            this.limpiarFormulario();
          };
        });
      } else {
        this.urlimagen = './../../assets/img/iconos/cerrar.svg';
        this.toastr.warning('Este nombre de unidad ya existe', 'Alerta', { timeOut: 2500 });
      };
    });
  }

  cambiarTipoDependencia(): void {
    setTimeout(() => {
      if (this.crearsede.value.tipoespacio === 2) {
        this.cmbtipoespaciodep = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value === 1);
        this.crearsede.controls['tipoespaciodep'].setValue(this.cmbtipoespaciodep[0].value);
      } else {
        this.cmbtipoespaciodep = this.tiposdeespacio.filter((item: { value: number, label: string }) => item.value === 2);
        this.crearsede.controls['tipoespaciodep'].setValue(this.cmbtipoespaciodep[0].value);
      }
    }, 150);
  }
  
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
 
  selectMunicipio(): void {
    setTimeout(() => {
      this._peticion.getselect('municipio/'+this.crearsede.value.dptounidad).subscribe((respuesta) => {
        this.cmbmunicipiound = respuesta;
        this.crearsede.controls['municipiound'].setValue(this.cmbmunicipiound[0].value);
      });
    }, 100);
  }

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
