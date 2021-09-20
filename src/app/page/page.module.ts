import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPage } from './main/main.page';
import { NotFoundPage } from './not-found/not-found.page';



@NgModule({
  declarations: [
    MainPage,
    NotFoundPage
  ],
  imports: [
    CommonModule
  ]
})
export class PageModule { }
