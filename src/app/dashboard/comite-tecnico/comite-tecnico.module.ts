import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanActividadesComponent } from './plan-actividades/plan-actividades.component';
import { ComiteTecnicoRoutingModule } from './comite-tecnico.routing.module';
import { RootComponent } from './_root/root.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DireccionIndustrialComponent } from './direccion-industrial/direccion-industrial.component';
import { CentroEscolarComponent } from './centro-escolar/centro-escolar.component';
import { TrabajoSocialComponent } from './trabajo-social/trabajo-social.component';
import { PsicologiaComponent } from './psicologia/psicologia.component';



@NgModule({
  declarations: [RootComponent,PlanActividadesComponent,DireccionIndustrialComponent, CentroEscolarComponent
  ,TrabajoSocialComponent,
    PsicologiaComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ComiteTecnicoRoutingModule
  ]
})
export class ComiteTecnicoModule { }
