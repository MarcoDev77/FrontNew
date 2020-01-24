import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BitacoraIngresoComponent} from '@dashboard/bitacoras/bitacora-ingreso/bitacora-ingreso.component';
import {RootComponent} from './_root/root.component';
import {BitacoraIngresoLibreracionComponent} from '@dashboard/bitacoras/bitacora-ingreso-libreracion/bitacora-ingreso-libreracion.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'ingreso', pathMatch: 'full'},
      {path: 'ingreso', component: BitacoraIngresoComponent},
      {path: 'ingreso-imputado-liberacion', component: BitacoraIngresoLibreracionComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacorasRoutingModule {
}
