import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {LoaderComponent} from './loader/loader.component';
import {FormsModule} from '@angular/forms';
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
  CarpetaInvestigacionImputadoComponent,
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [CommonModule, ...COMPONENTS, ...MODULES, SelectComponent, SectionTitleComponent, IngresoNavigationComponent, WebViewerComponent],
  declarations: [...COMPONENTS, SelectComponent, SectionTitleComponent, IngresoNavigationComponent, WebViewerComponent],
})
export class SharedModule {
}
