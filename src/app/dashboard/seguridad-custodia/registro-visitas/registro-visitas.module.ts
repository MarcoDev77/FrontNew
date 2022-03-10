import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroVisitasRoutingModule } from './registro-visitas-routing.module';
import { RegistroVisitasComponent } from './registro-visitas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    RegistroVisitasComponent
  ],
  imports: [
    CommonModule,
    RegistroVisitasRoutingModule,
    SharedModule,
  ]
})
export class RegistroVisitasModule { }
