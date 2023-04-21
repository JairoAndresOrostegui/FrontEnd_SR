//Sistema
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Implementacion
import { environment } from 'src/environments/environment';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

//Dependencias auxiliares
//Externas
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';
//Propias de angular
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

//Componentes
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
import { ModalgraficotortaComponent } from './compartidos/modales/modalgraficotorta/modalgraficotorta.component';
import { ModalgraficobarrasComponent } from './compartidos/modales/modalgraficobarras/modalgraficobarras.component';
import { SedesComponent } from './administrativos/direccionacademica/sedes/sedes.component';
import { SpinnerComponent } from './compartidos/spinner/spinner.component';

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
    ReportesreservaComponent,
    ModalgraficotortaComponent,
    ModalgraficobarrasComponent,
    SedesComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    HttpClientModule,
    RecaptchaV3Module,
    NgxChartsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.recaptcha.siteKey
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
