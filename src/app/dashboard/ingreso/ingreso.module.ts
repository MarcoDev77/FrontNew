import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {IngresoRoutingModule} from '@dashboard/ingreso/ingreso-routing.module';
import { FormularioIngresoComponent } from './formulario-ingreso/formulario-ingreso.component';
import { ListaIngresoComponent } from './lista-ingreso/lista-ingreso.component';
import { DactiloscopiaComponent } from './dactiloscopia/dactiloscopia.component';
import { ReferenciasComponent } from './referencias/referencias.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { MediaAfiliacionComponent } from './media-afiliacion/media-afiliacion.component';
import { SituacionJuridicaComponent } from './situacion-juridica/situacion-juridica-ingreso.component';
import {FileUploadModule} from 'ng2-file-upload';
import {CatalogosModule} from '@dashboard/catalogos/catalogos.module';
import { BusquedaHuellasComponent } from './busqueda-huellas/busqueda-huellas.component';
import { BusquedaHuellasDetalleComponent } from './busqueda-huellas-detalle/busqueda-huellas-detalle.component';



@NgModule({
    declarations: [
        RootComponent,
        FormularioIngresoComponent,
        ListaIngresoComponent,
        DactiloscopiaComponent,
        SituacionJuridicaComponent,
        ReferenciasComponent,
        CaracteristicasComponent,
        MediaAfiliacionComponent,
        BusquedaHuellasComponent,
        BusquedaHuellasDetalleComponent
    ],
    exports: [
        BusquedaHuellasComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        IngresoRoutingModule,
        FileUploadModule,
        CatalogosModule,
    ]
})
export class IngresoModule { }
