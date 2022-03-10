import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from '@dashboard/seguridad-custodia/_root/root.component';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { NombramientoComponent } from './nombramiento/nombramiento.component';
import { CustodiosComponent } from './custodios/custodios.component';
import { CapacitacionesPaseListaComponent } from './capacitaciones-pase-lista/capacitaciones-pase-lista.component';
import { PertenenciasComponent } from './pertenencias/pertenencias.component';
import { RevisionesComponent } from './revisiones/revisiones.component';
import { RegistroVisitasComponent } from './registro-visitas/registro-visitas.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      { path: '', redirectTo: 'capacitaciones', pathMatch: 'full' },
      { path: 'capacitaciones', component: CapacitacionesComponent },
      { path: 'capacitaciones-lista', component: CapacitacionesPaseListaComponent },
      { path: 'nombramiento', component: NombramientoComponent },
      { path: 'custodios', component: CustodiosComponent },
      { path: 'revisiones', component: RevisionesComponent },
      { path: 'revisiones-pertenencias', component: PertenenciasComponent },
      { path: 'registro-visitas', loadChildren: () => import("./registro-visitas/registro-visitas.module").then(m => m.RegistroVisitasModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadCustodiaRoutingModule {
}
