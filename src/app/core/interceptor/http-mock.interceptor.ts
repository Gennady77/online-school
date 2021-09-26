import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUserCourseList, storeCourse, users } from "./data";
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
      case '/courses':
        if(request.method === 'GET') {
          body.data = getUserCourseList(request.params.get('id'));
          status = 200;
        }
        break;
      case '/login':
        if(request.method === 'POST' && request.params.has('userEmail')) {
          let user = users.find(item => item.email === request.params.get('userEmail'));
          const token = (new Date()).getTime() + '';

          if (!user) {
            users.push(user = {
              id: users.length + 1,
              email: request.params.get('userEmail') as string
            });
          }

          user.token = token;
          this.cookieService.set('token', token);

          body.data = user;
          status = 200;
        }
        break;
      case '/token':
        if(request.method === 'GET') {
          const user = users.find(item => item.token === this.cookieService.get('token'));
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
      }, 2000);
    });
  }
}
