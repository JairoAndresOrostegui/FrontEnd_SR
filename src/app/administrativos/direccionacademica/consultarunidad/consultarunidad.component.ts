import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultarunidad',
  templateUrl: './consultarunidad.component.html',
  styleUrls: ['./consultarunidad.component.css']
})
export class ConsultarunidadComponent implements OnInit {

  frmbuscar: FormGroup;
  frmactualizar: FormGroup;
  cmbtipoespacio: any;
  cmbtipoespaciodep: any;
  cmbunidaddependencia: any;
  cmbdptounidad: any;
  cmbmunicipiound: any;
  visible: boolean;
  mostrar: boolean;
  chequeo: boolean;
  txtformulario: string;
  urlimagen: string;

  constructor(private fb: FormBuilder) {
    this.txtformulario = 'Actualizar';
    this.visible = false;
    this.mostrar = false;
    this.chequeo = false;
    this.urlimagen = "";
    this.frmbuscar = this.fb.group ({ entrada: [''], filtro: ['nombre'] });
    this.frmactualizar = this.fb.group ({
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
      estado: ['']
    })
  }

  ngOnInit(): void {
  }

  selectMunicipio(): void {

  }

  selectipoespaciodep(): void {

  }

  buscarUnidad(): void {

  }

  mostrarUnidad(id: number): void {

  }

  actualizarUnidad(): void {

  }

  agregarCaracteristica(): void {

  }

  eliminarCaracteristica(): void {

  }

}
