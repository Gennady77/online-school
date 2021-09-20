import { Provider } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { ApiService } from "../app/core/service/api.service";

export let httpClientMockGet: Subject<any>;
export const httpClientMockProvider: Provider = {
  provide: HttpClient, useFactory: () => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    httpClientMockGet = new Subject();
    spy.get.and.returnValue(httpClientMockGet.asObservable());

    return spy;
  }
}

export const apiServiceMockProvider: Provider = {
  provide: ApiService, useFactory: () => {
    return jasmine.createSpyObj('ApiService', ['get'])
  }
}
