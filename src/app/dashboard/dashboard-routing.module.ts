import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// App
import {MainComponent} from './_main/main.component';
import {MediaFiliacionComponent} from '@dashboard/media-filiacion/media-filiacion.component';
import {DactiloscapiaComponent} from "../dactiloscapia/dactiloscapia.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'usuario', component: MediaFiliacionComponent,
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
