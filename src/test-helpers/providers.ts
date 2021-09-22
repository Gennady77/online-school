import { Provider } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { ApiService } from "../app/core/service/api.service";
import { AuthService } from "../app/core/service/auth.service";
import { Router } from "@angular/router";

export let httpClientMockGet: Subject<any>;
export const httpClientMockProvider: Provider = {
  provide: HttpClient, useFactory: () => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    httpClientMockGet = new Subject();
    spy.get.and.returnValue(httpClientMockGet.asObservable());

    return spy;
  }
}

export let apiServiceMockPostSubject: Subject<any>;
export const apiServiceMockProvider: Provider = {
  provide: ApiService, useFactory: () => {
    const spy = jasmine.createSpyObj('ApiService', ['get', 'post']);

    apiServiceMockPostSubject = new Subject();
    spy.post.and.returnValue(apiServiceMockPostSubject);

    return spy;
  }
}

export let authServiceIsLoggedInSubject: Subject<any>;
export let authServiceLoginSubject: Subject<any>;
export const authServiceMockProvider: Provider = {
  provide: AuthService, useFactory: () => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);

    authServiceIsLoggedInSubject = new Subject();
    authServiceLoginSubject = new Subject();

    spy.login.and.returnValue(authServiceLoginSubject);
    spy.isLoggedIn$ = authServiceIsLoggedInSubject;

    return spy;
  }
}

export const routerMockProvider: Provider = {
  provide: Router, useFactory: () => {
    return jasmine.createSpyObj('Router', ['navigate']);
  }
};
