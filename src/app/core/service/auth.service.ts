import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AuthSettings } from "../../types";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$: Observable<boolean>;

  constructor(private apiService: ApiService ) {
    this.isLoggedIn$ = new Observable<boolean>(subscriber => {
      subscriber.next(false);
    })
  }

  login(params: any): Observable<AuthSettings> {
    return this.apiService.post<AuthSettings>('/login', params)
  }
}
