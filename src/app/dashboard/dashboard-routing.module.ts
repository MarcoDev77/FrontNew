import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// App
import {MainComponent} from './_main/main.component';
import {MediaFiliacionComponent} from '@dashboard/media-filiacion/media-filiacion.component';
import {DatosAnexosComponent} from '../datos-anexos/datos-anexos.component'
const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'mediafiliacion', component: MediaFiliacionComponent,
      },
      {
        path: 'datosAnexos', component:DatosAnexosComponent,
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
