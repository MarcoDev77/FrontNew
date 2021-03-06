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
import { DeportesComponent } from './deportes/deportes.component';
import { OdontologiaComponent } from './odontologia/odontologia.component';
import { ResultadosExamenesComponent } from './resultados-examenes/resultados-examenes.component';
import { ResolucionPruebasComponent } from './resolucion-pruebas/resolucion-pruebas.component';
import { ReporteMedicoComponent } from './reporte-medico/reporte-medico.component';
import { FileUploadModule } from 'ng2-file-upload';
import { InvitacionActividadComponent } from './invitacion-actividad/invitacion-actividad.component';



@NgModule({
  declarations: [RootComponent, PlanActividadesComponent, DireccionIndustrialComponent, CentroEscolarComponent
    , TrabajoSocialComponent,
    PsicologiaComponent,
    DeportesComponent,
    OdontologiaComponent,
    ResultadosExamenesComponent,
    ResolucionPruebasComponent,
    InvitacionActividadComponent,
    ReporteMedicoComponent],

  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ComiteTecnicoRoutingModule,
    FileUploadModule
  ]
})
export class ComiteTecnicoModule { }
