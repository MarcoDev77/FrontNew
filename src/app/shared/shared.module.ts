import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {LoaderComponent} from './loader/loader.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const MODULES = [
  FormsModule,
  RouterModule,
  NgbModule,
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  LoaderComponent,
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [CommonModule, ...COMPONENTS, ...MODULES],
  declarations: [...COMPONENTS],
})
export class SharedModule {
}
