import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getCourses } from "./data";
import { JsonResponse } from "../../types";

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let body: JsonResponse<Array<any>> = {
      data: []
    };
    let status = 200;

    switch(request.url) {
      case '/courses':
        if(request.method === 'GET') {
          body.data = getCourses;
        }
    }

    return new Observable(observer => {
      observer.next(new HttpResponse<any>({body, status}))
    });
  }
}
