import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {IngresoRoutingModule} from '@dashboard/ingreso/ingreso-routing.module';
import { FormularioIngresoComponent } from './formulario-ingreso/formulario-ingreso.component';
import { ListaIngresoComponent } from './lista-ingreso/lista-ingreso.component';
import { DactiloscopiaComponent } from './dactiloscopia/dactiloscopia.component';
import { SituacionPenalComponent } from './situacion-penal/situacion-penal.component';
import { ReferenciasComponent } from './referencias/referencias.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { MediaAfiliacionComponent } from './media-afiliacion/media-afiliacion.component';
import { SituacionJuridicaImputadoComponent } from './situacion-juridica-imputado/situacion-juridica-imputado.component';



@NgModule({
  declarations: [
    RootComponent,
    FormularioIngresoComponent,
    ListaIngresoComponent,
    DactiloscopiaComponent,
    SituacionPenalComponent,
    ReferenciasComponent,
    CaracteristicasComponent,
    MediaAfiliacionComponent,
    SituacionJuridicaImputadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IngresoRoutingModule,
  ]
})
export class IngresoModule { }
