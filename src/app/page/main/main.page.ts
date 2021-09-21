import { Component, OnInit } from '@angular/core';
import { CourseData } from "../../types";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/service/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {
  courseList: CourseData[];
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.courseList = route.snapshot.data.coursesList;
    authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  ngOnInit(): void {
  }

}
