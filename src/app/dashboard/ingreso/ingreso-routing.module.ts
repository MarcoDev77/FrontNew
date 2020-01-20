import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/ingreso/_root/root.component';
import {FormularioIngresoComponent} from '@dashboard/ingreso/formulario-ingreso/formulario-ingreso.component';
import {ListaIngresoComponent} from '@dashboard/ingreso/lista-ingreso/lista-ingreso.component';
import {DactiloscopiaComponent} from '@dashboard/ingreso/dactiloscopia/dactiloscopia.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'lista-ingreso', pathMatch: 'full'},
      {path: 'form-ingreso', component: FormularioIngresoComponent},
      {path: 'lista-ingreso', component: ListaIngresoComponent},
      {path: 'dactiloscopia', component: DactiloscopiaComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule {
}
