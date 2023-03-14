import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CabeceraComponent } from './compartidos/cabecera/cabecera.component';
import { PieceraComponent } from './compartidos/piecera/piecera.component';
import { ConfirmarComponent } from './compartidos/confirmar/confirmar.component';
import { MenudenavegacionComponent } from './compartidos/menudenavegacion/menudenavegacion.component';
import { RegresarComponent } from './compartidos/regresar/regresar.component';
import { IniciarsesionComponent } from './autenticacion/iniciarsesion/iniciarsesion.component';
import { CrearreservaComponent } from './administrativos/direccionacademica/crearreserva/crearreserva.component';
import { ConsultarreservaComponent } from './administrativos/direccionacademica/consultarreserva/consultarreserva.component';
import { ActualizarreservaComponent } from './administrativos/direccionacademica/actualizarreserva/actualizarreserva.component';
import { RecuperaraccesoComponent } from './autenticacion/recuperaracceso/recuperaracceso.component';
import { ConsultarunidadComponent } from './administrativos/direccionacademica/consultarunidad/consultarunidad.component';
import { CrearunidadComponent } from './administrativos/direccionacademica/crearunidad/crearunidad.component';
import { TipounidadComponent } from './administrativos/direccionacademica/tipounidad/tipounidad.component';
import { CaracteristicasunidadComponent } from './administrativos/direccionacademica/caracteristicasunidad/caracteristicasunidad.component';
import { InformesreservaComponent } from './administrativos/direccionacademica/informesreserva/informesreserva.component';
import { ReportesreservaComponent } from './administrativos/direccionacademica/reportesreserva/reportesreserva.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieceraComponent,
    ConfirmarComponent,
    MenudenavegacionComponent,
    RegresarComponent,
    IniciarsesionComponent,
    CrearreservaComponent,
    ConsultarreservaComponent,
    ActualizarreservaComponent,
    RecuperaraccesoComponent,
    ConsultarunidadComponent,
    CrearunidadComponent,
    TipounidadComponent,
    CaracteristicasunidadComponent,
    InformesreservaComponent,
    ReportesreservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    RecaptchaV3Module
  ],
  providers: [
    {
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.recaptcha.siteKey
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
