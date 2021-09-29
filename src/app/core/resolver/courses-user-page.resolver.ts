import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CourseData } from "../../types";
import { catchError } from "rxjs/operators";
import { ApiService } from "../service/api.service";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CoursesUserPageResolver implements Resolve<CourseData[]> {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseData[]> {
    return this.apiService.get<CourseData[]>('/courses', {userId: this.authService.userId}).pipe(
      catchError(() => {
        this.router.navigate(['/notfound'])
        return of([]);
      })
    );
  }
}
