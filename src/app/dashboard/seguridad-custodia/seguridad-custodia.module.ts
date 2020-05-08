import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootComponent } from './_root/root.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { SeguridadCustodiaRoutingModule } from './seguridad.custodia.routing.module';
import { NombramientoComponent } from './nombramiento/nombramiento.component';


@NgModule({
  declarations: [
    RootComponent,
    CapacitacionesComponent,
    NombramientoComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    SeguridadCustodiaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class SeguridadCustodiaModule { }
