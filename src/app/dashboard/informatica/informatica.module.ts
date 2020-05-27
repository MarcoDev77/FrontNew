import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InformaticaRoutingModule } from './informatica-routing.module';



@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    InformaticaRoutingModule
  ]
})
export class InformaticaModule { }
