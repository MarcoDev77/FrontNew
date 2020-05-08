import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/seguridad-custodia/_root/root.component';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { NombramientoComponent } from './nombramiento/nombramiento.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'capacitaciones', pathMatch: 'full'},
      {path: 'capacitaciones', component: CapacitacionesComponent},
      {path: 'nombramiento',component: NombramientoComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadCustodiaRoutingModule {
}
