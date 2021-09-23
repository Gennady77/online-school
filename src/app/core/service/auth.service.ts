import { Injectable } from '@angular/core';
import { defer, Observable, of } from "rxjs";
import { User } from "../../types";
import { ApiService } from "./api.service";
import { UserSession } from "./user-session";
import { map, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$: Observable<boolean>;

  private userSession = new UserSession();

  constructor(private apiService: ApiService ) {
    let hasCheckedSession = false;
    this.isLoggedIn$ = defer(() => {
      if(!hasCheckedSession) {
        hasCheckedSession = true;
        return this.loginFromCookie();
      }
      return of(this.userSession);
    }).pipe(mergeMap(userSession => userSession.isLoggedIn$$));

  }

  login(params: any): Observable<User> {
    return this.apiService.post<User>('/login', params).pipe(
      map(authSettings => {
        this.userSession.onLogin(authSettings);
        return authSettings;
      })
    )
  }

  private loginFromCookie(): Observable<UserSession> {
    return this.apiService.get<User>('/token').pipe(
      map(response => {
        this.userSession.onLogin(response);
        return this.userSession;
      })
    );
  }
}
