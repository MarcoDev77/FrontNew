import {NgModule} from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {AuthGuard} from '@shared/helpers/auth.guard';
import {roles as r} from '../shared/helpers/roles';
// App
import {MainComponent} from './_main/main.component';
import {DatosAnexosComponent} from '../datos-anexos/datos-anexos.component';
import {MediaFiliacionComponent} from '@dashboard/media-filiacion/media-filiacion.component';
import {IngresoComponent} from '../ingreso/ingreso.component';
import {DactiloscapiaComponent} from '../dactiloscapia/dactiloscapia.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'mediafiliacion', component: MediaFiliacionComponent, data: {expectedRole: [r.test.role]}
      },
      {
        path: 'datosAnexos', component: DatosAnexosComponent, canActivate: [AuthGuard], data: {expectedRole: [r.admin.role]}
      },
      {
        path: 'ingreso', component: IngresoComponent, canActivate: [AuthGuard], data: {expectedRole: [r.test.role]}
      },
      {
        path: 'dactiloscopia', component: DactiloscapiaComponent, canActivate: [AuthGuard], data: {expectedRole: [r.test.role]}
      },
      {
        path: 'catalogo',
        loadChildren: './catalogos/catalogos.module#CatalogosModule',
        canActivate: [AuthGuard],
        data: {expectedRole: [r.test.role]}
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
