import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainComponent} from './_main/main.component';
import {SharedModule} from '@shared/shared.module';
import {MediaFiliacionComponent} from './media-filiacion/media-filiacion.component';
import {DatosAnexosComponent} from '../datos-anexos/datos-anexos.component';
import {IngresoComponent} from '../ingreso/ingreso.component';
import {DactiloscapiaComponent} from '../dactiloscapia/dactiloscapia.component';


@NgModule({
  declarations: [
    MainComponent,
    MediaFiliacionComponent,
    DatosAnexosComponent,
    IngresoComponent,
    DactiloscapiaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule {
}
