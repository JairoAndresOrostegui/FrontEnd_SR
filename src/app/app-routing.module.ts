import { ConsultarunidadComponent } from './administrativos/direccionacademica/consultarunidad/consultarunidad.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearreservaComponent } from './administrativos/direccionacademica/crearreserva/crearreserva.component';
import { IniciarsesionComponent } from './autenticacion/iniciarsesion/iniciarsesion.component';
import { ConsultarreservaComponent } from './administrativos/direccionacademica/consultarreserva/consultarreserva.component';
import { ActualizarreservaComponent } from './administrativos/direccionacademica/actualizarreserva/actualizarreserva.component';
import { CrearunidadComponent } from './administrativos/direccionacademica/crearunidad/crearunidad.component';
import { TipounidadComponent } from './administrativos/direccionacademica/tipounidad/tipounidad.component';
import { CaracteristicasunidadComponent } from './administrativos/direccionacademica/caracteristicasunidad/caracteristicasunidad.component';
import { InformesreservaComponent } from './administrativos/direccionacademica/informesreserva/informesreserva.component';

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
  { path: 'informe1', component: InformesreservaComponent},
  { path: 'informe2', component: InformesreservaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
