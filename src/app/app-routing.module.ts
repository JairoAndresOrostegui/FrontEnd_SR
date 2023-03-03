import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearreservaComponent } from './administrativos/direccionacademica/crearreserva/crearreserva.component';
import { IniciarsesionComponent } from './autenticacion/iniciarsesion/iniciarsesion.component';

const routes: Routes = [
  { path: '', redirectTo: '/iniciarsesion', pathMatch: 'full'},
  { path: 'iniciarsesion', component: IniciarsesionComponent},
  { path: 'crearreserva', component: CrearreservaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
