import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootComponent} from '@dashboard/catalogos/_root/root.component';
import {CentroPenitenciarioComponent} from '@dashboard/catalogos/centro-penitenciario/centro-penitenciario.component';
import {ModalidadDelitoComponent} from '@dashboard/catalogos/modalidad-delito/modalidad-delito.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      { path: '', redirectTo: 'centro-penitenciario', pathMatch: 'full' },
      {path: 'centro-penitenciario', component: CentroPenitenciarioComponent},
      {path: 'modalidad-delito', component: ModalidadDelitoComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule {
}
