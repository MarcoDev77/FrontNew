import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanActividadesComponent } from './plan-actividades/plan-actividades.component';
import { ComiteTecnicoRoutingModule } from './comite-tecnico.routing.module';
import { RootComponent } from './_root/root.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [RootComponent,PlanActividadesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ComiteTecnicoRoutingModule
  ]
})
export class ComiteTecnicoModule { }
