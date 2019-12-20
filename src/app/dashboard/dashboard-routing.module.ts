import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// App
import {MainComponent} from './_main/main.component';
import {DatosAnexosComponent} from '../datos-anexos/datos-anexos.component'
import { MediaFiliacionComponent } from '@dashboard/media-filiacion/media-filiacion.component';
import { IngresoComponent } from '../ingreso/ingreso.component';
import { DactiloscapiaComponent } from "../dactiloscapia/dactiloscapia.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'mediafiliacion', component: MediaFiliacionComponent,
      },
      {
        path: 'datosAnexos', component:DatosAnexosComponent,
       
      },
      {
        path: 'ingreso', component: IngresoComponent
      },
      {
        path: 'dactiloscopia', component: DactiloscapiaComponent,
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
