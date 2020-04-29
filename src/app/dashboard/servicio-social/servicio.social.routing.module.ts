import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/servicio-social/_root/root.component';
import { PaseMensualComponent } from './pase-mensual/pase-mensual.component';
import { PaseUnicoComponent } from './pase-unico/pase-unico.component';
import {RegistroVisitaComponent} from '@dashboard/servicio-social/registro-visita/registro-visita.component';
import { RedesFamiliaresComponent } from './redes-familiares/redes-familiares.component';
import {OfrecimientoTrabajoComponent} from '@dashboard/servicio-social/ofrecimiento-trabajo/ofrecimiento-trabajo.component';
import { ControlEntrevistaComponent } from './control-entrevista/control-entrevista.component';
import { EstudioTrabajoSocialComponent } from './estudio-trabajo-social/estudio-trabajo-social.component';
import { TablaFamiliaresComponent } from './tabla-familiares/tabla-familiares.component';
import { OtrosOficiosComponent } from './otros-oficios/otros-oficios.component';
import { NucleoFamiliarComponent } from './nucleo-familiar/nucleo-familiar.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'pase-mensual', pathMatch: 'full'},
      {path: 'pase-mensual', component: PaseMensualComponent},
      {path: 'pase-unico', component: PaseUnicoComponent},
      {path: 'registro-visita', component: RegistroVisitaComponent},
      {path: 'redes-familiares', component: RedesFamiliaresComponent},
      {path: 'ofrecimiento-trabajo', component: OfrecimientoTrabajoComponent},
      {path: 'control-entrevista', component: ControlEntrevistaComponent},
      {path: 'estudio-trabajo-social',component: EstudioTrabajoSocialComponent},
      {path: 'tabla-familiar',component: TablaFamiliaresComponent},
      {path: 'otros-oficios', component: OtrosOficiosComponent},
      {path: 'nucleo-familiar', component: NucleoFamiliarComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioSocialRoutingModule {
}
