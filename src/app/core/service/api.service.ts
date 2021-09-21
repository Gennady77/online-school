import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JsonResponse } from "../../types";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.get<JsonResponse<T>>(url, {params})
      .pipe(
        map(jsonResp => jsonResp.data),
        shareReplay(1)
      );
  }

  post<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.post<JsonResponse<T>>(url, null,{params})
      .pipe(
        map(jsonResp => jsonResp.data),
        shareReplay(1)
      );
  }
}
