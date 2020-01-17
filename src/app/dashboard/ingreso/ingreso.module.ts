import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {IngresoRoutingModule} from '@dashboard/ingreso/ingreso-routing.module';
import { FormularioIngresoComponent } from './formulario-ingreso/formulario-ingreso.component';
import { ListaIngresoComponent } from './lista-ingreso/lista-ingreso.component';



@NgModule({
  declarations: [
    RootComponent,
    FormularioIngresoComponent,
    ListaIngresoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IngresoRoutingModule,
  ]
})
export class IngresoModule { }
