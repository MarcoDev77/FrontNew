import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {DashboardModule} from '@dashboard/dashboard.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JwtInterceptor} from '@shared/helpers/jwt.interceptor';
import {ErrorInterceptor} from '@shared/helpers/error.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import es from '@angular/common/locales/es-MX';
import {registerLocaleData} from '@angular/common';
registerLocaleData(es, 'es-MX');
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-MX'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
