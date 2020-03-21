import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/comite-tecnico/_root/root.component';
import { PlanActividadesComponent } from './plan-actividades/plan-actividades.component';


const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'plan-actividades', pathMatch: 'full'},
      {path: 'plan-actividades', component: PlanActividadesComponent}
  

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComiteTecnicoRoutingModule {
}
