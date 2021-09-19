import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { httpClientMockGet, httpClientMockProvider } from "../../../test-helpers/providers";
import { HttpClient } from "@angular/common/http";

describe('ApiService', () => {
  let service: ApiService;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        httpClientMockProvider
      ]
    });
    service = TestBed.inject(ApiService);
    httpClientMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call method get of HttpClient', () => {
      const spy = jasmine.createSpy();

      service.get('/someurl').subscribe(spy);

      httpClientMockGet.next({data: 'mock response'});

      expect(httpClientMock.get).toHaveBeenCalledWith('/someurl', {params: undefined});
      expect(spy).toHaveBeenCalledWith('mock response');
    })
  });
});
