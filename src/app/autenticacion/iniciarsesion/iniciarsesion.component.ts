import { RestService } from './../../servicios/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {

  login: FormGroup;
  error = false;
  tipoinput!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private peticion: RestService
  ) {
    this.login = this.fb.group(
      {
        usuarios: ['', Validators.required],
        contraseña: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
  }

  iniciarsesion(): void {
    if (this.login.valid) {
      for (const control of Object.keys(this.login.controls)) {
        this.login.controls[control].markAsTouched();
      }
      return;
    };
    // Se validara sin TOKEN
    // this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      this.peticion.login('login', {
        login_usuario: this.login.value.usuario,
        clave_usuario: this.login.value.contraseña
      }).subscribe((respuesta) => {
        if (respuesta?.message === "La contraseña se encuentra desactualizada") {
          // this.toastr.warning(respuesta.message, 'Alerta', { timeOut: 3000 });
          // this.autenticacion.datosUsuario = this.login.value.usuario;
          // this.router.navigate(['iniciarsesion/cambiarcontraseña']);
        } else if ( respuesta?.message === 'Los datos se encuentran desactualizado' || respuesta?.message === 'Autenticación exitosa' ) {
          this.peticion.token = respuesta.token;
          // this.autenticacion.datosLogin = respuesta;
          // this.autenticacion.funcionalidadActiva = this.autenticacion.datosLogin.user.componente[0].funcionalidad[0].nombre_funcionalidad;
          // this.autenticacion.permisos = this.autenticacion.datosLogin.user.componente[0].funcionalidad[0].permisosRol;
          this.login.reset();
          if (respuesta?.message === 'Autenticación exitosa') {
            // this.toastr.success(respuesta.message, 'Exitoso', { timeOut: 1500 });
          } else {
            // this.toastr.warning(respuesta.message, 'Alerta', { timeOut: 3000 });
          }
          // this.router.navigate([this.autenticacion.datosLogin.user.componente[0].funcionalidad[0].url_funcionalidad]);
        }else {
          // this.toastr.error(respuesta.message, 'Error', { timeOut: 3000 });
        }
    // }}
    })
  };

  cambiartipo(): void {
    if (this.tipoinput === 'password') {
      this.tipoinput = 'text';
    } else {
      this.tipoinput = 'password';
    }
  }

}
