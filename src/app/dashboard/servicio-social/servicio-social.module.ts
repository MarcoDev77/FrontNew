import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaseUnicoComponent } from './pase-unico/pase-unico.component';
import { PaseMensualComponent } from './pase-mensual/pase-mensual.component';



@NgModule({
  declarations: [PaseUnicoComponent, PaseMensualComponent],
  imports: [
    CommonModule
  ]
})
export class ServicioSocialModule { }
