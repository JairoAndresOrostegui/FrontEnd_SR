import { RestService } from './../../servicios/rest.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {

  error = false;
  tipoinput!: string;
  usuario: string;
  clave: string;
  logueo: any;

  constructor(
    private router: Router,
    private _peticion: RestService,
    private toastr: ToastrService,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
    this.tipoinput = 'password';
    this.usuario = "";
    this.clave = "";
  }

  ngOnInit(): void {
  }

  iniciarSesion(): void {
    // Se validara el token del captcha de google
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      if (token == "") {
        this.router.navigate(['iniciarsesion']);
      } else {
        /*
        logica del login con la api de cesde
        dfasdkfjasldkf
        if (a = 1) {
          id_rol = 1
        } else {
          id_rol =2
        }
        */
        this._peticion.login('login/menu?id_rol=' + 1, {
        }).subscribe((respuesta) => {console.log(respuesta)
          this.logueo = respuesta;
          /*
          if (respuesta?.message === "La contraseña se encuentra desactualizada") {
            this.toastr.warning(respuesta.message, 'Alerta', { timeOut: 3000 });
            this.autenticacion.datosUsuario = this.login.value.usuario;
            this.router.navigate(['iniciarsesion/cambiarcontraseña']);
          } else if ( respuesta?.message === 'Los datos se encuentran desactualizado' || respuesta?.message === 'Autenticación exitosa' ) {
            this.peticion.token = respuesta.token;
            this.autenticacion.datosLogin = respuesta;
            this.autenticacion.funcionalidadActiva = this.autenticacion.datosLogin.user.componente[0].funcionalidad[0].nombre_funcionalidad;
            this.autenticacion.permisos = this.autenticacion.datosLogin.user.componente[0].funcionalidad[0].permisosRol;
            this.login.reset();
            if (respuesta?.message === 'Autenticación exitosa') {
              this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
            } else {
              this.toastr.warning(respuesta.message, 'Alerta', { timeOut: 3000 });
            }
            this.router.navigate([this.autenticacion.datosLogin.user.componente[0].funcionalidad[0].url_funcionalidad]);
          }else {
            this.toastr.error(respuesta.message, 'Error', { timeOut: 3000 });
          }*/
          if (this.logueo.token === '') {
            this.toastr.warning('Error en la aplicación, contactese con el administrador del sistema', 'Alerta', { timeOut: 3000 });
          } else {
            console.log(respuesta)
          }
        });
      }
    });
  }


  cambiarTipo(): void {
    if (this.tipoinput === 'password') {
      this.tipoinput = 'text';
    } else {
      this.tipoinput = 'password';
    }
  }

}
