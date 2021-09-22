import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  apiServiceMockGetSubject,
  apiServiceMockPostSubject,
  apiServiceMockProvider
} from "../../../test-helpers/providers";
import { ApiService } from "./api.service";

describe('AuthService', () => {
  let service: AuthService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        apiServiceMockProvider
      ]
    });
    service = TestBed.inject(AuthService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoggedIn$', () => {
    it('should call ApiService with token url', () => {
      const spy = jasmine.createSpy();

      service.isLoggedIn$.subscribe(spy);

      apiServiceMockGetSubject.next();

      expect(apiService.get).toHaveBeenCalledWith('/token');
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('login', () => {
    it('should call api service', () => {
      service.login('mock parameters');

      expect(apiService.post).toHaveBeenCalledWith('/login', 'mock parameters');
    });
    it('should emit isLoggedIn as true', () => {
      const spy = jasmine.createSpy();

      service.login('mock parameters').subscribe();

      apiServiceMockPostSubject.next('auth data');

      service.isLoggedIn$.subscribe();
      service.isLoggedIn$.subscribe(spy);

      expect(spy).toHaveBeenCalledWith(true);
    })
  });
});
