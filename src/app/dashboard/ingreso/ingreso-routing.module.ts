import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/ingreso/_root/root.component';
import {FormularioIngresoComponent} from '@dashboard/ingreso/formulario-ingreso/formulario-ingreso.component';
import {ListaIngresoComponent} from '@dashboard/ingreso/lista-ingreso/lista-ingreso.component';
import {DactiloscopiaComponent} from '@dashboard/ingreso/dactiloscopia/dactiloscopia.component';
<<<<<<< HEAD
import { SituacionPenalComponent } from './situacion-penal/situacion-penal.component';
=======
import {ReferenciasComponent} from '@dashboard/ingreso/referencias/referencias.component';
>>>>>>> d23339b58f02feb0c55c82e4aabeb879a7673818

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'lista-ingreso', pathMatch: 'full'},
      {path: 'form-ingreso', component: FormularioIngresoComponent},
      {path: 'lista-ingreso', component: ListaIngresoComponent},
      {path: 'dactiloscopia', component: DactiloscopiaComponent},
<<<<<<< HEAD
      {path: 'situacion-penal', component: SituacionPenalComponent},
=======
      {path: 'referencias', component: ReferenciasComponent},
>>>>>>> d23339b58f02feb0c55c82e4aabeb879a7673818
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule {
}
