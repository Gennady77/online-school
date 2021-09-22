import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/service/auth.service";
import { User } from "../../types";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  userEmail = new FormControl('', [Validators.required, Validators.email]);
  userPass = new FormControl('', [Validators.required]);

  formGroup = new FormGroup({
    userEmail: this.userEmail,
    userPass: this.userPass
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe((user: User) => {
        this.router.navigate([`/courses/${user.id}`]);
      });
    }
  }
}
