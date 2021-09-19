import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { data } from "./data";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get<T>(url: string): Observable<T> {
    return of(data[url]).pipe(
      delay(1000)
    );
  }
}
