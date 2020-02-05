import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/archivo/_root/root.component';
import { ArchivoJuridicoComponent } from './archivo-juridico/archivo-juridico.component';


const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'archivo', pathMatch: 'full'},
      {path: 'archivo', component: ArchivoJuridicoComponent},
   

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivoRoutingModule {
}
