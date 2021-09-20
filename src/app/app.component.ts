import { Component } from '@angular/core';
import { LoadingService } from "./core/service/loading.service";
import { AuthService } from "./core/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(
    public loadingService: LoadingService,
    private authService: AuthService
  ) {
    authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })
  }
}
