import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from './core/main/main.component';
import { LoginComponent } from './core/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { MessageInterceptor } from './core/interceptor/message.interceptor';
import { BusyIndicatorInterceptor } from './core/interceptor/busy-indicator.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BusyIndicatorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
