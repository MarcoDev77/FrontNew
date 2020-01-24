import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitacoraIngresoImputadoComponent } from './bitacora-ingreso-imputado/bitacora-ingreso.component';
import { BitacoraIngresoComponent } from './bitacora-ingreso/bitacora-ingreso.component';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {BitacorasRoutingModule} from '@dashboard/bitacoras/bitacoras-routing.module';



@NgModule({
  declarations: [BitacoraIngresoComponent,BitacoraIngresoImputadoComponent, RootComponent],
  imports: [
    CommonModule,
    SharedModule,
    BitacorasRoutingModule,
    FormsModule,
  ]
})
export class BitacorasModule { }