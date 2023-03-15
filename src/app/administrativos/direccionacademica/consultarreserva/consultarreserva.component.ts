import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarComponent } from 'src/app/compartidos/confirmar/confirmar.component';
import { DatosUsuario } from 'src/app/modelos/modelosData';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-consultarreserva',
  templateUrl: './consultarreserva.component.html',
  styleUrls: ['./consultarreserva.component.css']
})
export class ConsultarreservaComponent implements OnInit {

  miFormulario: FormGroup;
  visible = false;
  verfiltro = false;
  comboBox?: any;
  comboBox1?: any;

  constructor(private fb: FormBuilder,
              private _peticion: RestService,
              public Usuario: DatosUsuario,
              public confirmacion: MatDialog,
              private toastr: ToastrService ){
                this.miFormulario = this.fb.group ({
                  radioButton: ['submodulo'],
                  filtro: [''],
                  tipoespacio: [''],
                  unidadesfiltradas: ['']
                });
                this._peticion.getselect('tipoespacio/combo').subscribe((respuesta) => {
                  this.comboBox1 = respuesta;
                  this.miFormulario.controls['tipoespacio'].setValue(this.comboBox1[0].value);
                });
                this.cambioRadio();
  };

  ngOnInit(){
  }

  filtrarUnidadportipo() {
    setTimeout (() => {
      this._peticion.getselect('unidadorganizacional/combo/' + this.miFormulario.value.tipoespacio).subscribe((respuesta) => {
        this.comboBox = respuesta;
        if (this.comboBox.length === 0) {
          this.toastr.error('Este tipo de espacio no tiene registros', 'Error', { timeOut: 1500 });
        } else {
          this.miFormulario.controls['filtro'].setValue(this.comboBox[0].value);
        }
      });
    }, 50)
  }

  buscarReserva(): void {
    setTimeout (() => {
      this._peticion.gettodasreserva('reserva/buscar?type=' + this.miFormulario.value.radioButton + '&search=' + this.miFormulario.value.filtro).subscribe((respuesta) => {
        this.Usuario.datosReserva = respuesta;
        if (this.Usuario.datosReserva.message === 'No hay registros') {
          this.toastr.error('No hay registros', 'Error', { timeOut: 1500 });
          this.visible = false;
        } else {
          this.visible = true;
        }
      });
    }, 100)
  }

  eliminarReserva(id: number ): void {
    const dialogRef = this.confirmacion.open(ConfirmarComponent, { maxWidth: "600px", data: { title: 'CONFIRMACION', message: 'Esta seguro de eliminar este registro?' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._peticion.delete('reserva/' + id).subscribe((respuesta) => {
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

  cambioRadio(){
    switch (this.miFormulario.value.radioButton) {
      case 'unidad_organizacional':
        this.verfiltro = true;
        this.filtrarUnidadportipo();
        break;
      case 'usuario':
        // Usuarios
        this.verfiltro = false;
        this._peticion.getselect('usuario/combo').subscribe((respuesta) => {
          this.comboBox = respuesta;
          this.miFormulario.controls['filtro'].setValue(this.comboBox[0].value);
        });
        break;
      case 'submodulo':
        // Submodulo
        this.verfiltro = false;
        this._peticion.getselect('submodulo/combo').subscribe((respuesta) => {
          this.comboBox = respuesta;
          this.miFormulario.controls['filtro'].setValue(this.comboBox[0].value);
        });
        break;
      default:
        break;
    };
  };

}
