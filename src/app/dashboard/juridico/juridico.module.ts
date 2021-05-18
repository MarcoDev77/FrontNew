import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {JuridicoRoutingModule} from '@dashboard/juridico/juridico-routing.module';
import {IngresoModule} from '@dashboard/ingreso/ingreso.module';
import { BusquedaIngresoComponent } from './busqueda-ingreso/busqueda-ingreso.component';



@NgModule({
  declarations: [RootComponent, BusquedaIngresoComponent],
    imports: [
        CommonModule,
        SharedModule,
        JuridicoRoutingModule,
        FormsModule,
        IngresoModule,
    ]
})
export class JuridicoModule { }
