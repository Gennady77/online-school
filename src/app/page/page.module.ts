import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPage } from './main/main.page';
import { NotFoundPage } from './not-found/not-found.page';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginPage } from './login/login.page';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    MainPage,
    NotFoundPage,
    LoginPage
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PageModule { }
