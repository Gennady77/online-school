import { Component } from '@angular/core';
import {CourseData} from "./types";
import { ApiService } from "./core/service/api.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public courseList: Observable<CourseData[]>;

  constructor(public apiService: ApiService) {
    this.courseList = apiService.get('/courses');
  }
}
