import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootComponent} from '@dashboard/formatos/_root/root.component';
import {ListaFormatosComponent} from '@dashboard/formatos/lista-formatos/lista-formatos.component';
import {FormatoGeneralComponent} from '@dashboard/formatos/formato-general/formato-general.component';
import {FormaUnoComponent} from '@dashboard/formatos/forma-uno/forma-uno.component';

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: '', redirectTo: 'lista', pathMatch: 'full'},
      {path: 'lista', component: ListaFormatosComponent},
      {path: 'general', component: FormatoGeneralComponent},
      {path: 'forma-1', component: FormaUnoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatosRoutingModule {
}
