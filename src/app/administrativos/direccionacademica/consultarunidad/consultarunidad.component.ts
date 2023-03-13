import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

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
  // Indique la cantidad
  caracteristicaslista: any;
  caracteristicaspush: any;
  txtunidad?: string;

  constructor(
    private fb: FormBuilder,
    private peticion: RestService,
    public Usuario: DatosUsuario
    ) {
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

  buscarUnidad(): void {
    this.mostrar = false;
    if ( this.frmactualizar.value.entrada === '' ){
      this.peticion.getrol('unidadorganizacional').subscribe((respuesta) => {
        this.Usuario.datosUnidad = respuesta;
        this.visible = true;
      });
    } else {
      this.peticion.getrol('unidadorganizacional/buscar?type=' + this.frmbuscar.value.filtro + '&search=' + this.frmbuscar.value.entrada).subscribe((respuesta) => {
        if(respuesta.message != 'No hay registros') {
          this.Usuario.datosUnidad = respuesta;
          this.visible = true;
        } else {
          // this.toastr.error(respuesta.message, 'Error', { timeOut: 1500 });
          this.visible = false;
        };
      });
    };
  };

  mostrarUnidad(id: number): void {
    this.caracteristicaslista = [];
    this.caracteristicaspush = [];
    this.Usuario.datosUnidad = [];
    this.frmactualizar.controls['cantidad'].setValue(0);
    this.chequeo = false;
    this.visible = false;
    this.peticion.getunidad('unidadorganizacional/' + id ).subscribe((respuesta) => {
      this.Usuario.datosUnidad = respuesta;
      this.frmactualizar.controls['idUnidad'].setValue(id);
      this.frmactualizar.controls['nombre'].setValue(respuesta.nombre_unidad_organizacional);
      this.txtunidad = respuesta.nombre_unidad_organizacional;
    })
  }

  ngOnInit(): void {
  }

  selectMunicipio(): void {

  }

  selectipoespaciodep(): void {

  }

  actualizarUnidad(): void {

  }

  agregarCaracteristica(): void {

  }

  eliminarCaracteristica(): void {

  }

}
