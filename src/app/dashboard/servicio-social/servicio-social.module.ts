import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaseUnicoComponent } from './pase-unico/pase-unico.component';
import { PaseMensualComponent } from './pase-mensual/pase-mensual.component';
import { RootComponent } from './_root/root.component';
import { ServicioSocialRoutingModule } from './servicio.social.routing.module';



@NgModule({
  declarations: [PaseUnicoComponent, PaseMensualComponent, RootComponent],
  imports: [
    CommonModule, ServicioSocialRoutingModule
  ]
})
export class ServicioSocialModule { }
