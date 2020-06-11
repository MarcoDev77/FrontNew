import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaseUnicoComponent } from './pase-unico/pase-unico.component';
import { PaseMensualComponent } from './pase-mensual/pase-mensual.component';
import { RootComponent } from './_root/root.component';
import { ServicioSocialRoutingModule } from './servicio.social.routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RegistroVisitaComponent } from './registro-visita/registro-visita.component';
import { RedesFamiliaresComponent } from './redes-familiares/redes-familiares.component';
import { OfrecimientoTrabajoComponent } from '@dashboard/servicio-social/ofrecimiento-trabajo/ofrecimiento-trabajo.component';
import { ControlEntrevistaComponent } from './control-entrevista/control-entrevista.component';
import { EstudioTrabajoSocialComponent } from './estudio-trabajo-social/estudio-trabajo-social.component';
import { TablaFamiliaresComponent } from './tabla-familiares/tabla-familiares.component';
import { FichaIngresoComponent } from './ficha-ingreso/ficha-ingreso.component';

import { OtrosOficiosComponent } from './otros-oficios/otros-oficios.component';
import { NucleoFamiliarComponent } from './nucleo-familiar/nucleo-familiar.component';
import { EstudioSocioeconomicoComponent } from './estudio-socioeconomico/estudio-socioeconomico.component';
import { OficioSancionesComponent } from './oficio-sanciones/oficio-sanciones.component';
import { RegistroPaseUnicoComponent } from './registro-pase-unico/registro-pase-unico.component';
import { TransladoFederalComponent } from './translado-federal/translado-federal.component';
import { BeneficioEstatalComponent } from './beneficio-estatal/beneficio-estatal.component';



@NgModule({
  declarations: [
    PaseUnicoComponent,
    PaseMensualComponent,
    RootComponent,
    RegistroVisitaComponent,
    RedesFamiliaresComponent,
    OfrecimientoTrabajoComponent,
    ControlEntrevistaComponent,
    EstudioTrabajoSocialComponent,
    TablaFamiliaresComponent,
    FichaIngresoComponent,
    OtrosOficiosComponent,
    NucleoFamiliarComponent,
    EstudioSocioeconomicoComponent,
    OficioSancionesComponent,
    RegistroPaseUnicoComponent,
    TransladoFederalComponent,
    BeneficioEstatalComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    FormsModule, ServicioSocialRoutingModule
  ]
})
export class ServicioSocialModule { }
