import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootComponent} from '@dashboard/catalogos/_root/root.component';
import {CentroPenitenciarioComponent} from '@dashboard/catalogos/centro-penitenciario/centro-penitenciario.component';
import {AuthGuard} from '@shared/helpers/auth.guard';
import {roles as r} from '@shared/helpers/roles';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      { path: '', redirectTo: 'centro-penitenciario', pathMatch: 'full' },
      {
        path: 'centro-penitenciario', component: CentroPenitenciarioComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule {
}
