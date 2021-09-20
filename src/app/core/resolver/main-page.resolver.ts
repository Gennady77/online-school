import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from "../service/api.service";
import { CourseData } from "../../types";

@Injectable({
  providedIn: 'root'
})
export class MainPageResolver implements Resolve<CourseData[]> {
  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<CourseData[]> {
    return this.apiService.get('/courses', route.params);
  }
}
