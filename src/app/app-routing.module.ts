import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@shared/helpers/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  // {path: 'auth', loadChildren: '@auth/auth.module#AuthModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'dashboard', loadChildren: '@dashboard/dashboard.module#DashboardModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
