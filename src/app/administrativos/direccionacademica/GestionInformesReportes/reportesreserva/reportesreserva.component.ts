import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-reportesreserva',
  templateUrl: './reportesreserva.component.html',
  styleUrls: ['./reportesreserva.component.css']
})
export class ReportesreservaComponent implements OnInit {

  buscar: FormGroup;
  visible: boolean;
  mostrar: boolean;

  encargados = [{value: 1, label: 'Carlos Docente'},{value: 2, label: 'Jaime Docente'},{value: 3, label: 'Jorge Docente'}];

  constructor(private _peticion: RestService, public Usuario: DatosUsuario, private fb: FormBuilder, private toastr: ToastrService) {
    this.visible = true;
    this.mostrar = false;
    this.buscar = this.fb.group ({
      usuario: [1]
    });
  }

  ngOnInit(): void {
  }

  buscarReserva(): void {
    this.mostrar = true;
    this._peticion.getselect('reserva/reporte-docente?id_colaborador=' + this.buscar.value.usuario).subscribe((respuesta) => {
      this.Usuario.datosReserva = respuesta;
      if (this.Usuario.datosReserva.length != 0) {
        this.toastr.success('Registros encontrados', 'Exitoso', { timeOut: 1500 });
      } else {
        this.toastr.error('No se encontraron registros', 'Error', { timeOut: 1500 });
        this.mostrar = false;
      }
    });
  }

}
