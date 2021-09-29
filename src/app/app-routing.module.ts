import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from "./page/main/main.page";
import { CoursePageResolver } from "./core/resolver/course-page.resolver";
import { NotFoundPage } from "./page/not-found/not-found.page";
import { LoginPage } from "./page/login/login.page";
import { AuthGuard } from "./core/guard/auth.guard";
import { CoursesPage } from "./page/courses/courses.page";
import { CoursesUserPageResolver } from "./core/resolver/courses-user-page.resolver";
import { MainGuard } from "./core/guard/main.guard";

const routes: Routes = [{
  path: '',
  component: MainPage,
  canActivate: [MainGuard],
  children: [{
    path: '',
    pathMatch: 'full',
    resolve: { coursesList: CoursePageResolver },
    component: CoursesPage,
    runGuardsAndResolvers: 'always'
  }, {
    path: 'courses-user',
    component: CoursesPage,
    canActivate: [AuthGuard],
    resolve: { coursesList: CoursesUserPageResolver },
    runGuardsAndResolvers: 'always'
  }]
}, {
  path: 'login',
  component: LoginPage
}, {
  path: '**',
  component: NotFoundPage
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
