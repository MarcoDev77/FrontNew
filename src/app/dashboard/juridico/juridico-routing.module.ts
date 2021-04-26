import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from './_root/root.component';
import {BusquedaIngresoComponent} from '@dashboard/juridico/busqueda-ingreso/busqueda-ingreso.component';
const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'busqueda-ingreso', pathMatch: 'full'},
      {path: 'busqueda-ingreso', component: BusquedaIngresoComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuridicoRoutingModule {
}
