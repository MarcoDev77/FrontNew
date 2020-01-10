import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import { CentroPenitenciarioComponent } from './centro-penitenciario/centro-penitenciario.component';
import {SharedModule} from '@shared/shared.module';
import {CatalogosRoutingModule} from '@dashboard/catalogos/catalogos-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalidadDelitoComponent } from './modalidad-delito/modalidad-delito.component';
import { DelitoComponent } from './delito/delito.component';
import { TipoLibertadComponent } from './tipo-libertad/tipo-libertad.component';
import { ClasificacionJuridicaComponent } from './clasificacion-juridica/clasificacion-juridica.component';
import { EnfermedadCronicaComponent } from './enfermedad-cronica/enfermedad-cronica.component';
import { MotivoReubicacionComponent } from './motivo-reubicacion/motivo-reubicacion.component';
import { DormitorioComponent } from './dormitorio/dormitorio.component';



@NgModule({
  declarations: [RootComponent, CentroPenitenciarioComponent, ModalidadDelitoComponent, DelitoComponent, TipoLibertadComponent, ClasificacionJuridicaComponent, EnfermedadCronicaComponent, MotivoReubicacionComponent, DormitorioComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogosRoutingModule,
    FormsModule,
  ]
})
export class CatalogosModule { }
