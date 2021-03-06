import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RootComponent } from '@dashboard/informatica/_root/root.component';
import { ReporteVisitasComponent } from './reporte-visitas/reporte-visitas.component';
import { RestriccionVisitasComponent } from './restriccion-visitas/restriccion-visitas.component';
const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      { path: '', redirectTo: 'personas-visitan', pathMatch: 'full' },
      { path: 'personas-visitan', component: ReporteVisitasComponent },
      { path: 'restriccion-visitas', component: RestriccionVisitasComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformaticaRoutingModule {
}
