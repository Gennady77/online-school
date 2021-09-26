import { Component, OnInit } from '@angular/core';
import { COURSE_TYPE, CourseData } from "../../types";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/service/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../core/service/validators";
import { BehaviorSubject } from "rxjs";
import { ApiService } from "../../core/service/api.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  courseList: CourseData[];
  isLoggedIn = false;
  isLoading$$ = new BehaviorSubject(false);

  courseTypeEnum = COURSE_TYPE;

  courseName = new FormControl('', [AppValidators.required()]);
  courseDate = new FormControl('', [AppValidators.required()]);
  courseDuration = new FormControl('', [AppValidators.required(), AppValidators.numeric()]);
  courseType = new FormControl(COURSE_TYPE.ONLINE);
  courseUrl = new FormControl('', [AppValidators.required()]);
  coursePlaceBuilding = new FormControl('', [AppValidators.required()]);
  coursePlaceRoom = new FormControl('', [AppValidators.required()]);
  courseComment = new FormControl('', [Validators.maxLength(200)]);


  formGroup = new FormGroup({
    courseName: this.courseName,
    courseDate: this.courseDate,
    courseDuration: this.courseDuration,
    courseType: this.courseType,
    courseUrl: this.courseUrl,
    coursePlaceBuilding: this.coursePlaceBuilding,
    coursePlaceRoom: this.coursePlaceRoom,
    courseComment: this.courseComment
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private apiService: ApiService,
  ) {
    this.courseList = route.snapshot.data.coursesList;
    authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.courseType.valueChanges.subscribe((val) => {
      this.updateCourseType(val);
    });

    this.updateCourseType(this.courseType.value);
  }

  ngOnInit(): void {
  }

  onAddClick(content: any, evt: MouseEvent) {
    evt.preventDefault();

    this.modalService.open(content);
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    // modal.close('Ok click');
    console.log(this.authService.userId);
    if(this.formGroup.valid && this.authService.userId) {
      this.isLoading$$.next(true);
      this.apiService.post('/course', {userId: this.authService.userId, ...this.formGroup.value}).pipe(
        finalize(() => {
          this.isLoading$$.next(false);
        })
      );
    }
  }

  private updateCourseType(val: COURSE_TYPE) {
    switch(val) {
      case COURSE_TYPE.ONLINE:
        this.courseUrl.enable();
        this.coursePlaceBuilding.disable();
        this.coursePlaceRoom.disable();
        break;
      case COURSE_TYPE.OFFLINE:
        this.courseUrl.disable();
        this.coursePlaceBuilding.enable();
        this.coursePlaceRoom.enable();
        break;
    }
  }
}
