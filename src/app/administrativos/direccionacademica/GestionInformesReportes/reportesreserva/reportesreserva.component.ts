import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-reportesreserva',
  templateUrl: './reportesreserva.component.html',
  styleUrls: ['./reportesreserva.component.css']
})
export class ReportesreservaComponent implements OnInit {

  constructor(private _peticion: RestService) {console.log(1)
    this._peticion.getselect('reserva/reporte-docente?id_colaborador=' + 10/*this.Usuario.datosLogin.rol*/).subscribe((respuesta) => {
      console.log(respuesta)/*
      // Miramos si el valor retornado por la APi contiene datos
      if (this.sedes.length > 0) {
        this.cmbSedes = respuesta;
        this.buscar.controls['sede'].setValue(this.cmbSedes[0].value);
      } else {
        this.cmbSedes = this.cbvacio;
        this.buscar.controls['sede'].setValue(this.cmbSedes[0].value);
      } //** FIN if */
    });
  }

  ngOnInit(): void {
  }

}
