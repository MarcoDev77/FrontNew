import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatosAnexosComponent} from './datos-anexos/datos-anexos.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: '@auth/auth.module#AuthModule'},
  {path: 'dashboard', loadChildren: '@dashboard/dashboard.module#DashboardModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
