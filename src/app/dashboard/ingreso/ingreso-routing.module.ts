import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/ingreso/_root/root.component';
import {FormularioIngresoComponent} from '@dashboard/ingreso/formulario-ingreso/formulario-ingreso.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'form-ingreso', pathMatch: 'full'},
      {path: 'form-ingreso', component: FormularioIngresoComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule {
}
