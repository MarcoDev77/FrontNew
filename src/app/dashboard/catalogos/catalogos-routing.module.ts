import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootComponent} from '@dashboard/catalogos/_root/root.component';
import {CentroPenitenciarioComponent} from '@dashboard/catalogos/centro-penitenciario/centro-penitenciario.component';
import {ModalidadDelitoComponent} from '@dashboard/catalogos/modalidad-delito/modalidad-delito.component';
import {DelitoComponent} from '@dashboard/catalogos/delito/delito.component';
import { TipoLibertadComponent } from './tipo-libertad/tipo-libertad.component';
import { ClasificacionJuridicaComponent } from './clasificacion-juridica/clasificacion-juridica.component';
import { EnfermedadCronicaComponent } from './enfermedad-cronica/enfermedad-cronica.component';
import {MotivoReubicacionComponent} from '@dashboard/catalogos/motivo-reubicacion/motivo-reubicacion.component';
import {DormitorioComponent} from '@dashboard/catalogos/dormitorio/dormitorio.component';
import {TipoActividadComponent} from '@dashboard/catalogos/tipo-actividad/tipo-actividad.component';
import {ActividadComponent} from '@dashboard/catalogos/actividad/actividad.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      { path: '', redirectTo: 'centro-penitenciario', pathMatch: 'full' },
      {path: 'centro-penitenciario', component: CentroPenitenciarioComponent},
      {path: 'centro-penitenciario/dormitorio', component: DormitorioComponent},
      {path: 'centro-penitenciario/tipo-actividad', component: TipoActividadComponent},
      {path: 'centro-penitenciario/tipo-actividad/actividad', component: ActividadComponent},
      {path: 'modalidad-delito', component: ModalidadDelitoComponent},
      {path: 'delito', component: DelitoComponent},
      {path: 'tipo-libertad', component: TipoLibertadComponent},
      {path: 'clasificacion-juridica', component: ClasificacionJuridicaComponent},
      {path: 'enfermedad-cronica', component: EnfermedadCronicaComponent},
      {path: 'motivo-reubicacion', component: MotivoReubicacionComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule {
}
