import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


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
    CaracteristicasunidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
