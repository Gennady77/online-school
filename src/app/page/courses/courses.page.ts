import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { CourseData } from "../../types";
import { Subscriber } from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss']
})
export class CoursesPage implements OnInit, OnDestroy {
  courseList: CourseData[] = [];

  private subscriber = new Subscriber();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    const events$ = router.events.subscribe((event => {
      if(event instanceof NavigationEnd) {
        this.courseList = activeRoute.snapshot.data.coursesList;
      }
    }));

    this.subscriber.add(events$);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
