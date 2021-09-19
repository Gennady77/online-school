import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './component/icons/icons.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpMockInterceptor } from "./interceptor/http-mock.interceptor";



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    IconsComponent
  ],
  declarations: [
    IconsComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpMockInterceptor, multi: true}
  ]
})
export class CoreModule { }
