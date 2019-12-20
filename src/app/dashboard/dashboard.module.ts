import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainComponent} from './_main/main.component';
import {SharedModule} from '../shared/shared.module';
import { MediaFiliacionComponent } from './media-filiacion/media-filiacion.component';


@NgModule({
  declarations: [
    MainComponent,
    MediaFiliacionComponent
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
