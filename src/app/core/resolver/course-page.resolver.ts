import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from "../service/api.service";
import { CourseData } from "../../types";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoursePageResolver implements Resolve<CourseData[]> {
  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CourseData[]> {
    return this.apiService.get<CourseData[]>('/allcourses').pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}
