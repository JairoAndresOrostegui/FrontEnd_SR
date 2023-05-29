import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';
import { Hdocente } from '../../../../modelos/reportes/horariodocente';
import { Select } from 'src/app/modelos/genericos/listas';

@Component({
  selector: 'app-reportesreserva',
  templateUrl: './reportesreserva.component.html',
  styleUrls: ['./reportesreserva.component.css']
})
export class ReportesreservaComponent implements OnInit {

  buscar: FormGroup;
  spinner: boolean;
  mostrar: boolean;
  visible: boolean;
  reservalunes: Hdocente[] = [];
  reservamartes: Hdocente[] = [];
  reservamiercoles: Hdocente[] = [];
  reservajueves: Hdocente[] = [];
  reservaviernes: Hdocente[] = [];
  reservasabado: Hdocente[] = [];
  reservadomingo: Hdocente[] = [];
  encargados: any;

  constructor(private _peticion: RestService, public Usuario: DatosUsuario, private fb: FormBuilder, private toastr: ToastrService) {
    this.mostrar = false;
    this.spinner = false;
    this.visible = true;
    this.buscar = this.fb.group ({
      usuario: []
    });
    this._peticion.getselect('reserva/combo-colaborador').subscribe((respuesta) => {
      this.encargados = respuesta;
      this.buscar.controls['usuario'].setValue(this.encargados[0].value);
    });
  }

  ngOnInit(): void {
  }

  buscarReserva(): void {
    this.Usuario.datosReserva = [];
    this.reservalunes = [];
    this.reservamartes = [];
    this.reservamiercoles = [];
    this.reservajueves = [];
    this.reservaviernes = [];
    this.reservasabado = [];
    this.reservadomingo = [];
    this.visible = false;
    this.mostrar = false;
    this.spinner = true;
    this._peticion.getReporteDocente('reserva/reporte-docente?id_colaborador=' + this.buscar.value.usuario).subscribe((respuesta) => {
      this.Usuario.datosReserva = respuesta;
      setTimeout(() => {
        if (this.Usuario.datosReserva.length != 0) {
          for (let item of this.Usuario.datosReserva) {
            if (item.reserva_dia_dia === 'Lunes') {
              this.reservalunes!.push(item);
            } else if (item.reserva_dia_dia === 'Martes') {
              this.reservamartes!.push(item);
            } else if (item.reserva_dia_dia === 'Miércoles') {
              this.reservamiercoles!.push(item);
            } else if (item.reserva_dia_dia === 'Jueves') {
              this.reservajueves!.push(item);
            } else if (item.reserva_dia_dia === 'Viernes') {
              this.reservaviernes!.push(item);
            } else if (item.reserva_dia_dia === 'Sábado') {
              this.reservasabado!.push(item);
            } else if (item.reserva_dia_dia === 'Domingo') {
              this.reservadomingo!.push(item);
            }
          }
          this.mostrar = true;
          this.toastr.success('Registros encontrados', 'Exitoso', { timeOut: 1500 });
        } else {
          this.toastr.error('No se encontraron registros', 'Error', { timeOut: 1500 });
          this.mostrar = false;
        }
        this.spinner = false;
        this.visible = true;
      }, 300);
    });
  }

}
