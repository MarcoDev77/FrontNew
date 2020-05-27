import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './_root/root.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
<<<<<<< src/app/dashboard/informatica/informatica.module.ts
import { InformaticaRoutingModule } from './informatica-routing.module';
import { ReporteVisitasComponent } from './reporte-visitas/reporte-visitas.component';
=======
import { InformaticaRoutingModule } from './informatica-routing.module';
import { BloqueVistasComponent } from './bloque-visitas/bloque-visitas.component';
import { CardVisitaComponent } from './card-visita/card-visita.component';
>>>>>>> src/app/dashboard/informatica/informatica.module.ts



@NgModule({
<<<<<<< src/app/dashboard/informatica/informatica.module.ts
  declarations: [RootComponent, ReporteVisitasComponent],
=======
  declarations: [RootComponent,BloqueVistasComponent,CardVisitaComponent],
>>>>>>> src/app/dashboard/informatica/informatica.module.ts
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    InformaticaRoutingModule
  ]
})
export class InformaticaModule { }
