import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoaderComponent } from './component/loader/loader.component';



@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    LoaderComponent
  ],
  declarations: [
    LoaderComponent
  ]
})
export class SharedModule { }
