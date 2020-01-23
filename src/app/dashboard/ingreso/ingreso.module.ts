import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {IngresoRoutingModule} from '@dashboard/ingreso/ingreso-routing.module';
import { FormularioIngresoComponent } from './formulario-ingreso/formulario-ingreso.component';
import { ListaIngresoComponent } from './lista-ingreso/lista-ingreso.component';
import { DactiloscopiaComponent } from './dactiloscopia/dactiloscopia.component';
<<<<<<< HEAD
import { SituacionPenalComponent } from './situacion-penal/situacion-penal.component';
=======
import { ReferenciasComponent } from './referencias/referencias.component';
>>>>>>> d23339b58f02feb0c55c82e4aabeb879a7673818



@NgModule({
  declarations: [
    RootComponent,
    FormularioIngresoComponent,
    ListaIngresoComponent,
    DactiloscopiaComponent,
<<<<<<< HEAD
    SituacionPenalComponent
=======
    ReferenciasComponent
>>>>>>> d23339b58f02feb0c55c82e4aabeb879a7673818
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IngresoRoutingModule,
  ]
})
export class IngresoModule { }
