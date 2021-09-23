import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './component/icons/icons.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpMockInterceptor } from "./interceptor/http-mock.interceptor";
import { SpinnerOverflowInterceptor } from "./interceptor/spinner-overflow.interceptor";
import { NgbDateAdapter, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { CustomDateParserFormatter } from "./formatter/custom-date-parser-formatter";
import { CustomAdapter } from "./formatter/custom-adapter";



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
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerOverflowInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpMockInterceptor, multi: true},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {provide: NgbDateAdapter, useClass: CustomAdapter}
  ]
})
export class CoreModule { }
