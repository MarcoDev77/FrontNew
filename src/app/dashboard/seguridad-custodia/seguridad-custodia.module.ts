import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootComponent } from './_root/root.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from '@dashboard/dashboard-routing.module';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class SeguridadCustodiaModule { }
