import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import { CentroPenitenciarioComponent } from './centro-penitenciario/centro-penitenciario.component';
import {SharedModule} from '@shared/shared.module';
import {CatalogosRoutingModule} from '@dashboard/catalogos/catalogos-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalidadDelitoComponent } from './modalidad-delito/modalidad-delito.component';
import { DelitoComponent } from './delito/delito.component';



@NgModule({
  declarations: [RootComponent, CentroPenitenciarioComponent, ModalidadDelitoComponent, DelitoComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogosRoutingModule,
    FormsModule,
  ]
})
export class CatalogosModule { }
