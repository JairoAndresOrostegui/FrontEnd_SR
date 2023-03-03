import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CabeceraComponent } from './compartidos/cabecera/cabecera.component';
import { PieceraComponent } from './compartidos/piecera/piecera.component';
import { ConfirmarComponent } from './compartidos/confirmar/confirmar.component';
import { MenudenavegacionComponent } from './compartidos/menudenavegacion/menudenavegacion.component';
import { RegresarComponent } from './compartidos/regresar/regresar.component';

import { IniciarsesionComponent } from './autenticacion/iniciarsesion/iniciarsesion.component';
import { CrearreservaComponent } from './administrativos/direccionacademica/crearreserva/crearreserva.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieceraComponent,
    ConfirmarComponent,
    MenudenavegacionComponent,
    RegresarComponent,
    IniciarsesionComponent,
    CrearreservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
