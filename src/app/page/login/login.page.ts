import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('====');
  }
}
