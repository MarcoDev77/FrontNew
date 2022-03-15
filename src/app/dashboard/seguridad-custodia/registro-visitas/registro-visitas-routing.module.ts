import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroVisitasComponent } from './registro-visitas.component';


const routes: Routes = [
  { path: '', component: RegistroVisitasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroVisitasRoutingModule { }
