import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import { CentroPenitenciarioComponent } from './centro-penitenciario/centro-penitenciario.component';
import {SharedModule} from '@shared/shared.module';
import {CatalogosRoutingModule} from '@dashboard/catalogos/catalogos-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RootComponent, CentroPenitenciarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    CatalogosRoutingModule,
    FormsModule,
  ]
})
export class CatalogosModule { }
