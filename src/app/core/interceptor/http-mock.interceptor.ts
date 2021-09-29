import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getNumber, getUserByToken, getUserCourseList, removeUserToken, storeCourse, storeUser } from "./data";
import { JsonErrorResponse, JsonResponse } from "../../types";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let body: JsonResponse<any> = {
      data: []
    };
    let bodyError: JsonErrorResponse = {
      error: ''
    };
    let status = 200;

    switch(request.url) {
      case '/allcourses':
        if(request.method === 'GET') {
          body.data = getUserCourseList(null);
          status = 200;
        }
        break;
      case '/courses':
        if(request.method === 'GET') {
          const user = getUserByToken(this.cookieService.get('token'));

          if(!user || user.id !== getNumber(request.params.get('userId'))) {
            status = 400;
            bodyError.error = 'wrong permissions';
          } else {
            body.data = getUserCourseList(request.params.get('userId'));
            status = 200;
          }
        }
        break;
      case '/login':
        if(request.method === 'POST' && request.params.has('userEmail')) {
          const token = (new Date()).getTime() + '';
          const user = storeUser(request.params, token);

          this.cookieService.set('token', token, undefined, '/');

          body.data = user;
          status = 200;
        }
        break;
      case '/token':
        if(request.method === 'GET') {
          const user = getUserByToken(this.cookieService.get('token'));
          if (!user) {
            status = 400;
            bodyError.error = 'there is wrong token';
          } else {
            body.data = user;
          }

        }
        break;
      case '/course':
        if(request.method === 'POST' && request.params.has('userId')) {
          storeCourse(request.params);
          status = 200;
        }
        break;
      case '/logout':
        if(request.method === 'POST') {
          const token = this.cookieService.get('token');

          removeUserToken(token);

          this.cookieService.delete('token');

          status = 200;
        }
        break;
    }

    return new Observable(observer => {
      setTimeout(() => {
        if(status === 200) {
          observer.next(new HttpResponse<any>({
            body,
            status
          }));
        } else {
          observer.error(new HttpResponse<any>({
            body: bodyError,
            status
          }));
        }

        observer.complete();
      }, 1000);
    });
  }
}
