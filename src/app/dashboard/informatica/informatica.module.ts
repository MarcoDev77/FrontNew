import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InformaticaRoutingModule } from './informatica-routing.module';
import { BloqueVistasComponent } from './bloque-visitas/bloque-visitas.component';
import { CardVisitaComponent } from './card-visita/card-visita.component';



@NgModule({
  declarations: [RootComponent,BloqueVistasComponent,CardVisitaComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    InformaticaRoutingModule
  ]
})
export class InformaticaModule { }
