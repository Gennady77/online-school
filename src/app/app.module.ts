import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { PageModule } from "./page/page.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgbModule,
    HttpClientModule,
    PageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
