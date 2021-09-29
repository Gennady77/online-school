import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../service/auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(
    private authServise: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authServise.isLoggedIn$.pipe(
      map(() => {
        return true;
      })
    )
  }

}
