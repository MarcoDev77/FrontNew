import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/servicio-social/_root/root.component';
import { PaseMensualComponent } from './pase-mensual/pase-mensual.component';
import { PaseUnicoComponent } from './pase-unico/pase-unico.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'pase-mensual', pathMatch: 'full'},
      {path: 'pase-mensual', component: PaseMensualComponent},
      {path: 'pase-unico', component: PaseUnicoComponent},
  
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioSocialRoutingModule {
}
