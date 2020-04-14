import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/seguridad-custodia/_root/root.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'pase-mensual', pathMatch: 'full'},
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadCustodiaRoutingModule {
}
