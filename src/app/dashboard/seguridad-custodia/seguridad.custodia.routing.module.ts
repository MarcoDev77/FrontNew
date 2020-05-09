import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from '@dashboard/seguridad-custodia/_root/root.component';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { NombramientoComponent } from './nombramiento/nombramiento.component';
import { CustodiosComponent } from './custodios/custodios.component';
import { CapacitacionesPaseListaComponent } from './capacitaciones-pase-lista/capacitaciones-pase-lista.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      { path: '', redirectTo: 'capacitaciones', pathMatch: 'full' },
      { path: 'capacitaciones', component: CapacitacionesComponent },
      { path: 'capacitaciones-lista', component: CapacitacionesPaseListaComponent },
      { path: 'nombramiento', component: NombramientoComponent },
      { path: 'custodios', component: CustodiosComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadCustodiaRoutingModule {
}
