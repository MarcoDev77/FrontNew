import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivoJuridicoComponent } from './archivo-juridico/archivo-juridico.component';
import {ArchivoRoutingModule} from './archivo.routing.module';
import {RootComponent} from './_root/root.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RootComponent,ArchivoJuridicoComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ArchivoRoutingModule
  ]
})
export class ArchivoModule { }
