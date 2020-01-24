import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitacoraIngresoComponent } from './bitacora-ingreso/bitacora-ingreso.component';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {BitacorasRoutingModule} from '@dashboard/bitacoras/bitacoras-routing.module';
import { BitacoraIngresoLibreracionComponent } from './bitacora-ingreso-libreracion/bitacora-ingreso-libreracion.component';



@NgModule({
  declarations: [BitacoraIngresoComponent, RootComponent, BitacoraIngresoLibreracionComponent],
  imports: [
    CommonModule,
    SharedModule,
    BitacorasRoutingModule,
    FormsModule,
  ]
})
export class BitacorasModule { }
