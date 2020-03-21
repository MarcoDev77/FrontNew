import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainComponent} from './_main/main.component';
import {SharedModule} from '@shared/shared.module';



@NgModule({
  declarations: [
    MainComponent,
    

 
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
