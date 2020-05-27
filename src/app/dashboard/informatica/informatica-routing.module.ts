import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RootComponent } from '@dashboard/informatica/_root/root.component';
const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      { path: '', redirectTo: 'personas-visitan', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformaticaRoutingModule {
}
