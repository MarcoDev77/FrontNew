import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaseUnicoComponent } from './pase-unico/pase-unico.component';
import { PaseMensualComponent } from './pase-mensual/pase-mensual.component';
import { RootComponent } from './_root/root.component';
import { ServicioSocialRoutingModule } from './servicio.social.routing.module';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {RegistroVisitaComponent} from './registro-visita/registro-visita.component';
import { RedesFamiliaresComponent } from './redes-familiares/redes-familiares.component';
import {OfrecimientoTrabajoComponent} from '@dashboard/servicio-social/ofrecimiento-trabajo/ofrecimiento-trabajo.component';
import { ControlEntrevistaComponent } from './control-entrevista/control-entrevista.component';
import { OtrosOficiosComponent } from './otros-oficios/otros-oficios.component';



@NgModule({
  declarations: [PaseUnicoComponent, PaseMensualComponent, RootComponent, RegistroVisitaComponent,
  RedesFamiliaresComponent, OfrecimientoTrabajoComponent, ControlEntrevistaComponent, OtrosOficiosComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, ServicioSocialRoutingModule
  ]
})
export class ServicioSocialModule { }
