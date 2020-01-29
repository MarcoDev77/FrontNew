import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaseUnicoComponent } from './pase-unico/pase-unico.component';
import { PaseMensualComponent } from './pase-mensual/pase-mensual.component';
import { RootComponent } from './_root/root.component';
import { ServicioSocialRoutingModule } from './servicio.social.routing.module';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [PaseUnicoComponent, PaseMensualComponent, RootComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, ServicioSocialRoutingModule
  ]
})
export class ServicioSocialModule { }
