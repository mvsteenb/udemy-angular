import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlertSuccessComponent } from './alert/success/success.component';
import { UserNameComponent } from './user-name/user-name.component';
import { FormsModule } from '@angular/forms';
import { AlertWarningComponent } from './alert/warning/warning.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertWarningComponent,
    AlertSuccessComponent,
    UserNameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
