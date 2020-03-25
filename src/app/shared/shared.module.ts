import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {LoaderComponent} from './loader/loader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SelectComponent} from './select/select.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {NgxMaskModule} from 'ngx-mask';
import {SectionTitleComponent} from './section-title/section-title.component';
import {IngresoNavigationComponent} from './ingreso-navigation/ingreso-navigation.component';
import {WebViewerComponent} from './web-viewer/web-viewer.component';
import {ImageViewerModule} from 'ng2-image-viewer';

import { CarpetaInvestigacionImputadoComponent } from './carpeta-investigacion-imputado/carpeta-investigacion-imputado.component';

import { CausaPenalIngresoComponent } from './causa-penal-ingreso/causa-penal-ingreso.component';
import { DelitoIngresoComponent } from './delito-ingreso/delito-ingreso.component';
import { DelitoComponent } from '@dashboard/catalogos/delito/delito.component';
import { FotosExtraIngresoComponent } from './fotos-extra-ingreso/fotos-extra-ingreso.component';
import {FileUploadModule} from 'ng2-file-upload';
import { RecursosProbatoriosComponent } from './recursos-probatorios/recursos-probatorios.component';


const MODULES = [
  FormsModule,
  RouterModule,
  NgbModule,
  Ng2SearchPipeModule,
  SelectDropDownModule,
  NgxMaskModule,
  OrderModule,
  NgxPaginationModule,
  ImageViewerModule,
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  LoaderComponent,
  CausaPenalIngresoComponent,
  DelitoIngresoComponent,
  CarpetaInvestigacionImputadoComponent,
];

@NgModule({
  imports: [CommonModule, ...MODULES, FileUploadModule, ReactiveFormsModule],
    exports: [CommonModule, ...COMPONENTS, ...MODULES, SelectComponent, SectionTitleComponent, IngresoNavigationComponent, WebViewerComponent, FotosExtraIngresoComponent],
  declarations: [...COMPONENTS, SelectComponent, SectionTitleComponent, IngresoNavigationComponent, WebViewerComponent, CausaPenalIngresoComponent, DelitoIngresoComponent, FotosExtraIngresoComponent, RecursosProbatoriosComponent],
})
export class SharedModule {
}
