import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from "./page/main/main.page";
import { MainPageResolver } from "./core/resolver/main-page.resolver";
import { NotFoundPage } from "./page/not-found/not-found.page";
import { LoginPage } from "./page/login/login.page";

const routes: Routes = [{
  path: '',
  component: MainPage,
  resolve: { coursesList: MainPageResolver },
  pathMatch: 'full'
}, {
  path: 'courses/:id',
  component: MainPage,
  resolve: { coursesList: MainPageResolver }
}, {
  path: 'login',
  component: LoginPage
}, {
  path: '**',
  component: NotFoundPage
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
