import { Component, OnInit } from '@angular/core';
import { CourseData } from "../../types";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/service/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from "@angular/forms";
import { AppValidators } from "../../core/service/validators";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  courseList: CourseData[];
  isLoggedIn = false;

  courseName = new FormControl('', [AppValidators.required()]);
  courseDate = new FormControl('', [AppValidators.required()]);
  courseDuration = new FormControl('', [AppValidators.required(), AppValidators.numeric()]);

  formGroup = new FormGroup({
    courseName: this.courseName,
    courseDate: this.courseDate,
    courseDuration: this.courseDuration
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.courseList = route.snapshot.data.coursesList;
    authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  ngOnInit(): void {
  }

  onAddClick(content: any, evt: MouseEvent) {
    evt.preventDefault();

    this.modalService.open(content);
  }

  onSubmit() {
    console.log(this.courseDuration);
    // modal.close('Ok click');
    if(this.formGroup.valid) {
      console.log('=========', this.formGroup.value);
    }
  }
}
