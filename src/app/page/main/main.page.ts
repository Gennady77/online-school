import { Component, OnInit } from '@angular/core';
import { CourseData } from "../../types";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {
  courseList: CourseData[];

  constructor(private route: ActivatedRoute,) {
    this.courseList = route.snapshot.data.coursesList;
  }

  ngOnInit(): void {
  }

}
