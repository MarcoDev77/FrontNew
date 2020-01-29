import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BitacoraIngresoImputadoComponent} from '@dashboard/bitacoras/bitacora-ingreso-imputado/bitacora-ingreso.component';
import {BitacoraIngresoComponent} from '@dashboard/bitacoras/bitacora-ingreso/bitacora-ingreso.component';
import {RootComponent} from './_root/root.component';
import {BitacoraIngresoLibreracionComponent} from '@dashboard/bitacoras/bitacora-ingreso-libreracion/bitacora-ingreso-libreracion.component';
import {BitacoraImputadoLiberacionComponent} from '@dashboard/bitacoras/bitacora-imputado-liberacion/bitacora-imputado-liberacion.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'ingreso', pathMatch: 'full'},
      {path: 'ingreso-Imputado', component: BitacoraIngresoImputadoComponent},
      {path: 'ingreso-imputado-liberacion', component: BitacoraIngresoLibreracionComponent},
      {path: 'ingreso', component: BitacoraIngresoComponent},
      {path: 'ingreso-liberacion', component: BitacoraImputadoLiberacionComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacorasRoutingModule {
}
