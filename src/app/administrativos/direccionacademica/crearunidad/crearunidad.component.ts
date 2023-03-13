import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  chequeo = false;
  valido = false;
  urlimagen = '';

  constructor(
    private peticion: RestService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
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
  }

  ngOnInit(): void {
  }

  selectipoespaciodep(): void {/*
    setTimeout(() => {
      this.peticion.getselect('unidadorganizacional/combo/'+this.crearsede.value.tipoespaciodep).subscribe((respuesta) => {
        this.cmbunidaddependencia = respuesta;
        this.crearsede.controls['unidaddependencia'].setValue(this.cmbunidaddependencia[0].value);
      });
    }, 100);*/
  }
 
  selectMunicipio(): void {/*
    setTimeout(() => {
      this.peticion.getselect('municipio/'+this.crearsede.value.dptounidad).subscribe((respuesta) => {
        this.cmbmunicipiound = respuesta;
        this.crearsede.controls['municipiound'].setValue(this.cmbmunicipiound[0].value);
      });
    }, 100);*/
  }

}
