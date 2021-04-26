import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AuthGuard } from '@shared/helpers/auth.guard';
import { roles as r } from '../shared/helpers/roles';
// App
import { MainComponent } from './_main/main.component';




const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'catalogo',
        loadChildren: './catalogos/catalogos.module#CatalogosModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role, r.admin.role] }
      },
      {
        path: 'ingreso',
        loadChildren: './ingreso/ingreso.module#IngresoModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role, r.dactiloscopia.role] }
      },
      {
        path: 'bitacoras',
        loadChildren: './bitacoras/bitacoras.module#BitacorasModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role] }
      },
      {
        path: 'servicio-social',
        loadChildren: './servicio-social/servicio-social.module#ServicioSocialModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role, r.trabajoSocial.role] }
      },
      {
        path: 'archivo',
        loadChildren: './archivo/archivo.module#ArchivoModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role] }
      },
      {
        path: 'comite-tecnico',
        loadChildren: './comite-tecnico/comite-tecnico.module#ComiteTecnicoModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role, r.comiteTecnico.role, r.trabajoSocial.role] }
      },
      {
        path: 'seguridad-custodia',
        loadChildren: './seguridad-custodia/seguridad-custodia.module#SeguridadCustodiaModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role, r.seguridadCustodia.role] }
      },
      {
        path: 'informatica',
        loadChildren: './informatica/informatica.module#InformaticaModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role, r.site.role] }
      },
      {
        path: 'juridico',
        loadChildren: './juridico/juridico.module#JuridicoModule',
        canActivate: [AuthGuard],
        data: { expectedRole: [r.test.role, r.site.role] }
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
