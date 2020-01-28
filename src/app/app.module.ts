import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import { AuthModule } from '@auth/auth.module';


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
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
