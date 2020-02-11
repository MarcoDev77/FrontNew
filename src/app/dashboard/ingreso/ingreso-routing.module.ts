import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/ingreso/_root/root.component';
import {FormularioIngresoComponent} from '@dashboard/ingreso/formulario-ingreso/formulario-ingreso.component';
import {ListaIngresoComponent} from '@dashboard/ingreso/lista-ingreso/lista-ingreso.component';
import {DactiloscopiaComponent} from '@dashboard/ingreso/dactiloscopia/dactiloscopia.component';
import { SituacionJuridicaIngresoComponent } from './situacion-juridica-ingreso/situacion-juridica-ingreso.component';
import { SituacionJuridicaImputadoComponent } from './situacion-juridica-imputado/situacion-juridica-imputado.component';
import {ReferenciasComponent} from '@dashboard/ingreso/referencias/referencias.component';
import {CaracteristicasComponent} from '@dashboard/ingreso/caracteristicas/caracteristicas.component';
import {MediaAfiliacionComponent} from '@dashboard/ingreso/media-afiliacion/media-afiliacion.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'lista-ingreso', pathMatch: 'full'},
      {path: 'form-ingreso', component: FormularioIngresoComponent},
      {path: 'lista-ingreso', component: ListaIngresoComponent},
      {path: 'dactiloscopia', component: DactiloscopiaComponent},
      {path: 'situacion-juridica-ingreso', component: SituacionJuridicaIngresoComponent},
      {path: 'situacion-juridica-imputado', component: SituacionJuridicaImputadoComponent},
      {path: 'referencias', component: ReferenciasComponent},
      {path: 'caracteristicas', component: CaracteristicasComponent},
      {path: 'media-afiliacion', component: MediaAfiliacionComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule {
}
