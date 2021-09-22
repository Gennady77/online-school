import { BehaviorSubject } from "rxjs";
import { User } from "../../types";

export class UserSession {
  isLoggedIn$$ = new BehaviorSubject(false);
  set user(arg: User | undefined) {
    this._user = arg;
  }

  get user(): User | undefined {
    return this._user;
  }

  private _user: User | undefined;

  onLogin(auth: User) {
    this.isLoggedIn$$.next(true);
    this.user = auth;
  }
}
