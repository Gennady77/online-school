import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from "../service/loading.service";
import { finalize } from "rxjs/operators";

@Injectable()
export class SpinnerOverflowInterceptor implements HttpInterceptor {
  showLoader = 0;

  constructor(
    private loadingService: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.showLoader++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.showLoader--;

        if(!this.showLoader) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
