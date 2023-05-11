import { RestService } from './../../servicios/rest.service';
import { DatosUsuario } from 'src/app/modelos/modelosData';
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

  spinner = false;
  // error = false;
  // Almacena un string para ver el campo tipo texto o password
  tipoinput!: string;
  // Almacena el usuario que esta ingresando en el input de usuario
  usuario: string;
  // Almacena la clave que esta ingresando en el input de password
  clave: string;
  // El id_rol que tiene el usuario que esta autenticando
  id_rol: number;
  // Almacena la respuesta JSON que obtiene de la API login/menu?id_rol=
  logueo: any;

  constructor(
    private router: Router,
    private _peticion: RestService,
    private autenticacion: DatosUsuario,
    private toastr: ToastrService,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
    // Inicializacion de variables
    this.id_rol = 0;
    this.tipoinput = 'password';
    this.usuario = "";
    this.clave = "";
  }

  ngOnInit(): void {
  }

  iniciarSesion(): void {
    // Se validara el token del captcha de google
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      // Si el token viene vacio lo redirecciona a 'iniciarsesion'
      if (token == "") {
        this.router.navigate(['iniciarsesion']);
      } else {
        this.spinner = true;
        setTimeout(() => {
          if ((this.usuario === '') || (this.clave === '')) {
            this.toastr.warning('Ingrese el usuario y la contraseña', 'Alerta', { timeOut: 1500 })
            return;
          } else {
            // Si el usuario y contraseña son correctos realiza la peticion a la API
            this._peticion.login('login', {login_usuario: this.usuario, clave_usuario: this.clave}).subscribe((respuesta) => {
              this.logueo = respuesta;
              // Si el token viene vacio muestra mensaje de error
              if (this.logueo.token === '') {
                this.toastr.warning('Error en la aplicación, contactese con el administrador del sistema', 'Alerta', { timeOut: 3000 });
              } else {
                // Si el login es exitoso muestra mensaje de loguin exitoso y almacena en variables globales los datos de login para ser usuados en algunas parte de otros compoentenes
                this.toastr.success('Login exitoso', 'Exitoso', { timeOut: 1500 });
                this._peticion.token = this.logueo.token;
                // Almacene los datos del login
                this.autenticacion.datosLogin = this.logueo.user.componente;
                // Almacena el rol del login=
                this.autenticacion.datosLogin.rol = this.logueo.user.id_rol;
                // Almacena las funcionalidades activas en la varible global 
                this.autenticacion.funcionalidadActiva = this.autenticacion.datosLogin[0].funcionalidad[0].nombre_funcionalidad;
                // Almacena los permnisos que obtiene el usuario en varible global
                this.autenticacion.permisos = this.autenticacion.datosLogin[0].funcionalidad[0].permisosRol;
                for (let item of this.autenticacion.datosLogin) {
                  item.estado = true;
                }
                // Vuelve los inputs a vacio
                this.usuario = '';
                this.clave = '';
                // Reliza el ruteo en caso que todo este ok
                this.spinner = false;
                this.router.navigate([this.autenticacion.datosLogin[0].funcionalidad[0].url_funcionalidad]);  
              }
            });
          }
        }, 500);
      }
    });
  }

// Funcion que permite ver el password u ocultarlo
  cambiarTipo(): void {
    if (this.tipoinput === 'password') {
      this.tipoinput = 'text';
    } else {
      this.tipoinput = 'password';
    }
  }

}
