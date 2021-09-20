import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$: Observable<boolean>;

  constructor() {
    this.isLoggedIn$ = new Observable<boolean>(subscriber => {
      subscriber.next(false);
    })
  }
}
