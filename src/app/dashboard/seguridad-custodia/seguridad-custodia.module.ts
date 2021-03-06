import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootComponent } from './_root/root.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { SeguridadCustodiaRoutingModule } from './seguridad.custodia.routing.module';
import { NombramientoComponent } from './nombramiento/nombramiento.component';
import { CustodiosComponent } from './custodios/custodios.component';
import { CapacitacionesPaseListaComponent } from './capacitaciones-pase-lista/capacitaciones-pase-lista.component';
import { PertenenciasComponent } from './pertenencias/pertenencias.component';
import { RevisionesComponent } from './revisiones/revisiones.component';
import { PertenenciasResultadoBusquedaComponent } from './pertenencias-resultado-busqueda/pertenencias-resultado-busqueda.component';
import {FileUploadModule} from 'ng2-file-upload';
import { RegistroVisitasComponent } from './registro-visitas/registro-visitas.component';


@NgModule({
  declarations: [
    RootComponent,
    CapacitacionesComponent,
    NombramientoComponent,
    CustodiosComponent,
    CapacitacionesPaseListaComponent,
    PertenenciasComponent,
    RevisionesComponent,
    PertenenciasResultadoBusquedaComponent,
    RegistroVisitasComponent
  ],
    imports: [
        CommonModule,
        CommonModule,
        SeguridadCustodiaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        FileUploadModule,
    ]
})
export class SeguridadCustodiaModule { }
