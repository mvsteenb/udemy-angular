import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './common/shared.module';
import { CoreModule } from './core.module';
import { FormsModule } from '@angular/forms';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    CoreModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule { }
