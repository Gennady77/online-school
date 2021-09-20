import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from "./page/main/main.page";
import { MainPageResolver } from "./core/resolver/main-page.resolver";

const routes: Routes = [{
  path: '',
  component: MainPage,
  resolve: { coursesList: MainPageResolver }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
