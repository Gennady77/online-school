import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { COURSE_TYPE } from "../../types";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/service/auth.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../core/service/validators";
import { BehaviorSubject, Subscriber } from "rxjs";
import { ApiService } from "../../core/service/api.service";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
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

  private subscriber = new Subscriber();

  constructor(
    public authService: AuthService,
    public modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private ngbModalService: NgbModal,
    private router: Router,
    private apiService: ApiService
  ) {
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

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  onAddClick(content: TemplateRef<any>, evt: MouseEvent) {
    evt.preventDefault();

    this.modalService.open(content);
  }

  onLogoutClick(evt: MouseEvent) {
    evt.preventDefault();

    const logout$ = this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });

    this.subscriber.add(logout$);
  }

  onSubmit(modal: NgbModalRef) {
    this.formGroup.markAllAsTouched();

    if(this.formGroup.valid && this.authService.userId) {
      const submit$ = this.apiService.post('/course', {userId: this.authService.userId, ...this.formGroup.value}).pipe(
        tap(() => {
          modal.close('Ok click');
        }),
      ).subscribe(() => {
        this.router.navigate([this.router.url]);
      });

      this.subscriber.add(submit$);
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
