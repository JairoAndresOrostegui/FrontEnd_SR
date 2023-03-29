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
  cmbdptounidad: any;
  cmbmunicipiound: any;
  cmbcaracteristica: any;
  cmbtipoespaciodep: any;
  cmbunidaddependencia: any;
  caracteristicaslista: any;
  caracteristicaspush: any;
  objetounidad?: {};
  chequeo = false;
  valido = false;
  urlimagen = '';
  
  constructor(
    private peticion: RestService,
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
      this.peticion.getselect('tipoespacio/combo').subscribe((respuesta) => {
        this.cmbtipoespacio = respuesta;
        this.cmbtipoespaciodep = respuesta;
        this.crearsede.controls['tipoespacio'].setValue(this.cmbtipoespacio[0].value);
        this.crearsede.controls['tipoespaciodep'].setValue(this.cmbtipoespaciodep[0].value);
      });
      setTimeout(() => {
        this.peticion.getselect('unidadorganizacional/combo').subscribe((respuesta) => {
          this.cmbunidaddependencia = respuesta;
          this.crearsede.controls['unidaddependencia'].setValue(this.cmbunidaddependencia[0].value);
        });
      }, 100);
      this.peticion.getselect('departamento').subscribe((respuesta) => {
        this.cmbdptounidad = respuesta;
        this.crearsede.controls['dptounidad'].setValue(this.cmbdptounidad[0].value);
      });
      setTimeout(() => {
        this.peticion.getselect('municipio/'+this.cmbdptounidad[0].value).subscribe((respuesta) => {
          this.cmbmunicipiound = respuesta;
          this.crearsede.controls['municipiound'].setValue(this.cmbmunicipiound[0].value);
        });
      }, 200);
      this.peticion.getselect('caracteristica/combo').subscribe((respuesta) => {
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
          this.toastr.error('Esta caracteristica ya esta en la lista', 'Error', { timeOut: 2500 });
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
    this.verificarUnidad();
    setTimeout(() => {
      if (this.valido) {
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
        this.peticion.create('unidadorganizacional', this.objetounidad).subscribe((respuesta) => {
          if(respuesta.message === 'Registro guardado con exito') {
            this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            this.chequeo = false;
            this.limpiarFormulario();
          };
        });
      } else {
        this.toastr.warning('Este nombre de unidad ya existe', 'Alerta', { timeOut: 2500 });
      };
    }, 100);
  }
  
  selectipoespaciodep(): void {
    setTimeout(() => {
      this.peticion.getselect('unidadorganizacional/combo/'+this.crearsede.value.tipoespaciodep).subscribe((respuesta) => {
        this.cmbunidaddependencia = respuesta;
        this.crearsede.controls['unidaddependencia'].setValue(this.cmbunidaddependencia[0].value);
      });
    }, 100);
  }
 
  selectMunicipio(): void {
    setTimeout(() => {
      this.peticion.getselect('municipio/'+this.crearsede.value.dptounidad).subscribe((respuesta) => {
        this.cmbmunicipiound = respuesta;
        this.crearsede.controls['municipiound'].setValue(this.cmbmunicipiound[0].value);
      });
    }, 100);
  }

  verificarUnidad(): void {
    if (this.crearsede.value.nombre === '') {
      this.chequeo = false;
      this.crearsede.controls['nombre'].markAsTouched();
      return;
    };
    this.chequeo = true;
    this.peticion.getvalidar('unidadorganizacional/validatename/'+this.crearsede.value.nombre.toLowerCase()).subscribe((respuesta) => {
      if (!respuesta) {
        this.urlimagen = './../../assets/img/iconos/verificacion.svg';
        this.valido = true;
      } else {
        this.urlimagen = './../../assets/img/iconos/cerrar.svg';
        this.valido = false;
      };
    });
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
