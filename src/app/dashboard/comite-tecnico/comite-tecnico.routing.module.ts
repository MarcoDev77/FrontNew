import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/comite-tecnico/_root/root.component';
import { PlanActividadesComponent } from './plan-actividades/plan-actividades.component';
import { DireccionIndustrialComponent } from './direccion-industrial/direccion-industrial.component';
import { CentroEscolarComponent } from './centro-escolar/centro-escolar.component';
import { TrabajoSocialComponent } from './trabajo-social/trabajo-social.component';
import { PsicologiaComponent } from './psicologia/psicologia.component';
import { DeportesComponent } from './deportes/deportes.component';
import { OdontologiaComponent } from './odontologia/odontologia.component';
import { ResultadosExamenesComponent } from './resultados-examenes/resultados-examenes.component';
import { ResolucionPruebasComponent } from './resolucion-pruebas/resolucion-pruebas.component';


const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'plan-actividades', pathMatch: 'full'},
      {path: 'plan-actividades', component: PlanActividadesComponent},
      {path: 'direccion-industrial', component: DireccionIndustrialComponent},
      {path: 'centro-escolar',component: CentroEscolarComponent},
      {path: 'trabajo-social',component: TrabajoSocialComponent},
      {path: 'psicologia', component: PsicologiaComponent},
      {path: 'deportes', component: DeportesComponent},
      {path: 'odontologia', component: OdontologiaComponent},
      {path: 'examenes', component: ResultadosExamenesComponent},
      {path: 'resolucion-pruebas', component: ResolucionPruebasComponent}
  

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComiteTecnicoRoutingModule {
}
