import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainComponent} from './_main/main.component';
import {SharedModule} from '../shared/shared.module';
import { MediaFiliacionComponent } from './media-filiacion/media-filiacion.component';
import { IngresoComponent } from '../ingreso/ingreso.component';
import {DactiloscapiaComponent} from '../dactiloscapia/dactiloscapia.component';


@NgModule({
  declarations: [
    MainComponent,
    MediaFiliacionComponent,
    IngresoComponent,
    DactiloscapiaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class DashboardModule {
}
