import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFormatosComponent } from './lista-formatos/lista-formatos.component';
import { RootComponent } from './_root/root.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {FormatosRoutingModule} from '@dashboard/formatos/formatos-routing.module';
import { FormatoGeneralComponent } from './formato-general/formato-general.component';
import { FormaUnoComponent } from './forma-uno/forma-uno.component';



@NgModule({
  declarations: [ListaFormatosComponent, RootComponent, FormatoGeneralComponent, FormaUnoComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormatosRoutingModule,
    FormsModule,
  ]
})
export class FormatosModule { }
