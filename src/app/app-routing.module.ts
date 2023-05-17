import { ConsultarunidadComponent } from './administrativos/direccionacademica/GestionUnidadesOrganizacionales/consultarunidad/consultarunidad.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearreservaComponent } from './administrativos/direccionacademica/GestionReservasEspaciosFisicos/crearreserva/crearreserva.component';
import { IniciarsesionComponent } from './autenticacion/iniciarsesion/iniciarsesion.component';
import { ConsultarreservaComponent } from './administrativos/direccionacademica/GestionReservasEspaciosFisicos/consultarreserva/consultarreserva.component';
import { ActualizarreservaComponent } from './administrativos/direccionacademica/GestionReservasEspaciosFisicos/actualizarreserva/actualizarreserva.component';
import { CrearunidadComponent } from './administrativos/direccionacademica/GestionUnidadesOrganizacionales/crearunidad/crearunidad.component';
import { TipounidadComponent } from './administrativos/direccionacademica/GestionUnidadesOrganizacionales/tipounidad/tipounidad.component';
import { CaracteristicasunidadComponent } from './administrativos/direccionacademica/GestionUnidadesOrganizacionales/caracteristicasunidad/caracteristicasunidad.component';
import { InformesreservaComponent } from './administrativos/direccionacademica/GestionInformesReportes/informesreserva/informesreserva.component';
import { ReportesreservaComponent } from './administrativos/direccionacademica/GestionInformesReportes/reportesreserva/reportesreserva.component';
import { SedesComponent } from './administrativos/direccionacademica/GestionUnidadesOrganizacionales/sedes/sedes.component';

const routes: Routes = [
  { path: '', redirectTo: '/iniciarsesion', pathMatch: 'full'},
  { path: 'iniciarsesion', component: IniciarsesionComponent},
  { path: 'consultarreserva', component: ConsultarreservaComponent},
  { path: 'crearreserva', component: CrearreservaComponent},
  { path: 'actualizarreserva', component: ActualizarreservaComponent},
  { path: 'consultarunidad', component: ConsultarunidadComponent},
  { path: 'crearunidad', component: CrearunidadComponent},
  { path: 'tipounidad', component: TipounidadComponent},
  { path: 'caracteristicaunidad', component: CaracteristicasunidadComponent},
  { path: 'informesreserva', component: InformesreservaComponent},
  { path: 'reportesreserva', component: ReportesreservaComponent},
  { path: 'sedes', component: SedesComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
