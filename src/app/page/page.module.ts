import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPage } from './main/main.page';
import { NotFoundPage } from './not-found/not-found.page';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginPage } from './login/login.page';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CoursesPage } from './courses/courses.page';



@NgModule({
  declarations: [
    MainPage,
    NotFoundPage,
    LoginPage,
    CoursesPage
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PageModule { }
